---
title: 常见问题
sidebar_position: 2
---

## KubeEdge 是什么？

KubeEdge 将 Kubernetes 扩展到边缘位置，用于管理容器化应用和设备。云端和边缘组件同步应用及设备元数据；EdgeCore 运行在边缘节点，CloudCore 运行在云端。[CloudCore](../architecture/cloud/cloudhub.md) 和 [EdgeCore](../architecture/edge/edgehub.md) 页面介绍了相关组件。

## 边缘节点失去云端连接时会怎样？

EdgeCore 会继续在本地运行此前收到的工作负载。MetaManager 使用 SQLite 存储和读取本地元数据，EdgeHub 会在连接恢复后重新连接 CloudHub。断连期间，需要云端 API 的变更无法送达。详见 [MetaManager](../architecture/edge/metamanager.md) 和 [EdgeHub](../architecture/edge/edgehub.md)。

## KubeEdge 可以用于什么？

KubeEdge 支持需要在数据源附近运行的应用，例如遥测处理、分析和机器学习工作负载，也通过 DeviceModel 和 Device 资源提供 Kubernetes 原生设备管理。实际适用情况取决于工作负载、设备 Mapper、网络和边缘硬件。

## 支持哪些硬件和操作系统？

请选择与设备操作系统及 CPU 架构匹配的发行包。[二进制安装指南](../setup/install-with-binary.md)列出了已发布的软件包。KubeEdge 没有适用于所有工作负载的统一内存或磁盘要求；请根据容器、运行时和本地数据需求规划节点资源。

## 如何查看正在运行的 KubeEdge 版本？

二进制安装时，可在云端主机运行 `cloudcore --version`，或在边缘主机运行 `edgecore --version`。容器安装时，请查看 CloudCore 部署使用的镜像标签。CloudCore 和 EdgeCore 应使用符合 [KubeEdge 发行政策](../community/release.md)的版本。
