---
title: 公共组件
sidebar_position: 1
---

## Beehive 概览

Beehive 是一个基于 go-channels 的消息框架，用于 KubeEdge 模块之间的通信。注册到 beehive 的模块可以与其他 beehive 模块通信，只要知道其他 beehive 模块注册的名称或模块的组名称即可。

Beehive 支持以下模块操作：

1. 添加模块
2. 将模块添加到组
3. 清理（从 beehive 核心和所有组中删除模块）

Beehive 支持以下消息操作：

1. 发送消息到模块/组
2. 模块接受消息
3. 发送同步消息到模块/组
4. 为一个同步消息发送响应

## 消息格式

消息由三部分组成

  1. 头部：
      1. ID：消息 ID（字符串）
      2. ParentID：如果是同步消息的响应，则存在 parentID（字符串）
      3. TimeStamp：消息生成的时间（int）
      4. Sync：标志，指示消息是否为同步类型（bool）
  2. 路由：
      1. Source：消息的来源（字符串）
      2. Group：消息要广播到的组（字符串）
      3. Operation：在资源上执行的操作（字符串）
      4. Resource：要操作的资源（字符串）
  3. 内容：消息的内容（interface{}）

## 注册模块

1. 在启动 edgecore 时，每个模块都会尝试向 beehive core 注册自己。
2. Beehive core 维护一个名为 modules 的 map 对象，其中模块名称作为键，模块接口的实现作为值。
3. 当模块尝试向 beehive core 注册自己时，beehive core 会从已加载的 modules.yaml 配置文件中检查模块是否已启用。如果已启用，则将其添加到 modules map 中，否则将其添加到 disabled modules map 中。

## Channel Context 的结构字段

### （_重要，用于理解 beehive 操作_）

1. **channels：** channels 是一个 map，键(string 类型）是模块名称，值(message 的 chan 类型）是用于将消息发送到相应的模块的消息通道。
2. **chsLock：** channels map 的锁
3. **typeChannels：** typeChannels 是一个 map，键(string 类型）是组名称，值也是一个 map。作为值的 map 的键(string 类型）是组中每个模块的名称，值是对应模块的通道的 map。
4. **typeChsLock：** typeChannels map 的锁
5. **anonChannels：** anonChannels 是一个 map，键(string 类型）是 parentid，值是用于发送同步消息的响应的消息通道。
6. **anonChsLock：** anonChannels map 的锁

## 模块操作

### 添加模块

1. 添加模块操作首先创建一个新的消息类型的通道。
2. 然后将模块名称（键）和其通道（值）添加到 channel context 结构的 channels map 中。
3. 例如：添加 edged 模块

```go
coreContext.Addmodule(“edged”)
```
### 将模块添加到组

1. addModuleGroup 首先从 channels map 中获取模块的通道。
2. 然后将模块及其通道添加到 typeChannels map 中，其中键是组名，值是一个 map，其中键是模块名称，值是通道。
3. 例如：将 edged 添加到 edged 组。这里的第一个 edged 是模块名称，第二个 edged 是组名称。

```go
coreContext.AddModuleGroup(“edged”,”edged”)
 ```
### 清理

1. CleanUp 从 channels map 中删除模块，并从所有组（typeChannels map）中删除模块。
2. 然后关闭与模块关联的通道。
3. 例如：清理 edged 模块

```go
coreContext.CleanUp(“edged”)
```
## 消息操作

### 发送消息到模块

1. Send 从 channels map 中获取模块的通道。
2. 然后将消息放入通道。
3. 例如：发送消息到 edged 模块。

```go
coreContext.Send(“edged”,message)
```

### 发送消息到组

1. SendToGroup 从 typeChannels map 中获取对应组的所有模块（map）。
2. 然后遍历 map 并将消息发送到 map 中所有模块的通道。
3. 例如：发送消息到 edged 组中的所有模块。

```go
coreContext.SendToGroup(“edged”,message) # message 将发送到 edged 组中的所有模块。
```
### 模块接受消息

1. Receive 从 channels map 中获取模块的通道。
2. 然后等待消息到达该通道并返回消息。如果有错误，则返回错误。
3. 例如：接收 edged 模块的消息

```go
msg, err := coreContext.Receive("edged")
```
### 发送同步消息到模块

1. SendSync 接受 3 个参数（模块、消息和超时时间）。
2. SendSync 首先从 channels map 中获取模块的通道。
3. 然后将消息放入通道。
4. 然后创建一个新的消息通道，并将其添加到 anonChannels map 中，其中键是 messageID。
5. 然后等待消息（响应）在创建的 anonChannel 上接收，直到超时。
6. 如果在超时之前接收到消息，则返回消息和 nil 错误，否则返回超时错误。
7. 例如：发送同步消息到 edged，超时时间为 60 秒

```go
response, err := coreContext.SendSync("edged",message,60*time.Second)
```
### 发送同步消息到组

1. 从 typeChannels map 中获取该组的模块列表。
2. 创建一个消息通道，其大小等于该组中的模块数量，并将其作为值放入 anonChannels map，键为 messageID。
3. 将消息发送到所有模块的通道。
4. 每间隔一段时间(默认是 20 毫秒)，检查 anonChannel 的长度是否等于该组中的模块数量，等于则检查通道中的所有消息是否具有 parentID = messageID。如果没有，则返回错误，否则返回 nil。
5. 如果达到超时，则返回超时错误。
6. 例如：发送同步消息到 edged 组，超时时间为 60 秒

```go
err := coreContext.SendToGroupSync("edged",message,60*time.Second)
```

### 为一个同步消息发送响应

1. SendResp 用于发送同步消息的响应。
2. 响应消息的 parentID 需要是响应对应的接受消息的 messageID。
3. 当调用 SendResp 时，它会检查响应消息的 parentID 是否存在于 anonChannels 中。
4. 如果通道存在，则在该通道上发送消息（响应）。
5. 否则记录错误。
```go
coreContext.SendResp(respMessage)
```
