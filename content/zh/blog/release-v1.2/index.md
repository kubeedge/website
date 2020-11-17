---
authors:
- Fei Xu
- Kevin Wang
categories:
- General
- Announcements
date: 2020-02-15
draft: false
lastmod: 2020-02-15
summary: KubeEdge v1.2 现已发布
tags:
- KubeEdge
- kubeedge
- 边缘计算
- kubernetes 边缘计算
- K8S 边缘计算
- 边缘计算平台
- release v1.2
- v1.2
title: KubeEdge v1.2 现已发布
---
**KubeEdge** 是一个开源的边缘计算平台，它在Kubernetes原生的容器编排和调度能力之上，实现了 **云边协同**、**计算下沉**、**海量边缘设备管理**、**边缘自治** 等能力。
在追求边缘极致轻量化的同时，结合云原生生态的众多优势，解决当前智能边缘领域面临的挑战。

## **KubeEdge 1.2发布：全面升级云边协同传输的可靠性！**

2月7日，KubeEdge社区发布了全新的特性版本v1.2.0。
本次发布的1.2版本迎来可靠性方面的重大升级，包含：**增强云边协同传输的可靠性**、**Component Config API**、**自动注册边缘节点到云端**、**Kubernetes v1.17.1支持**，以及30处问题修复。

完整的更新日志请见：https://github.com/kubeedge/kubeedge/blob/release-1.2/CHANGELOG-1.2.md

以下是KubeEdge v1.2关键新特性介绍。

{{% alert note %}}
获取KubeEdge最新版本：[Release v1.2](https://github.com/kubeedge/kubeedge/releases/tag/v1.2.0)
{{% /alert %}}

{{% alert note %}}
KubeEdge安装使用说明：请见[文档](https://github.com/kubeedge/kubeedge#usage)
{{% /alert %}}


### 增强云边协同传输的可靠性
在边缘计算场景下，边缘的网络通常是不稳定的，这将导致云边的网络连接频繁断开，在云边协同通信时存在丢失数据的风险。
在针对边缘网络不稳定场景优化的基础上，KubeEdge v1.2版本做了以下增强：

1. **增加业务层消息发送的校验机制。** 云端发送状态同步消息到边缘时，边缘在接收并且持久化成功后，会回复状态同步成功的ACK消息给云端。如果云端未收到边缘状态同步成功的消息回复，则由业务层代码触发重传机制，重新进行状态同步。

2. **持久化云边协同消息状态。** 在云和边缘状态同步的过程中，云端会实时记录每个边缘节点同步成功的最新消息版本号（ResourceVersion），并以CRD的形式持久化保存到K8s中。该机制可以保证在边际场景下云端故障或者边缘离线重启后消息发送的顺序和连续性，避免重发旧消息引起云边状态不一致问题。

3. **周期性检查同步云边数据，保持一致性** 在前两步的基础上，KubeEdge又在云端CloudCore中添加了新的模块SyncController，它主要负责周期性检查个边缘节点的同步状态，对比K8s中资源的信息，将不一致的状态同步到边缘，确保云边状态的最终一致性。

工作机制详见：
https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/reliable-message-delivery.md

### Component Config API

KubeEdge v1.2版本的另一项重要改进是将CloudCore、EdgeCore、EdgeSite等组件的所有配置项结构化，统一使用K8s原生风格的Component Config API定义，按API版本形式管理后续演进，提供历史兼容支持。

在以往版本中，KubeEdge组件的配置项分散在各个模块的独立文件中，维护比较繁琐。配置项按组件聚合后，用户只需在一个配置文件中进行配置，并可通过`--config`设置配置文件的路径。

本次增强还提供了默认完整配置`--defaultconfig`和最小配置`--minconfig`两个命令，用户可以使用这两个命令来生成配置文件，快速部署KubeEdge。

详细配置及设计原则，请见：https://github.com/kubeedge/kubeedge/pull/1172

### 自动注册边缘节点到云端

1.2版本之前，用户在添加一个边缘节点时，首先需要在云端创建Node对象，再启动边缘端的EdgeCore。

在v1.2版本中，KubeEdge提供了边缘节点自动注册到云端的功能，并且默认开启该特性，以减少用户在安装使用KubeEdge时的操作步骤。用户可以通过修改EdgeCore的“registerNode”配置项来关闭该特性（将其设置为“false”即可）。

特性详情：https://github.com/kubeedge/kubeedge/pull/1401

### 升级Kubernetes依赖到v1.17 Stable版本
KubeEdge v1.2版本将K8s相关的依赖升级到了v1.17 Stable版本，edged对应的k8s版本也升级到了v1.17，用户可以在边缘侧享受最新版K8s的应用管理、存储管理等能力。


Kubernetes 版本兼容性：

|                        | Kubernetes 1.11 | Kubernetes 1.12 | Kubernetes 1.13 | Kubernetes 1.14 | Kubernetes 1.15 | Kubernetes 1.16 | Kubernetes 1.17 |
|------------------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|
| KubeEdge 1.0           | ✓               | ✓               | ✓               | ✓              | ✓               | -               | -               |
| KubeEdge 1.1           | ✓               | ✓               | ✓               | ✓               | ✓             | ✓               | ✓               |
| KubeEdge 1.2           | ✓               | ✓               | ✓               | ✓               | ✓             | ✓               | ✓               |
| KubeEdge HEAD (master) | ✓               | ✓               | ✓               | ✓               | ✓             | ✓               | ✓               |

说明:
* `✓` KubeEdge和Kubernetes的版本是完全兼容的
* `+` KubeEdge中有些特性或API对象可能在对应的Kubernetes版本中不存在
* `-` Kubernetes中有些特性或API对象可能在对应的KubeEdge版本中不可用

Golang版本依赖兼容性：

|                         | Golang 1.10    | Golang 1.11     | Golang 1.12     | Golang 1.13     |
|-------------------------|----------------|-----------------|-----------------|-----------------|
| KubeEdge 1.0            | ✓              | ✓               | ✓               | ✗               |
| KubeEdge 1.1            | ✗              | ✗               | ✓               | ✗               |
| KubeEdge 1.2            | ✗              | ✗               | ✓               | ✓               |
| KubeEdge HEAD (master)  | ✗              | ✗               | ✓               | ✓               |

### 其他修改

新版本除了以上新特性外，还包括以下修改：

- 修复了EdgeCore在运行多个POD时，CPU占用高的问题。

- 将Beehive、Viaduct两个子项目移到了KubeEdge主库中的Staging目录下，方便开发者开发调试。

- EdgeCore不应与Kubelet在同一主机（节点）上运行，因此添加了对EdgeCore运行环境的检查。


### 结语
随着v1.2版本的发布，KubeEdge提供了更稳定可靠的云边协同传输机制，更完备的边缘应用管理以及设备管理能力，更加友好的用户体验，以及更加友好的社区贡献者体验。
感谢所有社区贡献者的支持！后续版本将进一步提升KubeEdge的用户使用体验，提供完备的智能边缘计算平台。更多详情请关注https://kubeedge.io。
