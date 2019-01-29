+++
title = "What is KubeEdge"
description = "Quickly get running with your kubeedge"
date = 2019-01-28
lastmod = 2019-01-29

draft = false  # Is this a draft? true/false
toc = true  # Show table of contents? true/false
type = "docs"  # Do not modify.
reading_time = true  # Show estimated reading time?
share = true  # Show social sharing links?

# aliases = ["/docs/", "/docs/about/", "/docs/Kubeedge/"]
# Add menu entry to sidebar.
linktitle = "What is KubeEdge"
[menu.docs]
  weight = 1
+++

## Kubeedge任务

我们的目标是建立一个开放平台，以实现Edge计算，扩展本机容器化
Edge的主机应用程序编排功能。它建立在kubernetes并提供
基础架构支持网络，app.deployment和元数据同步
云与边缘之间。它还支持`MQTT`并允许开发人员编写客户逻辑
并在Edge启用资源约束设备通信。 Kubeedge是*支持Edge computing *的开放平台。
Kubeedge的优势主要包括：

* **边缘计算**

     通过在Edge上运行业务逻辑，可以在本地保护和处理大量数据。它减少了带宽
     Edge和Cloud之间的请求;增加回应说话;并保护客户的数据隐私。

* **简化开发**

     开发人员可以编写常规的基于http或mqtt的应用程序;容纳并在Edge或Cloud的任何地方运行。

* **Kubernetes原生支持**

     使用KubeEdge，用户可以根据Edge节点编排应用程序，管理设备和监控应用程序/设备状态
     云中的普通K8s群集。

* **丰富的应用程序**

     您可以轻松获取和部署复杂的机器学习，图像识别，事件处理等
     适用于Edge端的应用程序。

* **等等**

## 什么是KubeEdge?

KubeEdge是一个开源系统，用于将本机容器化应用程序编排功能扩展到Edge的主机。它基于kubernetes构建，为网络应用程序提供基础架构支持。云和边缘之间的部署和元数据同步。

## 工作流程 

基本工作流程是:

* 确保你的环境中有一些基本的工具，比如`mosquitto`和`docker`.
* 下载Kubeedge脚本和配置文件。
* 自定义配置。
* 在您选择的环境中运行`mosquitto`和`Kubeedge`二进制文件。

您可以调整配置以选择要用于您的环境的平台和服务：`certfile`，`keyfile`等。

## 参与进来

有很多方法可以为Kubeedge做出贡献，我们欢迎捐款！
阅读[贡献者指南]（/ docs / about / contributions）开始使用
码。
