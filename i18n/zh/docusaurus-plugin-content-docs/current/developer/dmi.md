---
title: 设备管理框架
sidebar_position: 1
---

## 设备管理框架

设备管理框架（Device Management Interface，DMI）集成了设备管理接口，优化了KubeEdge的设备管理能力。KubeEdge DMI的目标是
构建一个涵盖设备管理、设备操作和设备数据处理的云原生设备孪生管理平台。 DMI定义了EdgeCore和Mapper之间的统一连接入口，
EdgeCore和Mapper分别实现上游数据流和下游数据流，同时，DMI解耦了设备管理面和设备数据面，让设备管理面只承载设备生命周期的管理，
而设备数据面通过微服务直接提供给数据消费应用程序。在这样的架构下，设备数据直接从数据面推送，不一定需要推送到云端。这使得云边通道能够
只传输少量的管理面信息，减少了云边通信拥塞的可能性。

### 架构
![DMI](/img/device/DMI.png)

### DMI中的设备管理和数据管理
上图是DMI设备管理和数据管理的设计图。黄线是设备管理流程，蓝线是数据管理流程。

在DMI的架构设计中，设备管理面主要包括设备的元数据、设备属性、配置、状态、生命周期等。其特点是比较稳定。创建后，除了状态报告之外，
信息的更新较少，接近于Pod。 用户可以像访问Pod一样通过云端Kubernetes API维护Device的生命周期，同时最大限度地减少设备管理带来的
额外数据传输开销。

在DMI设计中，设备以云原生的方式向设备数据消费者提供数据服务。DMI框架下的设备数据访问支持多种场景，更加灵活。上图列出了几个主要的数据访问
方法，包括推送数据和拉取数据等，具体如下：

1. Mapper通过配置目标地址将数据推送到云/边缘应用程序。
2. Mapper通过配置目标地址将数据推送到云/边缘数据库。
3. 用户应用程序通过 API 主动拉取设备数据。
4. Mapper通过云边通道将设备数据推送到云端。

### DMI接口定义
DMI接口定义可以参考 [DMI interface](https://github.com/kubeedge/kubeedge/blob/master/pkg/apis/dmi/services.go)。
当前版本的 DMI 接口是在 gRPC proto 中定义的。你可以使用generate-dmi-proto脚本创建相应的gRPC-go代码。