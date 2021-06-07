---
draft: false
linktitle: 升级KubeEdge
menu:
  docs:
    parent: setup
    weight: 4
title: 升级KubeEdge
toc: true
type: docs
---
请参考以下指南升级您的KubeEdge集群。

## 相关配置

### 数据库

在每个边缘节点上备份edgecore数据库：

```
$ mkdir -p /tmp/kubeedge_backup
$ cp /var/lib/kubeedge/edgecore.db /tmp/kubeedge_backup/
```

### 配置（可选）

您可以保留旧的配置，根据需要保存一些自定义更改。

*注意事项：*:

升级后，某些选项可能会被删除，而某些选项可能会被添加，请不要直接使用旧的配置。

### 设备相关（可选）

如果您从1.3升级到1.4，请注意，我们会将设备API从 v1alpha1 升级到 v1alpha2。

您需要安装[Device v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_device.yaml) 和 [DeviceModel v1alpha2](https://github.com/kubeedge/kubeedge/blob/release-1.4/build/crds/devices/devices_v1alpha2_devicemodel.yaml)，并将它们现有的自定义资源 从v1alpha1 手动转换为 v1alpha2。

如果需要回滚，建议将v1alpha1 CRD和自定义资源保留在集群中或导出到某个位置。


## 停止进程

确保所有Edgecore进程均已停止后，一个一个停止edgecore的进程，然后停止cloudcore。

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

阅读[部署文档](../keadm_zh) 。