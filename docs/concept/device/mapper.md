---
title: Mapper
sidebar_position: 1
---
## Mapper
Mapper is an interface between KubeEdge and devices. It could set/get device data, 
get and report the device status. KubeEdge uses device controller, device twin and mapper to control 
the devices. The device controller is on the cloud side, it uses CRD to define and control devices. 
The device twin is on the edge side, it stores the value/status from the mapper and transfers the messages 
with device controller and mapper. Meanwhile, DMI in the device twin is used for registing mapper and transfer
device instance and device model to user mapper.

Currently, a mapper is responsible for managing devices that use a **certain protocol**.DMI will package the device 
and model using the same protocol into lists and send them to the mapper of this protocol. In the future we will 
explore the possibility of two or more mappers with same protocol running on same node.

### Architecture
![mapper](/img/device/mapper.png)

### Creating a Mapper
Users can easily generate their own mapper through **[mapper-framework](../../developer/mapper-framework)** 

You can follew the **[guide](../../developer/mappers#how-to-create-your-own-mappers)** to create your mapper.





