---
title: 设备管理
sidebar_position: 3
---

本部分涵盖了关于 KubeEdge 中 IoT 设备管理、Mapper 开发和设备 Mapper 接口 (DMI) 的常见问题。

## KubeEdge 是如何管理 IoT 设备的？

KubeEdge 采用云原生方式管理物理 IoT 设备。它引入了两个自定义资源定义 (CRD)：
1. **DeviceModel**：定义特定类型设备的静态属性、功能和协议（例如，特定型号的温度计或电机传感器）。
2. **Device**：表示与特定 `DeviceModel` 关联的设备实例，包含动态状态、运行状况和孪生属性（期望状态/实际状态）。

云端的控制器 (`DeviceController`) 负责调谐这些 CRD，KubeEdge 将这些元数据同步到边缘，并在边缘通过 **Mapper** 将基于 Kubernetes 的表示形式转换为物理设备指令。

## 什么是 Mapper？

**Mapper** 是运行在边缘的轻量级应用程序，充当 KubeEdge 与物理 IoT 设备之间的适配器。
其主要职责包括：
- 使用特定的 IoT 协议（如 Modbus、OPC-UA、蓝牙、MQTT、BACnet 等）与物理设备建立连接。
- 从物理设备拉取数据/遥测信息，并将其推送到 EdgeCore（具体而言是 `DeviceTwin` 或 `EventBus`）。
- 从 EdgeCore 接收控制命令（期望状态更新）并将其写入物理设备。

KubeEdge 为常见协议提供了预构建的 Mapper，同时也提供了一个开发自定义 Mapper 的框架。

## 什么是设备 Mapper 接口 (DMI)？

**设备 Mapper 接口 (DMI, Device Mapper Interface)** 是 KubeEdge 引入的标准化接口，旨在解耦 EdgeCore 与具体的设备 Mapper。类似于 Kubernetes 的容器运行时接口 (CRI) 或容器网络接口 (CNI)，DMI 定义了：
- **设备管理**：对设备进行声明式 CRUD（增删改查）操作。
- **数据交付**：将高频的设备遥测数据和状态从 Mapper 传递给 EdgeCore，或直接发送至云端/第三方应用程序。
- **控制命令**：通过标准的 gRPC 调用向设备发送操作指令。

DMI 简化了 Mapper 的开发流程，并使系统更加模块化，允许第三方 Mapper 直接接入 KubeEdge。

## 如何针对私有协议开发自定义 Mapper？

KubeEdge 提供了一个 **Mapper Framework** 用来简化自定义 Mapper 的开发流程：
1. **脚手架生成**：使用 KubeEdge Mapper Framework 工具生成项目骨架代码（通常使用 Go 语言）。
2. **实现协议驱动**：填充生成的驱动接口，编写与物理设备通信的实际代码（例如串口通信、自定义 UDP 套接字等）。
3. **配置 Mapper**：定义包含设备端点、寄存器以及同步频率的配置文件。
4. **以容器方式部署**：将 Mapper 构建为容器镜像，并像部署标准 Kubernetes Pod 一样将其部署到边缘节点。
