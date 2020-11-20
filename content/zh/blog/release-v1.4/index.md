---
authors:
- Kevin Wang
- Fei Xu
categories:
- General
- Announcements
date: 2020-08-15
draft: false
lastmod: 2020-08-15
summary: KubeEdge v1.4发布：边缘监控与设备管理迎来重大提升！
tags:
- KubeEdge
- kubeedge
- 边缘计算
- kubernetes 边缘计算
- K8s 边缘计算
- 边缘计算平台
- release v1.4
- v1.4
title: KubeEdge v1.4发布：边缘监控与设备管理迎来重大提升！
---
**KubeEdge** 是一个开源的边缘计算平台，它在Kubernetes原生的容器编排和调度能力之上，实现了 **云边协同**、**计算下沉**、**海量边缘设备管理**、**边缘自治** 等能力。
在追求边缘极致轻量化的同时，结合云原生生态的众多优势，解决当前智能边缘领域面临的挑战。

## **KubeEdge v1.4发布：边缘监控与设备管理迎来重大提升！**

北京时间8月15日，KubeEdge发布了新的特性版本v1.4.0。
本次发布的1.4版本在边缘监控与设备管理方面迎来重大提升，包括：__设备管理增强__、__支持Metrics-Server从云端收集边缘监控数据__、__边缘节点证书轮转__、__K8s依赖版本升级__，并修复了34处问题。

完整的更新日志请见：https://github.com/kubeedge/kubeedge/blob/master/CHANGELOG/CHANGELOG-1.4.md

以下是KubeEdge v1.4的关键新特性介绍。

{{% alert note %}}
获取KubeEdge最新版本：[Release v1.4](https://github.com/kubeedge/kubeedge/releases/tag/v1.4.0)
{{% /alert %}}

{{% alert note %}}
KubeEdge安装使用说明：请见[文档](https://github.com/kubeedge/kubeedge#usage)
{{% /alert %}}


### 设备管理增强
设备定义的API从v1alpha1 升级到v1alpha2，增强包括：

- 支持自定义设备协议
- 允许用户定义数据字段，并在边缘处理
- 将propertyVistors属性从Device Model移动到 Device Instance API

现在用户可以自定义边缘设备的协议，可以在边缘获取和处理边缘设备数据。

### 支持Metrics-Server从云端收集边缘监控数据
在1.4版本中，用户可以部署Metrics-Server收集边缘节点的监控信息，部署Metrics-Server方式请参考如下文档。

文档链接：https://github.com/kubeedge/kubeedge/blob/master/docs/setup/keadm.md#support-metrics-server-in-cloud


### 边缘节点证书轮转
在1.4版本之前，边缘节点默认仅从云端申请有效期为一年的证书，而未针对证书过期做处理。在1.4版本中，在边缘节点的证书即将到期时，边缘节点将自动向云端申请新的证书，并在云边强制建立LTS连接。


### K8s依赖版本升级
将Kubernetes的依赖升级到1.18.6版本，用户现在可以在云端和边缘使用Kubernetes新版本的特性。

### 其他修改

新版本除了以上新特性外，还包括以下修改：
- 新增了存储树来保存项目依赖的license副本
- 修复了节点删除时reliablesyncs API的回收处理
- 修复了边缘节点断线重连情况下，耗时太长的问题
- 根据边缘节点系统架构自动识别Sandbox容器镜像架构
- 使用系统服务来运行EdgeCore



### 未来展望
随着v1.4版本的发布，KubeEdge提供了更完备的边缘应用监控管理与边缘设备管理能力，更稳定可靠的云边协同传输机制，更加友好的用户体验，以及更加友好的社区贡献者体验。感谢华为、中国联通、浙江大学SEL实验室、ARM等组织的贡献，也感谢所有社区贡献者的支持！

社区将在后续版本中进一步提升KubeEdge的用户使用体验与稳定性，打造最好用的智能边缘计算平台。

更多详情请关注：https://kubeedge.io
