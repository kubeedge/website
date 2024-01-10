---
title: 容器运行时
sidebar_position: 3
---
## containerd

Docker 18.09 及以上版本已随附`containerd`，因此无需手动安装。如果没有`containerd`，可以通过运行以下命令来安装：

```bash
# Install containerd
apt-get update && apt-get install -y containerd.io

# Configure containerd
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml

# Restart containerd
systemctl restart containerd
```

在使用随 Docker 装运的`containerd`时，cri 插件默认为禁用。您需要更新 containerd 的配置，以使 KubeEdge 使用`containerd`作为其运行时：

```bash
# Configure containerd
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml
```

更新`edgecore`配置文件`edgecore.yaml`，为基于`containerd`的运行时指定以下参数：

```yaml
remoteRuntimeEndpoint: unix:///var/run/containerd/containerd.sock
remoteImageEndpoint: unix:///var/run/containerd/containerd.sock
runtimeRequestTimeout: 2
podSandboxImage: k8s.gcr.io/pause:3.2
runtimeType: remote
```

默认情况下，cri 的 cgroup 驱动程序配置为 cgroupfs 。如果不是这种情况，可以在`edgecore.yaml`中手动切换到`systemd`：

```yaml
modules:
  edged:
    cgroupDriver: systemd
```

在`containerd`的配置文件（/etc/containerd/config.toml）中将`systemd_cgroup`设置为 true ，然后重新启动`containerd`：

```toml
# /etc/containerd/config.toml
systemd_cgroup = true
```

```bash
# Restart containerd
systemctl restart containerd
```

创建`nginx`应用程序，并检查是否在边缘侧创建了`containerd`容器：

```bash
kubectl apply -f $GOPATH/src/github.com/kubeedge/kubeedge/build/deployment.yaml
deployment.apps/nginx-deployment created

ctr --namespace=k8s.io container ls
CONTAINER                                                           IMAGE                              RUNTIME
41c1a07fe7bf7425094a9b3be285c312127961c158f30fc308fd6a3b7376eab2    docker.io/library/nginx:1.15.12    io.containerd.runtime.v1.linux
```

注意：由于 cri 不支持多租户，而 containerd 支持，因此容器的命名空间默认设置为 "k8s.io"。在[ cri 支持](https://github.com/containerd/cri/pull/1462)之前，无法更改。

## CRI-O

请按照[ CRI-O 安装指南](https://github.com/cri-o/cri-o/#installing-cri-o)设置 CRI-O。

如果你的边缘节点运行在 ARM 平台上，而你的发行版是 ubuntu18.04，你可能需要以源代码形式构建二进制文件，然后再进行安装，因为 CRI-O 软件包在[ Kubic 软件仓库](https://build.opensuse.org/project/show/devel:kubic:libcontainers:stable)中并不适用这种组合。

```bash
git clone https://github.com/cri-o/cri-o
cd cri-o
make
sudo make install
# generate and install configuration files
sudo make install.config
```

按照以下指南设置 CNI 网络：[设置CNI](https://github.com/cri-o/cri-o/blob/master/contrib/cni/README.md)。更新 edgecore 配置文件，为基于 CRI-O 的运行时指定以下参数：

```yaml
remoteRuntimeEndpoint: unix:///var/run/crio/crio.sock
remoteImageEndpoint: unix:////var/run/crio/crio.sock
runtimeRequestTimeout: 2
podSandboxImage: k8s.gcr.io/pause:3.2
runtimeType: remote
```

默认情况下，`CRI-O`使用`cgroupfs`作为 cgroup 驱动程序管理器。如果想改用 systemd ，请更新 CRI-O 配置文件（/etc/crio/crio.conf.d/00-default.conf）：

```conf
# Cgroup management implementation used for the runtime.
cgroup_manager = "systemd"
```

*注意：如果您使用的是 ARM 平台，且`pause`镜像不是多芯片镜像，则应更新`pause`镜像。要设置暂停映像，请更新`CRI-O`配置文件：*

```conf
pause_image = "k8s.gcr.io/pause-arm64:3.1"
```

记得更新`edgecore.yaml`以及 cgroup 驱动程序管理器：

```yaml
modules:
  edged:
    cgroupDriver: systemd
```

启动`CRI-O`和`edgecore`服务（假设这两个服务都由`systemd`负责），

```bash
sudo systemctl daemon-reload
sudo systemctl enable crio
sudo systemctl start crio
sudo systemctl start edgecore
```

创建应用程序并检查容器是否通过`CRI-O`在边缘侧创建：

```bash
kubectl apply -f $GOPATH/src/github.com/kubeedge/kubeedge/build/deployment.yaml
deployment.apps/nginx-deployment created

# crictl ps
CONTAINER ID        IMAGE               CREATED             STATE               NAME                ATTEMPT             POD ID
41c1a07fe7bf7       f6d22dec9931b       2 days ago          Running             nginx               0                   51f727498b06f
```

## Kata Containers

Kata Containers 是一个容器运行时，用于解决多租户、不受信任的云环境中的安全挑战。不过，多租户支持仍在 KubeEdge 的[积压](https://github.com/kubeedge/kubeedge/issues/268)中。如果你已经有了支持多租户的下游定制 KubeEdge，那么 Kata Containers 就是一个轻量级安全容器运行时的不错选择。

请按照[安装指南](https://github.com/kata-containers/documentation/blob/master/how-to/containerd-kata.md)安装和配置 containerd 和 Kata Containers。

如果已安装 "kata-runtime"，请运行此命令检查主机系统是否可以运行和创建 Kata Container：
```bash
kata-runtime kata-check
```

`RuntimeClass`是一项用于选择运行 pod 的容器所使用的容器运行时配置的功能，自`containerd` v1.2.0 起支持该功能。如果您的`containerd`版本晚于 v1.2.0，您有两种选择来配置`containerd`以使用 Kata Containers：

- 作为RuntimeClass的Kata Containers
- 将 Kata Containers 作为不信任工作负载的运行时

假设您已将 Kata Containers 配置为不受信任工作负载的运行时。为了验证它是否能在边缘节点上运行，可以运行：

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

确保工作节点上没有运行 libvirt。

### Steps
1. **Install CNI plugin:**

   下载 CNI 插件发行版并解压：

   ```bash
   $ wget https://github.com/containernetworking/plugins/releases/download/v0.8.2/cni-plugins-linux-amd64-v0.8.2.tgz

   # Extract the tarball
   $ mkdir cni
   $ tar -zxvf v0.2.0.tar.gz -C cni

   $ mkdir -p /opt/cni/bin
   $ cp ./cni/* /opt/cni/bin/
   ```

   配置CNI插件：

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
   设置虚拟机运行时：使用脚本 [`hack/setup-vmruntime.sh`](https://github.com/kubeedge/kubeedge/tree/master/hack/setup-vmruntime.sh) 设置虚拟机运行时。它利用 Arktos Runtime 版本启动三个容器：

    - vmruntime_vms
   	- vmruntime_libvirt
   	- vmruntime_virtlet
