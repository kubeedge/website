---
title: 安全
sidebar_position: 5
---

## 云边通信如何受到保护？

CloudCore 和 EdgeCore 使用 TLS 证书保护云边通信。边缘节点加入时，EdgeCore 会获取 CA 证书并向 CloudCore 请求边缘证书。默认情况下，端口 10002 上的 HTTPS 服务用于证书设置；之后 WebSocket 或 QUIC 承载云边连接。证书路径和地址设置见 [CloudCore 和 EdgeCore 配置指南](../setup/config.md)。

EdgeCore 默认配置启用证书轮换，CloudCore 默认的边缘证书签发时长为 365 天。这些设置可以更改，请检查所用发行版生成的配置。不要把重置或重新加入节点当作常规证书轮换步骤；请依照所用版本支持的流程操作。

## 边缘节点加入时如何认证？

`keadm join` 使用令牌授权初始证书请求。令牌应作为机密信息处理，不要贴到公开问题、日志或文档中。安装指南说明了加入流程和所需的 CloudCore 地址。

## EdgeCore 在哪里存储本地元数据？

EdgeCore 使用本地 SQLite 数据库存储元数据。默认数据库路径为 `/var/lib/kubeedge/edgecore.db`，可通过配置字段 `database.dataSource` 修改。文件所有者和权限取决于服务的安装及配置方式，请在目标主机上核实，不要假设权限固定。

## Kubernetes Secret 会到达边缘节点吗？

EdgeCore 可以获取边缘工作负载所需的 Secret，MetaManager 会在本地缓存元数据。因此，边缘节点上的 Secret 需要妥善保护：拥有足够节点或本地数据访问权限的人可能读取它们。请根据部署采用合适的 Kubernetes 访问控制和主机安全措施，并避免在日志或支持请求中发送 Secret 值。

## 遇到证书错误时该怎么办？

首先检查 CloudCore 的 `advertiseAddress` 是否包含 EdgeCore 用于连接的地址，并确认边缘节点可以访问配置的 CloudCore WebSocket 或 QUIC 端点及 HTTPS 端口 10002。[安装指南](../setup/install-with-keadm.md)介绍了常见证书和加入错误。仅为排查证书错误时，不要在未查看对应版本恢复指南的情况下运行 `keadm reset` 或重新初始化 CloudCore，因为重置可能影响节点或集群。

## 可以使用自有 CA 吗？

CloudCore 可以配置证书和 CA 文件路径。具体设置取决于 KubeEdge 版本和部署模式。请参阅 [CloudCore 和 EdgeCore 配置指南](../setup/config.md)及[安装指南](../setup/install-with-keadm.md)，按当前发行版配置证书。没有经过测试的轮换计划时，不要覆盖正在使用的 CA 文件。
