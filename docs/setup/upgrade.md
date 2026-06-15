---
title: Upgrading KubeEdge
sidebar_position: 8
---

## Overview

This guide describes how to **upgrade an existing KubeEdge cluster to a newer
version**. In a typical deployment, edge nodes are remote devices already
running production workloads, so the priority of this guide is to help you
upgrade `edgecore` on those edge nodes safely and with minimal data loss.

A KubeEdge cluster is made up of two component groups:

- **CloudCore** — runs in the cloud / Kubernetes control plane. Upgraded
  centrally, usually with `keadm` or by re-applying the Helm chart /
  manifests.
- **EdgeCore** — runs on each edge device. Each node holds **local state**
  (the SQLite database `edgecore.db` that caches workload, secret, and
  configmap data sent from the cloud, plus device twin information). This
  state must be preserved across an upgrade so that pods stay running and
  edge devices stay in sync after `edgecore` restarts.

Because of that local state, **upgrading `edgecore` is the more delicate
part of the process**. The bulk of this guide focuses on upgrading edge
nodes; an optional section at the end covers upgrading CloudCore.

> Before upgrading, always check the
> [Kubernetes compatibility matrix](https://github.com/kubeedge/kubeedge#kubernetes-compatibility)
> for the target KubeEdge version, and skim the corresponding release notes
> for breaking changes (CRD bumps, removed config keys, etc.).

## Upgrade Strategy

There are two ways to upgrade `edgecore`:

1. **Remote upgrade via the cloud (recommended for fleets).** Submit a
   `NodeUpgradeJob` resource to the Kubernetes API and let CloudCore drive
   the upgrade across many edge nodes in batches, with concurrency control
   and timeout handling. Available since KubeEdge v1.16. From v1.21 onward,
   the corresponding `keadm` commands are exposed as
   `keadm edge upgrade`, `keadm edge backup`, and `keadm edge rollback`.
   Refer to the release notes of your target version for the exact API and
   CLI shape.

2. **Manual in-place upgrade on each edge device.** SSH onto each edge
   node and run the steps below. This is the original procedure and is
   what the rest of this page documents. Use it when you have a small
   number of edge nodes, when you cannot reach edge nodes from the cloud
   for an automated job, or when you want full control over each step.

The remainder of this guide walks through the **manual** procedure.

## Upgrading EdgeCore (Edge Nodes)

The manual procedure has five steps. The intent of each step is:

1. **Back up local state** so that, if anything goes wrong, you can roll
   back to the previous version without losing pod/device data.
2. **Stop the running `edgecore` process** so binaries and configuration
   can be replaced safely.
3. **Clean up old binaries and stale runtime state** to avoid mixing old
   and new artifacts.
4. **Restore the backed-up database** so `edgecore` rejoins the cluster
   with full knowledge of the workloads it was already managing.
5. **Re-deploy `edgecore`** at the new version.

Run these steps **on each edge node, one node at a time**. Workloads on a
node are unavailable while `edgecore` is stopped on that node, so use a
rolling approach if you cannot tolerate fleet-wide downtime.

### 1. Backup

#### Database

Back up the edgecore SQLite database on each edge node. This database
caches everything `edgecore` needs to keep workloads and devices running
when it cannot reach the cloud, so it is the single most important thing
to preserve:

```shell
mkdir -p /tmp/kubeedge_backup
cp /var/lib/kubeedge/edgecore.db /tmp/kubeedge_backup/
```

#### Config (optional)

You can keep your old `edgecore.yaml` so that custom changes (log levels,
module toggles, certificate paths, etc.) are easy to re-apply:

```shell
cp /etc/kubeedge/config/edgecore.yaml /tmp/kubeedge_backup/
```

> **Note:** between releases, configuration options may be added, renamed,
> or removed. **Do not** drop the old config file directly into a newer
> `edgecore`; instead, generate a fresh default with
> `edgecore --defaultconfig` and merge your custom values into it.

#### Device related (optional)

If you upgrade from 1.3 to 1.4, the device API was bumped from `v1alpha1`
to `v1alpha2`. You need to install
[Device v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_device.yaml)
and
[DeviceModel v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_devicemodel.yaml),
and manually convert existing custom resources from `v1alpha1` to
`v1alpha2`.

It's recommended to keep the `v1alpha1` CRDs and custom resources in the
cluster (or exported somewhere) in case a rollback is needed.

For other version jumps, always check the release notes for similar API
migrations.

### 2. Stop EdgeCore

Stop `edgecore` on the node so its files are no longer in use. How you
stop it depends on how it was originally deployed:

- Binary started directly or via `keadm`: `kill <edgecore-pid>`
- Managed by systemd: `systemctl stop edgecore`

If you are upgrading the whole cluster, stop edge nodes **first** and only
stop CloudCore once every `edgecore` is down. This ordering avoids edge
nodes seeing an unexpected cloud-side restart while they are still
connected.

### 3. Clean Up

Remove the old `edgecore` runtime data directory and config directory so
the new version starts from a clean slate. The database has already been
copied to `/tmp/kubeedge_backup` and will be restored in the next step:

```shell
rm -rf /var/lib/kubeedge /etc/kubeedge
```

### 4. Restore the Database

Put the backed-up database back so the freshly installed `edgecore` picks
up all previously cached pods, secrets, configmaps, and device twins
instead of starting empty:

```shell
mkdir -p /var/lib/kubeedge
mv /tmp/kubeedge_backup/edgecore.db /var/lib/kubeedge/
```

### 5. Deploy the New EdgeCore

Install the target version of `edgecore` using the same method you used
originally (`keadm join`, binary, or systemd). For the full installation
flow see the [setup guide](./install-with-keadm).

If you saved your old config, regenerate a default `edgecore.yaml` with
the new binary and merge your customizations into it before starting the
service:

```shell
edgecore --defaultconfig > /etc/kubeedge/config/edgecore.yaml
# edit /etc/kubeedge/config/edgecore.yaml to re-apply your customizations
```

After `edgecore` starts, verify the node is back online from the cloud
side:

```shell
kubectl get nodes
kubectl get pods -A -o wide
```

The edge node should report `Ready` at the new version, and pods that
were running on it before should still be running.

## Upgrading CloudCore (Optional)

CloudCore is stateless from KubeEdge's point of view (its persistent state
lives in the Kubernetes API server), so upgrading it is largely a matter
of rolling out new binaries or container images.

