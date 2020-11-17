---
aliases:
- /docs/started/
bref: The Kubeedge project is dedicated to making an open platform, which is built
  upon kubernetes and provides fundamental infrastructure support for network, app.
  deployment and metadata synchronization between cloud and edge.
description: Quickly get running with your ML Workflow on an existing Kubernetes installation
title: Getting Started with Kubeedge
toc: true
weight: 25
---
## Who should consider using Kubeedge?

Based on the current functionality of Kubeedge:

  * K8s Application deployment through kubectl from Cloud to Edge node(s).
  * K8s configmap, secret deployment through kubectl from Cloud to Edge node(s) and their applications in Pod.
  * Bi-directional and multiplex network communication between Cloud and edge nodes.
  * K8s Pod and Node status querying with kubectl at Cloud with data collected/reported from Edge.
  * Edge node autonomy when its getting offline and recover post reconnection to Cloud.

If you are interested in using those function for yourself, you may have try.

This list is based ONLY on current capabilities. We are investing significant resources to expand the
functionality and actively soliciting help from companies and individuals interested in contributing (see [Contributing](/docs/contributing/)).

## Set up Kubernetes

This documentation assumes you have a Kubernetes cluster available. If not, set up one of these environments first:

  * Local - there are a several options:
    * [Minikube setup](/docs/getting-started-minikube/)
      * Minikube leverages virtualization applications like [Virtual Box](https://www.virtualbox.org/) or [VMware Fusion](https://www.vmware.com/products/fusion.html) to host the virtual machine and provides a CLI that can be leveraged outside of the VM.
      * Minikube defines a fully baked ISO that contains a minimal operating system and kubernetes already installed.
      * This option may be useful if you are just starting to learn and already have one of the virtualization applications already installed.
    * [Multipass & Microk8s setup](/docs/started/getting-started-multipass/)
      * Multipass is a general purpose CLI that launches virtual machines, with Ubuntu [cloud-images](http://cloud-images.ubuntu.com/) already integrated. Multipass uses lightweight, native operating system mechanisms (e.g. [Hypervisor Framework](https://developer.apple.com/documentation/hypervisor) on MacOS, [Hyper-V on Windows 10](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v), QEMU/KVM for linux), which means you don't need to install a virtualization application.
      * [Microk8s](https://microk8s.io) is used to create the Kubernetes cluster inside the virtual machine. It is installed as a [snap](https://snapcraft.io/), which means it has strong isolation and update semantics - your cluster will be updated within a short period after upstream Kubernetes releases.
      * The primary benefits of this approach are - you can use the same VMs locally as you would in the cloud (ie cloud-images), you can use cloud-init to customize the VM (as you might in a cloud), and the Kubernetes cluster you create with Microk8s will be updated at regular intervals.
  * Cloud:
    * [Kubernetes Engine setup](/docs/started/getting-started-gke/).

For more general information on setting up a Kubernetes cluster please refer to [Kubernetes Setup](https://kubernetes.io/docs/setup/). If you want to use GPUs, be sure to follow the Kubernetes [instructions for enabling GPUs](https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/).

## Kubeedge quick start

### Requirements:

  * `docker` and `mosquitto`.
  * Kubernetes version `v1.12` or later.
  * `kubectl`, `kube-edge` binary.

### Prerequisites

To use KubeEdge, you need make sure have **mosquitto**(as MQTT broker) and **docker** in your environment, if don't have,
please reference the following step to install `docker` and `mosquitto`.

#### Install docker

For ubuntu:

```shell
# Install Docker from Ubuntu's repositories:
apt-get update
apt-get install -y docker.io

# or install Docker CE 18.06 from Docker's repositories for Ubuntu or Debian:
apt-get update && apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update && apt-get install docker-ce=18.06.0~ce~3-0~ubuntu
```

For centOS:

```shell
# Install Docker from CentOS/RHEL repository:
yum install -y docker

# or install Docker CE 18.06 from Docker's CentOS repositories:
yum install yum-utils device-mapper-persistent-data lvm2
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
yum update && yum install docker-ce-18.06.1.ce
```

#### Install mosquitto

For ubuntu:

```shell
apt install mosquitto
```

For centOS:

```shell
yum install mosquitto
```

See [mosquitto official website](https://mosquitto.org/download/) for more information.

### Build

Clone kube-edge

```shell
git clone clone https://github.com/***/kube0edge.git $GOPATH/src/kube-edge
cd $GOPATH/src/kube-edge
```

Build

```shell
make edge_core
```

### Run

Put the folder `conf` in the same directory as the `edge_core` binary

```shell
cd cmd/
cp -rf ../conf .
```

Modify the configuration files accordingly, `edge.yaml` (modify `certfile`, `keyfile`, etc.)

```yaml
mqtt:
    server: tcp://127.0.0.1:1883

edgehub:
    websocket:
        url: ws://127.0.0.1:20000/fake_group_id/events
        certfile: /tmp/edge.crt
        keyfile: /tmp/edge.key
        handshake-timeout: 30 #second
        write-deadline: 15 # second
        read-deadline: 15 # second
    controller:
        heartbeat: 15  # second
        refresh-ak-sk-interval: 10 # minute
        auth-info-files-path: /var/IEF/secret
        placement-url: https://10.154.193.32:7444/v1/placement_external/message_queue
        project-id: e632aba927ea4ac2b575ec1603d56f10
        node-id: fb4ebb70-2783-42b8-b3ef-63e2fd6d242e

edged:
    register-node-namespace: default
    hostname-override: 93e05fa9-b782-4a59-9d02-9f6e639b4205
    interface-name: eth0
    node-status-update-frequency: 10 # second
    device-plugin-enabled: false
    gpu-plugin-enabled: false
    image-gc-high-threshold: 80 # percent
    image-gc-low-threshold: 40 # percent
    maximum-dead-containers-per-container: 1
    version: 2.0.0
```

Run

```shell
# run mosquitto
mosquitto -d -p 1883
# run edge_core
cd cmd/
./edge_core
# or
nohup ./edge_core > edge_core.log 2>&1 &
```

## Troubleshooting
For detailed troubleshooting instructions, please refer to the [troubleshooting guide](/docs/guides/troubleshooting/).
