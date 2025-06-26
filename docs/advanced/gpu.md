---
title: Edge Pods use GPU
sidebar_position: 5
---

## Abstract

With the development of edge AI, the demand for deploying GPU applications on edge nodes is gradually increasing. Currently, KubeEdge can manage GPU nodes through some configurations, 
and allocate GPU resources to user edge applications through the k8s device-plugin component. If you need to use this feature, please refer to the steps below.

## Getting Started

### GPU running environment construction

Using GPU on edge nodes requires building a GPU operating environment first, which mainly includes the following steps:

1. Install GPU driver

First you need to determine whether the edge node machine has GPU. You can use the `lspci | grep NVIDIA` command to check. Download the appropriate GPU driver according to the specific GPU model and complete the installation. 
After the installation is complete, you can use the `nvidia-smi` command to check whether the driver is installed successfully.

2. Download container runtime

To connect the GPU node to the KubeEdge cluster, you need to first install container runtimes such as Docker and Containerd. 
For specific installation guides, please refer to [Container Runtime](https://kubeedge.io/docs/setup/prerequisites/runtime)

:::tip
Since KubeEdge v1.14, support for Dockershim has been removed, and use Docker runtime to manage edge containers is no longer supported. If you still need to use Docker, you need to install [cri-dockerd](https://kubeedge.io/docs/setup/prerequisites/runtime#docker-engine) after installing Docker.
:::

3. Install Nvidia-Container-Toolkit

- If the edge node can directly access the external network, it can be installed directly according to the [official documentation](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).
- If the edge node cannot directly access the external network, you need to download the official [offline installation package](https://github.com/NVIDIA/nvidia-container-toolkit/releases) on a machine with network connectivity, 
  and transfer the installation package to the edge node to complete decompression. After decompression, the following files should appear in the directory:

```shell
   root@edgenode:~/release-v1.16.0-rc.1-experimental/packages/ubuntu18.04/amd64# ls
   libnvidia-container1_1.16.0~rc.1-1_amd64.deb      libnvidia-container-tools_1.16.0~rc.1-1_amd64.deb      nvidia-container-toolkit-operator-extensions_1.16.0~rc.1-1_amd64.deb
   libnvidia-container1-dbg_1.16.0~rc.1-1_amd64.deb  nvidia-container-toolkit_1.16.0~rc.1-1_amd64.deb
   libnvidia-container-dev_1.16.0~rc.1-1_amd64.deb   nvidia-container-toolkit-base_1.16.0~rc.1-1_amd64.deb
```

Execute the following command in this directory to complete the installation:

```shell
   sudo apt install ./*
```

4. Configure container runtime to support GPU

After successfully installing Nvidia-Container-Toolkit, you can use `nvidia-ctk` to configure each container runtime to support GPU.

```shell
# docker
sudo nvidia-ctk runtime configure --runtime=docker --set-as-default
# containerd
sudo nvidia-ctk runtime configure --runtime=containerd --set-as-default
``` 

5. Restart container runtime

Restart the container runtime and confirm whether GPU is supported.

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


Through the above steps, the edge node already has a GPU driver, and the container runtime also has the ability to allocate GPU devices. Next, the edge node can be managed into the KubeEdge cluster.

### Edge GPU node management

Hosting edge GPU nodes mainly includes the following steps:

1. Manage the node to the cluster

It is recommended to use the keadm tool to manage edge nodes to the KubeEdge cluster. The access method is the same as ordinary edge nodes. For detailed information, please refer to [keadm join](https://kubeedge.io/docs/setup/install-with-keadm#setup-edge-side-kubeedge-worker-node). 
Here, Docker and Containerd container runtime are used as examples:

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

Output:

```shell
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```  

You can run the `systemctl status edgecore` command to confirm whether EdgeCore is running successfully:

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

2. Deploy k8s-device-plugin

You can create k8s-device-plugin daemonSet according to the following yaml file.

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

Check whether k8s-device-plugin is deployed successfully:

```shell
# After deployment, check whether it is successfully deployed on the edge node
[root@master-01 ~]# kubectl get daemonsets.apps -n kube-system|grep nvidia
NAME                             DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
nvidia-device-plugin-daemonset   2         2         2       2            2           <none>                   292d
[root@master-01 ~]# kubectl get po -n kube-system -owide|grep nvidia
nvidia-device-plugin-daemonset-d5nbc   1/1     Running   0                22m    10.88.0.4      nvidia-edge-node      <none>           <none>
nvidia-device-plugin-daemonset-qbwdd   1/1     Running   0                2d6h   10.88.0.2      nano-1iamih8np        <none>           <none>
```  

After successfully deploying k8s-device-plugin, you can use the `kubectl describe node` command to verify whether the node GPU information is reported correctly.

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

If the `nvidia.com/gpu` resource appears in the node information, the edge GPU node has been successfully managed into the KubeEdge cluster, and the GPU resource can be directly 
allocated by the application's yaml file. You can deploy the test application as follows to verify the GPU allocation capability.

### Test GPU resource allocation ability

1. Deploy GPU applications

You can use the sample yaml shown below to deploy a pytorch edge application that uses one GPU resource.

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

2. Verify whether the GPU is successfully mounted

Enter the container created by this application and call the `torch.cuda.is_available()` command in pytorch to verify whether the GPU is successfully mounted.

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
