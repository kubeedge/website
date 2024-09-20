---
title: Device Controller
sidebar_position: 3
---

## Device Controller概述

Device Controller是KubeEdge的云端组件，负责设备管理。在KubeEdge中，设备管理是通过使用Kubernetes的[CRD机制](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)来描述设备的元数据/状态，并通过Device Controller在Edge node 和 Cloud之间同步这些设备更新来实现的。Device Controller启动了两个独立的协程，分别称为 **`上行控制器(upstream controller)`** 和 **`下行控制器(downstream controller)`**。它们并不是独立的控制器，只是为了便于理解而命名。

Device Controller利用**设备模型(Device Model)**和**设备实例(Device Instance)**来实现设备管理：

- **Device Model**：**`Device Model`**描述了设备公开的设备属性以及访问这些属性的属性访问者。Device Model类似于可重复使用的模板，用于创建和管理不同类型的设备。Device Model定义的详细信息可以在[这里](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd-v1beta1.md#device-model-type-definition)找到。
  
- **Device Instance**：**`Device Instance`**代表一个实际的设备对象。它类似于**`Device Model`**的实例化，并引用模型中定义的属性。Device Instance中device.spec是静态的，而device.status包含动态变化的内容，如设备属性的期望状态和设备报告的实际状态。设备实例定义的详细信息可以在[这里](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd-v1beta1.md#device-instance-type-definition)找到。

**注意**：一些协议的设备模型和设备实例示例可以在 $GOPATH/src/github.com/kubeedge/kubeedge/build/crd-samples/devices 中找到。

![Device Model](/img/device-crd/device-crd-model.png)

## Device Controller执行的操作

Device Controller执行以下功能：
- **Downstream Controller**：通过监视 K8S API Server，将设备更新从云端同步到边缘节点。
- **Upstream Controller**：使用Device Twin组件，将设备更新从Edge node同步到云端。

## **Upstream Controller**:

**Upstream Controller**监视来自Edge node的更新，并将这些更新应用于云端的 API Server。更新类型和Upstream Controller可以采取的可能操作如下所示：

| 更新类型                           | 操作                                         |
|-------------------------------     |---------------------------------------------|
| Device Twin报告状态更新               | 控制器将Device Twin属性的报告状态补丁到云端。|

![Device UpStream Controller](/img/device-crd/device-upstream-controller.png)

### 从Edge到Cloud同步上报Device Twin属性更新

Mapper 监视设备更新并通过 MQTT 代理将其报告给EventBus, EventBus将设备的报告状态发送给Device Twin，Device Twin将其存储在本地，然后将更新同步到云端。Device Controller监视来自Edge node的设备更新（通过Cloudhub），并将报告状态更新到云端。

![设备更新从Edge node到云端](/img/device-crd/device-updates-edge-cloud.png)

## Downstream Controller:

**Downstream Controller**监视K8S API Server上的设备更新。更新类型和下行控制器可以采取的可能操作如下所示：

| 更新类型                           | 操作                                         |
|-------------------------------|----------------------------------------------|
| **新设备模型创建**                 | NA                                          |
| **新设备创建**                    | Device Controller创建一个新的 ConfigMap 来存储设备模型中定义的设备属性和访问者信息，并将其存储在 etcd 中。Edge Controller中现有的 ConfigMap 同步机制用于将 ConfigMap 同步到边缘节点。运行在容器中的 mapper 应用程序可以获取更新的 ConfigMap，并使用属性和访问者元数据访问设备。Device Controller还将Device Twin元数据更新报告给Edge node。|
| **设备节点成员更新**               | Device Controller向Edge node发送成员更新事件。|
| **Device Twin期望状态更新**           | Device Controller向Edge node发送孪生更新事件。|
| **设备删除**                       | Device Controller发送Device Twin删除事件以删除与设备关联的所有设备孪生。它还删除与设备关联的 ConfigMap，并将此删除事件同步到边缘。mapper 应用程序将停止操作该设备。|

![Device Downstream Controller](/img/device-crd/device-downstream-controller.png)

使用ConfigMap存储设备属性和访问者的想法是，这些元数据仅由运行在Edge node上的mapper应用程序所需，以便连接到设备并收集数据。如果mapper作为容器运行，可以将这些属性作为ConfigMap 加载。下行Controller监视云端对属性、访问者等的添加、删除或更新，并在etcd中更新ConfigMap。如果mapper想要发现设备支持哪些属性，可以从设备实例中获取模型信息。此外，它还可以从设备实例中获取连接设备的协议信息。一旦它可以访问设备模型，就可以获取设备支持的属性。为了访问属性，mapper需要获取相应的访问者信息。这可以从propertyVisitors列表中检索。最后，使用 visitorConfig，mapper可以读取/写入与属性相关的数据。

### 从云端到边缘同步Device Twin期望属性更新

![设备更新从云端到Edge node](/img/device-crd/device-updates-cloud-edge.png)

Device Controller监视Cloud的设备更新，并将其传递到Edge node。这些更新由Device Twin本地存储。mapper通过MQTT代理获取这些更新，并根据更新对设备进行操作。
