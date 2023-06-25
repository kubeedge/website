---
title: Why KubeEdge
sidebar_position: 2
---
**KubeEdge** is an open source system extending native containerized application orchestration and device management to hosts at the Edge. It is built upon Kubernetes and provides core infrastructure support for networking, application deployment and metadata synchronization between cloud and edge. It also supports MQTT and allows developers to author custom logic and enable resource constrained device communication at the Edge. KubeEdge consists of a cloud part and an edge part. Both edge and cloud parts are now open-sourced.

## Advantages

The advantages of KubeEdge include mainly:

* **Edge Computing**

     With business logic running at the Edge, much larger volumes of data can be secured & processed locally where the data is produced. This reduces the network bandwidth requirements and consumption between Edge and Cloud. This increases responsiveness, decreases costs, and protects customers' data privacy.

* **Simplified development**

     Developers can write regular HTTP or MQTT based applications, containerize these, and run them anywhere - either at the Edge or in the Cloud - whichever is more appropriate.

* **Kubernetes-native support**

     With KubeEdge, users can orchestrate apps, manage devices and monitor app and device status on Edge nodes just like a traditional Kubernetes cluster in the Cloud.

* **Abundant applications**

     It is easy to get and deploy existing complicated machine learning, image recognition, event processing and other high-level applications to the Edge.

## Components
KubeEdge is composed of these components:

- **[Edged](./architecture/edge/edged):** an agent that runs on edge nodes and manages containerized applications.
- **[EdgeHub](./architecture/edge/edgehub):** a web socket client responsible for interacting with Cloud Service for edge computing (like Edge Controller as in the KubeEdge Architecture). This includes syncing cloud-side resource updates to the edge and reporting edge-side host and device status changes to the cloud.
- **[CloudHub](./architecture/cloud/cloudhub):** a web socket server responsible for watching changes at the cloud side, caching and sending messages to EdgeHub.
- **[EdgeController](./architecture/cloud/edge_controller):** an extended kubernetes controller which manages edge nodes and pods metadata so that the data can be targeted to a specific edge node.
- **[EventBus](./architecture/edge/eventbus):** an MQTT client to interact with MQTT servers (mosquitto), offering publish and subscribe capabilities to other components.
- **[DeviceTwin](./architecture/edge/devicetwin):** responsible for storing device status and syncing device status to the cloud. It also provides query interfaces for applications.
- **[MetaManager](./architecture/edge/metamanager):** the message processor between edged and edgehub. It is also responsible for storing/retrieving metadata to/from a lightweight database (SQLite).
- **[ServiceBus](./architecture/edge/servicebus)**: a HTTP client to interact with HTTP servers (REST), offering HTTP client capabilities to components of cloud to reach HTTP servers running at edge.
- **[DeviceController](./architecture/cloud/device_controller)**: an extended kubernetes controller which manages devices so that the device metadata/status data can be synced between edge and cloud.

## Architecture

![KubeEdge Architecture](/img/kubeedge_arch.png)
