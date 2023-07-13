---
title: 升级KubeEdge
sidebar_position: 5
---

请参考以下指南升级您的 KubeEdge 集群。

## 相关配置

### 数据库

在每个边缘节点上备份 edgecore 数据库：

```
$ mkdir -p /tmp/kubeedge_backup
$ cp /var/lib/kubeedge/edgecore.db /tmp/kubeedge_backup/
```

### 配置（可选）

您可以保留旧的配置，根据需要保存一些自定义更改。

_注意事项：_:

升级后，某些选项可能会被删除，而某些选项可能会被添加，请不要直接使用旧的配置。

### 设备相关（可选）

如果您从 1.3 升级到 1.4，请注意，我们会将设备 API 从 v1alpha1 升级到 v1alpha2。

您需要安装[Device v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_device.yaml) 和 [DeviceModel v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_devicemodel.yaml)，并将它们现有的自定义资源 从 v1alpha1 手动转换为 v1alpha2。

如果需要回滚，建议将 v1alpha1 CRD 和自定义资源保留在集群中或导出到某个位置。

## 停止进程

确保所有 Edgecore 进程均已停止后，一个一个停止 edgecore 的进程，然后停止 cloudcore。

停止的方式取决于您的部署方式：

- 使用了二进制 or "keadm" 方式: 使用 `kill`
- 使用了 "systemd"方式: 使用 `systemctl`

## 清理

```
$ rm -rf /var/lib/kubeedge /etc/kubeedge
```

## 还原数据库

在每个边缘节点还原数据库：

```
$ mkdir -p /var/lib/kubeedge
$ mv /tmp/kubeedge_backup/edgecore.db /var/lib/kubeedge/
```

## 部署

阅读[部署文档](./keadm) 。
