---
title: Device CRDs
sidebar_position: 3
---
KubeEdge supports device management with the help of Kubernetes [CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) and Device Mapper corresponding to the device being used.
We currently use Device Model and Device Instance to define the device.

## Notice
Device CRDs are updated from v1alpha2 to v1beta1 in release v1.15.
It is **not** compatible with v1alpha1 and v1alpha2.
Details can be found [device-crd-v1beta1](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd-v1beta1.md).

## Device Model

A `device model` describes the device properties exposed by a type of devices.
A device model is a `Physical model` which constrains the properties and parameters of physical devices.

### Device Model Sample
A sample device model like below. For complete Device Model definition, you can refer to [device-model](https://github.com/kubeedge/kubeedge/blob/master/build/crds/devices/devices_v1beta1_devicemodel.yaml).
```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: DeviceModel
metadata:
  name: beta1-model
spec:
  properties:
    - name: temp
      description: beta1-model
      type: INT
      accessMode: ReadWrite
      maximum: "100"
      minimum: "1"
      unit: "Celsius"
  protocol: modbus
```
In the above example, a device model named beta1-model is defined, which uses the modbus protocol and 
defines a device attribute named temp, whose data type is int. 
In addition, the access method, value range and unit of the device attribute are also defined.

## Device Instance

A `device instance` represents an actual device object.

The device spec is static, including device properties list, it describes the details of each property, including its name, type, access method.

### Device Instance Sample
A sample device instance like below, For complete Device Instance definition, you can refer to [device-instance](https://github.com/kubeedge/kubeedge/blob/master/build/crds/devices/devices_v1beta1_device.yaml)
```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: Device
metadata:
  name: beta1-device
spec:
  deviceModelRef:
    name: beta1-model
  nodeName: worker-node1
  properties:
    - name: temp
      collectCycle: 10000000000  # The frequency of reporting data to the cloud, once every 10 seconds
      reportCycle: 10000000000   # The frequency of data push to user applications or databases, once every 10 seconds
      reportToCloud: true
      desired:
        value: "30"
      pushMethod:
        mqtt:
          address: tcp://127.0.0.1:1883
          topic: temp
          qos: 0
          retained: false
        dbMethod:
          influxdb2:
            influxdb2ClientConfig:
              url: http://127.0.0.1:8086
              org: test-org
              bucket: test-bucket
            influxdb2DataConfig:
              measurement: stat
              tag:
                unit: temperature
              fieldKey: beta1test
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
      ip: 172.17.0.3
      port: 1502

```

In the above example, a device named beta1-device is defined, the model associated with it is beta1-model, 
and the node where the device runs is worker-node1. It defines device properties in the spec.properties field, 
including message reporting frequency, message push method (spec.properties.pushMethod), 
and parameters required to access the device (spec.properties.visitors). In addition, the protocol used 
by the device is defined in the spec.protocol field. 

## Usage of Device CRD

The following are the steps to

1. Create a device model, execute in the cloud node.

    ```shell
    kubectl apply -f <path to device model yaml>
    ```

2. Create a device instance, execute in the cloud node.
    
    ```shell
    kubectl apply -f <path to device instance yaml>
    ```

