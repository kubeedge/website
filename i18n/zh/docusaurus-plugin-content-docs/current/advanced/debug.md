---
title: 启用 Kubectl logs/exec/attach 等能力
sidebar_position: 3
---

## 准备证书

1. 请确保可以找到 `ca.crt` 和 `ca.key` 两个 Kubernetes 证书文件。 如果您使用 `kubeadm`进行 Kubernetes 集群安装，这两个文件将位于 `/etc/kubernetes/pki/` 路径下。

    ``` shell
    ls /etc/kubernetes/pki/
    ```

2. 设置 `CLOUDCOREIPS` 变量。 这个环境变量设置为指定 cloudcore 的 IP 地址，如果您的集群是以高可用方式部署，请设置为分配给负载均衡器的虚拟 IP 地址。

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```
    (注: 必须使用同一 **终端** 才能使设置生效， 如果更换了终端，必须再次执行该指令。)可以通过使用以下命令检查该环境变量：
    ``` shell
    echo $CLOUDCOREIPS
    ```

3. 接下来，需要给云节点上为 **CloudStream** 生成证书，然而，相关生成脚本不在 `/etc/kubeedge/` 中， 我们需要从 GitHub 的 git 仓库中获取。
   改变权限至 root 权限：
    ```shell
    sudo su
    ```
    从 git 仓库中 clone 证书生成文件：
    ```shell
    cp $GOPATH/src/github.com/kubeedge/kubeedge/build/tools/certgen.sh /etc/kubeedge/
    ```
    切换到 kubeedge 路径下：
    ```shell
    cd /etc/kubeedge/
    ```
    使用 **certgen.sh** 生成证书：
    ```bash
    /etc/kubeedge/certgen.sh stream
    ```

## 设置 Iptables 规则

1. 在主机上设置iptables。注意这个命令需要在部署了 apiserver 的每个节点上执行。（在本例中，是在主节点，运用通过 root 用户执行命令。）

    在每个运行有 apiserver 的主机上运行以下命令：

    **注:** 请先确保 CLOUDCOREIPS 环境变量设置正确

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
    ```
    > 端口 10003 和 10350 是 CloudStream 和 edgecore 的默认端口，如果您对它们做过修改，请使用您设置的端口。

    如果您不确定是够有 iptables 设置，并且想清理所有 iptables。
    (如果您设置了错误的 iptables，它会阻止您使用此功能)

    以下命令用于清除 iptables 规则:
    ``` shell
    iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
    ```

## 更新配置

1. 分别调整 cloudcore 上的 `/etc/kubeedge/config/cloudcore.yaml` 和 edgecore 上的 `/etc/kubeedge/config/edgecore.yaml` 。调整 **cloudStream** 和 **edgeStream** 为 `enable: true`，并且改变server IP 为 cloudcore IP (和 $CLOUDCOREIPS 相同)。

    cloudcore调整 `/etc/kubeedge/config/cloudcore.yaml`:
    ```yaml
    cloudStream:
      enable: true
      streamPort: 10003
      tlsStreamCAFile: /etc/kubeedge/ca/streamCA.crt
      tlsStreamCertFile: /etc/kubeedge/certs/stream.crt
      tlsStreamPrivateKeyFile: /etc/kubeedge/certs/stream.key
      tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt
      tlsTunnelCertFile: /etc/kubeedge/certs/server.crt
      tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key
      tunnelPort: 10004
    ```

    edgecore调整 `/etc/kubeedge/config/edgecore.yaml`:
    ``` yaml
    edgeStream:
      enable: true
      handshakeTimeout: 30
      readDeadline: 15
      server: 192.168.0.139:10004
      tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt
      tlsTunnelCertFile: /etc/kubeedge/certs/server.crt
      tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key
      writeDeadline: 15
    ```

## 重新启动

1. 重新启动 cloudcore 和 edgecore 让配置生效。

    在云端：
    ``` shell
    sudo systemctl restart cloudcore.service
    ```

    在边缘端：
    ``` shell
    sudo systemctl restart edgecore.service
    ```

