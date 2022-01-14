---
date: 2019-01-28
draft: false
lastmod: 2019-01-29
menu:
  docs:
    parent: welcome
    weight: 1
title: 入门指南
toc: true
type: docs
---
KubeEdge是一个开源系统，将原生的容器化应用程序编排功能扩展到边缘节点。

在此快速入门指南中，我们将说明：

- 如何提出问题，构建KubeEdge并为KubeEdge做贡献。
- 部署KubeEdge的几种常见方法。
- 相关链接以供进一步阅读。

## 依赖

在云端方面，我们需要：

- [Kubernetes](https://kubernetes.io) 集群

在边缘，我们需要：

- 容器运行时，现在我们支持：
  - [Docker](https://www.docker.com)
  - [Containerd](https://github.com/containerd/containerd)
  - [Cri-o](https://cri-o.io)
  - [Virtlet](https://docs.virtlet.cloud)
- [MQTT服务器（可选）](https://mosquitto.org)

## 获取KubeEdge！

您可以在[这里](https://github.com/kubeedge/kubeedge/releases)找到最新的KubeEdge版本。

在发布期间，我们为主要平台构建tarball，并在kubeedge dockerhub中发布docker映像。

## 部署KubeEdge

查看 [安装文档](../setup/keadm_zh) 。

## 贡献

欢迎贡献！详见[CONTRIBUTING.md](./community/contribute)。

## 社区

KubeEdge是一个开源项目，我们重视并欢迎新的贡献者和社区成员。以下是与社区联系的方法：

- [邮件列表](https://groups.google.com/forum/#!forum/kubeedge)
- [Slack](https://join.slack.com/t/kubeedge/shared_invite/enQtNjc0MTg2NTg2MTk0LWJmOTBmOGRkZWNhMTVkNGU1ZjkwNDY4MTY4YTAwNDAyMjRkMjdlMjIzYmMxODY1NGZjYzc4MWM5YmIxZjU1ZDI)
- [Twitter](https://twitter.com/kubeedge)
- [GitHub Issues](https://github.com/kubeedge/kubeedge/issues)
