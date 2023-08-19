---
title: 为什么选择KubeEdge
sidebar_position: 1
slug: /
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

## 架构

关于KubeEdge架构的更多详细信息, 请参阅[架构](i18n/zh/docusaurus-plugin-content-docs/current/architecture/index.md)进一步了解。

![KubeEdge 架构](/img/kubeedge_arch.png)
