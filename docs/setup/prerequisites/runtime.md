---
title: Container Runtime
sidebar_position: 3
---

You need to install a container runtime into each edge node in the cluster so that the edge engine EdgeCore can be installed successfully and edge Pods can run there. 

This page provides an outline of how to use several common container runtimes with KubeEdge.

- [containerd](#containerd)
- [cri-o](#cri-o)
- [docker](#docker-engine)
- [Kata containers](#kata-containers)
- [Virtlet](#Virtlet)

## containerd

### Install and configure containerd

To begin, you will need to install containerd. Please refer to the [containerd installation guide](https://github.com/containerd/containerd/blob/main/docs/getting-started.md) for instructions.

:::tip
If you use KubeEdge v1.15.0 or later, please install containerd v1.6.0 or a higher version.
:::

If there are no containerd configuration files in the `/etc/containerd/` directory, you can generate the configuration files and restart containerd by executing the following command.

```bash
containerd config default > /etc/containerd/config.toml
systemctl restart containerd
```

:::tip
If you installed containerd from a package (for example, RPM or .deb), you may find that the CRI integration plugin is disabled by default.

You need CRI support enabled to use containerd with Kubernetes. Make sure that `cri` is not included in the `disabled_plugins` list within `/etc/containerd/config.toml`; if you made changes to that file, also restart `containerd`.
:::

If you need to update the sandbox(pause) image, you can modify the following settings in the containerd configuration file:

```bash
[plugins."io.containerd.grpc.v1.cri"]
  sandbox_image = "kubeedge/pause:3.6"
```

You can also get or update the cgroup driver for containerd through the containerd configuration file.

```bash
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  ...
  [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
    SystemdCgroup = true
```

:::tip
If you apply these change in containerd configuration file, make sure to restart containerd。
:::

### Configure the runtime for EdgeCore using Keadm

When installing EdgeCore using Keadm, you need to set `--remote-runtime-endpoint=unix:///run/containerd/containerd.sock`.

:::tip
If you use KubeEdge v1.12 or earlier versions, you also need to set --runtimetype=remote when executing keadm join.

On Windows, use --remote-runtime-endpoint=npipe://./pipe/containerd-containerd to configure the CRI endpoint.
:::

KubeEdge uses `cgroupfs` cgroup driver as default. If you want to use the `systemd` cgroup driver, ensure that `containerd` is configured with the `systemd` cgroup driver. And then set `--cgroupdriver=systemd` when executing keadm join.

### Configure the runtime for EdgeCore using binary 

If you install EdgeCore using the binary, you will need to update the configuration file `edgecore.yaml` and modify the following parameters:

In KubeEdge v1.15 and before:
```yaml
modules:
  edged:
    containerRuntime: remote
    remoteImageEndpoint: unix:///run/containerd/containerd.sock
    remoteRuntimeEndpoint: unix:///run/containerd/containerd.sock
```

KubeEdge uses `cgroupfs` cgroup driver as default. If you wish to use the `systemd` cgroup driver, you need to ensure that `containerd` is configured with the `systemd` cgroup driver. And then modify the following parameters in the `edgecore.yaml`:
```yaml
modules:
  edged:
    tailoredKubeletConfig:
      cgroupDriver: systemd
```

## CRI-O

### Install and configure CRI-O

Please follow the [CRI-O Installation Instructions](https://github.com/cri-o/cri-o/blob/main/install.md#cri-o-installation-instructions) to install CRI-O.

If you need to update the sandbox(pause) image, you can modify the following settings in the CRI-O configuration file (usually located at /etc/crio/crio.conf):
```bash
[plugins."io.containerd.grpc.v1.cri"]
  sandbox_image = "kubeedge/pause:3.6"
```

CRI-O uses `systemd` cgroup driver as default. If you need to switch to the `cgroupfs` cgroup driver, you can achieve this by editing the CRI-O configuration file (/etc/crio/crio.conf) and modifying the following settings:
```bash
[crio.runtime]
conmon_cgroup = "pod"
cgroup_manager = "cgroupfs"
```
:::tip
You should also note the changed `conmon_cgroup`, which has to be set to the value pod when using CRI-O with `cgroupfs`.
:::

### Configure the runtime for EdgeCore using Keadm

When installing EdgeCore using Keadm, you need to set `--remote-runtime-endpoint=unix:///var/run/crio/crio.sock`.

:::tip
If you use KubeEdge v1.12 or earlier versions, you also need to set --runtimetype=remote when executing keadm join.
:::

KubeEdge uses `cgroupfs` cgroup driver as default. If you want to use the `systemd` cgroup driver, ensure that `CRI-O` is configured with the `systemd` cgroup driver. And then set `--cgroupdriver=systemd` when executing keadm join.

### Configure the runtime for EdgeCore using binary

If you install EdgeCore using the binary, you will need to update the configuration file `edgecore.yaml` and modify the following parameters:

In KubeEdge v1.15 and before:
```yaml
modules:
  edged:
    containerRuntime: remote
    remoteImageEndpoint: unix:///var/run/crio/crio.sock
    remoteRuntimeEndpoint: unix:///var/run/crio/crio.sock
```

KubeEdge uses `cgroupfs` cgroup driver as default. If you wish to use the `systemd` cgroup driver, you need to ensure that `CRI-O` is configured with the `systemd` cgroup driver. And then modify the following parameters in the `edgecore.yaml`:
```yaml
modules:
  edged:
    tailoredKubeletConfig:
      cgroupDriver: systemd
```

## Docker Engine

:::tip
Dockershim has been removed from KubeEdge v1.14. Users can't use docker runtime directly to manage edge containers. Read the [Dockershim Removal FAQ](https://kubernetes.io/dockershim) for further details.。
:::

### Install and configure Docker and cri-dockerd

The following installation steps are only applicable to KubeEdge v1.14 and later versions. If you use an earlier version, you only need to install Docker, configure `--runtimetype=docker` and `--remote-runtime-endpoint=unix:///var/run/dockershim.sock` when executing keadm join.

1. Follow the [Docker Engine Installation Guide](https://docs.docker.com/engine/install/#server) to install Docker.
2. Follow the [cri-dockerd Installation Guide](https://github.com/mirantis/cri-dockerd#install) to install cri-dockerd. you can also install cri-docked through the following script.

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

3. Install CNI Plugin

You can refer to the `install_cni_plugins` function in the [kubeedge script](https://github.com/kubeedge/kubeedge/blob/master/hack/lib/install.sh) for installing CNI plugins. It's provided for reference purposes.

### Configure the runtime for EdgeCore using Keadm

When installing EdgeCore using Keadm, you need to set `--remote-runtime-endpoint=unix:///var/run/cri-dockerd.sock`.

:::tip
When using cri-dockerd, the corresponding runtimetype is "remote", not "docker".
:::

KubeEdge uses `cgroupfs` cgroup driver as default. If you want to use the `systemd` cgroup driver, ensure that `Docker` is configured with the `systemd` cgroup driver. And then set `--cgroupdriver=systemd` when executing keadm join.

### Configure the runtime for EdgeCore using binary

If you install EdgeCore using the binary, you will need to update the configuration file `edgecore.yaml` and modify the following parameters:

In KubeEdge v1.15 and before:
```yaml
modules:
  edged:
    containerRuntime: remote
    remoteImageEndpoint: unix:///var/run/cri-dockerd.sock
    remoteRuntimeEndpoint: unix:///var/run/cri-dockerd.sock
```

KubeEdge uses `cgroupfs` cgroup driver as default. If you wish to use the `systemd` cgroup driver, you need to ensure that `Docker` is configured with the `systemd` cgroup driver. And then modify the following parameters in the `edgecore.yaml`:
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
