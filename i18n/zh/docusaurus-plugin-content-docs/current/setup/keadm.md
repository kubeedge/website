---
title: 使用Keadm进行部署
sidebar_position: 1
---

Keadm 是一款用于安装 KubeEdge 的工具。
Keadm 不负责 K8s 的安装和运行,在使用它之前，请先准备好一个 K8s 集群。

KubeEdge 对 Kubernetes 的版本兼容性，更多详细信息您可以参考 [kubernetes-兼容性](https://github.com/kubeedge/kubeedge#kubernetes-compatibility)
来了解，以此来确定安装哪个版本的 Kubernetes 以及 KubeEdge。

## 使用限制

- `keadm` 目前支持 Ubuntu 和 CentOS OS。RaspberryPi 的支持正在进行中。
- 需要超级用户权限（或 root 权限）才能运行。
- `keadm beta`功能在 v1.10.0 上线，如果您需要使用相关功能，请使用 v1.10.0 及以上版本的 keadm。

## 设置云端（KubeEdge 主节点）

### keadm init

默认情况下边缘节点需要访问 cloudcore 中 `10000` ，`10002` 端口。
若要确保边缘节点可以成功地与集群通信，您需要创建防火墙规则以允许流量进入这些端口（10000 至 10004）。

> `keadm init` 将安装并运行 cloudcore，生成证书并安装 CRD。它还提供了一个命令行参数，通过它可以设置特定的版本。不过需要注意的是：\
> 在 v1.11.0 之前，`keadm init` 将以进程方式安装并运行 cloudcore，生成证书并安装 CRD。它还提供了一个命令行参数，通过它可以设置特定的版本。\
> 在 v1.11.0 之后，`keadm init` 集成了 Helm Chart，这意味着 cloudcore 将以容器化的方式运行。\
> 如果您仍需要使用进程的方式启动 cloudcore ，您可以使用`keadm deprecated init` 进行安装，或者使用 v1.10.0 之前的版本。

**重要提示：**

1. 必须正确配置 kubeconfig 或 master 中的至少一个，以便可以将其用于验证 k8s 集群的版本和其他信息。
2. 请确保边缘节点可以使用云节点的本地 IP 连接云节点，或者需要使用 `--advertise-address` 标记指定云节点的公共 IP 。
3. `--advertise-address`（仅从 1.3 版本开始可用）是云端公开的地址（将添加到 CloudCore 证书的 SAN 中），默认值为本地 IP。
4. `keadm init` 将会使用二进制方式部署 cloudcore 为一个系统服务，如果您想实现容器化部署，可以参考 `keadm beta init` 。

举个例子：

```shell
# keadm init --advertise-address="THE-EXPOSED-IP"(only work since 1.3 release)
```

输出：

```
Kubernetes version verification passed, KubeEdge installation will start...
...
KubeEdge cloudcore is running, For logs visit:  /var/log/kubeedge/cloudcore.log
```

当您看到以上信息，说明 KubeEdge 的云端组件 cloudcore 已经成功运行。

### keadm beta init

如果您想要使用容器化方式部署云端组件 cloudcore ，您可以使用 `keadm beta init` 进行云端组件安装。

> keadm beta 功能在 v1.10.0 上线，如果您想要使用 `keadm beta init` 部署云端组件，请使用 v1.10.0 及以上版本的 keadm 进行安装。\
> 在 v1.11.0 版本之后，keadm init 将直接使用容器化方式部署云端组件 cloudcore。

举个例子:

```shell
# keadm beta init --advertise-address="THE-EXPOSED-IP" --set cloudcore-tag=v1.9.0 --kube-config=/root/.kube/config
```

**重要提示：**

1. 自定义 `--set key=value`
   值可以参考 [KubeEdge Cloudcore Helm Charts README.md](https://github.com/kubeedge/kubeedge/blob/master/build/helm/charts/cloudcore/README.md)
2. 您可以从 Keadm 的一个内置配置概要文件开始，然后根据您的特定需求进一步定制配置。目前，内置的配置概要文件关键字是 `version`
   。请参考 [`version.yaml`](https://github.com/kubeedge/kubeedge/blob/master/build/helm/charts/profiles/version.yaml)
   ，您可以在这里创建您的自定义配置文件, 使用 `--profile version=v1.9.0 --set key=value` 来使用它。

此外，还可使用 `--external-helm-root` 安装外部的 helm chart 组件，如 edgemesh 。

举个例子:

```shell
# keadm beta init --set server.advertiseAddress="THE-EXPOSED-IP" --set server.nodeName=allinone  --kube-config=/root/.kube/config --force --external-helm-root=/root/go/src/github.com/edgemesh/build/helm --profile=edgemesh
```

如果您对 Helm Chart 比较熟悉，可以直接参考 [KubeEdge Helm Charts](https://github.com/kubeedge/kubeedge/tree/master/build/helm/charts)
进行安装。

### keadm beta manifest generate

`keadm beta manifest generate` 可以帮助我们快速渲染生成期望的 manifests 文件，并输出在终端显示。

Example:

```shell
# keadm beta manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
```

> 使用 --skip-crds 跳过打印 CRDs

## 设置边缘端（KubeEdge 工作节点）

### 从云端获取令牌

在**云端**运行 `keadm gettoken` 将返回 token 令牌，该令牌将在加入边缘节点时使用。

```shell
# keadm gettoken
27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE
```

### 加入边缘节点

#### keadm join

`keadm join` 将安装 edgecore 和 mqtt。它还提供了一个命令行参数，通过它可以设置特定的版本。

举个例子：

```shell
# keadm join --cloudcore-ipport=192.168.20.50:10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE
```

#### keadm beta join

现在可以使用 `keadm beta join` 通过镜像下载所需资源，进行节点接入。

##### Docker

```shell
# keadm beta join --cloudcore-ipport=192.168.20.50:10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE
```

##### CRI

```shell
# keadm beta join --cloudcore-ipport=192.168.20.50:10000 --runtimetype remote --remote-runtime-endpoint unix:///run/containerd/containerd.sock --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE
```

**重要提示：**

1. `--cloudcore-ipport` 是必填参数。
2. 加上 `--token` 会自动为边缘节点生成证书，如果您需要的话。
3. 需要保证云和边缘端使用的 KubeEdge 版本相同。
4. 加上 `--with-mqtt` 会自动为边缘节点以容器运行的方式部署 `mosquitto` 服务

输出：

```shell
Host has mosquit+ already installed and running. Hence skipping the installation steps !!!
...
KubeEdge edgecore is running, For logs visit:  /var/log/kubeedge/edgecore.log
```

> 也可以使用 `keadm beta join` 来添加边缘节点。

### 启用 `kubectl logs` 功能

`kubectl logs` 必须在使用 metrics-server 之前部署，通过以下操作激活功能：

1. 确保您可以找到 Kubernetes 的 `ca.crt` 和 `ca.key` 文件。如果您通过 `kubeadm` 安装 Kubernetes 集群，这些文件将位于 `/etc/kubernetes/pki/` 目录中。

   ```shell
   ls /etc/kubernetes/pki/
   ```

2. 设置 `CLOUDCOREIPS` 环境。环境变量设置为指定的 cloudcore 的 IP 地址，如果您具有高可用的集群，则可以指定 VIP（即弹性 IP/虚拟 IP）。

   ```bash
   export CLOUDCOREIPS="192.168.0.139"
   ```

   （警告：建议使用同一 **终端** 来保持系统工作的持续，在必要时再次键入此命令。）使用以下命令检查环境变量：

   ```shell
   echo $CLOUDCOREIPS
   ```

3. 在云端节点上为 **CloudStream** 生成证书，但是，生成的文件不在 `/etc/kubeedge/` 中，我们需要从 GitHub 的存储库中拷贝一份。

   将用户更改为 root：

   ```shell
   sudo su
   ```

   从原始克隆的存储库中拷贝证书：

   ```shell
   cp $GOPATH/src/github.com/kubeedge/kubeedge/build/tools/certgen.sh /etc/kubeedge/
   ```

   将目录更改为 kubeedge 目录：

   ```shell
   cd /etc/kubeedge/
   ```

   从 **certgen.sh** 生成证书

   ```bash
   /etc/kubeedge/certgen.sh stream
   ```

4. 需要在主机上设置 iptables。（此命令应该在每个 apiserver 部署的节点上执行。）（在这种情况下，须在 master 节点上执行，并由 root 用户执行此命令。） 在运行每个 apiserver 的主机上运行以下命令：

   **注意:** 您需要先设置 CLOUDCOREIPS 变量

   ```bash
   iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
   ```

   > 端口 10003 和 10350 是 CloudStream 和 Edgecore 的默认端口，如果已发生变更，请使用您自己设置的端口。

   如果您不确定是否设置了 iptables，并且希望清除所有这些表。（如果您错误地设置了 iptables，它将阻止您使用 `kubectl logs` 功能） 可以使用以下命令清理 iptables 规则：

   ```shell
   iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
   ```

   > 现在可以通过 iptablesmanager 这个组件自动运维以上的 iptables 转发规则，参考 [cloudcore helm values](https://github.com/kubeedge/kubeedge/blob/master/build/helm/charts/cloudcore/values.yaml#L66).

5. `/etc/kubeedge/config/cloudcore.yaml` 和 `/etc/kubeedge/config/edgecore.yaml` 上 cloudcore 和 edgecore **都要** 修改。将 **cloudStream** 和 **edgeStream** 设置为 `enable: true` 。将服务器 IP 更改为 cloudcore IP（与 $ CLOUDCOREIPS 相同）。

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

   ```shell
   sudo nano /etc/kubeedge/config/edgecore.yaml
   ```

   修改以下部分中的文件 (`enable: true`), (`server: 192.168.0.193:10004`):

   ```yaml
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

6. 重新启动所有 cloudcore 和 edgecore。

   ```shell
   sudo su
   ```

   cloudCore in process mode:

   ```shell
   pkill cloudcore
   nohup cloudcore > cloudcore.log 2>&1 &
   ```

   or cloudCore in kubernetes deployment mode:

   ```shell
   kubectl -n kubeedge rollout restart deployment cloudcore
   ```

   edgeCore:

   ```shell
   systemctl restart edgecore.service
   ```

   如果您无法重启 edgecore，请检查是否是由于 `kube-proxy` 的缘故，同时杀死这个进程。 **kubeedge**
   默认不纳入该进程，我们使用 [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md) 来进行替代

   **注意：** 可以考虑避免 `kube-proxy` 部署在 edgenode 上。有两种解决方法：

   1. 通过调用 `kubectl edit daemonsets.apps -n kube-system kube-proxy` 添加以下设置：

   ```yaml
   affinity:
     nodeAffinity:
       requiredDuringSchedulingIgnoredDuringExecution:
         nodeSelectorTerms:
           - matchExpressions:
               - key: node-role.kubernetes.io/edge
                 operator: DoesNotExist
   ```

   1. 如果您仍然要运行 `kube-proxy` ，请通过在以下位置添加 `edgecore.service` 中的 env 变量来要求 **edgecore** 不进行检查 edgecore.service：

      ```shell
      sudo vi /etc/kubeedge/edgecore.service
      ```

      - 将以下行添加到 **edgecore.service** 文件：

      ```shell
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

### 在云端支持 Metrics-server

1. 实现该功能点的是重复使用了 cloudstream 和 edgestream 模块。因此，您还需要执行 _启用 `kubectl logs` 功能_ 的所有步骤。

2. 由于边缘节点和云节点的 kubelet 端口不同，故当前版本的 metrics-server（0.3.x）不支持自动端口识别（这是 0.4.0 功能），因此您现在需要手动编译从 master 分支拉取的镜像。

   Git clone 最新的 metrics server 代码仓:

   ```bash
   git clone https://github.com/kubernetes-sigs/metrics-server.git
   ```

   转到 metrics server 目录:

   ```bash
   cd metrics-server
   ```

   制作 docker 容器:

   ```bash
   make container
   ```

   检查您是否有此 docker 镜像：

   ```bash
   docker images
   ```

   | 仓库                                                  | 标签                                     | 镜像 ID      | 创建时间 | 大小   |
   | ----------------------------------------------------- | ---------------------------------------- | ------------ | -------- | ------ |
   | gcr.io/k8s-staging-metrics-serer/ metrics-serer-amd64 | 6d92704c5a68cd29a7a81bce68e6c2230c7a6912 | a24f71249d69 | 19 秒前  | 57.2MB |
   | metrics-server-kubeedge                               | latest                                   | aef0fa7a834c | 28 秒前  | 57.2MB |

   确保您使用镜像 ID 来对镜像标签进行变更，以使其与 yaml 文件中的镜像名称一致。

   ```bash
   docker tag a24f71249d69 metrics-server-kubeedge:latest
   ```

3. 部署 yaml 应用。可以参考相关部署文档：https://github.com/kubernetes-sigs/metrics-server/tree/master/manifests。

   注意：下面的那些 iptables 必须应用在机器上（精确地是网络名称空间，因此 metrics-server 也需要在主机网络模式下运行）metric-server 在其上运行。

   **注意：** 下面的那些 iptables 必须应用在已运行 metric-server 机器上（精确地命名是网络名称空间，因此 metrics-server 也需要在主机网络模式下运行）

   ```
   iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
   ```

   （引导对 metric-data 的请求 edgecore:10250 至在 cloudcore 和 edgecore 之间的隧道中，iptables 至关重要。）

   在部署 metrics-server 之前，必须确保将其部署在已部署 apiserver 的节点上。在这种情况下，这就是 master 节点。作为结果，需要通过以下命令使主节点可调度：

   ```shell
   kubectl taint nodes --all node-role.kubernetes.io/master-
   ```

   然后，在 deployment.yaml 文件中，必须指定 metrics-server 部署在主节点上。（选择主机名作为标记的标签。）

   在**metrics-server-deployment.yaml**中

   ```yaml
   spec:
     affinity:
       nodeAffinity:
         requiredDuringSchedulingIgnoredDuringExecution:
           nodeSelectorTerms:
             - matchExpressions:
                 #Specify which label in [kubectl get nodes --show-labels] you want to match
                 - key: kubernetes.io/hostname
                   operator: In
                   values:
                     #Specify the value in key
                     - charlie-latest
   ```

**重要提示：**

1. Metrics-server 需要使用主机网络网络模式。

2. 使用您自己编译的镜像，并将 imagePullPolicy 设置为 Never。

3. 为 Metrics 服务器启用 --kubelet-use-node-status-port 功能

   需要将这些设置写入部署 yaml（metrics-server-deployment.yaml）文件中，如下所示：

   ```yaml
   volumes:
     # mount in tmp so we can safely use from-scratch images and/or read-only containers
     - name: tmp-dir
       emptyDir: {}
   hostNetwork: true #Add this line to enable hostnetwork mode
   containers:
     - name: metrics-server
       image: metrics-server-kubeedge:latest #Make sure that the REPOSITORY and TAG are correct
       # Modified args to include --kubelet-insecure-tls for Docker Desktop (don't use this flag with a real k8s cluster!!)
       imagePullPolicy: Never #Make sure that the deployment uses the image you built up
       args:
         - --cert-dir=/tmp
         - --secure-port=4443
         - --v=2
         - --kubelet-insecure-tls
         - --kubelet-preferred-address-types=InternalDNS,InternalIP,ExternalIP,Hostname
         - --kubelet-use-node-status-port #Enable the feature of --kubelet-use-node-status-port for Metrics-server
       ports:
         - name: main-port
           containerPort: 4443
           protocol: TCP
   ```

## 重置 KubeEdge master 节点和工作节点

### Master

`keadm reset`将停止 `cloudcore` 并从 Kubernetes master 中删除与 KubeEdge 相关的资源，如 `kubeedge` 命名空间。它不会卸载/删除任何先决条件。

它为用户提供了一个标志，以指定 kubeconfig 路径，默认路径为 `/root/.kube/config` 。

例子：

```shell
 # keadm reset --kube-config=$HOME/.kube/config
```

### 节点

`keadm reset` 将停止 `edgecore` ，并且不会卸载/删除任何先决条件。
