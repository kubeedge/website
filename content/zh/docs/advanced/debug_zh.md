---
draft: false
linktitle: 通过开启kubectl logs来debug边缘节点的pod
menu:
  docs:
    parent: 高级配置
    weight: 10
title: 通过开启kubectl logs来debug边缘节点的pod
toc: true
type: docs
---
### 启用 `kubectl logs` 功能

`kubectl logs` 必须在使用 metrics-server 之前部署，通过以下操作激活功能：

1. 确保您可以找到 Kubernetes 的 `ca.crt` 和 `ca.key` 文件。如果您通过 `kubeadm` 安装Kubernetes 集群，这些文件将位于 `/etc/kubernetes/pki/` 目录中。

    ``` shell
    ls /etc/kubernetes/pki/
    ```

2. 设置 `CLOUDCOREIPS` 环境。环境变量设置为指定的 cloudcore 的IP地址，如果您具有高可用的集群，则可以指定VIP（即弹性IP/虚拟IP）。

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```
   （警告：建议使用同一 **终端** 来保持系统工作的持续，在必要时再次键入此命令。）使用以下命令检查环境变量：
    ``` shell
    echo $CLOUDCOREIPS
    ```

3. 在云端节点上为 **CloudStream** 生成证书，但是，生成的文件不在 `/etc/kubeedge/` 中，我们需要从GitHub的存储库中拷贝一份。

   将用户更改为root：

    ```shell
    sudo su
    ```
   从原始克隆的存储库中拷贝证书：
    ```shell
    cp $GOPATH/src/github.com/kubeedge/kubeedge/build/tools/certgen.sh /etc/kubeedge/
    ```
   将目录更改为kubeedge目录：
    ```shell
    cd /etc/kubeedge/
    ```
   从 **certgen.sh** 生成证书
    ```bash
    /etc/kubeedge/certgen.sh stream
    ```

4. 需要在主机上设置 iptables。（此命令应该在每个apiserver部署的节点上执行。）（在这种情况下，须在master节点上执行，并由root用户执行此命令。）
   在运行每个apiserver的主机上运行以下命令：

   **注意:** 您需要先设置CLOUDCOREIPS变量

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
    ```
   > 端口10003和10350是 CloudStream 和 Edgecore 的默认端口，如果已发生变更，请使用您自己设置的端口。

   如果您不确定是否设置了iptables，并且希望清除所有这些表。（如果您错误地设置了iptables，它将阻止您使用 `kubectl logs` 功能）
   可以使用以下命令清理iptables规则：
    ``` shell
    iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
    ```

5. `/etc/kubeedge/config/cloudcore.yaml` 和 `/etc/kubeedge/config/edgecore.yaml` 上 cloudcore 和 edgecore **都要** 修改。将 **cloudStream** 和 **edgeStream** 设置为 `enable: true` 。将服务器IP更改为 cloudcore IP（与 $ CLOUDCOREIPS 相同）。

   在 cloudcore 中打开 YAML 文件：

    ```shell
    sudo nano /etc/kubeedge/config/cloudcore.yaml
    ```

   在以下文件中修改( `enable: true` )内容：
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

   在 edgecore 中打开 YAML 文件：
    ``` shell
    sudo nano /etc/kubeedge/config/edgecore.yaml
    ```

   修改以下部分中的文件 (`enable: true`), (`server: 192.168.0.193:10004`):

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

6. 重新启动所有cloudcore和edgecore。

    ``` shell
    sudo su
    ```
   cloudCore:
    ``` shell
    pkill cloudcore
    nohup cloudcore > cloudcore.log 2>&1 &
    ```
   edgeCore:
    ``` shell
    systemctl restart edgecore.service
    ```

   如果您无法重启 edgecore，请检查是否是由于 `kube-proxy` 的缘故，同时杀死这个进程。 **kubeedge** 默认不纳入该进程，我们使用 [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md) 来进行替代

   **注意：** 可以考虑避免 `kube-proxy` 部署在edgenode上。有两种解决方法：

    1. 通过调用 `kubectl edit daemonsets.apps -n kube-system kube-proxy` 添加以下设置：
    ``` yaml
    affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node-role.kubernetes.io/edge
                    operator: DoesNotExist
    ```

    2. 如果您仍然要运行 `kube-proxy` ，请通过在以下位置添加 `edgecore.service` 中的 env 变量来要求 **edgecore** 不进行检查edgecore.service：

        ``` shell
        sudo vi /etc/kubeedge/edgecore.service
        ```

        - 将以下行添加到 **edgecore.service** 文件：

        ``` shell
        Environment="CHECK_EDGECORE_ENVIRONMENT=false"
        ```

        - 最终文件应如下所示：

        ```
        Description=edgecore.service

        [Service]
        Type=simple
        ExecStart=/root/cmd/ke/edgecore --logtostderr=false --log-file=/root/cmd/ke/edgecore.log
        Environment="CHECK_EDGECORE_ENVIRONMENT=false"

        [Install]
        WantedBy=multi-user.target
        ```