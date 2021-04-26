---
draft: false
linktitle: CloudHub
menu:
  docs:
    parent: Cloud Components
    weight: 1
title: CloudHub
toc: true
type: docs
---
## CloudHub概览

CloudHub是Cloudcore的一个模块， 并且是Controller和Edge端之间的中介。 它同时支持基于Web-socket的连接以及[QUIC](https://quicwg.org/ops-drafts/draft-ietf-quic-applicability.html)协议访问。
Edgehub可以选择一种协议来访问Cloudhub。 CloudHub的功能是启用边缘与Controller之间的通信。

与边缘间的连接（通过EdgeHub模块）是通过websocket连接之上的HTTP完成的。
对于内部通信，它直接与Controller通信。
发送到CloudHub的所有请求与用于存储这个边缘节点的事件对象的通道一起存储在ChannelQ中。


CloudHub执行的主要功能是 :-

- 获取消息上下文并为事件创建ChannelQ
- 通过websocket创建http连接
- 服务websocket连接
- 从边缘读取消息
- 消息写入边缘
- 消息发布到Controller


### 获取消息上下文并为事件创建ChannelQ：

上下文对象存储在channelQ中。
为所有nodeID创建通道并将消息转换为事件对象然后事件对象将通过通道传递。

### 通过websocket创建http连接：

- 通过上下文对象中提供的路径加载TLS证书
- 根据TLS配置启动HTTP服务器
- 然后将HTTP连接升级为接收conn对象的websocket连接。
- ServeConn函数可服务所有传入连接

### 从边缘读取消息

- 首先为心跳间隔设置期限
- 然后读取来自连接的JSON消息
- 之后设置消息路由详细信息
- 再将消息转换为事件对象以进行云端内部通信
- 最后，事件发布给Controller

### 消息写入边缘

- 首先接收所有给定nodeID的事件对象
- 检查相同请求是否存在和节点的存活状态
- 事件对象转换为消息结构
- 设定写入期限。 然后将消息传递到websocket连接

### 消息发布到Controller

- 每次请求Websocket连接时，将带有时间戳，clientID和事件类型的默认消息发送到Controller
- 如果节点断开连接，则会抛出错误并将描述节点故障的事件发布到Controller

## 使用

可以通过以下三种方式配置CloudHub：

- **只开启websocket服务器**：点击 [这里](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#start-the-websocket-server-only) 查看详情。
- **只开启quic服务器**：点击 [这里](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#start-the-quic-server-only) 查看详情。
- **同时开启websocket和quic服务器**：点击 [这里](https://github.com/kubeedge/kubeedge/tree/master/docs/proposals/quic-design.md#start-the-websocket-and-quic-server-at-the-same-time) 查看详情
