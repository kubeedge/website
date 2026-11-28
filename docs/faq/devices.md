---
title: Device Management
sidebar_position: 3
---

## How does KubeEdge manage devices?

KubeEdge represents devices with Kubernetes custom resources. A `DeviceModel` describes a device type, and a `Device` represents an instance. The examples below use the current `devices.kubeedge.io/v1beta1` API. Device CRDs from `v1alpha2` are not compatible with `v1beta1`; see the [Device CRD guide](../concept/device/device_crds.md) before migrating existing resources.

A model can describe a temperature property like this:

```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: DeviceModel
metadata:
  name: temperature-model
spec:
  protocol: modbus
  properties:
    - name: temperature
      description: Temperature in degrees Celsius
      type: INT
      accessMode: ReadOnly
```

A `Device` references that model and selects the node it should run on. Mapper-specific `visitors` and protocol settings depend on the actual device and mapper, so fill them from that mapper's documentation:

```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: Device
metadata:
  name: temperature-sensor-01
spec:
  deviceModelRef:
    name: temperature-model
  nodeName: edge-node-01
  properties:
    - name: temperature
      collectCycle: 10000000000  # 10 seconds
      reportToCloud: true
      desired:
        value: "0"
      visitors:
        protocolName: modbus
        configData:
          register: "HoldingRegister"
          offset: 2
          limit: 1
          scale: 1
          isSwap: true
          isRegisterSwap: true
  protocol:
    protocolName: modbus
    configData:
      ip: 192.0.2.10
      port: 1502
```

The example leaves device-specific connection details empty because they cannot be inferred. Replace these placeholders with valid `configData` for the mapper and device before applying the resource. The full field definitions and examples are in the [Device CRD guide](../concept/device/device_crds.md).

## What is a Mapper?

A Mapper connects a device to KubeEdge. It communicates with the physical device, reads telemetry, and can apply desired values for supported properties. Mapper configuration and supported protocols vary. See the [Mapper guide](../concept/device/mapper.md) and [Mapper Framework guide](../developer/mapper-framework.md) to learn about Mapper responsibilities and build a custom mapper.

## What is DMI?

DMI, the Device Mapper Interface, is the interface used for communication between the device-management components and Mappers. For details, see the [Mapper guide](../concept/device/mapper.md).

## My device is not appearing as expected

Check that the Device and DeviceModel resources were accepted, that the Device references the right model and edge node, and that the mapper for its protocol is running. Use Kubernetes to inspect the resources and mapper logs:

```shell
kubectl get devicemodel,device -A
kubectl describe device <device-name> -n <namespace>
kubectl get pods -A
kubectl logs -n <namespace> <mapper-pod-name>
```

For an EdgeCore installation managed by systemd, check its service and logs with:

```shell
systemctl status edgecore
journalctl -u edgecore.service -xe
```

## How do I change a device's desired property value?

The desired value is part of the Device resource's `spec.properties` entry in the current `v1beta1` API. Edit the resource through the normal Kubernetes workflow and set the desired value for the named property. Before changing it, confirm the property name, value format, and mapper behavior in the DeviceModel and mapper documentation. See the [Device CRD guide](../concept/device/device_crds.md) for the API structure.

## Can I test device management without hardware?

KubeEdge documents a virtual-device mapper as an example. Use the [Mapper Framework guide](../developer/mapper-framework.md) to find its current setup and avoid assuming that an arbitrary fake mapper follows the same behavior as a production device mapper.

## Can several devices use the same edge node?

A Device resource can name its target edge node with `spec.nodeName`. More than one Device can target the same node, provided the node and each mapper have enough resources to handle them. Mapper behavior and capacity depend on the protocol and implementation.
