---
title: ServiceBus
sidebar_position: 6
---
## 概述
ServiceBus 是一个 HTTP 客户端，用于与 HTTP 服务器 （REST） 交互，为云组件提供 HTTP 客户端功能，以访问在边缘运行的 HTTP 服务器。

该设计与 EventBus 的设计相似。

EventBus 用于通过 MQTT 与在边缘上运行的应用程序进行通信。同样，ServiceBus 用于通过 HTTP 与在边缘上运行的应用程序进行通信。

## 操作
- Cloud 通过 CloudHub 向 Edge 发送 beehive 消息。
- EdgeHub 接收消息并将其发送到 ServiceBus。
- ServiceBus 仅进行 HTTP 调用，并通过 EdgeHub 将响应发送到云。

![ServiceBus flowchart](/img/servicebus/servicebus-flowchart.png)