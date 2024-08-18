---
title: EdgeHub
sidebar_position: 3
---
## 概览

EdgeHub 负责与云端的 CloudHub 组件进行交互。它可以使用 WebSocket 连接或使用 [QUIC](https://quicwg.org/ops-drafts/draft-ietf-quic-applicability.html) 协议连接到 CloudHub。
它支持同步云端资源更新、报告边缘端主机和设备状态更改等功能。

该模块充当边缘和云之间的通信链路，
它将从云端接收到的消息转发到边缘端的相应模块，反之亦然。

EdgeHub 主要功能包括：

- 保活
- 发布连接信息
- 路由到云端
- 路由到边缘端


## 保活

每间隔一个心跳周期，EdgeHub 都会向 CloudHub 发送保活消息或心跳。


## 发布连接信息

- 发布连接信息的主要职责是将和云的连接状态通知到其他 Beehive 组或 Beehive 模块。

- 他向所有组（metaGroup、twinGroup 和 busGroup）发送一个 Beehive 消息，通知他们云是否已连接或已断开。


## 路由到云端

路由到云端的主要职责是接收来自其他模块（通过 Beehive 框架）的要发送到云端的消息，
并通过 WebSocket 连接将这些消息发送到 CloudHub。

这个过程中涉及的主要步骤如下：

1. 不断地从 Beehive Context 接收消息
2. 将这些消息发送到 CloudHub
3. 如果接收到的消息是一个同步消息，则：

    3.1. 如果在 syncChannel 上收到响应，则它会创建一个 `map[string]chan`，其中包含以消息的 messageID 作为键的键值对

    3.2. 它等待一个心跳周期，在创建的通道上接收响应，如果在指定时间内没有在通道上收到任何响应，则认为超时。

    3.3. 在通道上收到的响应将使用 SendResponse() 函数发送回模块。

![Route to Cloud](/img/edgehub/route-to-cloud.png)

## 路由到边缘端

路由到边缘端的主要职责是接收来自云端（通过 WebSocket 连接）的消息，
并通过 Beehive 框架将这些消息发送到所需的组。

这个过程中涉及的主要步骤如下：

- 从 CloudHub 接收消息
- 检查消息的路由组是否存在。
- 检查它是否是 SendSync() 函数的响应。
- 如果不是响应消息，则将消息发送到所需的组
- 如果是响应消息，则将消息发送到 syncKeep 通道

![Route to Edge](/img/edgehub/route-to-edge.png)


## 用法

EdgeHub 可以配置为以下两种方式进行通信：

- **通过 WebSocket 协议**：点击[这里](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#edgehub-connect-to-cloudhub-through-websocket-protocol) 查看详情。
- **通过 QUIC 协议**：点击[这里](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#edgehub-connect-to-cloudhub-through-quic) 查看详情。
