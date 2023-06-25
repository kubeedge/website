---
title: Mappers 
id: mappers-index
---

## Overview
Mapper is an application that is used to connect and control devices. The responsibilities of mapper are as follows:

- Scan and connect to the device.
- Report the actual state of twin-attributes of device.
- Map the expected state of device-twin to actual state of device-twin.
- Collect telemetry data from device.
- Convert readings from device to format accepted by KubeEdge.
- Schedule actions on the device.
- Check health of the device.

## Types
Now we have,

- [bluetooth mapper](./bluetooth)

- [modbus mapper](./modbus)

- Opcua mapper

For other mappers, we could follow [this guide](https://github.com/kubeedge/mappers-go/blob/main/docs/UserGuideofCustomizedMapper.md) to genenrate your own mapper to control the edge devices.