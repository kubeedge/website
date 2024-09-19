---
title: MetaManager
sidebar_position: 5
---
## 概述
MetaManager 是 edged 和 edgehub 之间的消息处理器。它还负责在轻量级数据库（SQLite）中存储/检索元数据。

Metamanager 有下列操作：
  - 插入
  - 更新
  - 删除
  - 查询
  - 响应
  - 节点连接
  - 元数据同步

## 插入

创建新对象时，将通过云接收 `插入` 操作消息。例如，通过云创建/部署的新用户应用程序 Pod。

![Insert Operation](/img/metamanager/meta-insert.png)

edgehub 通过云接收 `插入` 操作请求。它将请求分派给 MetaManager，其将此消息保存在本地数据库中。然后，MetaManager 向 edged 发送异步消息。edged 处理插入请求，例如通过启动 pod 并在消息中填充响应。MetaManager 检查消息，提取响应并将其发送回 Edged，Edge 将其发送回云端。

## 更新
`更新` 操作可以发生在云/边缘的对象上。

更新消息流类似于插入操作。此外，metamanager 会检查正在更新的资源是否已在本地更改。只有存在差异的时候，更新的数据才会被存储到本地，并且更新消息被传递给 edged ，响应被返回给云端。

![Update Operation](/img/metamanager/meta-update.png)

## 删除
当云端有对象（例如 Pod）被`删除`时，删除操作会被触发

![Delete Operation](/img/metamanager/meta-delete.png)

## 查询
`查询操作` 使您可以在边缘本地查询元数据，也可以从云中查询一些远程资源（如 maps/secrets）。Edged 从 metamanager 查询此元数据，metamanager 进一步处理本地/远程查询处理，并将响应返回给 edged。Message 资源可以根据分隔符 '/' 分为 3 个部分 （resKey、resType、resId）。

![Query Operation](/img/metamanager/meta-query.png)

## 响应
对于在云/边缘执行的任何操作，都会返回 `响应`。上述的操作显示了来自云或本地边缘的响应流。

## 节点连接
从 edgeHub 接收 `节点连接` 操作消息，提供有关云连接状态的信息。MetaManager 在内存中跟踪此状态，并将其用于某些操作，例如向云执行远程查询。

## 元数据同步
`元数据同步` 操作消息由 metamanager 定期发送，以同步在边缘节点上运行的 pod 的状态。同步间隔可在 conf/edgecore.yaml 中配置（默认为 60 秒）。

```yaml
meta:
  sync:
    podstatus:
      interval: 60 #seconds
```
