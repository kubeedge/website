---
title: KubeEdge架构
id: architecture-index
---

## 架构

![KubeEdge 架构](/img/kubeedge_arch.png)

## 组成

KubeEdge 由以下组件组成：

- **[Edged](edge/edged):** 在边缘节点上运行并管理容器化应用程序的代理。
- **[EdgeHub](edge/edgehub):** Web 套接字客户端，负责与 Cloud Service 进行交互以进行边缘计算（例如 KubeEdge 体系结构中的 Edge Controller）。这包括将云侧资源更新同步到边缘，并将边缘侧主机和设备状态变更报告给云。
- **[CloudHub](cloud/cloudhub):** Web 套接字服务器，负责在云端缓存信息、监视变更，并向 EdgeHub 端发送消息。
- **[EdgeController](cloud/edge_controller):** kubernetes 的扩展控制器，用于管理边缘节点和 pod 的元数据，以便可以将数据定位到对应的边缘节点。
- **[EventBus](edge/eventbus):** 一个与 MQTT 服务器（mosquitto）进行交互的 MQTT 客户端，为其他组件提供发布和订阅功能。
- **[DeviceTwin](edge/devicetwin):** 负责存储设备状态并将设备状态同步到云端。它还为应用程序提供查询接口。
- **[MetaManager](edge/metamanager):** Edged 端和 Edgehub 端之间的消息处理器。它还负责将元数据存储到轻量级数据库（SQLite）或从轻量级数据库（SQLite）检索元数据。
