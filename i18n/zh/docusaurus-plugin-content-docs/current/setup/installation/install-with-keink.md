---
title: keink部署KubeEdge
sidebar_position: 3
---

此方法仅用于试用 KubeEdge，请勿在生产环境中使用。

## Keink

keink（代表 [kind](https://github.com/kubernetes-sigs/kind) 在 [KubeEdge](https://github.com/kubeedge/kubeedge) 中的实现）是一个使用 Docker 容器 "节点" 运行本地 KubeEdge 集群的工具。在一台机器上就可以轻松启动KubeEdge集群。

## 环境准备

### KubeEdge 代码

​ 需要下载 KubeEdge 代码到本地，推荐放在 `$GOPATH` 目录下，因为 keink 可以自动查找到该目录下的 KubeEdge 源码，或者可以手动输入代码位置。

​ 在运行 `bin/keink build edge-image` 命令来构建包含 KubeEdge 组件 cloudcore、edgecore 和 keadm 的 kubeedge/node 镜像时，keink 将使用上述 KubeEdge 源代码。

### Keink 代码

​ 拉取 keink 代码到本地。需要从源码构建 Keink 二进制文件。进入 keink 文件夹，通过make命令构建二进制文件。

```shell
# build keink binary
make
```

### 其他环境

本地还需要安装docker、go、kind、kubectl、containerd。

部署最新KubeEdge v1.17推荐版本：

```
docker 26.0.0
go 1.22.1
kind 0.22.0
kubectl 1.29.3
containerd 1.7.15
```

## 启动KubeEdge集群

### 构建节点镜像

```shell
bin/keink build edge-image
```

keink 会在 `$GOPATH` 路径下寻找 KubeEdge 代码路径，如果并未找到，则自动拉取代码到本地。

也可以使用 `--kube-root` 指定本地 KubeEdge 目录。

如：

```shell
bin/keink build edge-image --kube-root /home/user/go/src/kubeedge
```

也可以使用`--base-image` 指定不同版本的k8s镜像。

如：

```shell
bin/keink build edge-image --base-image kindest/node:v1.28.7@sha256:9bc6c451a289cf96ad0bbaf33d416901de6fd632415b076ab05f5fa7e4f65c58 --kube-root ../kubeedge
```

### 创建集群

输入如下命令，使用上一步构建的镜像启动 KubeEdge 集群。

```shell
# create KubeEdge cluster based on the k8s cluster
bin/keink create kubeedge --image kubeedge/node:latest --wait 120s
```

可以看到如下内容：

```shell
# bin/keink create kubeedge --image kubeedge/node:latest --wait 120s 
Creating cluster "kind" ...
 ✓ Ensuring node image (kubeedge/node:latest) 🖼
 ✓ Preparing nodes 📦 📦  
 ✓ Writing configuration 📜 
 ✓ Starting control-plane 🕹️ 
 ✓ Installing CNI 🔌 
 ✓ Installing StorageClass 💾 
 ✓ Joining worker nodes 🚜 
 ✓ Waiting ≤ 3m20s for control-plane = Ready ⏳ 
 • Ready after 0s 💚
 ✓ Starting KubeEdge 📜
```

可以使用 `kubectl get node -owide` 查看节点状态。

```shell
# kubectl get node -owide
NAME                 STATUS   ROLES                  AGE    VERSION                                                   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE       KERNEL-VERSION       CONTAINER-RUNTIME
kind-control-plane   Ready    control-plane,master   116s   v1.29.1                                                   172.18.0.2    <none>        Ubuntu 21.10   4.15.0-169-generic   containerd://1.5.10
kind-worker          Ready    agent,edge             50s    v1.27.7-kubeedge-v1.16.0-beta.0.42+6dcb291c228861-dirty   172.18.0.3    <none>        Ubuntu 21.10   4.15.0-169-generic   containerd://1.5.10
```

如果启动集群存在问题，可以通过 `bin/keink export logs`命令生成日志。

```shell
# bin/keink export logs
Exporting logs for cluster "kind" to:
/tmp/1650693209
```

部署一个nginx示例到edge-node。

```shell
kubectl apply -f ./pod.yaml
```

查看nginx pod运行情况。

```shell
# kubectl get pod -owide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE          NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          30s   10.244.1.2   kind-worker   <none>           <none>
```

如上，可以看到nginx pod在edge节点上成功运行。

恭喜，使用keink成功运行了KubeEdge集群！