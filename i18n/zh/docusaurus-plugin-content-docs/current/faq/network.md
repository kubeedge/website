---
title: 网络与通信
sidebar_position: 4
---

## EdgeCore 和 CloudCore 通过哪些协议连接？

CloudCore 默认启用端口 10000 上的 WebSocket，并使用端口 10002 提供边缘证书设置所需的 HTTPS 服务。QUIC 可配置为使用端口 10001，但默认未启用。更改防火墙规则前，请参阅 [CloudCore 和 EdgeCore 配置指南](../setup/config.md)及[安装指南](../setup/install-with-keadm.md)。

CloudCore 的服务设置位于 `modules.cloudHub.websocket` 和 `modules.cloudHub.quic`。EdgeCore 的客户端地址分别配置在 `modules.edgeHub.websocket.server` 和 `modules.edgeHub.quic.server`。请以生成的配置文件为起点，因为可用字段可能因发行版而异。

## 什么是 EdgeMesh？

EdgeMesh 是可选的网络组件，用于边缘场景中的服务发现和流量代理。它与 EdgeCore 分开部署。有关支持的功能和安装步骤，请参阅 [EdgeMesh 指南](../advanced/edgemesh.md)；不要假定 KubeEdge 集群默认启用了所有 EdgeMesh 功能。

## 云边连接断开时，哪些内容会继续运行？

EdgeCore 会继续管理边缘节点上已知的工作负载。连接恢复后会重新连接 CloudCore。断连期间，云端的新变更无法送达边缘；实际调谐行为取决于 KubeEdge 版本和资源类型。详见 [MetaManager](../architecture/edge/metamanager.md) 和 [EdgeHub](../architecture/edge/edgehub.md)。

## 边缘节点位于 NAT 或防火墙后方时能否连接？

可以。EdgeCore 主动连接 CloudCore，因此 CloudCore 服务必须能从边缘节点访问。标准安装指南要求边缘节点能够访问端口 10000 和 10002。如果启用了 QUIC，也要开放所配置的 UDP 端口。CloudCore 的 `advertiseAddress` 应与边缘节点实际访问 CloudCore 时使用的地址相符，因为这些地址会加入 CloudCore 证书的 SAN。

## 边缘节点无法连接 CloudCore

检查边缘节点是否能解析 CloudCore 主机名并访问配置的 WebSocket 或 QUIC 端点，同时检查云端 CloudCore 服务和防火墙规则。若 CloudCore 部署在 Kubernetes 中，可检查 Pod 和日志：

```shell
kubectl get pods -n kubeedge
kubectl logs -n kubeedge <cloudcore-pod-name>
```

若 EdgeCore 作为 systemd 服务运行，可使用：

```shell
systemctl status edgecore
journalctl -u edgecore.service -xe
```

证书和连接错误可参考[安装指南](../setup/install-with-keadm.md)。

## 如何检查边缘节点是否已连接？

在 Kubernetes 控制平面查看节点状态：

```shell
kubectl get nodes
```

`Ready` 状态可作为参考，但单凭该状态无法诊断 CloudCore 连接。请检查 EdgeCore 和 CloudCore 日志中的连接或证书错误。EdgeCore 的日志位置和命令取决于安装方式；systemd 安装可使用 `journalctl -u edgecore.service -xe`。

## EdgeMesh 无法提供连接

首先按照 [EdgeMesh 指南](../advanced/edgemesh.md)检查安装和配置。确认相关 Pod 正常，再从受影响的工作负载检查 DNS 和网络连通性。EdgeMesh 端口和部署细节取决于版本及配置，请参阅对应指南，不要猜测要开放的端口。
