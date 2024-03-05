---
title: Device Management Interface
sidebar_position: 1
---

## DMI
Device Management Interface(DMI) integrates the device management interface and optimizes the device management capability of KubeEdge. 
It is the goal of KubeEdge DMI that builds a cloud native device twin management platform which covers device management, device operation and device data management.
DMI defines a unified connection entrance between EdgeCore and Mapper, and EdgeCore and Mapper implement the upstream data flow and downstream data flow respectively,
At the same time, DMI decouples device management plane and device data plane , allowing device management plane to only carry the life cycle 
management of the device itself, while device data plane is directly provided to data consumer applications through microservices.
Under such an architecture, device data is pushed directly from the data plane and does not necessarily need to be pushed to the cloud. 
This allows the cloud-edge channel to transmit only a small amount of management plane information, reducing the possibility of cloud-edge communication congestion.


### Architecture
![DMI](/img/device/DMI.png)

### Device management and data management in DMI
The picture above is the design diagram of DMI device management and data management. The yellow line is the 
device management process and the blue line is the data management process.

In the architectural design of DMI, the device management plane mainly includes the device's metadata, 
device attributes, configuration, status, life cycle, etc. It is characterized by being relatively stable. 
After creation, there are fewer updates of information except status reporting, and it is closer to the Pod. 
Users can maintain the life cycle of Device through the cloud Kubernetes API just like accessing Pod, while minimizing the additional data transmission overhead caused by 
device management.

In DMI design, the device provides data services to device data consumers in a cloud-native manner. Device data access under 
the DMI framework supports multiple scenarios and is more flexible. The above figure lists several main data access 
methods, including push data and pull data, etc. The details are as follows:
1. Mapper pushes data to cloud/edge applications by configuring the destination address.
2. Mapper pushes data to cloud/edge databases by configuring the destination address.
3. Users applications actively pull device data through the API.
4. Mapper pushes device data to the cloud through the cloud edge channel

### DMI interface definition
DMI interface definition refers to [DMI interface](https://github.com/kubeedge/kubeedge/blob/master/pkg/apis/dmi/services.go)
The current version of DMI interface is defined in gRPC proto.  
You can use the generate-dmi-proto [script](https://github.com/kubeedge/kubeedge/blob/master/hack/generate-dmi-proto.sh) to create the corresponding gRPC-go code.