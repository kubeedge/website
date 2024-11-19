---
title: EventBus
sidebar_position: 2
---
## 概述
Eventbus 作为一个模块，负责在 MQTT 主题上发送/接收消息。

该模块支持3种模式：

- 内部MQTT模式 internalMqttMode
- 外部MQTT模式 externalMqttMode
- 内外皆有模式 bothMqttMode

## 主题(Topic)
EventBus 订阅以下 MQTT 主题：
```
- $hw/events/upload/#
- SYS/dis/upload_records
- SYS/dis/upload_records/+
- $hw/event/node/+/membership/get
- $hw/event/node/+/membership/get/+
- $hw/events/device/+/state/update
- $hw/events/device/+/state/update/+
- $hw/event/device/+/twin/+
```
注意：主题中的通配符

| 通配符  |  描述 |
|---|---|
| #  |  该通配符必须是主题中的最后一个字符，并且和当前层级和后续层级都是能匹配上的。 |
| +  |  该通配符在主题中必须精确匹配一个完整的层级对象。 |


## 流程图
### **1. eventbus 接收来自外部客户端的消息**
![eventbus sends messages from external client](/img/eventbus/eventbus-handleMsgFromClient.jpg)

### **2. eventbus 发送响应消息给外部客户端**

![eventbus sends response messages to external client](/img/eventbus/eventbus-handleResMsgToClient.jpg)

在内部模式下，流程几乎相同，只是 EventBus 本身作为消息代理器。
