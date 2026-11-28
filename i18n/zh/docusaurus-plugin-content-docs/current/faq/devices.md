---
title: 设备管理
sidebar_position: 3
---

## KubeEdge 如何管理设备？

KubeEdge 通过 Kubernetes 自定义资源管理设备。`DeviceModel` 描述一种设备类型，`Device` 表示一个设备实例。以下示例使用当前的 `devices.kubeedge.io/v1beta1` API。`v1alpha2` Device CRD 与 `v1beta1` 不兼容；迁移现有资源前请参阅 [Device CRD 指南](../concept/device/device_crds.md)。

DeviceModel 可以这样描述温度属性：

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

`Device` 引用模型并指定目标节点。Mapper 所需的 `visitors` 和协议配置取决于设备与 Mapper，请依据对应 Mapper 文档填写：

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
      collectCycle: 10000000000
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

示例中的 IP、端口和寄存器设置仅作占位说明，应用前请替换为实际设备参数。完整字段定义和示例见 [Device CRD 指南](../concept/device/device_crds.md)。

## 什么是 Mapper？

Mapper 负责连接设备与 KubeEdge。它与实际设备通信，读取遥测数据，并可为受支持的属性应用期望值。Mapper 的配置和支持的协议因实现而异。请参阅 [Mapper 指南](../concept/device/mapper.md)和 [Mapper Framework 指南](../developer/mapper-framework.md)。

## 什么是 DMI？

DMI（Device Mapper Interface，设备 Mapper 接口）是设备管理组件与 Mapper 之间用于通信的接口。详情请参阅 [Mapper 指南](../concept/device/mapper.md)。

## 设备未按预期出现

检查 Device 和 DeviceModel 资源是否已被接受、Device 是否引用了正确的模型和边缘节点，以及对应协议的 Mapper 是否在运行。可使用 Kubernetes 检查资源和 Mapper 日志：

```shell
kubectl get devicemodel,device -A
kubectl describe device <device-name> -n <namespace>
kubectl get pods -A
kubectl logs -n <namespace> <mapper-pod-name>
```

如果 EdgeCore 由 systemd 管理，可检查服务和日志：

```shell
systemctl status edgecore
journalctl -u edgecore.service -xe
```

## 如何更改设备的期望属性值？

在当前 `v1beta1` API 中，期望值位于 Device 资源 `spec.properties` 对应属性项内。通过常规 Kubernetes 工作流编辑资源并设置该属性的期望值。修改前，请确认 DeviceModel 和 Mapper 文档中记录的属性名、值格式及 Mapper 行为。API 结构见 [Device CRD 指南](../concept/device/device_crds.md)。

## 没有实体硬件时可以测试设备管理吗？

KubeEdge 文档提供了 Mapper Framework 和设备模拟的示例。请参阅 [Mapper Framework 指南](../developer/mapper-framework.md)了解相关内容，不要假定任意模拟 Mapper 与生产设备 Mapper 的行为相同。

## 多个设备能否使用同一边缘节点？

Device 资源可通过 `spec.nodeName` 指定目标边缘节点。多个 Device 可以指向同一节点，但节点和各 Mapper 必须有足够资源；实际容量取决于协议和具体实现。
