---
title: Edged
sidebar_position: 1
---
## 概览

EdgeD 是负责管理 Pod 生命周期的边缘节点模块。它帮助用户在边缘节点部署容器化的工作负载或应用程序。这些工作负载可以执行任意操作，从简单地遥测数据处理到复杂地数据分析/机器学习推理。用户可以在云端使用 `kubectl` 命令行发出命令来启动工作负载。

通过容器运行时接口(CRI)，EdgeD 支持多个 OCI 兼容的容器运行时。有关如何配置 EdgeD 以使用其他运行时的更多信息，请参见 [KubeEdge 运行时配置](../../setup/prerequisites/runtime.md)。

众多模块协同工作实现 EdgeD 的功能。

![EdgeD Overall](/img/edged/edged-overall.png)

*Fig 1: EdgeD 功能集*

## Pod 管理

该模块负责处理 Pod 的添加、删除和修改。它还使用 Pod 状态管理器和 PLEG 跟踪 Pod 的健康状态。
其主要工作如下：

- 接收并处理来自 MetaManager 的 Pod 添加/删除/修改消息。
- 为 Pod 添加和删除事件创建各自独立的工作队列。
- 建立工作协程用于检查工作队列，执行 Pod 操作
- 为 ConfigMap 和 Secret 各自设置独立的缓存。
- 定期清理被遗弃的Pod

![Pod Addition Flow](/img/edged/pod-addition-flow.png)

*Fig 2: Pod 添加工作流*

![Pod Deletion Flow](/img/edged/pod-deletion-flow.png)

*Fig 3: Pod 删除工作流*

![Pod Updation Flow](/img/edged/pod-update-flow.png)

*Fig 4: Pod 更新工作流*

## Pod 生命周期事件生成器(Pod Lifecycle Event Generator, PLEG)

该模块帮助 EdgeD 监控 Pod 的状态。每隔一秒，该模块就使用存活探针和就绪探针更新 Pod 状态管理器中的每个 Pod 的信息。

![PLEG Design](/img/edged/pleg-flow.png)

*Fig 5: EdgeD 的 PLEG*

## EdgeD 的 CRI 支持

容器运行时接口(CRI) 是一种插件接口，使 EdgeD 能够使用多种容器运行时，如 Docker、containerd、CRI-O 等，而无需重新编译。有关如何配置 KubeEdge 以使用容器运行时的更多信息，请参见 [KubeEdge 容器运行时配置](../../setup/prerequisites/runtime.md)。

#### 为什么 EdgeD 需要 CRI？
支持多个容器运行时的 CRI 对 EdgeD 是必要的，这以便于：
+ 支持在资源受限的边缘节点上运行轻量级容器运行时，这些节点无法运行现有的 Docker 运行时。
+ 支持在边缘节点上运行多个容器运行时，如 Docker、containerd、CRI-O 等。

提供暂停容器和 IP 能力的 CNI 将在以后考虑支持。

![CRI Design](/img/edged/edged-cri.png)

*Fig 6: EdgeD 上的 CRI*

## Secret 管理

在 EdgeD 中，Secrets 被单独处理。对于添加、删除和修改等操作，都有单独的配置消息和接口。
使用这些接口，Secrets 被更新到缓存存储中。
下面的流程图解释了消息工作流。

![Secret Message Handling](/img/edged/secret-handling.png)

*Fig 7: EdgeD 中 Secret 消息的处理*

EdgeD 使用 MetaClient 模块从 MetaManager 获取 Secret。如果 EdgeD 查询一个尚未存储在 MetaManager 中的 Secret，对应的查询请求将被转发到云端。在返回包含 Secret 的响应之前，MetaManager 会将其存储在本地数据库中。对于相同的 Secret 键的后续查询将从数据库中检索，从而减少延迟。下面的流程图显示了如何从 MetaManager 和云端获取 Secret。它还描述了如何将 Secret 存储在 MetaManager 中。

![Query Secret](/img/edged/query-secret-from-edged.png)

*Fig 8: EdgeD 查询 Secret*

## 探针管理(Probe Management)

探针管理为 Pod 创建就绪(readiness)探针和存活(liveness)探针，以监视容器。就绪探针监测 Pod 是否已达到运行状态。存活探针通过监测 Pod 的健康状况，指示它们是否正常运行或已经宕机。
正如前面所述，PLEG 模块依赖探针管理模块。


## ConfigMap 管理
使用这些接口，ConfigMaps 被更新到缓存存储中。
The flow diagram below explains the message flow.
下面的流程图解释了消息工作流。

![ConfigMap Message Handling](/img/edged/configmap-handling.png)

*Fig 9: EdgeD 的 ConfigMap 消息处理工作流*

EdgeD 使用 MetaClient 模块从 MetaManager 获取 ConfigMaps。如果 EdgeD 查询一个尚未存储在 MetaManager 中的 ConfigMap，对应的查询请求将被转发到云端。在返回包含 ConfigMap 的响应之前，MetaManager 会将其存储在本地数据库中。对于相同的 ConfigMap 键的后续查询将从数据库中检索，从而减少延迟。下面的流程图显示了如何从 MetaManager 和云端获取 ConfigMap。它还描述了如何将 ConfigMap 存储在 MetaManager 中。

![Query Configmaps](/img/edged/query-configmap-from-edged.png)

*Fig 10: EdgeD 查询 ConfigMap*

## 容器回收（Container GC)

容器垃圾收集器是一个 EdgeD 协程，该协程被每分钟唤醒一次，并根据指定的容器垃圾收集策略清除死掉的容器。
容器垃圾收集策略由三个变量决定，这些变量可以由用户定义：
+ `MinAge` 是容器可以被垃圾收集的最小年龄，如果为零则没有限制。
+ `MaxPerPodContainer` 是任何单个 Pod（UID，容器名称）能被允许拥有的最大死掉容器数量，如果小于零则没有限制。
+ `MaxContainers` 是死掉容器总和的最大数量，如果小于零则没有限制。通常，最老的容器首先被删除。

## 镜像回收(Image GC)

镜像垃圾收集器是一个 EdgeD 协程，每 5 秒唤醒一次，并根据设置的策略收集关于磁盘使用情况的信息。
镜像垃圾收集策略考虑了两个因素，`HighThresholdPercent` 和 `LowThresholdPercent`。磁盘使用量超过高阈值将触发垃圾收集，尝试删除未使用的镜像，直到低阈值被满足。最近未使用的镜像首先被删除。

## 状态管理器(Status Manager)

状态管理器是一个独立的 EdgeD 协程，每 10 秒收集一次 Pod 的状态，并使用 MetaClient 接口将这些信息转发到云端。

![Status Manager Flow](/img/edged/pod-status-manger-flow.png)

*Fig 11: 状态管理器工作流*

## 卷管理(Volume Management) 

卷管理器作为一个 EdgeD 协程运行，根据边缘节点上调度的 Pod，提取哪些卷需要被挂载/卸载/卸载/分离的信息。

在启动 Pod 之前，将挂载 Pod 规范中引用的所有指定卷，直到完成挂载操作，其他操作都会被阻塞。

## MetaClient

Metaclient 是 EdgeD 的 MetaManager 接口。它帮助 EdgeD 从 MetaManager 或云端获取 ConfigMaps 和 Secret 详情。
它还向 MetaManager 发送同步消息、节点状态和 Pod 状态到云端。
