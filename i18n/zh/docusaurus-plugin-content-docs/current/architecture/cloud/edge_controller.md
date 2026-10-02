---
title: Edge Controller
sidebar_position: 2
---

## Edge Controller概述

**Edge Controller** 是Kubernetes Api-Server和EdgeCore之间的桥梁。

## Edge Controller执行的操作

Edge Controller执行以下功能：
- **下行控制器(Downstream Controller)**：从K8s Api-server同步添加/更新/删除事件到EdgeCore
- **上行控制器(Upstream Controller)**：同步监视并更新资源和事件的状态（节点、Pod 和 ConfigMap）到 K8s Api-server，并且订阅来自 EdgeCore 的消息
- Device Manager：创建管理接口，实现管理ConfigmapManager,LocationCache 和 PodManager 的事件

## Downstream Controller：
### 同步添加/更新/删除事件到边缘

- Downstream Controller：监视K8S Api-server并通过cloudHub发送更新到EdgeCore
- 通过cloudHub同步Pod, ConfigMap, Secret 的添加/更新/删除事件到边缘
- 通过调用Upstream Controller管理接口创建相应的管理器（Pod,ConfigMap,Secret）来处理事件
- 定位ConfigMap和Secret应发送到哪个节点

![Downstream Controller](/img/edgecontroller/DownstreamController.png)

## Upstream Controller：
### 同步监视并更新资源和事件的状态

- Upstream Controller接收来自EdgeCore的消息，并将更新同步到K8S Api-server
- 创建停止通道以分发和停止处理Pod,ConfigMap节点和Secret事件
- 创建消息通道以更新NodeStatus,PodStatus,Secret和ConfigMap相关事件
- 获取Pod状态信息，如Ready,Initialized,PodScheduled和Unschedulable详细信息
- **以下是 PodCondition 的信息**  <br />
   - **Ready**：PodReady表示Pod能够提供服务请求，并应添加到所有匹配服务的负载均衡池中  <br />
   - **PodScheduled**：它表示此Pod的调度过程状态  <br />
   - **Unschedulable**：表示调度器当前无法调度此Pod，可能是由于集群中的资源不足  <br />
   - **Initialized**：表示Pod中的所有初始化容器均已成功启动  <br />
   - **ContainersReady**：表示Pod中的所有容器是否都已准备好  <br />
- **以下是 PodStatus 的信息**  <br />
   - **PodPhase**：Pod的当前状态  <br />
   - **Conditions**：指示Pod处于此状态的详细信息  <br />
   - **HostIP**：分配给Pod的主机的IP地址  <br />
   - **PodIp**：分配给Pod的IP地址  <br />
   - **QosClass**：根据资源需求分配给Pod的QoS类别  <br />

   ![Upstream Controller](/img/edgecontroller/UpstreamController.png)

## Controller Manager：
### 创建管理接口并实现 ConfigmapManager, LocationCache 和 PodManager

- Controller Manager 定义了管理器接口, ConfigManager,PodManager,SecretManager实现了该接口
- 管理OnAdd,OnUpdate和OnDelete事件，并将这些事件将从K8s Api-server更新到相应的边缘节点
- 创建一个EventManager(ConfigMap,Pod,Secret)，它将为每个事件启动一个CommonResourceEventHandler、新的ListWatch和一个newShared Informer，以通过cloudHub将事件添加/更新/删除同步到EdgeCore
- **以下是Controller Manager创建的处理程序列表**  <br />
   - **CommonResourceEventHandler**：NewcommonResourceEventHandler创建了用于ConfigMap和Pod管理的CommonResourceEventHandler  <br />
   - **NewListWatch**：从指定的客户端资源命名空间和字段选择器创建一个新的ListWatch  <br />
   - **NewSharedInformer**：为ListWatcher创建一个新的实例  
