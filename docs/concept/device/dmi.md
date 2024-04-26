---
title: Device Management Interface
sidebar_position: 1
---

## What is DMI?

DMI (Device Management Interface): Integrate device management interfaces to enhance KubeEdge's capabilities. Develop a cloud-native platform for the comprehensive digital twin management of devices, including both device management and data.

* Cloud Native: Treat devices as k8s (Kubernetes) resources to generate virtual digital twins, allowing for simulation based on k8s.
* Device Management: Manage the lifecycle of devices as you would manage pods, simplifying operations for users.
* Device Operations: There are two entry points for device operations, with interactive control capabilities on k8s (human-machine, machine-machine), and device interactive control capabilities are also provided to deployments.
* Device Data: Edge-side deployments can access corresponding data, and device data is uploaded to the cloud in certain situations.





## Architecture

* Decouple the device management layer from the device business data layer.
* Microservice the device data, "Device as a Service."
* Help developers focus on the development of business applications themselves.
* Reduce the possibility of cloud-edge channel congestion and improve system availability.
* Provide a more flexible and unified standardized approach to device management.



![sedna_arch](/img/dmi/dmi-architecture.png)


### Component
DMI consists of the following components：

#### Management Plane
* Separate management plane data from business plane data.
  * Management plane data is stored in KubeEdge's ETCD, which has less frequent changes.
  * Business plane data is directly exported to data processors via the data plane.
* The management plane data includes:
  * Metadata
  * Attributes
  * Configurations
  * Status
  * Lifecycle 
* Device Information Management:
  * Cached in KubeEdge's SQLite database
  * Mapped using a combination of node and protocol
  * Initialized through the return values of the registration interface
  * Devices are added or removed through the device interface to the Mapper
* The Mapper implements a REST access method using gRPC and Unix Domain Sockets (UDS).

#### Data Plane
1. Edge-side applications access device data through **REST Service**.
2. Cloud-side applications access device data through **REST Service**.
3. The mapper pushes data to edge-side applications by configuring the **REST destination address**.
4. The mapper pushes data to cloud-side applications by configuring the **REST destination address**.
5. The mapper pushes data to an edge-side database by configuring the **destination address**.
6. The mapper pushes data to an MQTT broker by configuring the **destination address**.
7. Edge-side applications subscribe to device data via **MQTT broker topics**.
8. Cloud-side applications subscribe to device data via **MQTT broker topics**.
9. After processing the data, edge-side applications upload the results to the cloud.

#### Interface Implementation
* The system is divided into two separate interfaces: the **upstream** and the **downstream**.
  *  The **upstream interface** is used by the Mapper to access Edgecore, register the Mapper, and report device status, utilizing a common Unix Domain Socket (UDS) at `/etc/kubeedge/dmi.sock`.
  * The **downstream interface** is for Edgecore to access the Mapper to perform CRUD (Create, Read, Update, Delete) operations on devices, using a UDS specific to each Mapper.


