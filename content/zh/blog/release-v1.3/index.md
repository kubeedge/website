---
authors:
- Fei Xu
- Kevin Wang
- Jie Zhang
- Dave Chen
categories:
- General
- Announcements
date: 2020-05-20
draft: false
lastmod: 2020-05-20
summary: KubeEdge v1.3发布：大幅提升系统可维护性！
tags:
- KubeEdge
- kubeedge
- 边缘计算
- kubernetes 边缘计算
- K8s 边缘计算
- 边缘计算平台
- release v1.3
- v1.3
title: KubeEdge v1.3发布：大幅提升系统可维护性！
---
**KubeEdge** 是一个开源的边缘计算平台，它在Kubernetes原生的容器编排和调度能力之上，实现了 **云边协同**、**计算下沉**、**海量边缘设备管理**、**边缘自治** 等能力。
在追求边缘极致轻量化的同时，结合云原生生态的众多优势，解决当前智能边缘领域面临的挑战。

## **KubeEdge v1.3发布：大幅提升系统可维护性！**

北京时间5月15日，KubeEdge发布了新的特性版本v1.3.0。
本次发布的1.3版本大幅提升了系统的可维护性，包括：__支持从云端收集边缘Pod日志__、__支持边缘节点与容器监控__、__云端组件高可用部署__、__边缘节点自动签发证书__、__支持使用CRI-O和Kata container作为容器运行时__，并修复了25处问题。

完整的更新日志请见：https://github.com/kubeedge/kubeedge/blob/master/CHANGELOG-1.3.md

以下是KubeEdge v1.3的关键新特性介绍。

{{% alert note %}}
获取KubeEdge最新版本：[Release v1.3](https://github.com/kubeedge/kubeedge/releases/tag/v1.3.0)
{{% /alert %}}

{{% alert note %}}
KubeEdge安装使用说明：请见[文档](https://github.com/kubeedge/kubeedge#usage)
{{% /alert %}}


### 支持从云端收集边缘Pod日志
在大多数边缘计算场景中，边缘节点处于私有网络环境，无法直接从中心云拉取运行在边缘节点上的Pod日志，这给应用的运维调试带来很多不便。

KubeEdge v1.3版本内置了流数据通道，用户可以很方便地通过`kubectl logs`命令从云端获取边缘应用容器日志，无需额外搭建部署VPN服务器解决私网穿透等复杂问题。

此外，KubeEdge社区还计划在后续版本中提供针对边缘容器的`kubectl exec`命令支持，使得用户可以方便地在云端连接边缘应用容器进行调试。

文档链接：https://docs.kubeedge.io/en/latest/setup/kubeedge_install_source.html

### 支持边缘节点与容器监控

在1.3版本中，KubeEdge提供了边缘节点的监控接口，用户可以在边缘获取本节点和容器相关监控信息，实现与第三方监控系统的集成对接。
该特性为默认开启，针对特殊情况，用户也可以通过EnableMetrics配置项关闭内置监控模块。

在下一个版本中，KubeEdge将支持在云端汇聚边缘节点和应用容器的监控信息。

相关链接：https://github.com/kubeedge/kubeedge/pull/1573


### 云端组件高可用部署
在1.3之前的版本中，KubeEdge云端组件的可用性依赖于Kubernetes Deployment的自动恢复能力，但极端情况下需要较长的时间进行故障恢复。

1.3版本支持了云端组件CloudCore的高可用部署，当CloudCore实例发生故障时，可以快速切换，最大限度减小云端组件的故障影响。

在后续的版本中，社区进一步优化云端组件的高并发支持，提高大规模边缘节点场景下的吞吐性能。


### 边缘节点自动签发证书
在1.3版本中，KubeEdge提供了面向边缘节点的证书自动签发能力，简化了用户配置云边安全通道的操作步骤，提升易用性。

默认情况下，KubeEdge会为用户生成自签名证书，用于云端组件和边缘节点的加密通信。针对需要统一管理证书的场景，用户也可以使用指定信任机构签发的证书。

下一步，社区将支持节点的证书到期自动更新。

文档链接：https://github.com/kubeedge/kubeedge/blob/master/docs/setup/kubeedge_configure.md

### 更多的容器运行时支持
KubeEdge v1.3版对CRI-O和Kata Container进行了进行了全量验证，提供官方集成支持。

- CRI-O是一个符合OCI标准的轻量级容器运行时，运行内存占用进30MB，是CNCF的孵化项目之一。
- Kata Container是基于轻量级虚拟机的容器运行时，旨在将虚拟机（VM）的安全优势与容器的速度和可管理性统一起来。

截止1.3版本，KubeEdge对包括Docker、containerd、CRI-O和Kata Container在内的业界主流容器运行时都已提供官方支持。

文档链接：https://github.com/kubeedge/kubeedge/blob/master/docs/setup/kubeedge_cri_configure.md


### 其他修改

新版本除了以上新特性外，还包括以下修改：
- keadm新增支持在CentOS系统上安装KubeEdge
- EdgeMesh不再依赖initContainer，启动时将在主机上接管流量
- 修复了部分Terminating状态的Pod无法被删除的问题



### 未来展望
随着v1.3版本的发布，KubeEdge提供了更完备的边缘应用监控管理能力，更稳定可靠的云边协同传输机制，更加友好的用户体验，以及更加友好的社区贡献者体验。感谢华为、中国联通、浙江大学SEL实验室、ARM等组织的贡献，也感谢所有社区贡献者的支持！

社区将在后续版本中进一步提升KubeEdge的用户使用体验与稳定性，打造最好用的智能边缘计算平台。后续版本计划请关注：

https://github.com/kubeedge/kubeedge/blob/master/docs/getting-started/roadmap.md

更多详情请关注：https://kubeedge.io
