---
title: 安装部署
sidebar_position: 2
---

KubeEdge 提供了多种安装方式，您可以根据自己的需求选择合适的方式进行部署。
本页面对每种安装方式做了简要说明，请根据您的使用场景选择最合适的方式，
然后跳转到对应的子章节查看详细步骤。

> 在安装 KubeEdge 之前，请确保您已查阅
> [先决条件](../prerequisites/kubernetes.md)，并准备好 Kubernetes 集群以及容器
> [运行时](../prerequisites/runtime.md)。

## 选择安装方式

### 使用 Keadm 安装 KubeEdge

`keadm` 是 KubeEdge 官方提供的安装工具，也是 **大多数用户（包括生产环境）
推荐使用的安装方式**。它可以通过几条简单的命令完成云端组件 (CloudCore)
的部署以及边缘节点 (EdgeCore) 的接入。`keadm` **不会** 安装 Kubernetes
本身，您需要自行准备 Kubernetes 集群。

当您希望以官方支持的方式快速、稳定地在已有基础设施上部署 KubeEdge 时，
请选择此方式。

➡️ 详见 [使用Keadm进行部署](./install-with-keadm.md)。

### 使用二进制安装 KubeEdge

二进制安装方式会引导您从发布包（或源码）手动部署 CloudCore 和 EdgeCore。
这种方式对配置具有最大的可控性，适合希望深入理解组件之间工作机制，
或需要进行个性化定制的场景。

此方式仅适用于 **测试、开发和学习**，不建议在生产环境中使用。

➡️ 详见 [使用二进制部署](./install-with-binary.md)。

### 使用 Keink 安装 KubeEdge

[`keink`](https://github.com/kubeedge/keink)（KubeEdge IN
[kind](https://github.com/kubernetes-sigs/kind)）会在一台机器上通过 Docker
容器同时启动 Kubernetes 控制面与 KubeEdge 组件，是体验 KubeEdge 集群
最快的方式。

当您希望在 **本地快速试用 KubeEdge**，无需实际部署云端和边缘节点时，
请选择此方式。此方式不适用于生产环境。

➡️ 详见 [keink部署KubeEdge](./install-with-keink.md)。

## 我应该选择哪种方式？

| 目标                              | 推荐方式 |
| --------------------------------- | -------- |
| 在真实的云端 / 边缘环境中部署     | Keadm    |
| 测试、开发、学习组件实现机制      | Binary   |
| 在本地快速搭建集群进行体验和实验  | Keink    |

选定方式后，请进入对应的子章节查看完整步骤。
