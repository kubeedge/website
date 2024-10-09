---
title: 使用Keadm进行部署
sidebar_position: 3
---

Keadm 是一款用于安装 KubeEdge 的 Cloud 和 Edge 组件的工具。它不负责安装 Kubernetes 和 [容器运行环境](https://kubeedge.io/docs/setup/prerequisites/runtime)。

请参考 [Kubernetes 兼容性文档](https://github.com/kubeedge/kubeedge#kubernetes-compatibility)  来检查 **Kubernetes 兼容性** 并确定要安装的 Kubernetes 版本。

## 先决条件

- 一个运行 Kubernetes 的集群。

## 安装 Keadm

有三种方式获取 `keadm` 可执行文件：

1. 从 [GitHub release](https://github.com/kubeedge/kubeedge/releases) 页面下载。

    KubeEdge Github 发布提供了三种架构的版本：amd64, arm, arm64。请根据您的平台和所需版本下载正确的包。
    ```shell
    wget https://github.com/kubeedge/kubeedge/releases/download/v1.17.0/keadm-v1.17.0-linux-amd64.tar.gz
    tar -zxvf keadm-v1.17.0-linux-amd64.tar.gz
    cp keadm-1.17.0-linux-amd64/keadm/keadm /usr/local/bin/keadm
    ```

2. 从 Docker Hub 上的 KubeEdge 官方发布镜像中获取。

  ```shell
  docker run --rm kubeedge/installation-package:v1.17.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm && chmod +x /usr/local/bin/keadm
  ```

3. 从源码构建

    参考 [build from source](./install-with-binary#build-from-source) 获取源码构建的指导。


## 设置云端（KubeEdge 主节点）

## 使用限制

默认配置下，CloudCore 端口 `10000` 和 `10002` 需要能被边缘节点访问到。

**关键注意点**

1. 至少需要正确配置 `kubeconfig` 或 `master`，以便验证 Kubernetes 集群的版本和其他信息。

2. 请确保边缘节点可以使用云节点的本地 IP 连接云节点，或者需要使用 `--advertise-address` 标记指定云节点的公共 IP 。

3. `--advertise-address` 是云端公开的地址（将添加到 CloudCore 证书的 SAN 中），默认值为本地 IP。

### keadm init

`keadm init` 提供了一个集成 CloudCore Helm chart 的解决方案。CloudCore 将以容器化的方式部署到云节点。

例如：

```shell
keadm init --advertise-address="THE-EXPOSED-IP" --profile version=v1.12.1 --kube-config=/root/.kube/config
```

输入：

```shell
Kubernetes version verification passed, KubeEdge installation will start...
CLOUDCORE started
=========CHART DETAILS=======
NAME: cloudcore
LAST DEPLOYED: Wed Oct 26 11:10:04 2022
NAMESPACE: kubeedge
STATUS: deployed
REVISION: 1
```

你可以运行 `kubectl get all -n kubeedge` 来确保 CloudCore 成功启动，如下所示。

```shell
# kubectl get all -n kubeedge
NAME                             READY   STATUS    RESTARTS   AGE
pod/cloudcore-56b8454784-ngmm8   1/1     Running   0          46s

NAME                TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)                                             AGE
service/cloudcore   ClusterIP   10.96.96.56   <none>        10000/TCP,10001/TCP,10002/TCP,10003/TCP,10004/TCP   46s

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/cloudcore   1/1     1            1           46s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/cloudcore-56b8454784   1         1         1       46s
```

**关键注意点：**

1. 为 CloudCore helm chart 设置 `--set key=value` 可以参考 [KubeEdge CloudCore Helm Charts README.md](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/README.md).

2. 你可以从 Keadm 的一个内置配置文件开始，然后根据您的特定需求进一步定制化。目前，内置的配置文件是 `version` 命名的文件。请参考 [`version.yaml`](https://github.com/kubeedge/kubeedge/blob/master/manifests/profiles/version.yaml) 作为 `values.yaml`，您可以基于此创建您的自定义配置，使用 `--profile version=v1.9.0 --set key=value` 来使用它。`--external-helm-root` 命令行参数提供了用于安装外部的 helm chart 组件的功能，如 edgemesh。

3. `keadm init` 默认情况下，以容器化方式部署 CloudCore。如果您想以二进制方式部署 CloudCore，请参考 [`keadm deprecated init`](#keadm-deprecated-init)。

示例：

```shell
keadm init --set server.advertiseAddress="THE-EXPOSED-IP" --set server.nodeName=allinone  --kube-config=/root/.kube/config --force --external-helm-root=/root/go/src/github.com/edgemesh/build/helm --profile=edgemesh
```

如果您熟悉 Helm Chart 安装，请参考 [KubeEdge Helm Charts](https://github.com/kubeedge/kubeedge/tree/master/manifests/charts).


### keadm manifest generate

你可以使用 `keadm manifest generate` 生成 manifests 文件。

示例：

```shell
keadm manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
```

> 使用 `--skip-crds` 命令行参数跳过输出 CRDs。

### keadm deprecated init

`keadm deprecated init` 以二进制进程形式安装 CloudCore，生成证书并安装 CRDs。它还提供了一个命令行参数，通过它可以设置特定的版本。

示例：

    ```shell
    keadm deprecated init --advertise-address="THE-EXPOSED-IP"
    ```

输出:
    ```
    Kubernetes version verification passed, KubeEdge installation will start...
    ...
    KubeEdge cloudcore is running, For logs visit:  /var/log/kubeedge/cloudcore.log
    CloudCore started
    ```

您可以运行 `ps -elf | grep cloudcore` 命令来确保 Cloudcore 成功运行。

    ```shell
    # ps -elf | grep cloudcore
    0 S root     2736434       1  1  80   0 - 336281 futex_ 11:02 pts/2   00:00:00 /usr/local/bin/cloudcore
    ```

## 设置边缘端（KubeEdge 工作节点）

### 从云端获取令牌

在**云端**运行 `keadm gettoken` 将返回 token 令牌，该令牌将在加入边缘节点时使用。

```shell
# keadm gettoken
27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE
```

### 加入边缘节点

#### keadm join

`keadm join` 安装 EdgeCore。它还提供了一个命令行参数，通过它可以设置特定的版本进行安装。它从 Docker Hub 拉取镜像 [kubeedge/installation-package](https://hub.docker.com/r/kubeedge/installation-package)，将 `edgecore` 二进制文件从镜像复制到主机路径，然后将 `edgecore` 作为系统服务启动。

示例：

```shell
keadm join --cloudcore-ipport="THE-EXPOSED-IP":10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE --kubeedge-version=v1.12.1
```

**关键注意点**

1. `--cloudcore-ipport` 是必填参数。
2. 加上 `--token` 会自动为边缘节点生成证书，如果您需要的话。
3. 需要保证云和边缘端使用的 KubeEdge 版本相同。

输出:

```shell
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```

您可以 `systemctl status edgecore` 命令来确认 EdgeCore 成功运行：

```shell
# systemctl status edgecore
● edgecore.service
   Loaded: loaded (/etc/systemd/system/edgecore.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2022-10-26 11:26:59 CST; 6s ago
 Main PID: 2745865 (edgecore)
    Tasks: 13 (limit: 4915)
   CGroup: /system.slice/edgecore.service
           └─2745865 /usr/local/bin/edgecore
```

#### keadm deprecated join

您可以使用 `keadm deprecated join` 命令依赖发布包启动 EdgeCore。它将从 [KubeEdge 发布网站](https://github.com/kubeedge/kubeedge/releases) 下载发布包，然后以进程形式中启动 `edgecore`。

示例：

```shell
keadm deprecated join --cloudcore-ipport="THE-EXPOSED-IP":10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE --kubeedge-version=1.12.0
```

输出:
```shell
MQTT is installed in this host
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```

### 在边缘节点上部署演示

参考 [在边缘节点上部署演示](https://kubeedge.io/docs/setup/install-with-binary#deploy-demo-on-edge-nodes) 文档。

### 启用 `kubectl logs` 功能

`kubectl logs` 必须在使用 metrics-server 之前部署，通过以下操作激活功能：

> Helm 部署的注意点：
> - Stream 证书是自动生成的，并且 CloudStream 特性是默认启用的。因此，除非需要自定义，否则可以跳过步骤 1-3。
> - 在默认情况下，iptablesmanager 组件可以完成第 4 步，因此不需要手动操作。请参考 [cloudcore helm values](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/values.yaml#L67).
> - 与 CloudCore 相关的步骤 5-6 的操作也可以跳过。

1. 确保您可以找到 Kubernetes 的 `ca.crt` 和 `ca.key` 文件。如果您通过 `kubeadm` 安装 Kubernetes 集群，这些文件将位于 `/etc/kubernetes/pki/` 目录中。

    ``` shell
    ls /etc/kubernetes/pki/
    ```

2. 设置 `CLOUDCOREIPS` 环境。环境变量设置为指定的 cloudcore 的 IP 地址，如果您具有高可用的集群，则可以指定 VIP（即弹性 IP/虚拟 IP）。 设置 `CLOUDCORE_DOMAINS` 如果 Kubernetes 使用域名与 CloudCore 通信。

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```

   （警告：建议使用同一 **终端** 来保持系统工作的持续，在必要时再次键入此命令。）使用以下命令检查环境变量：

    ``` shell
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

    使用 **certgen.sh** 生成证书
    ```bash
    /etc/kubeedge/certgen.sh stream
    ```

4. 需要在主机上设置 iptables。（此命令应该在每个 apiserver 部署的节点上执行。）（在这种情况下，须在 master 节点上执行，并由 root 用户执行此命令。） 在运行每个 apiserver 的主机上运行以下命令：

    **注意:** 首选，获取包含所有 CloudCore IP 和隧道端口的 ConfigMap：

    ```bash
    kubectl get cm tunnelport -nkubeedge -oyaml

    apiVersion: v1
    kind: ConfigMap
    metadata:
      annotations:
        tunnelportrecord.kubeedge.io: '{"ipTunnelPort":{"192.168.1.16":10350, "192.168.1.17":10351},"port":{"10350":true, "10351":true}}'
      creationTimestamp: "2021-06-01T04:10:20Z"
    ...
    ```

    然后为每个运行 apiserver 的节点设置多个 CloudCore 实例的 iptables。CloudCore IP 和隧道端口应能从上面的 ConfigMap 中获取。

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport $YOUR-TUNNEL-PORT -j DNAT --to $YOUR-CLOUDCORE-IP:10003
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to 192.168.1.16:10003
    iptables -t nat -A OUTPUT -p tcp --dport 10351 -j DNAT --to 192.168.1.17:10003
    ```

    如果您不确定是否设置了 iptables，并且希望清除所有这些表。（如果您错误地设置了 iptables，它将阻止您使用 `kubectl logs` 功能） 可以使用以下命令清理 iptables 规则：

    ``` shell
    iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
    ```

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

6. 重新启动所有 CloudCore 和 EdgeCore。

    ``` shell
    sudo su
    ```

    如果 CloudCore 是以进程模式运行的：

    ``` shell
    pkill cloudcore
    nohup cloudcore > cloudcore.log 2>&1 &
    ```

    如果 CloudCore 是以 Kubernetes Deployment 模式运行的：

    ``` shell
    kubectl -n kubeedge rollout restart deployment cloudcore
    ```

    EdgeCore:

    ``` shell
    systemctl restart edgecore.service
    ```

    如果您无法重启 edgecore，请检查是否是由于 `kube-proxy` 的缘故，同时杀死这个进程。 **kubeedge** 默认拒绝和该进程同时运行，我们使用 [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md) 来进行替代

    **注意：** 可以考虑避免 `kube-proxy` 部署在 edgenode 上。有两种解决方法：

    - 方法一： 通过调用 `kubectl edit daemonsets.apps -n kube-system kube-proxy` 添加以下设置：

    ``` yaml
    spec:
      template:
        spec:
          affinity:
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                  - key: node-role.kubernetes.io/edge
                    operator: DoesNotExist
    ```
    或者直接在 shell 窗口中运行以下命令：

    ```shell
    kubectl patch daemonset kube-proxy -n kube-system -p '{"spec": {"template": {"spec": {"affinity": {"nodeAffinity": {"requiredDuringSchedulingIgnoredDuringExecution": {"nodeSelectorTerms": [{"matchExpressions": [{"key": "node-role.kubernetes.io/edge", "operator": "DoesNotExist"}]}]}}}}}}}'
    ```

    - 方法 2： 如果您仍然要运行 `kube-proxy`，请在 `edgecore.service` 中添加环境变量，指示 **edgecore** 不检查环境：

    ``` shell
    sudo vi /etc/kubeedge/edgecore.service
    ```

    将以下行添加到 **edgecore.service** 文件：

    ``` shell
    Environment="CHECK_EDGECORE_ENVIRONMENT=false"
    ```

    最终文件应如下所示：

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

3. 应用 Deployment Yaml 部署文件。可以参考相关部署文档：https://github.com/kubernetes-sigs/metrics-server/tree/master/manifests

    **注意：** 下面的那些 iptables 必须应用在已运行 metric-server 机器上（精确地命名是网络名称空间，因此 metrics-server 也需要在主机网络模式下运行）

    ```
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
    ```
    （引导对 metric-data 的请求 edgecore:10250 至在 CloudCore 和 EdgeCore 之间的隧道中，iptables 至关重要。）

    您需要确保将 metrics-server 部署在运行 apiserver 的节点上，一般是 Kubernetes Master 节点。作为结果，需要通过以下命令使主节点可被调度：

    ``` shell
    kubectl taint nodes --all node-role.kubernetes.io/master-
    ```

    然后，在 deployment.yaml 文件中，必须指定 metrics-server 部署在主节点上。（选择主机名作为标记的标签。）

    在**metrics-server-deployment.yaml**中
    ``` yaml
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

**IMPORTANT NOTES:**
**关键注意点**

1. Metrics-server 需要使用主机网络网络模式。

2. 使用您自己编译的镜像，并将 imagePullPolicy 设置为 Never。

3. 为 Metrics 服务器启用 --kubelet-use-node-status-port 功能

    需要将这些设置写入部署 yaml（metrics-server-deployment.yaml）文件中，如下所示：

    ``` yaml
          volumes:
          # mount in tmp so we can safely use from-scratch images and/or read-only containers
          - name: tmp-dir
            emptyDir: {}
          hostNetwork: true                          #Add this line to enable hostnetwork mode
          containers:
          - name: metrics-server
            image: metrics-server-kubeedge:latest    #Make sure that the REPOSITORY and TAG are correct
            # Modified args to include --kubelet-insecure-tls for Docker Desktop (don't use this flag with a real k8s cluster!!)
            imagePullPolicy: Never                   #Make sure that the deployment uses the image you built up
            args:
              - --cert-dir=/tmp
              - --secure-port=4443
              - --v=2
              - --kubelet-insecure-tls
              - --kubelet-preferred-address-types=InternalDNS,InternalIP,ExternalIP,Hostname
              - --kubelet-use-node-status-port       #Enable the feature of --kubelet-use-node-status-port for Metrics-server
            ports:
            - name: main-port
              containerPort: 4443
              protocol: TCP
    ```

## 重置 KubeEdge master 节点和工作节点

### Master
`keadm reset`将停止 `cloudcore` 并从 Kubernetes master 中删除与 KubeEdge 相关的资源，如 `kubeedge` 命名空间。它不会卸载/删除任何前置的软件。

它为用户提供了一个命令行参数，以指定 kubeconfig 路径，默认路径为 `/root/.kube/config` 。

示例：
```shell
 keadm reset --kube-config=$HOME/.kube/config
 # or
 keadm deprecated reset
```

### 节点

`keadm reset` 或 `keadm deprecated reset` 将停止 `edgecore` ，并且不会卸载/删除任何前置的软件。

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


## 离线安装

在一些应用场景中，用户需要在隔离互联网的环境中进行 KubeEdge 的组件安装。Keadm 在命令行参数中并没有类似于 offline-mode 这样的参数，但只要在环境中预先加载匹配的镜像，也能实现离线安装的目的。

### 云侧离线安装

`keadm init` 在安装过程中会在以下情况下对网络资源进行请求；

1. 未指定版本信息，或者错误指定版本信息时， 会访问 [lastversion](https://kubeedge.io/latestversion) 获取最新 KubeEdge 版本
2. 经由 Helm 安装的 Chart 根据配置设置会依赖 [kubeedge/cloudcore](https://hub.docker.com/r/kubeedge/cloudcore)、[kubeedge/iptables-manager](https://hub.docker.com/r/kubeedge/iptables-manager)和 [kubeedge/controller-manager](https://hub.docker.com/r/kubeedge/controller-manager) 镜像，默认配置下仅依赖 cloudcore 和 iptables-manager 镜像。

**注意**: Helm Chart 被以 go embed 方式打包到 keadm 二进制文件中，所以不需要额外的网络请求。

只要正确地设置了 KubeEdge 的版本信息，对于 lastversion 的请求就不会发生，例如

```shell
keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=1.18.0 --kube-config=/root/.kube/config
```

在可联网主机，通过工具将镜像拉取和导出，具体的工具根据您自身的情况选择，例如 `docker`，`crictl`，`skopeo` 等。

以下是以 `docker` 为工具，`cloudcore` 镜像为目标进行操作，其他镜像类似：
```shell
docker pull kubeedge/cloudcore:v1.18.0
docker save -o cloudcore.tar kubeedge/cloudcore:v1.18.0
```
离线环境下镜像的导入要不然直接导入到工作节点上，要不然导入是离线环境中私有镜像中心，前者需要开发者保证部署服务所在节点是导入镜像的节点，后者则需要在 `keadm init` 时通过配置文件的形式替换服务的镜像地址。

假设 cloudcore 镜像在私有镜像中心的地址为 `self-registry.io/kubeedge/cloudcore:v1.18.0`，通过 `--set` 命令行参数在初始化进行替换，如下示例：

```shell
keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=1.18.0 --set cloudCore.image.repository=self-registry.io/kubeedge/cloudcore --kube-config=/root/.kube/config
```

### 边缘侧离线安装

如前所言，`keadm join` 执行过程中会下载 [kubeedge/installation-package](https://hub.docker.com/r/kubeedge/installation-package)，并从中提取 `edgecore` 二进制文件。在离线环境中，用户需要将 installation-package 镜像导入到待加入集群的边缘节点上，根据边缘节点的容器运行时选择合适的工具进行导入，例如 docker 使用 `docker` 命令，containerd 使用 `ctr` 命令等，以下是以 `docker` 为例的操作：

```shell
# 在有网络的环境中执行
docker pull kubeedge/installation-package:v1.18.0
docker save -o installation-package.tar kubeedge/installation-package:v1.18.0
# 将 installation-package.tar 拷贝到边缘节点，然后导入节点中
docker load -i installation-package.tar
```

除了 installation-package 镜像外，默认情况下，在边缘节点还需要导入 [eclipse-mosquitto](https://hub.docker.com/_/eclipse-mosquitto) 镜像，原因是 `keadm init` 安装的 Helm Chart 中包含了一个 Mosquitto 的 DaemonSet 部署，用于在边缘节点上运行 MQTT 代理服务，以下是兼容 CRI 的 `crictl` 为例子的操作:

```shell
# 在有网络的环境中执行
docker pull eclipse-mosquitto:1.6.15
docker save -o eclipse-mosquitto.tar eclipse-mosquitto:1.6.15
# 将 eclipse-mosquitto.tar 拷贝到边缘节点，然后导入节点中
docker load -i eclipse-mosquitto.tar
```
