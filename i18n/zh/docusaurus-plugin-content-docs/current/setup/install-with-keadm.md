---
title: 使用Keadm进行部署
sidebar_position: 3
---

Keadm 是一款用于安装 KubeEdge 的工具。
Keadm 不负责 K8s 的安装和运行,在使用它之前，请先准备好一个 K8s 集群。

KubeEdge 对 Kubernetes 的版本兼容性，更多详细信息您可以参考 [kubernetes-兼容性](https://github.com/kubeedge/kubeedge#kubernetes-compatibility)
来了解，以此来确定安装哪个版本的 Kubernetes 以及 KubeEdge。

## 使用限制

- `keadm` 目前支持 Ubuntu 和 CentOS OS。RaspberryPi 的支持正在进行中。
- 需要超级用户权限（或 root 权限）才能运行。


## 安装keadm
有三种方式下载keadm二进制文件，分别是：
- 从github下载：[github releases](https://github.com/kubeedge/kubeedge/releases)  
kubeEdge Github 官方提供了三种架构的发布版本： arm64, arm和amd64。 请根据您的平台和所需的版本下载正确的软件包
    ```shell
    wget https://github.com/kubeedge/kubeedge/releases/download/v1.17.0/keadm-v1.17.0-linux-amd64.tar.gz
    tar -zxvf keadm-v1.17.0-linux-amd64.tar.gz
    cp keadm-1.17.0-linux-amd64/keadm/keadm /usr/local/bin/keadm
    ```
	
- 下载dockerhub KebeEdge的官方发行版本
  ```shell
  docker run --rm kubeedge/installation-package:v1.17.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm && chmod +x /usr/local/bin/keadm
  ```
  
- 从源代码编译安装：  
有两种方案可以让您从源码编译安装KubeEdge：  
1. 如果您有一个本地Go的编译环境，那么可以执行下面的命令在本地编译KubeEdge  
	```shell
	git clone https://github.com/kubeedge/kubeedge.git
	cd kubeedge
	make BUILD_WITH_CONTAINER=false
	```

2. 如果您有一个容器化的工作环境，并希望在容器内编译KubeEdge以简化环境的设置，那么您可以执行下面的命令：  
	```shell
	git clone https://github.com/kubeedge/kubeedge.git
	cd kubeedge
	make
	```

您可以从`_output/local/bin`找到上面两种方案编译出来的Kubeedge

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
4. 在 v1.11.0 之后，`keadm init` 默认实现容器化部署CloudCore，如果您希望以二进制包来部署CloudCore，请参考 [`keadm deprecated init`](#keadm-deprecated-init).

举个例子：

```shell
# keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.17.0  --kube-config=/root/.kube/config (only work since 1.3 release)
```

输出：

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
您也可以运行 `kubectl get all -n kubeedge` 来确认KubeEdge的云端组件 cloudcore 已经成功运行
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

**重要提示：**
在 `keadm init` 中：
1. 自定义 `--set key=value`
   值可以参考 [KubeEdge Cloudcore Helm Charts README.md](https://github.com/kubeedge/kubeedge/blob/master/build/helm/charts/cloudcore/README.md)
2. 您可以从 Keadm 的一个内置配置概要文件开始，然后根据您的特定需求进一步定制配置。目前，内置的配置概要文件关键字是 `version`
   。请参考 [`version.yaml`](https://github.com/kubeedge/kubeedge/blob/master/manifests/profiles/version.yaml)
   ，您可以在这里创建您的自定义配置文件, 使用 `--kubeedge-version=v1.17.0 --set key=value` 来使用它。

此外，还可使用 `--external-helm-root` 安装外部的 helm chart 组件，如 edgemesh 。

举个例子:

```shell
# keadm init --set server.advertiseAddress="THE-EXPOSED-IP" --set server.nodeName=allinone  --kube-config=/root/.kube/config --force --external-helm-root=/root/go/src/github.com/edgemesh/build/helm --profile=edgemesh
```

如果您对 Helm Chart 比较熟悉，可以直接参考 [KubeEdge Helm Charts](https://github.com/kubeedge/kubeedge/tree/master/keadm/cmd/keadm/app/cmd/helm)
进行安装。

### keadm manifest generate

`keadm manifest generate` 可以帮助我们快速渲染生成期望的 manifests 文件，并输出在终端显示。

举例如下:

```shell
# keadm manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
```
> 使用 --skip-crds 跳过打印 CRDs

### keadm deprecated init 

`keadm deprecated init` 是以二进制包方式进行安装CloudCore，生成证书并安装CRDs，并提供了安装版本的选择。

1. 必须正确配置 kubeconfig 或 master 中的至少一个，以便可以将其用于验证 k8s 集群的版本和其他信息。
2. 请确保边缘节点可以使用云节点的本地 IP 连接云节点，或者需要使用 `--advertise-address` 标记指定云节点的公共 IP 。
3. `--advertise-address`是云端公开的地址（将添加到 CloudCore 证书的 SAN 中），默认值为本地 IP。
举例如下:
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

    您也可也通过 `ps -elf | grep cloudcore` 来验证Cloudcore是否正确运行。

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

`keadm join` 将安装 EdgeCore。它还提供了一个命令行参数，通过它可以设置特定的版本。它也会从dockerhub下载 [kubeedge/installation-package](https://hub.docker.com/r/kubeedge/installation-package) 镜像文件并复制二进制文件`edgecore`到hostpath，并作为系统服务启动。

举个例子：

```shell
# keadm join --cloudcore-ipport=192.168.20.50:10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE --kubeedge-version=v1.17.0
```

**重要提示：**

1. `--cloudcore-ipport` 是必填参数。
2. 加上 `--token` 会自动为边缘节点生成证书，如果您需要的话。
3. 需要保证云和边缘端使用的 KubeEdge 版本相同。

输出：

```shell
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```

您也可以使用 `systemctl status edgecore` 来检查edgecore是否正确运行。
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

您可以使用 `keadm deprecated join` 来启动EdgeCore的release版本. 它会从 [KubeEdge release website](https://github.com/kubeedge/kubeedge/releases) 下载并作为系统服务启动。

举个例子:

```shell
keadm deprecated join --cloudcore-ipport="THE-EXPOSED-IP":10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE --kubeedge-version=1.12.0
```

输出:

```shell
MQTT is installed in this host
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```

## 部署边缘节点演示

在您成功启动CloudCore和EdgeCore以后，您可以使用 `kubectl get node` 来确保EdgeCore成功注册到CloudCore。

```shell
# kubectl get node
NAME                 STATUS   ROLES                  AGE     VERSION
ecs-8f95             Ready    agent,edge             5m45s   v1.22.6-kubeedge-v1.12.0
kind-control-plane   Ready    control-plane,master   13m     v1.23.4
```
现在，我们可以执行下面的命令在边缘节点发布一个Pod  

```shell
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
  nodeSelector:
    "node-role.kubernetes.io/edge": ""
EOF
```
如下所示，我们的边缘节点部署Pod就成功完成了：  

```shell
# kubectl get pod -owide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          11s   172.17.0.2   ecs-8f95   <none>           <none>
```
恭喜您，KubeEdge集群已经成功运行。


## 启用 `kubectl logs/exec` 功能

Before deploying the metrics-server, the `kubectl logs/exec` feature must be activated.
Refer to the [启用 Kubectl logs/exec/attach 操作边缘 pods](../advanced/debug.md) documentation.

## 在云端支持 Metrics-server

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

3. 部署 yaml 应用。可以参考相关部署文档：https://github.com/kubernetes-sigs/metrics-server/tree/master/manifests

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

`keadm reset` 或者 `keadm deprecated reset` 将停止 `cloudcore` 并从 Kubernetes master 中删除与 KubeEdge 相关的资源，如 `kubeedge` 命名空间。它不会卸载/删除任何先决条件。

它为用户提供了一个标志，以指定 kubeconfig 路径，默认路径为 `/root/.kube/config` 。

例子：

```shell
 # keadm reset --kube-config=$HOME/.kube/config
 # or
 # keadm deprecated reset
```

### 节点

`keadm reset` 或者 `keadm deprecated reset` 将停止 `edgecore` ，并且不会卸载/删除任何先决条件。
