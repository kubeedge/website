---
draft: false
linktitle: Device Manager
menu:
docs:
parent: developer guide
weight: 2
title: Device Manager
toc: true
type: docs
---
KubeEdge 支持基于 Kubernetes [CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions)的 Device Mapper 管理。
我们目前在设备控制器和设备孪生模块的帮助下，从云端管理设备，并在边缘节点和云端之间同步设备更新。

## 注意
Device Management 更新到 v1alpha1 到 v1alpha2 在 release v1.4。
它**不是**兼容的在 v1alpha1 到 v1alpha2版本。
详情可以参考[device-management-enhance](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/device-management-enhance.md)

## Device Model

一个 `Device model` 资源描述了 Device 的属性比如说 'temperature' 或者 'pressure'。一个 Device model 就像是一个可以重复利用的 Device 模板，实现了对大量的 Device 资源进行创建和管理。

详细的 device model 的定义介绍可以参考 [文档](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/device-management-enhance.md#modifications-on-device-model-types)。

### Device Model 样例
一个 device model 类型样例,
```yaml
apiVersion: devices.kubeedge.io/v1alpha2
kind: DeviceModel
metadata:
 name: sensor-tag-model
 namespace: default
spec:
 properties:
  - name: temperature
    description: temperature in degree celsius
    type:
     int:
      accessMode: ReadWrite
      maximum: 100
      unit: degree celsius
  - name: temperature-enable
    description: enable data collection of temperature sensor
    type:
      string:
        accessMode: ReadWrite
        defaultValue: 'OFF'
```


## Device Instance

一个 `device`真实的资源代表了抽象的 Device 的元素。它就像是 `device model` 资源的实例化并且定义了Device 哪些资源可以被访问. 设备规格是静态的，而设备状态包含动态变化的数据，如设备属性的期望状态和设备报告的状态。

详细的 device instance 的定义可以参考 [文档](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/device-management-enhance.md#modifications-on-device-instance-types).

### Device Instance Sample
一个 device instance 类型样例,
```yaml
apiVersion: devices.kubeedge.io/v1alpha2
kind: Device
metadata:
  name: sensor-tag-instance-01
  labels:
    description: TISimplelinkSensorTag
    manufacturer: TexasInstruments
    model: CC2650
spec:
  deviceModelRef:
    name: sensor-tag-model
  protocol:
    modbus:
      slaveID: 1
    common:
      com:
        serialPort: '1'
        baudRate: 115200
        dataBits: 8
        parity: even
        stopBits: 1
  nodeSelector:
    nodeSelectorTerms:
    - matchExpressions:
      - key: ''
        operator: In
        values:
        - node1
  propertyVisitors:
    - propertyName: temperature
      modbus:
        register: CoilRegister
        offset: 2
        limit: 1
        scale: 1
        isSwap: true
        isRegisterSwap: true
    - propertyName: temperature-enable
      modbus:
        register: DiscreteInputRegister
        offset: 3
        limit: 1
        scale: 1.0
        isSwap: true
        isRegisterSwap: true
status:
  twins:
    - propertyName: temperature
      reported:
        metadata:
          timestamp: '1550049403598'
          type: int
        value: '10'
      desired:
        metadata:
          timestamp: '1550049403598'
          type: int
        value: '15'
```
### 自定义协议和自定义设置
从 KubeEdge v1.4 开始, KubeEdge 支持自定义协议和自定义设置参考如下，

- 自定义协议

```yaml
  propertyVisitors:
    - propertyName: temperature
      collectCycle: 500000000
      reportCycle: 1000000000
      customizedProtocol:
        protocolName: MY-TEST-PROTOCOL
        configData:
          def1: def1-val
          def2: def2-val
          def3:
            innerDef1: idef-val
```

- 自定义的值

```yaml
  protocol:
    common:
      ...
      customizedValues:
        def1: def1-val
        def2: def2-val
```

### Data Topic
从 KubeEdge v1.4 开始, KubeEdge 添加了 data 部分在 device spec.
Data section 描述了一系列的资源列表，它们将会被 mapper 发送给 MQTT代理，并且在边缘端得到处理。

```yaml
apiVersion: devices.kubeedge.io/v1alpha1
kind: Device
metadata:
    ...
spec:
  deviceModelRef:
    ...
  protocol:
    ...
  nodeSelector:
    ...
  propertyVisitors:
    ...
  data:
    dataTopic: "$ke/events/device/+/data/update"
    dataProperties:
      - propertyName: pressure
        metadata:
          type: int
      - propertyName: temperature
        metadata:
          type: int
```

## Device Mapper

Mapper 是一个用于连接和控制设备的应用程序。 Mapper 的职责如下:
1) 扫描和连接 device.
2) 报告真实设备的属性数据 of device.
3) 映射设备孪生的 expected 状态 到真实的状态.
4) 从 device 收集数据.
5) 把从 device 读取到的数据转化成 KubeEdge 能接收的格式.
6) 调度 device 上的操作.
7) 检查 device 的健康状态.

Mapper 可以被定义成一些特殊的协议例如， Bluetooth, Zigbee,等等或者更多自定义的协议。

Mapper 更多详细的设计可以参考[文档](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/mapper-design.md#mapper-design)

一个支持 bluetooth 协议的 mapper 样例可以参考[文档](https://github.com/kubeedge/mappers-go/tree/main/mappers/ble)


## 使用 Device CRD

你可以尝试跟着这些步骤来做:

1. 创建一个 device model 资源在云端节点。

    ```shell
            kubectl apply -f <path to device model yaml>
    ```

2. 创建 device instance 资源在云端节点。

    ```shell
           kubectl apply -f <path to device instance yaml>
    ```

   Note:创建一个device instance 也会要求你创建一个包含了 device 信息的 config map 类型的文件用于 mapper 的需要。
   这个 config map 名字的格式: device-profile-config-< edge node name >. 更新 config map 是通过在 device controller 的内部进行。

3. 运行 mapper 和对应的映射程序。

4. 编辑在第二步骤中的 device instance 的 yaml 配置文件来改变设备的状态 。这个改变会通过 device controller 反映到边缘和设备孪生模块。
   更新了设备孪生的边缘设备之后， mapper 可以操作 device。

5. 设备孪生报告的值会通过 mapper 映射到边缘，数据将会通过 device controller 同步到云端。 用户可以查看云端节点 device 的元数据文件看到更新的状态。

```shell
    Note: 一些 device model 和 device instance 支持的样例可以参考 $GOPATH/src/github.com/kubeedge/kubeedge/build/crd-samples/devices
```
