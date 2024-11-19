---
title: Upgrading KubeEdge
sidebar_position: 8
---

This guide provides instructions on how to upgrade your KubeEdge cluster.

## Backup

### Database

Backup the EdgeCore database at each edge node:

```
$ mkdir -p /tmp/kubeedge_backup
$ cp /var/lib/kubeedge/edgecore.db /tmp/kubeedge_backup/
```

### Config (Optional)

You can keep the old config to preserve any custom changes you have made.

:::note
After upgrading, some options may be removed, and new options may be added. It is not recommended to use the old config directly.
:::

### Device related (Optional)

If you are upgrading from KubeEdge v1.14 to v1.15, please note that device API should be upgraded from v1alpha2 to v1beta1.

You will have to install [Device v1beta1](https://github.com/kubeedge/kubeedge/blob/release-1.15/build/crds/devices/devices_v1beta1_device.yaml)
and [DeviceModel v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_devicemodel.yaml),
and manually convert your existing custom resources from v1alpha2 to v1beta1.

It is recommended to keep the v1alpha2 CRD and custom resources in the cluster or export them somewhere, in case a rollback is needed.

## Stop Processes

Stop edgecore processes one by one, after ensuring all edgecore processes are stopped, stop cloudcore.

The way for stopping the processes depends on how you deploy:

- for binary or "keadm": use `kill`
- for "systemd": use `systemctl`

## Clean up

```
$ rm -rf /var/lib/kubeedge /etc/kubeedge
```

## Restore Database

Restore database at each edge node:

```
$ mkdir -p /var/lib/kubeedge
$ mv /tmp/kubeedge_backup/edgecore.db /var/lib/kubeedge/
```

## Deploy

Refer to the [setup guide](./install-with-keadm) for deployment instructions.