### When CloudCore was installed with `keadm`

Use the dedicated upgrade command (available since v1.16):

```shell
keadm upgrade cloud --advertise-address=<the-exposed-ip> --kubeedge-version=<target-version>
```

`<the-exposed-ip>` should match what you originally passed to
`keadm init --advertise-address` so the regenerated certificates keep the
same SANs. Run `keadm upgrade cloud --help` for the full list of flags.

### When CloudCore was installed from binaries

1. Stop the running CloudCore process (`kill` or `systemctl stop
   cloudcore`).
2. Replace the `cloudcore` binary with the new release. See
   [Installing KubeEdge with Binary](./install-with-binary) for where to
   download it from.
3. Re-apply the CRDs that ship with the new release (the install guide
   lists them). New releases sometimes introduce new CRDs or new versions
   of existing ones.
4. Regenerate the default config with `cloudcore --defaultconfig` and
   merge your customizations in, the same way as on the edge side.
5. Start `cloudcore` again.

### Order of operations

When upgrading both sides, the recommended order is:

1. Upgrade CloudCore first (so the new APIs and CRDs are present cluster-wide).
2. Then upgrade `edgecore` on each edge node, one at a time.

Cloud and edge are designed to tolerate small version skews, but they
should always run versions from the
[supported compatibility matrix](https://github.com/kubeedge/kubeedge#kubeedge-version-and-kubernetes-compatibility);
do not let nodes stay on a much older release than the cloud for long.
