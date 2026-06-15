---
title: Running KubeEdge on Windows (WSL2 + Docker Desktop)
sidebar_position: 9
---

> **Applies to:** KubeEdge v1.13+
> **Related issue:** [kubeedge/website#797](https://github.com/kubeedge/website/issues/797)

This guide explains how to run a KubeEdge edge node inside **WSL2** (Windows Subsystem for Linux 2) on a Windows machine that uses **Docker Desktop**. Without following these steps, users encounter a series of silent or misleading failures because WSL2's default environment differs from a standard Linux server in several important ways.

:::note System Requirements
This guide was verified on:
- Windows 11 Home (Build 26200)
- WSL2 with Ubuntu 22.04 LTS or later
- Docker Desktop v4.x or later
- KubeEdge v1.13+
:::

---

## Overview of WSL2-Specific Requirements

WSL2 is not a standard Linux environment. Before running EdgeCore, you must address the following six requirements. Each one causes a distinct failure if skipped:

| # | Requirement | Symptom if Skipped |
|---|---|---|
| 1 | Enable systemd | EdgeCore silently fails to start after `keadm join` |
| 2 | Install native containerd | `dial unix /run/containerd/containerd.sock: no such file` |
| 3 | Set `cgroupDriver: systemd` | ContainerManager startup failure |
| 4 | Set `failSwapOn: false` | EdgeCore refuses to start due to swap validation |
| 5 | Install CNI plugins | Edge node stays in `NotReady` state |
| 6 | Install iptables | Pod creation fails with `ContainerCreating` and no clear error |

---

## Step 1: Enable systemd in WSL2

WSL2 does not run systemd by default. EdgeCore installs itself as a systemd service, so systemd **must** be PID 1 inside WSL2.

Open a WSL2 terminal and run:

```bash
sudo tee /etc/wsl.conf << 'EOF'
[boot]
systemd=true
EOF
```

Then, from a **Windows PowerShell** (outside WSL2), shut down the WSL2 VM to apply the change:

```powershell
wsl --shutdown
```

Reopen your WSL2 terminal and verify that systemd is running as PID 1:

```bash
ps -p 1 -o comm=
```

The output must be `systemd`. If it shows `init` or anything else, the change has not taken effect — recheck `/etc/wsl.conf` and run `wsl --shutdown` again.

---

## Step 2: Install Native containerd Inside WSL2

Even when Docker Desktop's WSL2 integration is fully enabled, its internal containerd instance runs in an **isolated VM context** and does **not** expose a socket at the default path `/run/containerd/containerd.sock` that EdgeCore expects.

If you skip this step, EdgeCore will fail immediately with:

```
dial unix /run/containerd/containerd.sock: connect: no such file or directory
```

Install containerd natively inside your WSL2 distribution:

```bash
sudo apt-get update
sudo apt-get install -y containerd
```

Enable and start the containerd service:

```bash
sudo systemctl enable --now containerd
```

Verify that the socket is now present:

```bash
ls /run/containerd/containerd.sock
```

Generate the default containerd configuration so that EdgeCore can interact with it correctly:

```bash
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
```

---

## Step 3: Fix cgroupDriver Mismatch

WSL2 uses **cgroupv2** by default. However, `keadm join` generates an `edgecore.yaml` configuration file that sets `cgroupDriver: cgroupfs`, which is incompatible with cgroupv2.

After running `keadm join`, open the EdgeCore configuration file:

```bash
sudo nano /etc/kubeedge/config/edgecore.yaml
```

Find the `edged` section and change `cgroupDriver` from `cgroupfs` to `systemd`:

```yaml
edged:
  cgroupDriver: systemd  # Change from cgroupfs
```

Save the file and restart EdgeCore:

```bash
sudo systemctl restart edgecore
```

---

## Step 4: Disable Swap Validation

WSL2 has swap memory enabled by default. EdgeCore inherits Kubernetes kubelet's strict swap validation and will refuse to start on a node where swap is active.

After editing `/etc/kubeedge/config/edgecore.yaml` (from Step 3), also set `failSwapOn` to `false` within the `edged` section:

```yaml
edged:
  cgroupDriver: systemd  # from Step 3
  failSwapOn: false      # add this line
```

Save the file. This change takes effect after restarting EdgeCore (which you will do at the end).

---

## Step 5: Install CNI Plugins

Without CNI plugins, the edge node will register with the cluster but remain permanently in a `NotReady` state. The KubeEdge quickstart guide does not mention this requirement for edge nodes.

Create the required directories and download the CNI plugin bundle:

```bash
# Check for the latest version at https://github.com/containernetworking/plugins/releases
CNI_PLUGINS_VERSION="v1.5.0"
sudo mkdir -p /opt/cni/bin
wget "https://github.com/containernetworking/plugins/releases/download/${CNI_PLUGINS_VERSION}/cni-plugins-linux-amd64-${CNI_PLUGINS_VERSION}.tgz" \
  -O /tmp/cni.tgz
sudo tar -xzf /tmp/cni.tgz -C /opt/cni/bin
```

Create a basic bridge CNI network configuration for the edge node:

```bash
sudo mkdir -p /etc/cni/net.d
sudo tee /etc/cni/net.d/10-bridge.conflist << 'EOF'
{
  "cniVersion": "1.0.0",
  "name": "edge-bridge",
  "plugins": [
    {
      "type": "bridge",
      "bridge": "cni0",
      "isGateway": true,
      "ipMasq": true,
      "ipam": {
        "type": "host-local",
        "ranges": [[{"subnet": "10.88.0.0/16"}]],
        "routes": [{"dst": "0.0.0.0/0"}]
      }
    },
    {"type": "portmap", "capabilities": {"portMappings": true}}
  ]
}
EOF
```

---

## Step 6: Install iptables

WSL2 Ubuntu 22.04 and later may not ship with `iptables` pre-installed. The bridge CNI plugin from Step 5 requires `iptables` to set up pod networking rules. Without it, every pod creation fails with `ContainerCreating` and this error only appears in EdgeCore's journal — not in `kubectl describe pod`:

```
plugin type="bridge" failed (add): failed to locate iptables: exec: "iptables": executable file not found in $PATH
```

Install iptables:

```bash
sudo apt-get install -y iptables
```

---

## Final Step: Apply All Configuration and Verify

After completing Steps 1–6, restart EdgeCore to apply all changes:

```bash
sudo systemctl restart edgecore
```

Check that EdgeCore is running without errors:

```bash
sudo systemctl status edgecore
```

You should see `active (running)`. To watch logs in real time:

```bash
journalctl -u edgecore -f
```

From the **cloud side**, verify that the edge node has joined and is `Ready`:

```bash
kubectl get nodes
```

The edge node should appear with status `Ready` within a minute or two.

---

## Quick-Reference Checklist

Use this checklist when troubleshooting a failed WSL2 edge node setup:

- [ ] `ps -p 1 -o comm=` outputs `systemd`
- [ ] `/run/containerd/containerd.sock` exists
- [ ] `edgecore.yaml` has `cgroupDriver: systemd`
- [ ] `edgecore.yaml` has `failSwapOn: false`
- [ ] `/opt/cni/bin/bridge` exists (CNI plugins installed)
- [ ] `/etc/cni/net.d/10-bridge.conflist` exists
- [ ] `iptables --version` returns a version string without error
- [ ] `systemctl status edgecore` shows `active (running)`

---

## Troubleshooting

### EdgeCore fails to start after `keadm join`

Verify systemd is PID 1 (`ps -p 1 -o comm=` → `systemd`). If not, re-enable systemd in `/etc/wsl.conf` and run `wsl --shutdown` from PowerShell, then restart.

### `dial unix /run/containerd/containerd.sock: no such file`

Docker Desktop's containerd is not accessible from within WSL2. Install native containerd as described in [Step 2](#step-2-install-native-containerd-inside-wsl2).

### Edge node is `NotReady`

Check EdgeCore logs for CNI errors:

```bash
journalctl -u edgecore --no-pager | grep -i cni
```

If CNI plugins or iptables are missing, complete [Step 5](#step-5-install-cni-plugins) and [Step 6](#step-6-install-iptables).

### Pod stuck in `ContainerCreating`

This is almost always an iptables issue on WSL2. Run:

```bash
journalctl -u edgecore --no-pager | grep -i iptables
```

If you see `executable file not found in $PATH`, install iptables and restart EdgeCore.

### cgroupDriver error in EdgeCore logs

```
failed to get cgroupDriver: Failed to start ContainerManager
```

Edit `/etc/kubeedge/config/edgecore.yaml` and set `cgroupDriver: systemd`, then restart EdgeCore.
