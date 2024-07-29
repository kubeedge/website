---
title: CloudHub
sidebar_position: 1
---
## CloudHub 概览

CloudHub 是 cloudcore 的一个模块，其作为媒介实现边缘和控制器之间的通信。它支持基于 WebSocket 的连接和 [QUIC](https://quicwg.org/ops-drafts/draft-ietf-quic-applicability.html) 协议两种访问方式，EdgeHub 可以选择其一来访问 CloudHub。

通过 EdgeHub 模块与边缘进行连接是通过 WebSocket 上的 HTTP 连接实现的。而云上的内部通信则是直接与控制器通信。所有发送到 CloudHub 的请求都是上下文对象，这些对象与标记其节点ID的事件对象的映射通道一起存储在 channelQ 中。


CloudHub 执行的主要功能有：

- 获取消息上下文并为事件创建 ChannelQ
- 通过 WebSocket 创建 HTTP 连接
- 保持 WebSocket 连接
- 从读取边缘信息
- 向边缘写入信息
- 向控制器发布信息


### 获取消息上下文并为事件创建 ChannelQ:

上下文对象存储在 channelQ 当中。在所有 nodeID channel 都被创建，消息被转化为事件对象之后，通过该 channel 传递事件对象。

### 通过 WebSocket 创建 HTTP 连接:

- 通过上下文对象提供的路径加载 TLS 证书
- 使用 TLS 配置启动 HTTP 服务器
- 接着 HTTP 被更新为接收 conn 对象的 WebSocket 连接
- ServeConn 函数负责服务所有传入连接

### 从读取边缘信息:

- 首先为一个 keepalive 间隔设置一个截止时间
- 接着从连接中读取 JSON 信息
- 等待所有消息路由的细节都设置完成
- 将消息转化为用于云内部通信的事件对象
- 最后将事件发布给控制器

### 向边缘写入信息:

- 首先接收所有带有给定 nodeID 的事件对象
- 检查是否存在相同的请求以及节点是否存活
- 将事件对象转化为消息结构体
- 设置写入截至期后将消息传递给 WebSocket 连接

### 向控制器发布信息:

- 每次向 WebSocket 连接发送请求时都会向控制器发送一个包含时间戳、clientID 和事件类型的默认消息。
- 若节点断连则会抛出错误，并向控制器发布一个描述该节点失败的事件。

## 用法

可通过下述三种方式配置 CloudHub：

- **仅启动 WebSocket**： 点击[此处](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#start-the-websocket-server-only)了解详情。
- **仅启动 QUIC 服务器**： 点击[此处](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#start-the-quic-server-only)了解详情。
- **同时启动 WebSocket 和 QUIC 服务器**： 点击[此处](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#start-the-websocket-and-quic-server-at-the-same-time)了解详情。
