---
title: Mapper
sidebar_position: 1
---
## Mapper
Mapper 是 KubeEdge 和设备之间的管理器。它可以设置/获取设备数据，获取并报告设备状态。 KubeEdge使用Device Controller、Device Twin和
Mapper来控制设备。Device Controller位于云端，它使用CRD来定义和控制设备。 Device Twin位于边缘侧，它能够存储来自Mapper的
值/状态并在Mapper与Device Controller之间传递消息。同时，Device Twin中的DMI用于向云端注册Mapper并把Device Model与Device Instance传递给Mapper。

目前，Mapper负责管理使用**某种协议**的设备。DMI 会将使用相同协议的Device Model与Device Instance放入列表中，并将它们发送到该协议的Mapper。未来我们将
探索两个或多个具有相同协议的Mapper在同一节点上运行的可能性。

### 架构图
![mapper](/img/device/mapper.png)

### 创建一个Mapper
用户能够便捷的通过 **[Mapper-Framework](../../developer/mapper-framework)** 创建自己的Mapper。

你可以按照 **[指南](../../developer/mappers#how-to-create-your-own-mappers)** 来创建自己的Mapper。





