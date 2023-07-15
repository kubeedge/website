---
title: 为什么选择KubeEdge
sidebar_position: 2
---

**KubeEdge** 是一个开源系统，将原生的容器化的业务流程和设备管理功能扩展到边缘节点。KubeEdge 是基于 Kubernetes 构建的，并为云，边缘之间的网络通信，应用程序部署以及元数据同步提供核心基础架构支持。同时 KubeEdge 还支持 MQTT，并允许开发人员编写自定义逻辑并在 Edge 上启用一定资源的设备进行通信。

KubeEdge 由云端和边缘端组成。目前边缘端和云端已开源。

## 优势

KubeEdge 的优势主要包括：

- **边缘计算**

  借助在 Edge 上运行的业务逻辑，可以让本地生成的数据，进行大量数据处理操作并对其进行保护。这样可以减少边缘和云之间的网络带宽需求和消耗，提高响应速度，降低成本并保护客户的数据隐私。

- **简化开发**

  开发人员可以编写基于 HTTP 或 MQTT 的常规应用程序，对其进行容器化，然后在 Edge 或 Cloud 中的任何一个更合适的位置运行应用程序。

- **Kubernetes 原生支持**

  借助 KubeEdge，用户可以像在传统的 Kubernetes 集群一样，在 Edge 节点上编排应用程序，管理设备并监视应用程序和设备状态。

- **丰富的应用**

  可以轻松地将现有的复杂机器学习，图像识别，事件处理等其他高级应用程序部署到 Edge。

## 组成

KubeEdge 由以下组件组成：

- **[Edged](architecture/edge/edged):** 在边缘节点上运行并管理容器化应用程序的代理。
- **[EdgeHub](architecture/edge/edgehub):** Web 套接字客户端，负责与 Cloud Service 进行交互以进行边缘计算（例如 KubeEdge 体系结构中的 Edge Controller）。这包括将云侧资源更新同步到边缘，并将边缘侧主机和设备状态变更报告给云。
- **[CloudHub](architecture/cloud/cloudhub):** Web 套接字服务器，负责在云端缓存信息、监视变更，并向 EdgeHub 端发送消息。
- **[EdgeController](architecture/cloud/edge_controller):** kubernetes 的扩展控制器，用于管理边缘节点和 pod 的元数据，以便可以将数据定位到对应的边缘节点。
- **[EventBus](architecture/edge/eventbus):** 一个与 MQTT 服务器（mosquitto）进行交互的 MQTT 客户端，为其他组件提供发布和订阅功能。
- **[DeviceTwin](architecture/edge/devicetwin):** 负责存储设备状态并将设备状态同步到云端。它还为应用程序提供查询接口。
- **[MetaManager](architecture/edge/metamanager):** Edged 端和 Edgehub 端之间的消息处理器。它还负责将元数据存储到轻量级数据库（SQLite）或从轻量级数据库（SQLite）检索元数据。

## 架构

![KubeEdge 架构](/img/kubeedge_arch.png)
