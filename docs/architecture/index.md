---
title: Architecture
id: architecture-index
---

# Architecture

![KubeEdge Architecture](/img/kubeedge_arch.png)

## Components
KubeEdge is composed of these components:

- **[Edged](edge/edged):** an agent that runs on edge nodes and manages containerized applications.
- **[EdgeHub](edge/edgehub):** a web socket client responsible for interacting with Cloud Service for edge computing (like Edge Controller as in the KubeEdge Architecture). This includes syncing cloud-side resource updates to the edge and reporting edge-side host and device status changes to the cloud.
- **[CloudHub](cloud/cloudhub):** a web socket server responsible for watching changes at the cloud side, caching and sending messages to EdgeHub.
- **[EdgeController](cloud/edge_controller):** an extended kubernetes controller which manages edge nodes and pods metadata so that the data can be targeted to a specific edge node.
- **[EventBus](edge/eventbus):** an MQTT client to interact with MQTT servers (mosquitto), offering publish and subscribe capabilities to other components.
- **[DeviceTwin](edge/devicetwin):** responsible for storing device status and syncing device status to the cloud. It also provides query interfaces for applications.
- **[MetaManager](edge/metamanager):** the message processor between edged and edgehub. It is also responsible for storing/retrieving metadata to/from a lightweight database (SQLite).
- **[ServiceBus](edge/servicebus)**: a HTTP client to interact with HTTP servers (REST), offering HTTP client capabilities to components of cloud to reach HTTP servers running at edge.
- **[DeviceController](cloud/device_controller)**: an extended kubernetes controller which manages devices so that the device metadata/status data can be synced between edge and cloud.
