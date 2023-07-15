---
sidebar_position: 3
title: Roadmap
---

该文档描述了 KubeEdge 开发的路线图

[在 GitHub 中定义的里程碑](https://github.com/kubeedge/kubeedge/milestones)代表了最新的计划。

下面的路线图概述了 KubeEdge 将要添加的新功能。

## 2021 H1

### 核心框架

#### 边缘 List-Watch

- 边缘端支持 List-Watch 接口，方便边缘组件接入。

#### 云边自定义消息通道

- 支持云端和边缘端之间的自定义消息传输

#### 稳定支持 CloudCore 多活

- 支持多个 CloudCore 实例同时稳定运行

#### 第三方 CNI 集成支持

- 提供 flannel、calico 等 CNI 插件的官方集成支持

#### 第三方 CSI 集成支持

- 提供 Rook、OpenEBS 等 CSI 插件的官方集成支持

#### 支持云端管理边缘群集 (aka. EdgeSite)

#### 在边缘端支持 ingress/网关

### 可维护性

#### 部署优化

- 更加简单、便捷的部署（最好一键部署，支持中国镜像）
- Admission Controller 自动部署

#### 边缘应用离线迁移时间自动化配置

- 一键修改 Default tolerationSeconds

#### 体验良好的中文文档

### IOT 设备管理

#### 设备 Mapper 框架标准以及框架生成器

- 制定边缘设备 Mapper 的实施标准

#### 支持更多协议的 mapper

- OPC-UA mapper
- ONVIF mapper

### 安全

#### 完成安全漏洞扫描

### 测试

#### 使用更多的度量和场景改进性能和 e2e 测试

### 边云协同 AI

#### 支持 KubeFlow/ONNX/Pytorch/Mindspore 等

#### 边云协同训练与推理

### MEC

#### 跨边云服务发现

#### 5G 网络能力开放

## 2021 H2

### 核心框架

#### 云边自定义消息通道

- 云边支持 CloudEvent 消息协议

#### 数据面跨网络通信

- 边缘-边缘 跨网络通信
- 边缘-中心云 跨网络通信

#### 使用标准的 istio 进行服务治理控制

#### 云边协同监控

- 支持 prometheus push gateway
- 数据管理，支持接收遥测数据和边缘分析。

### IOT 设备管理

#### 设备 Mapper 框架标准以及框架生成器

- 开发 Mapper 基本框架生成器

#### 支持更多协议的 mapper

- GB/T 28181 mapper

### 边云协同 AI

#### 边缘智能 benchmark

### MEC

#### 云网融合

#### service catalog

#### 应用漫游
