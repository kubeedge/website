---
draft: false
linktitle: 使用CRI设置不同的container runtime
menu:
  docs:
    parent: 高级配置
    weight: 10
title: 使用CRI设置不同的container runtime
toc: true
type: docs
---
## containerd

Docker 18.09 及更高版本自带 `containerd` ，因此您无需手动安装。如果您没有 `containerd` ，可以通过运行以下命令进行安装：

```bash
# Install containerd
apt-get update && apt-get install -y containerd.io

# Configure containerd
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml

# Restart containerd
systemctl restart containerd
```

使用Docker自带的 `containerd` 时，默认情况下cri插件是不可使用的。 您需要更新 `containerd` 的配置，来使 KubeEdge 能够 `containerd` 作为它的runtime：


```bash
# Configure containerd
mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml
```

更新 `edgecore` 配置文件 `edgecore.yaml`，为被作为 runtime 的 `containerd` 指定以下参数：

```yaml
remoteRuntimeEndpoint: unix:///var/run/containerd/containerd.sock
remoteImageEndpoint: unix:///var/run/containerd/containerd.sock
runtimeRequestTimeout: 2
podSandboxImage: k8s.gcr.io/pause:3.2
runtimeType: remote
```

默认情况下，cri的cgroup驱动程序配置为cgroupfs。如果不是这种情况，您可以在中 `edgecore.yaml` 手动切换成 `systemd` ：

```yaml
modules:
  edged:
    cgroupDriver: systemd
```

设置containerd的配置文件（/etc/containerd/config.toml）中的 `systemd_cgroup` 为 `true` ，然后重新启动`containerd` ：



```toml
# /etc/containerd/config.toml
systemd_cgroup = true
```

```bash
# Restart containerd
systemctl restart containerd
```

创建nginx应用程序，检查该服务容器含有 `containerd` 并位于边缘端：

```bash
kubectl apply -f $GOPATH/src/github.com/kubeedge/kubeedge/build/deployment.yaml
deployment.apps/nginx-deployment created

ctr --namespace=k8s.io container ls
CONTAINER                                                           IMAGE                              RUNTIME
41c1a07fe7bf7425094a9b3be285c312127961c158f30fc308fd6a3b7376eab2    docker.io/library/nginx:1.15.12    io.containerd.runtime.v1.linux
```

注意：cri 不支持 multi-tenancy 但是 `containerd` 支持，因此默认情况下，容器的命名空间需要设置为“ k8s.io”。在[cri支持](https://github.com/containerd/cri/pull/1462) 实现之前，没有办法改变这一点。

## CRI-O

请遵循 [CRI-O安装指南](https://github.com/cri-o/cri-o/#installing-cri-o) 来设置CRI-O。

如果您的边缘节点需要在ARM平台上运行，而发行版是ubuntu18.04，那么您可能需要构建二进制形式的源文件然后进行安装，因为 [Kubic](https://build.opensuse.org/project/show/devel:kubic:libcontainers:stable) 存储库中没有针对此组合的CRI-O软件包。

```bash
git clone https://github.com/cri-o/cri-o
cd cri-o
make
sudo make install
# generate and install configuration files
sudo make install.config
```

遵循以下指导来配置CNI网络：[设置CNI] (https://github.com/cri-o/cri-o/blob/master/contrib/cni/README.md)。
更新 edgecore 配置文件，为`CRI-O`-based runtime 指定以下参数：

```yaml
remoteRuntimeEndpoint: unix:///var/run/crio/crio.sock
remoteImageEndpoint: unix:////var/run/crio/crio.sock
runtimeRequestTimeout: 2
podSandboxImage: k8s.gcr.io/pause:3.2
runtimeType: remote
```

默认情况下 `CRI-O` 使用 `cgroupfs` 作为一个 cgroup 的程序管理器。如果您想替换成 `systemd` ，请更新CRI-O配置文件（/etc/crio/crio.conf.d/00-default.conf）：

```conf
# Cgroup management implementation used for the runtime.
cgroup_manager = "systemd"
```

*注意：如果您在ARM平台上使用 `pause` 镜像，并且 `pause` 镜像不是 multi-arch 镜像，您应该更新 `pause` 镜像。要配置  `pause`  镜像，更新 `CRI-O` 配置文件：*

```conf
pause_image = "k8s.gcr.io/pause-arm64:3.1"
```

同时更新 `edgecore.yaml` 里面的 cgroup driver manager：

```yaml
modules:
  edged:
    cgroupDriver: systemd
```

启动 `CRI-O` 和 `edgecore` 服务（假设两项服务均由 `systemd` 负责），

```bash
sudo systemctl daemon-reload
sudo systemctl enable crio
sudo systemctl start crio
sudo systemctl start edgecore
```

创建应用程序，并检查 `CRI-O` 容器是在边缘端创建：

```bash
kubectl apply -f $GOPATH/src/github.com/kubeedge/kubeedge/build/deployment.yaml
deployment.apps/nginx-deployment created

# crictl ps
CONTAINER ID        IMAGE               CREATED             STATE               NAME                ATTEMPT             POD ID
41c1a07fe7bf7       f6d22dec9931b       2 days ago          Running             nginx               0                   51f727498b06f
```

## Kata Containers

Kata Containers 是一个 container runtime，旨在解决多租户、不受信任的云环境中的安全挑战。但是，多租户支持仍在KubeEdge的[backlog](https://github.com/kubeedge/kubeedge/issues/268)中。如果您的下游定制KubeEdge已经支持多租户，那么Kata Containers是轻量级且安全的 container runtime 的理想选择。

按照 [安装指南]( https://github.com/kata-containers/documentation/blob/master/how-to/containerd-kata.md) 安装和配置容器和 Kata Containers。

如果安装了“ kata-runtime”，请运行以下命令以检查主机系统是否可以运行并创建Kata容器：

```bash
kata-runtime kata-check
```

`RuntimeClass` 是一项功能，用于选择自 containerdv1.2.0 以来受支持的container runtime配置，以用于运行 Pod 的容器。如果您的 `containerd` 版本高于v1.2.0，则有两种选择来配置 `containerd` 以使用Kata容器：

- Kata Containers 作为 RuntimeClass
- Kata Containers 作为不受信任的工作负载的 runtime

假设您已将 Kata Containers 配置为不受信任的工作负载的 runtime 。为了验证它是否可以在边缘节点上运行，可以运行：

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

确保没有libvirt在工作程序节点上运行。

### 步骤
1. **安装 CNI 插件：**

	下载 CNI 插件安装包并解压它：

	```bash
	$ wget https://github.com/containernetworking/plugins/releases/download/v0.8.2/cni-plugins-linux-amd64-v0.8.2.tgz

	# Extract the tarball
	$ mkdir cni
	$ tar -zxvf v0.2.0.tar.gz -C cni

	$ mkdir -p /opt/cni/bin
	$ cp ./cni/* /opt/cni/bin/
	```

	配置 CNI 插件：

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

1. **设置 VM runtime：**
 使用 [`hack/setup-vmruntime.sh`](https://github.com/kubeedge/kubeedge/tree/master/hack/setup-vmruntime.sh)脚本来设置VM runtime。它利用 Arktos Runtime 安装包来启动三个容器：

	 	vmruntime_vms
		vmruntime_libvirt
		vmruntime_virtlet
