---
title: 安全性
sidebar_position: 5
---

本部分涵盖了 KubeEdge 的安全模型，包括边缘端的身份验证、流量加密和数据保护等常见问题。

## CloudCore 和 EdgeCore 之间的通信是如何得到安全保障的？

`CloudCore` 和 `EdgeCore` 之间的通信采用 **传输层安全协议 (TLS)** 进行保护：
- **双向 TLS (mTLS)**：CloudCore 和 EdgeCore 通过证书相互认证。流经 WebSocket 或 QUIC 的所有控制面流量均经过加密。
- **证书颁发机构 (CA)**：默认情况下，如果启动时不存在自签名 Root CA，CloudCore 将自动生成一个。它使用此 CA 为 EdgeCore 节点签署客户端证书。您也可以将 KubeEdge 配置为使用您自己的外部自定义 CA。

## 边缘节点是如何被认证的？

边缘节点使用基于 Token 的引导程序（bootstrap）机制进行认证并加入集群：
1. **生成 Token**：您可以使用云端的 `keadm gettoken` 命令获取一个安全 Token。
2. **初始加入**：在边缘节点上运行 `keadm join` 时提供此 Token。
3. **证书注册**：EdgeCore 使用此 Token 验证向 CloudCore 发起的初始请求。通过身份验证后，CloudCore 将为该 EdgeCore 实例签署唯一的节点证书。
4. **后续通信**：此后的所有连接中，EdgeCore 均会使用已签署的证书进行双向 TLS 认证。届时将不再需要 Token。

## KubeEdge 是如何保护边缘端的敏感数据的？

KubeEdge 采取了多种措施保护边缘节点上的本地数据：
- **限制访问**：密钥文件、配置文件和 SQLite 数据库文件均存储在 `/etc/kubeedge/` 目录下，并设置了严格的访问权限（通常仅允许 root 用户或服务所有者读取/写入）。
- **解耦架构**：EdgeCore 仅请求已被调度到该特定节点上的资源的元数据。它没有访问集群全局 API 状态的权限，从而防止了某个受损的边缘节点窃取其他节点的数据。

## KubeEdge 支持加密的 Secret 同步吗？

是的。Kubernetes 的 `Secret` 资源可以像其他资源（如 Pod 和 ConfigMap）一样同步到边缘端：
- Secret 在通过 TLS 隧道传输期间会被加密。
- 它们会本地存储在边缘节点的 SQLite 数据库中。对该数据库的访问受限于 EdgeCore 进程。
- 运行在边缘端的 Pod 可以使用标准的 Kubernetes 卷挂载方式挂载这些 Secret，这由本地的 `edged` 组件负责处理。
