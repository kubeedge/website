---
title: Checking CloudCore Logs
sidebar_position: 12
---

> **Applies to:** KubeEdge v1.13+  
> **Related issue:** [kubeedge#6703](https://github.com/kubeedge/kubeedge/issues/6703)

When a KubeEdge installation fails or CloudCore behaves unexpectedly at runtime, inspecting CloudCore logs is the first and most effective diagnostic step. This guide explains **where logs are stored**, **which commands to run**, and **what log entries to look for** depending on how CloudCore is deployed.

---

## Deployment Modes Overview

CloudCore can be deployed in two fundamentally different ways, each with a different log location:

| Deployment Mode | How Installed | Log Location |
|---|---|---|
| **Kubernetes Pod** | Helm chart or `keadm init` | `kubectl logs` (stdout) |
| **Host binary / systemd** | `keadm init --with-edge-node=false` or manual binary | `journalctl` or `/var/log/kubeedge/` |

Identifying your deployment mode before proceeding will save time.

```bash
# Check if CloudCore is running as a Pod
kubectl get pods -n kubeedge -l kubeedge=cloudcore

# Check if CloudCore is running as a systemd service
systemctl is-active cloudcore.service
```

If the first command returns a running pod, proceed to [Mode 1](#mode-1-cloudcore-as-a-kubernetes-pod). If the second command returns `active`, proceed to [Mode 2](#mode-2-cloudcore-as-a-host-binary--systemd-service).

---

## Mode 1: CloudCore as a Kubernetes Pod

When CloudCore is deployed as a pod (the default mode for `keadm init` and Helm installations), all logs are written to **stdout/stderr** and captured by the Kubernetes logging subsystem.

### Basic Log Retrieval

```bash
# Find the CloudCore pod name
kubectl get pods -n kubeedge

# View logs for the CloudCore pod (replace <pod-name> with actual name)
kubectl logs -n kubeedge <pod-name>

# Shorthand using a label selector — no need to look up the pod name
kubectl logs -n kubeedge -l kubeedge=cloudcore
```

### Tailing Live Logs

Use the `-f` flag to follow logs in real time. This is the most useful mode when testing a new edge node connection:

```bash
kubectl logs -n kubeedge -l kubeedge=cloudcore -f
```

### Viewing Logs from a Previous (Crashed) Container

If CloudCore crashed and restarted, the current container's logs will not contain the failure. Use `--previous` to retrieve logs from the terminated container:

```bash
kubectl logs -n kubeedge -l kubeedge=cloudcore --previous
```

### Filtering by Severity

CloudCore uses structured Go logging. Pipe the output through `grep` to filter noise:

```bash
# Show only ERROR and FATAL lines
kubectl logs -n kubeedge -l kubeedge=cloudcore | grep -E "E[0-9]{4}|F[0-9]{4}"

# Show the last 100 lines and then follow
kubectl logs -n kubeedge -l kubeedge=cloudcore --tail=100 -f

# Show logs since a specific time
kubectl logs -n kubeedge -l kubeedge=cloudcore --since=30m
kubectl logs -n kubeedge -l kubeedge=cloudcore --since-time="2026-01-15T10:00:00Z"
```

:::tip Go Log Format
CloudCore uses `klog` (the Kubernetes logging library). Log lines begin with a severity prefix:
- `I` = INFO
- `W` = WARNING
- `E` = ERROR
- `F` = FATAL (process will exit immediately after a FATAL log)
:::

---

## Mode 2: CloudCore as a Host Binary / systemd Service

When CloudCore is installed directly on the host using `keadm` in binary mode, or run via a systemd unit file, logs are written to **two possible locations**:

1. `journald` (captured by `systemd`) — the primary source
2. `/var/log/kubeedge/cloudcore.log` — if the `--log-file` flag is set

### Using `journalctl`

`journalctl` is the primary tool for reading systemd-managed service logs:

```bash
# View all logs for the CloudCore service
journalctl -u cloudcore.service

# Follow live logs (equivalent to tail -f)
journalctl -u cloudcore.service -f

# View the last 200 lines
journalctl -u cloudcore.service -n 200

# View logs since last boot only
journalctl -u cloudcore.service -b

# View logs from a specific time window
journalctl -u cloudcore.service --since "2026-01-15 10:00:00" --until "2026-01-15 10:30:00"

# Filter to show only error-level and above
journalctl -u cloudcore.service -p err

# Combine: tail and follow only ERRORs
journalctl -u cloudcore.service -f -p err
```

### Checking `/var/log/kubeedge/`

If CloudCore was started with `--logtostderr=false --log-file=/var/log/kubeedge/cloudcore.log` (common in older deployments or manual binary setups), logs are written to a file:

```bash
# View the log file
cat /var/log/kubeedge/cloudcore.log

# Tail the log file in real time
tail -f /var/log/kubeedge/cloudcore.log

# View only the last 50 lines
tail -n 50 /var/log/kubeedge/cloudcore.log

# Filter for errors and fatals
grep -E "^[EF][0-9]{4}" /var/log/kubeedge/cloudcore.log

# Confirm where logs are actually being written
ls -lh /var/log/kubeedge/
```

:::note No Log File Found?
If `/var/log/kubeedge/` is empty or does not exist, CloudCore is most likely writing to `journald` instead. Use `journalctl -u cloudcore.service` as described above.
:::

### Checking the systemd Unit File

To understand exactly how CloudCore was started (and which log flags are in use), inspect the unit file:

```bash
# View the active unit file
systemctl cat cloudcore.service

# Check the service status and last few log lines together
systemctl status cloudcore.service
```

---

## Diagnosing Common Failures

The following sections describe specific log patterns to search for during common failure scenarios. In each case, the `grep` commands work against both `kubectl logs` output (pipe into grep) and log files (`grep` the file directly).

### Certificate Errors

Certificate issues are the most common cause of CloudCore startup failure and EdgeCore connection drops. Look for these patterns:

```bash
# When inspecting a pod:
kubectl logs -n kubeedge -l kubeedge=cloudcore | grep -i "cert\|tls\|x509\|ca"

# When inspecting a log file:
grep -i "cert\|tls\|x509\|ca" /var/log/kubeedge/cloudcore.log
```

**What to look for:**

```
# Certificate not yet generated or path wrong
E0115 10:23:01.123456   1 server.go:45] Failed to load TLS credentials: open /etc/kubeedge/certs/server.crt: no such file or directory

# Edge node presents an expired or untrusted certificate
E0115 10:24:15.654321   1 handler.go:112] x509: certificate has expired or is not yet valid

# CA mismatch between CloudCore and EdgeCore
E0115 10:25:00.111111   1 handler.go:87] tls: failed to verify client's certificate: x509: certificate signed by unknown authority

# Token-based bootstrapping failure (keadm join)
E0115 10:26:30.222222   1 certmanager.go:78] failed to get edge certificate from cloudcore: rpc error: code = Unauthenticated desc = Invalid token
```

**Resolution steps:**
- Verify `/etc/kubeedge/certs/` exists and is populated: `ls -la /etc/kubeedge/certs/`
- Check certificate expiry: `openssl x509 -in /etc/kubeedge/certs/server.crt -noout -dates`
- Re-run `keadm init` with `--force` to regenerate certificates

---

### EdgeCore Connection Drops

After initial setup, if edge nodes repeatedly disconnect and reconnect, look for these patterns in CloudCore logs:

```bash
kubectl logs -n kubeedge -l kubeedge=cloudcore | grep -i "edge\|disconnect\|reconnect\|websocket\|tunnel"
```

**What to look for:**

```
# Edge node disconnected (normal during restart, abnormal if repeated)
I0115 10:30:00.000000   1 nodeconnection.go:201] edge node edge-node-01 disconnected

# WebSocket/tunnel handshake failure — usually a firewall or port issue
E0115 10:30:05.555555   1 handler.go:234] failed to upgrade websocket connection from edge-node-01: websocket: the client is not using the websocket protocol

# EdgeCore is connecting to the wrong address or port
W0115 10:31:00.777777   1 server.go:156] no active connection for node edge-node-01

# Hub controller cannot list nodes — cloud API server connectivity issue
E0115 10:32:00.999999   1 hubcontroller.go:88] failed to list edge nodes: Get "https://10.96.0.1:443/api/v1/nodes": dial tcp 10.96.0.1:443: connect: connection refused
```

**Resolution steps:**
- Verify port 10000 (CloudHub) and 10002 (HTTPS) are open between edge and cloud: `nc -zv <cloud-ip> 10000`
- Check if a firewall or security group is blocking traffic
- Confirm the `advertiseAddress` in CloudCore config matches the IP EdgeCore is using to reach it

---

### Port Conflicts at Startup

If CloudCore fails to bind to its required ports (typically when another process is already listening), you will see FATAL log entries immediately at startup:

```bash
kubectl logs -n kubeedge -l kubeedge=cloudcore --previous | grep -E "bind|address already in use|listen"
```

**What to look for:**

```
# Port already in use — fatal at startup
F0115 10:00:01.123456   1 server.go:89] Failed to listen on :10000: listen tcp :10000: bind: address already in use

# Similar failure for the HTTPS port
F0115 10:00:01.234567   1 server.go:112] Failed to listen on :10002: listen tcp :10002: bind: address already in use

# CloudStream port conflict
F0115 10:00:01.345678   1 server.go:134] Failed to listen on :10003: listen tcp :10003: bind: address already in use
```

**Resolution steps:**
- Identify the conflicting process:
  ```bash
  # Find which process is using port 10000
  sudo ss -tlnp | grep 10000
  # or
  sudo lsof -i :10000
  ```
- Stop the conflicting service or reconfigure CloudCore to use a different port in `/etc/kubeedge/config/cloudcore.yaml`

---

### API Server Connectivity Failures

CloudCore must be able to reach the Kubernetes API server. If it cannot, it fails to start or loses cluster state:

```bash
kubectl logs -n kubeedge -l kubeedge=cloudcore | grep -i "apiserver\|kubeconfig\|dial tcp\|connection refused"
```

**What to look for:**

```
# Kubeconfig missing or malformed
F0115 09:59:00.111111   1 app.go:67] failed to build kubeconfig: stat /etc/kubeedge/config/cloudcore.yaml: no such file or directory

# API server not reachable
E0115 10:00:05.222222   1 reflector.go:138] Failed to watch *v1.Node: failed to list *v1.Node: Get "https://10.96.0.1:443/api/v1/nodes": dial tcp 10.96.0.1:443: connect: connection refused

# RBAC permission denied
E0115 10:01:00.333333   1 controller.go:55] Failed to list pods: pods is forbidden: User "system:serviceaccount:kubeedge:cloudcore" cannot list resource "pods" in API group "" at the cluster scope
```

---

## Quick-Reference Command Cheatsheet

```bash
# ── Pod Mode ─────────────────────────────────────────────────────────────────
# Live tail all logs
kubectl logs -n kubeedge -l kubeedge=cloudcore -f

# Last 100 lines, then follow
kubectl logs -n kubeedge -l kubeedge=cloudcore --tail=100 -f

# Errors only
kubectl logs -n kubeedge -l kubeedge=cloudcore | grep -E "^[EF][0-9]{4}"

# Logs from crashed previous container
kubectl logs -n kubeedge -l kubeedge=cloudcore --previous

# Logs from last 30 minutes
kubectl logs -n kubeedge -l kubeedge=cloudcore --since=30m

# ── systemd Mode ─────────────────────────────────────────────────────────────
# Live tail
journalctl -u cloudcore.service -f

# Errors and above only, follow
journalctl -u cloudcore.service -f -p err

# Last 200 lines
journalctl -u cloudcore.service -n 200

# Time-bounded window
journalctl -u cloudcore.service --since "10 minutes ago"

# ── File Mode ─────────────────────────────────────────────────────────────────
# Live tail log file
tail -f /var/log/kubeedge/cloudcore.log

# Errors and fatals only
grep -E "^[EF][0-9]{4}" /var/log/kubeedge/cloudcore.log

# Certificate-related lines
grep -i "cert\|x509\|tls" /var/log/kubeedge/cloudcore.log

# Port binding failures
grep -i "bind\|address already in use\|listen" /var/log/kubeedge/cloudcore.log

# ── Service Status ────────────────────────────────────────────────────────────
# Overview of service health + last log lines
systemctl status cloudcore.service

# Inspect how the service was started
systemctl cat cloudcore.service
```

---

## Related Documentation

- [Enable kubectl logs/exec to debug pods on the edge](./debug.md)
- [KubeEdge Installation with keadm](../setup/installation/install-with-keadm.md)
- [CloudCore Configuration Reference](../setup/config.md)
- [KubeEdge Troubleshooting FAQ](../faq/setup.md)
