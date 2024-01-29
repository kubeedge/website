---
title: Mapper
sidebar_position: 1
---
## Mapper
Mapper is a manager between KubeEdge and devices. It could set/get device data, 
get and report the device status. KubeEdge uses Device Controller, Device Twin and Mapper to control 
the devices. The Device Controller is on the cloud side, it uses CRD to define and control devices. 
The Device Twin is on the edge side, it stores the value/status from the Mapper and transfers the messages 
with Device Controller and Mapper. Meanwhile, DMI in the Device Twin is used for registing Mapper and transfer
Device Instance and Device Model to user Mapper.

Currently, a Mapper is responsible for managing devices that use a **certain protocol**.DMI will package the device 
and model using the same protocol into lists and send them to the Mapper of this protocol. In the future we will 
explore the possibility of two or more Mappers with same protocol running on same node.

### Architecture
![mapper](/img/device/mapper.png)

### Creating a Mapper
Users can easily generate their own Mapper through **[Mapper Framework](../../developer/mapper-framework)** 

You can follew the **[guide](../../developer/mappers#how-to-create-your-own-mappers)** to create your Mapper.





