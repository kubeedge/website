---
title: 容器运行时
sidebar_position: 3
---

你需要在每个边缘节点上安装一个容器运行时，以使边缘引擎EdgeCore能够成功安装，并且边缘Pod可以运行在边缘节点上。

本页简要介绍在KubeEdge中常见的几种容器运行时的安装与配置过程。

- [containerd](#containerd)
- [cri-o](#cri-o)
- [docker](#docker-engine)
- [Kata containers](#kata-containers)
- [Virtlet](#Virtlet)

## containerd

### 安装与配置containerd

首先你需要安装containerd，请参考[containerd安装指南](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)进行操作。

:::tip
如果你使用KubeEdge v1.15.0以及以上版本，请安装v1.6.0或更高版本的containerd。
:::

如果在`/etc/containerd/`目录下没有containerd的配置文件，你可以执行如下命令生成配置文件并重启containerd。

```bash
containerd config default > /etc/containerd/config.toml
systemctl restart containerd
```

:::tip
如果你从软件包（例如RPM或者.deb）中安装 containerd，你可能会发现其中默认禁止了 CRI 集成插件。

你需要启用 CRI 支持在KubeEdge场景下使用 containerd。 要确保 cri 没有出现在 /etc/containerd/config.toml 文件中 disabled_plugins 列表内。如果你更改了这个文件，也请记得要重启 containerd。
:::

如果你需要更新沙箱(pause)镜像，你也可以通过在containerd的配置文件中修改如下设置来实现：

```bash
[plugins."io.containerd.grpc.v1.cri"]
  sandbox_image = "kubeedge/pause:3.6"
```

你还可以通过containerd的配置文件查看或更新containerd的cgroup驱动

```bash
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  ...
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true
```

:::tip
如果你修改了配置文件，请确保重新启动 containerd。
:::

### 使用Keadm安装EdgeCore的运行时配置

如果你使用Keadm安装EdgeCore时，你需要设置--remote-runtime-endpoint=unix:///run/containerd/containerd.sock。 

:::tip

如果你使用的是KubeEdge v1.12或之前的版本，你还需要在执行keadm join时设置--runtimetype=remote

在Windows上，请使用--remote-runtime-endpoint=npipe://./pipe/containerd-containerd来配置CRI端点

:::

KubeEdge默认使用`cgroupfs` cgroup驱动，如果你需要使用`systemd` cgroup驱动，你需要保证containerd配置了`systemd` cgroup，在执行keadm join时设置--cgroupdriver=systemd。

### 使用二进制安装EdgeCore的运行时配置

如果使用二进制方式安装EdgeCore，你需要更新EdgeCore的配置文件`edgecore.yaml`，修改如下参数: 

KubeEdge v1.15以及之前的版本:
```yaml
modules:
  edged:
    containerRuntime: remote
    remoteImageEndpoint: unix:///run/containerd/containerd.sock
    remoteRuntimeEndpoint: unix:///run/containerd/containerd.sock
```

KubeEdge默认使用`cgroupfs` cgroup驱动，如果你需要使用`systemd` cgroup驱动，你需要保证containerd配置了`systemd` cgroup，并且修改`edgecore.yaml`的如下参数”：
```yaml
modules:
  edged:
    tailoredKubeletConfig:
      cgroupDriver: systemd
```

## CRI-O

### 安装与配置CRI-O

请先按照[CRI-O安装指南](https://github.com/cri-o/cri-o/blob/main/install.md#cri-o-installation-instructions)安装CRI-O。

如果你需要更新沙箱(pause)镜像，你也可以通过在CRI-O的配置文件(通常是/etc/crio/crio.conf)中修改如下设置来实现：

```bash
[crio.image]
pause_image="kubeedge/pause:3.6"
```

CRI-O默认使用`systemd` cgroup驱动，如果需要切换到`cgroupfs` cgroup驱动，可通过编辑CRI-O的配置文件实现。

```bash
[crio.runtime]
conmon_cgroup = "pod"
cgroup_manager = "cgroupfs"
```
:::tip
当使用 CRI-O时，并且CRI-O的cgroup设置为cgroupfs时，必须将conmon_cgroup设置为值 pod。
:::

### 使用Keadm安装EdgeCore的运行时配置

如果你使用Keadm安装EdgeCore时，你需要设置--remote-runtime-endpoint=unix:///var/run/crio/crio.sock。

:::tip
如果你使用的是KubeEdge v1.12或之前的版本，你还需要在执行keadm join时设置--runtimetype=remote
:::

KubeEdge默认使用`cgroupfs` cgroup驱动，如果你使用`systemd` cgroup驱动，你需要保证CRI-O配置了`systemd` cgroup，在执行keadm join时设置--cgroupdriver=systemd。

### 使用二进制安装EdgeCore的运行时配置

如果使用二进制方式安装EdgeCore，你需要更新EdgeCore的配置文件`edgecore.yaml`，修改如下参数:

KubeEdge v1.15以及之前的版本:
```yaml
modules:
  edged:
    containerRuntime: remote
    remoteImageEndpoint: unix:///var/run/crio/crio.sock
    remoteRuntimeEndpoint: unix:///var/run/crio/crio.sock
```

KubeEdge默认使用`cgroupfs` cgroup驱动，如果你使用`systemd` cgroup驱动，你需要保证CRI-O配置了`systemd` cgroup，并且修改`edgecore.yaml`的如下参数”
```yaml
modules:
  edged:
    tailoredKubeletConfig:
      cgroupDriver: systemd
```

## Docker Engine

:::tip
自KubeEdge v1.14版本起，KubeEdge移除了对dockershim的支持，不再支持直接使用docker运行时管理边缘容器。阅读[Dockershim移除的常见问题](https://kubernetes.io/zh-cn/blog/2022/02/17/dockershim-faq/)了解更多详情。
:::

### 安装与配置Docker和cri-dockerd

以下安装步骤只针对KubeEdge v1.14以及之后的版本，如果你使用的是更早的版本，你只需要安装docker，执行keadm join时配置--runtimetype=docker以及--remote-runtime-endpoint=unix:///var/run/dockershim.sock即可。

1. 遵循[Docker Engine安装指南](https://docs.docker.com/engine/install/#server)安装Docker。

2. 按照[cri-dockerd安装指南](https://github.com/mirantis/cri-dockerd#install)安装cri-dockerd，你也可以通过以下脚本安装cri-dockerd。

  ```bash
  CRIDOCKERD_VERSION="v0.3.8"
  git clone https://github.com/Mirantis/cri-dockerd.git -b ${CRIDOCKERD_VERSION}
  cd cri-dockerd
  make cri-dockerd
  sudo install -o root -g root -m 0755 cri-dockerd /usr/local/bin/cri-dockerd
  sudo install packaging/systemd/* /etc/systemd/system
  sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now cri-docker.socket
  sudo systemctl restart cri-docker
  cd .. && sudo rm -rf cri-dockerd
  ```

3. 安装CNI Plugin。

你可以参考[kubeedge脚本](https://github.com/kubeedge/kubeedge/blob/master/hack/lib/install.sh)中的`install_cni_plugins函数`安装CNI Plugin，仅供参考。

### 使用Keadm安装EdgeCore的运行时配置

如果你使用Keadm安装EdgeCore时，你需要设置--remote-runtime-endpoint=unix:///var/run/cri-dockerd.sock。

:::tip
当使用cri-dockerd时，对应的runtimetype也是remote，而不是docker。
:::

KubeEdge默认使用`cgroupfs` cgroup驱动，如果你使用`systemd` cgroup驱动，你需要保证docker配置了`systemd` cgroup，在执行keadm join时设置--cgroupdriver=systemd。

### 使用二进制安装EdgeCore的运行时配置

如果使用二进制方式安装EdgeCore，你需要更新EdgeCore的配置文件`edgecore.yaml`，修改如下参数:

KubeEdge v1.15以及之前的版本:
```yaml
modules:
  edged:
    containerRuntime: remote
    remoteImageEndpoint: unix:///var/run/cri-dockerd.sock
    remoteRuntimeEndpoint: unix:///var/run/cri-dockerd.sock
```

KubeEdge默认使用`cgroupfs` cgroup驱动，如果你使用`systemd` cgroup驱动，你需要保证docker配置了`systemd` cgroup，并且修改`edgecore.yaml`的如下参数”
```yaml
modules:
  edged:
    tailoredKubeletConfig:
      cgroupDriver: systemd
```

## Kata Containers

Kata Containers is a container runtime created to address security challenges in the multi-tenant, untrusted cloud environment. However, multi-tenancy support is still in KubeEdge’s [backlog](https://github.com/kubeedge/kubeedge/issues/268). If you have a downstream customized KubeEdge which supports multi-tenancy already then Kata Containers is a good option for a lightweight and secure container runtime.

Follow the [install guide]( https://github.com/kata-containers/documentation/blob/master/how-to/containerd-kata.md) to install and configure containerd and  Kata Containers.

If you have “kata-runtime” installed, run this command to check if your host system can run and create a Kata Container:
```bash
kata-runtime kata-check
```

`RuntimeClass` is a feature for selecting the container runtime configuration to use to run a pod’s containers that is supported since `containerd` v1.2.0.  If your `containerd` version is later than v1.2.0, you have two choices to configure `containerd` to use Kata Containers:

- Kata Containers as a RuntimeClass
- Kata Containers as a runtime for untrusted workloads

Suppose you have configured Kata Containers as the runtime for untrusted workloads. In order to verify whether it works on your edge node, you can run:

```yaml
cat nginx-untrusted.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-untrusted
  annotations:
    io.kubernetes.cri.untrusted-workload: "true"
spec:
  containers:
  - name: nginx
    image: nginx
```

```bash
kubectl create -f nginx-untrusted.yaml

# verify the container is running with qemu hypervisor on edge side,
ps aux | grep qemu
root      3941  3.0  1.0 2971576 174648 ?      Sl   17:38   0:02 /usr/bin/qemu-system-aarch64

crictl pods
POD ID              CREATED              STATE               NAME                NAMESPACE           ATTEMPT
b1c0911644cb9       About a minute ago   Ready               nginx-untrusted     default             0
```

## Virtlet

Make sure no libvirt is running on the worker nodes.

### Steps
1. **Install CNI plugin:**

   Download CNI plugin release and extract it:

   ```bash
   $ wget https://github.com/containernetworking/plugins/releases/download/v0.8.2/cni-plugins-linux-amd64-v0.8.2.tgz

   # Extract the tarball
   $ mkdir cni
   $ tar -zxvf v0.2.0.tar.gz -C cni

   $ mkdir -p /opt/cni/bin
   $ cp ./cni/* /opt/cni/bin/
   ```

   Configure CNI plugin:

   ```bash
   $ mkdir -p /etc/cni/net.d/

   $ cat >/etc/cni/net.d/bridge.conf <<EOF
   {
     "cniVersion": "0.3.1",
     "name": "containerd-net",
     "type": "bridge",
     "bridge": "cni0",
     "isGateway": true,
     "ipMasq": true,
     "ipam": {
       "type": "host-local",
       "subnet": "10.88.0.0/16",
       "routes": [
         { "dst": "0.0.0.0/0" }
       ]
     }
   }
   EOF
   ```

2. **Setup VM runtime:**
   Use the script [`hack/setup-vmruntime.sh`](https://github.com/kubeedge/kubeedge/tree/master/hack/setup-vmruntime.sh) to set up a VM runtime. It makes use of the Arktos Runtime release to start three containers:

    	vmruntime_vms
   	vmruntime_libvirt
   	vmruntime_virtlet
