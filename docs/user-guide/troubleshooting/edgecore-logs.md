---
title: Checking EdgeCore Logs
sidebar_position: 13
---

> **Applies to:** KubeEdge v1.13+  
> **Related issue:** [kubeedge#6704](https://github.com/kubeedge/kubeedge/issues/6704)

When an edge node fails to join the cluster or pods fail to start on the edge, inspecting EdgeCore logs is the first and most effective diagnostic step. This guide explains **where logs are stored**, **which commands to run**, and **what log entries to look for** depending on how EdgeCore is deployed.

---

## Deployment Modes Overview

EdgeCore can be deployed in two fundamentally different ways, each with a different log location:

| Deployment Mode | How Installed | Log Location |
|---|---|---|
| **Host binary / systemd** | `keadm join` (default) or manual binary | `journalctl` or `/var/log/kubeedge/` |
| **Containerized** | Container runtime | `docker logs` or `crictl logs` |

Identifying your deployment mode before proceeding will save time.

```bash
# Check if EdgeCore is running as a systemd service (most common)
systemctl is-active edgecore.service

# Check if EdgeCore is running as a container via docker
docker ps | grep edgecore

# Check if EdgeCore is running as a container via containerd or CRI-O
crictl ps | grep edgecore
```

If the first command returns `active`, proceed to [Mode 1](#mode-1-edgecore-as-a-host-binary--systemd-service). If EdgeCore is containerized, proceed to [Mode 2](#mode-2-edgecore-as-a-container).

---

## Mode 1: EdgeCore as a Host Binary / systemd Service

When EdgeCore is installed directly on the host using `keadm join` in binary mode (the default), logs are written to **two possible locations**:

1. `journald` (captured by `systemd`) — the primary source.
2. `/var/log/kubeedge/edgecore.log` — if the `--log-file` flag is set.

### Using `journalctl`

`journalctl` is the primary tool for reading systemd-managed service logs:

```bash
# View all logs for the EdgeCore service
journalctl -u edgecore.service

# Follow live logs (equivalent to tail -f)
journalctl -u edgecore.service -f

# View the last 200 lines
journalctl -u edgecore.service -n 200

# View logs since last boot only
journalctl -u edgecore.service -b

# Filter to show only error-level and above
journalctl -u edgecore.service -p err

# Combine: tail and follow only ERRORs
journalctl -u edgecore.service -f -p err
```

### Checking `/var/log/kubeedge/`

If EdgeCore was started with `--logtostderr=false --log-file=/var/log/kubeedge/edgecore.log` (common in older deployments or manual setups), logs are written to a file:

```bash
# View the log file
cat /var/log/kubeedge/edgecore.log

# Tail the log file in real time
tail -f /var/log/kubeedge/edgecore.log

# View only the last 50 lines
tail -n 50 /var/log/kubeedge/edgecore.log

# Filter for errors and fatals
grep -E "^[EF][0-9]{4}" /var/log/kubeedge/edgecore.log
```

:::note No Log File Found?
If `/var/log/kubeedge/` is empty or does not exist, EdgeCore is most likely writing to `journald` instead. Use `journalctl -u edgecore.service` as described above.
:::

---

## Mode 2: EdgeCore as a Container

When EdgeCore is deployed inside a container (e.g., using `keadm join --edgecore-image`), logs are captured by the container runtime.

### Using Docker

If your container runtime is Docker:

```bash
# Find the EdgeCore container ID or name
docker ps | grep edgecore

# View logs for the EdgeCore container
docker logs <container-id>

# Tail live logs
docker logs -f <container-id>

# Filter for errors
docker logs <container-id> 2>&1 | grep -E "E[0-9]{4}|F[0-9]{4}"
```

### Using crictl (containerd / CRI-O)

If your container runtime is containerd or CRI-O, use `crictl`:

```bash
# Find the EdgeCore container ID
crictl ps | grep edgecore

# View logs for the EdgeCore container
crictl logs <container-id>

# Tail live logs
crictl logs -f <container-id>

# Filter for errors
crictl logs <container-id> 2>&1 | grep -E "E[0-9]{4}|F[0-9]{4}"
```

---

## Diagnosing Common Failures

The following sections describe specific log patterns to search for during common failure scenarios at the edge. The `grep` commands below work against systemd logs, but you can adapt them for container logs or log files.

### Failures Connecting to CloudCore

Connection issues are the most frequent cause of EdgeCore startup failure. This includes WebSocket drops and certificate mismatches.

```bash
journalctl -u edgecore.service | grep -i "cloud\|websocket\|cert\|tls"
```

**What to look for:**

```text
# Certificate mismatch or expired certificate
E0115 10:24:15.654321   1 hub.go:112] x509: certificate has expired or is not yet valid

# Unknown Authority (CA mismatch)
E0115 10:25:00.111111   1 client.go:87] tls: failed to verify server's certificate: x509: certificate signed by unknown authority

# WebSocket connection failure (CloudCore unreachable)
E0115 10:30:05.555555   1 websocket.go:234] failed to connect to cloudcore: dial tcp 192.168.1.100:10000: connect: connection refused

# Token-based bootstrapping failure (keadm join)
E0115 10:26:30.222222   1 bootstrap.go:78] failed to get edge certificate: rpc error: code = Unauthenticated desc = Invalid token
```

**Resolution steps:**
- Verify CloudCore is running and accessible from the edge node on port `10000` (CloudHub) and `10002` (HTTPS): `nc -zv <cloud-ip> 10000`.
- If certificates are expired or mismatched, regenerate them or re-run `keadm join` with a valid token.
- Check edge node time synchronization, as skewed clocks will cause `x509` certificate validation failures.

---

### Internal MQTT Broker Issues

EdgeCore uses an MQTT broker (internal or external) for device twin communication. EventBus errors usually point to MQTT connectivity problems.

```bash
journalctl -u edgecore.service | grep -i "mqtt\|eventbus"
```

**What to look for:**

```text
# EventBus failing to connect to local MQTT
E0115 10:00:01.123456   1 eventbus.go:89] Failed to connect to MQTT broker at tcp://127.0.0.1:1883: network Error : dial tcp 127.0.0.1:1883: connect: connection refused

# Authentication failure with external MQTT broker
E0115 10:00:01.234567   1 client.go:112] MQTT connection error: Connection Refused: not authorised
```

**Resolution steps:**
- If using the built-in MQTT broker (default), ensure `mqttMode: 2` (or `0` for internal/external) is properly configured in `/etc/kubeedge/config/edgecore.yaml`.
- If using an external Mosquitto broker, verify it is running (`systemctl status mosquitto`) and listening on the configured port (usually `1883`).
- Check firewall rules blocking local traffic on port `1883`.

---

### Container Runtime Errors

If EdgeCore connects to CloudCore successfully but pods fail to deploy or start on the edge, the issue usually lies with the container runtime (CRI integration).

```bash
journalctl -u edgecore.service | grep -i "cri\|sandbox\|runtime\|container"
```

**What to look for:**

```text
# Failed to start a pod sandbox (usually CNI or CRI configuration issue)
E0115 10:45:00.111111   1 kuberuntime_sandbox.go:68] CreatePodSandbox for pod "nginx-edge-1" failed: rpc error: code = Unknown desc = failed to create containerd task: OCI runtime create failed: container_linux.go:380: starting container process caused: process_linux.go:545: container init caused: rootfs_linux.go:76: mounting "/sys" to rootfs at "/sys" caused: mount through procfd: operation not permitted: unknown

# Docker/containerd socket not found
E0115 10:45:05.222222   1 remote_runtime.go:102] dial unix /run/containerd/containerd.sock: connect: no such file or directory

# Image pull failure
E0115 10:46:00.333333   1 image_manager.go:88] Failed to pull image "nginx:latest": rpc error: code = Unknown desc = failed to pull and unpack image "docker.io/library/nginx:latest": failed to resolve reference "docker.io/library/nginx:latest": failed to do request: Head "https://registry-1.docker.io/v2/library/nginx/manifests/latest": dial tcp: lookup registry-1.docker.io on 8.8.8.8:53: read udp 192.168.1.50:45123->8.8.8.8:53: i/o timeout
```

**Resolution steps:**
- Verify the container runtime endpoint is correctly configured in `/etc/kubeedge/config/edgecore.yaml` (`remoteRuntimeEndpoint` and `remoteImageEndpoint`).
- Check if the container runtime service is active (`systemctl status containerd` or `systemctl status docker`).
- If pods remain in `ContainerCreating`, inspect the runtime logs directly (e.g., `journalctl -u containerd.service`).

---

## Quick-Reference Command Cheatsheet

```bash
# ── systemd Mode (Default) ───────────────────────────────────────────────────
# Live tail all logs
journalctl -u edgecore.service -f

# Errors and above only, follow
journalctl -u edgecore.service -f -p err

# Last 200 lines
journalctl -u edgecore.service -n 200

# Time-bounded window
journalctl -u edgecore.service --since "10 minutes ago"

# ── File Mode ─────────────────────────────────────────────────────────────────
# Live tail log file
tail -f /var/log/kubeedge/edgecore.log

# Errors and fatals only
grep -E "^[EF][0-9]{4}" /var/log/kubeedge/edgecore.log

# Cloud connection issues
grep -i "cloud\|websocket" /var/log/kubeedge/edgecore.log

# ── Container Mode ────────────────────────────────────────────────────────────
# Docker: Live tail logs
docker logs -f <container-id>

# containerd/CRI-O: Live tail logs
crictl logs -f <container-id>

# ── Service Status ────────────────────────────────────────────────────────────
# Overview of service health + last log lines
systemctl status edgecore.service
```

---

## Related Documentation

- [Checking CloudCore Logs](../../advanced/cloudcore-logs.md)
- [Enable kubectl logs/exec to debug pods on the edge](../../advanced/debug.md)
- [KubeEdge Installation with keadm](../../setup/install-with-keadm.md)
- [EdgeCore Configuration Reference](../../setup/config.md)
- [KubeEdge Troubleshooting FAQ](../../faq/setup.md)
