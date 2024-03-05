---
title: Device CRDs
sidebar_position: 3
---

KubeEdge 借助 Kubernetes [CRD](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) 和与设备对应的 Device Mapper 来支持设备管理。
目前我们使用Device Model和Device Instance来定义设备。

## 注意

在 v1.15 版本中，设备 CRD 从 v1alpha2 更新为 v1beta1，它与 v1alpha1 和 v1alpha2 **不**兼容。
详细信息可以参见[device-crd-v1beta1](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd-v1beta1.md)。

## 设备模型

设备模型（Device Model）描述了一类设备公开的设备属性。设备模型是一种“物理模型”，它约束物理设备的属性和参数。

### 设备模型示例
如下所示是设备模型的示例。完整的设备模型定义，可以参考[device-model](https://github.com/kubeedge/kubeedge/blob/master/build/crds/devices/devices_v1beta1_devicemodel.yaml)。
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
在上面的例子中，定义了一个名为 beta1-model 的设备模型，该模型使用 modbus 协议，定义了一个名为temp的设备属性，其数据类型为int。
此外，还定义了设备属性的访问方式、取值范围和单位。

## 设备实例

设备实例（Device Instance）代表一个实际的设备对象。

设备实例的spec字段是静态的，包括设备属性列表，它描述了每个属性的详细信息，包括其名称、类型、访问方法。

### 设备实例示例
如下所示为设备实例的一个示例，有关完整的设备实例定义，您可以参考 [device-instance](https://github.com/kubeedge/kubeedge/blob/master/build/crds/devices/devices_v1beta1_device.yaml)。
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

上面的例子中，定义了一个名为 beta1-device 的设备，与之关联的设备模型为beta1-model，设备运行的节点为worker-node1。
示例文件在spec.properties字段中定义设备属性，包括消息上报频率、消息推送方式（spec.properties.pushMethod）、以及
访问设备所需的参数（spec.properties.visitors）。此外，设备使用的协议在spec.protocol字段中定义。

## 设备CRD的使用

步骤如下：

1. 创建设备模型，在云端节点执行。

    ```shell
    kubectl apply -f <path to device model yaml>
    ```

2. 创建设备实例，在云端节点执行。
    
    ```shell
    kubectl apply -f <path to device instance yaml>
    ```

