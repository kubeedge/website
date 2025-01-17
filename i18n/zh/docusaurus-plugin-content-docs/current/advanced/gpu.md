---
title: 边缘Pod使用GPU
sidebar_position: 9
---

## 概要

随着边缘 AI 的发展，在边缘节点上部署 GPU 业务的需求也逐渐增多。当前 KubeEdge 能够通过一些配置纳管 nvidia GPU 节点，并且通过 k8s device-plugin 组件为用户边缘应用分配 GPU 资源。如果您需要使用该特性，请参考下面的步骤。

## 操作步骤

### GPU运行环境构建

在边缘节点上使用 GPU 需要先构建 GPU 运行环境，主要包括以下几个步骤：

1. 安装 GPU 驱动

首先需要确定边缘节点机器是否有 GPU。可以使用`lspci | grep NVIDIA`命令来检查。根据具体 GPU 型号下载合适的 GPU 驱动并完成安装。安装完成后可以使用`nvidia-smi`命令检查驱动是否安装成功。

2. 下载容器运行时

将 GPU 节点接入 KubeEdge 集群，需要先安装如 Docker、Containerd 之类的容器运行时，具体的安装指南可以参考[Container Runtime](https://kubeedge.io/docs/setup/prerequisites/runtime)

:::tip
自 KubeEdge v1.14版本起，已经移除了对 Dockershim 的支持，不再支持直接使用 Docker 运行时管理边缘容器。如仍需使用Docker，在安装 Docker 后还需安装[cri-dockerd](https://kubeedge.io/docs/setup/prerequisites/runtime#docker-engine)。
:::

3. 安装 Nvidia-Container-Toolkit
- 如果边缘节点能够直接访问外部网络，可以直接按照[官方文档](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)进行安装
- 如果边缘节点无法直接访问外部网络，则需要在网络可以联通的机器上下载[官方离线安装包](https://github.com/NVIDIA/nvidia-container-toolkit/releases)，将安装包传入边缘节点完成解压。
  解压后目录中应该出现如下的文件：

```shell
   root@edgenode:~/release-v1.16.0-rc.1-experimental/packages/ubuntu18.04/amd64# ls
   libnvidia-container1_1.16.0~rc.1-1_amd64.deb      libnvidia-container-tools_1.16.0~rc.1-1_amd64.deb      nvidia-container-toolkit-operator-extensions_1.16.0~rc.1-1_amd64.deb
   libnvidia-container1-dbg_1.16.0~rc.1-1_amd64.deb  nvidia-container-toolkit_1.16.0~rc.1-1_amd64.deb
   libnvidia-container-dev_1.16.0~rc.1-1_amd64.deb   nvidia-container-toolkit-base_1.16.0~rc.1-1_amd64.deb
```

在该目录中执行下方的命令完成安装：

```shell
   sudo apt install ./*
```

4. 配置容器运行时支持 GPU
   
成功安装 Nvidia-Container-Toolkit 后，可以使用`nvidia-ctk`来配置各个容器运行时支持 GPU

```shell
# docker
sudo nvidia-ctk runtime configure --runtime=docker --set-as-default
# containerd
sudo nvidia-ctk runtime configure --runtime=containerd --set-as-default
```   

5. 重启容器运行时

重启容器运行时，并且确认是否已经支持 GPU

```shell
# docker:
systemctl daemon-reload && systemctl restart docker
# Check whether the runtime is modified successfully.
root@nano-desktop:~# docker info |grep Runtime
 Runtimes: io.containerd.runc.v2 io.containerd.runtime.v1.linux nvidia runc
 Default Runtime: nvidia

# containerd:
systemctl daemon-reload && systemctl restart containerd
# Check whether the runtime is modified successfully.
root@edgenode:~# cat /etc/containerd/config.toml |grep nvidia
      default_runtime_name = "nvidia"
        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia]
          [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia.options]
            BinaryName = "/usr/bin/nvidia-container-runtime"
```  

通过以上步骤，边缘节点已经拥有 GPU 驱动，容器运行时也具备了 GPU 设备的调用能力，接下来可以将边缘节点正式纳管进 KubeEdge 集群。

### 边缘GPU节点纳管

纳管边缘 GPU 节点主要包括以下几个步骤：

1. 将节点接入集群

推荐使用 keadm 工具将边缘节点接入 KubeEdge 集群，接入方式与普通边缘节点一致，详细信息可参考[keadm join](https://kubeedge.io/docs/setup/install-with-keadm#setup-edge-side-kubeedge-worker-node)。

这里以 Docker 和 Containerd 容器运行时作为示例：

```shell
# docker:
keadm join --cgroupdriver=systemd \
	--cloudcore-ipport="THE-EXPOSED-IP":10000 \
	--kubeedge-version=v1.17.0 \
	--token="YOUR TOKEN"
	--remote-runtime-endpoint=unix:///var/run/cri-dockerd.sock
# containerd:
keadm join --cgroupdriver=cgroupfs \
	--cloudcore-ipport="THE-EXPOSED-IP":10000 \
	--kubeedge-version=v1.17.0 \
	--token="YOUR TOKEN"
	--remote-runtime-endpoint=unix:///run/containerd/containerd.sock
	
```  

输出：

```shell
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```  
你可以运行`systemctl status edgecore`命令确认 EdgeCore 是否运行成功：

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

2. 部署 k8s-device-plugin

可以按照以下 yaml 文件创建 k8s-device-plugin daemonSet.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
   name: nvidia-device-plugin-daemonset
   namespace: kube-system
spec:
   revisionHistoryLimit: 10
   selector:
      matchLabels:
         name: nvidia-device-plugin-ds
   template:
      metadata:
         labels:
            name: nvidia-device-plugin-ds
      spec:
         containers:
            - env:
                 - name: FAIL_ON_INIT_ERROR
                   value: "false"
              image: nvcr.io/nvidia/k8s-device-plugin:v0.14.3
              imagePullPolicy: IfNotPresent
              name: nvidia-device-plugin-ctr
              resources: {}
              securityContext:
                 allowPrivilegeEscalation: false
                 capabilities:
                    drop:
                       - ALL
              terminationMessagePath: /dev/termination-log
              terminationMessagePolicy: File
              volumeMounts:
                 - mountPath: /var/lib/kubelet/device-plugins
                   name: device-plugin
         dnsPolicy: ClusterFirst
         priorityClassName: system-node-critical
         restartPolicy: Always
         schedulerName: default-scheduler
         securityContext: {}
         terminationGracePeriodSeconds: 30
         tolerations:
            - effect: NoSchedule
              key: nvidia.com/gpu
              operator: Exists
         volumes:
            - hostPath:
                 path: /var/lib/kubelet/device-plugins
                 type: ""
              name: device-plugin	
```

检查 k8s-device-plugin 是否成功部署：

```shell
# After deployment, check whether it is successfully deployed on the edge node
[root@master-01 ~]# kubectl get daemonsets.apps -n kube-system|grep nvidia
NAME                             DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
nvidia-device-plugin-daemonset   2         2         2       2            2           <none>                   292d
[root@master-01 ~]# kubectl get po -n kube-system -owide|grep nvidia
nvidia-device-plugin-daemonset-d5nbc   1/1     Running   0                22m    10.88.0.4      nvidia-edge-node      <none>           <none>
nvidia-device-plugin-daemonset-qbwdd   1/1     Running   0                2d6h   10.88.0.2      nano-1iamih8np        <none>           <none>
```  

成功部署 k8s-device-plugin 后，可以使用`kubectl describe node`命令验证节点 GPU 信息是否正确上报

```shell
# Seeing the key of [nvidia.com/gpu] under the Capacity and Allocatable fields indicates that the device-plugin is deployed successfully and the GPU information of 
# the node has been successfully reported.
[root@master-01 nvidia-test]# kubectl describe node {YOUR EDGENODE NAME}
Name:               nvidia-edge-node
Roles:              agent,edge
Labels:             beta.kubernetes.io/arch=amd64
...
Capacity:
  cpu:                12
  ephemeral-storage:  143075484Ki
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             40917620Ki
  nvidia.com/gpu:     1
  pods:               110
Allocatable:
  cpu:                12
  ephemeral-storage:  131858365837
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             40815220Ki
  nvidia.com/gpu:     1
  pods:               110
```  
如果节点信息中出现了 nvidia.com/gpu 资源，则边缘 GPU 节点已经成功纳管进 KubeEdge 集群，可以直接在应用的 yaml 文件中调用 GPU 资源。可以按照以下方法部署测试应用来验证 GPU 调用能力。

### 测试GPU资源调用能力

1. 部署 GPU 应用

可以使用下方所示的示例 yaml，部署一个 pytorch 的边缘应用，该应用使用一个 GPU 资源。

```yaml
kind: Deployment
apiVersion: apps/v1
metadata:
   name: test-gpu
   namespace: default
spec:
   replicas: 1
   selector:
      matchLabels:
         app: test-gpu
   template:
      metadata:
         labels:
            app: test-gpu
      spec:
         containers:
            - name: container-1
              image: pytorch/pytorch:2.2.0-cuda12.1-cudnn8-devel
              command:
                 - tail
                 - '-f'
                 - /dev/null
              resources:
                 limits:
                    nvidia.com/gpu: '1'
                 requests:
                    nvidia.com/gpu: '1'
              imagePullPolicy: IfNotPresent
         nodeName: nvidia-edge-node
```

2. 验证GPU是否成功挂载

进入这个应用创建的容器中，调用 pytorch 中的`torch.cuda.is_available()`命令验证 GPU 是否成功挂载

```shell
# docker
root@nano-desktop:~# docker ps
CONTAINER ID   IMAGE                       COMMAND                  CREATED          STATUS          PORTS     NAMES
e7e3804626a5   853b58c1dce6                "tail -f /dev/null"      53 seconds ago   Up 45 seconds             k8s_container-1_test-gpu-arm64-nano-7f8fd7f79f-hzvp5_default_64fb7a90-b0e6-4b46-a34f-8a06b24b9169_0
root@nano-desktop:~# docker exec -it e7e3804626a5 /bin/bash
root@test-gpu-arm64-nano-7f8fd7f79f-hzvp5:/# python3
Python 3.8.10 (default, Nov 14 2022, 12:59:47)
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True

# containerd
root@edgenode:~# crictl ps
CONTAINER           IMAGE               CREATED             STATE               NAME                       ATTEMPT             POD ID              POD
de1f1e60abc0a       0dd75116a8ce8       2 minutes ago       Running             container-1                0                   6beffb412af3f       test-gpu-6bfbdc9449-jfbrl
root@edgenode:~# crictl exec -it de1f1e60abc0a /bin/bash
root@test-gpu-6bfbdc9449-jfbrl:/workspace# python3
Python 3.10.13 (main, Sep 11 2023, 13:44:35) [GCC 11.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True
```  
