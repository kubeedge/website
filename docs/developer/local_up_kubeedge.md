---
title: KubeEdge Local Up
sidebar_position: 10
---

This page explains how to use shell script **hack/local-up-kubeedge.sh** in **kubeedge/kubeedge** repo to create a local KubeEdge cluster, installing necessary components, and starting CloudCore and EdgeCore services.

## Usage Steps

1. Preparation:
Ensure that you have kind, kubectl, docker, and other necessary tools installed.
Ensure that your system has a Go language development environment installed, and the version meets the requirements of KubeEdge.
Based on the user's choice of container runtime (docker, cri-o, isulad), user can verify the prerequisites via the script below, or it will also be verified before the installation start in **hack/local_up_kubeedge.sh**

```shell
verify_docker_installed
verify_crio_installed
verify_isulad_installed
kubeedge::golang::verify_golang_version
check_kubectl
check_kind
```

2. Executing the Script:
Before running the script, you can modify some environment variables to suit your needs, such as **LOG_DIR** and **CONTAINER_RUNTIME** in the script.
The script should be run with administrative privileges, as some operations (e.g., software installation, system configuration changes) require sudo access.

```shell
hack/local-up-kubeedge.sh
```
This script will run the environment setting, prerequisites verification, installation and so on. For details, please refer [Script Analysis](#script-analysis)

3. Debugging and Log Viewing:
If problems occur, you can view the log files generated by the script, typically located at 

```shell
/tmp/cloudcore.log and
/tmp/edgecore.log
```

4. Shutting Down the Cluster:
If the cluster is no longer needed, user can press **ctrl+c** to terminate the script and 
call the cleanup function to clean up the environment.

```shell
cleanup
```

## Script Analysis

local-up-kubeedge.sh script is a tool for installing and configuring a KubeEdge environment, below are some main features it provides:

1. Set environment variables

This script sets several environment variables at the beginning, including log directory, log level, timeout duration, protocol type, container runtime type, Kubernetes cluster name and etc. This is the necessary for local Kubeedge cluster setting up and starting.

```shell
KUBEEDGE_ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/..
ENABLE_DAEMON=${ENABLE_DAEMON:-false}
LOG_DIR=${LOG_DIR:-"/tmp"}
LOG_LEVEL=${LOG_LEVEL:-2}
TIMEOUT=${TIMEOUT:-60}s
PROTOCOL=${PROTOCOL:-"WebSocket"}
CONTAINER_RUNTIME=${CONTAINER_RUNTIME:-"containerd"}
KIND_IMAGE=${1:-"kindest/node:v1.29.0"}
```

2. Clean up the previous installation

```shell
cleanup
```
It will uninstall kubeedge and the cluster.


3. Container Runtime Installation:

Based on the user's choice of container runtime (docker, cri-o, isulad), the script attempts to install the corresponding runtime tools.
Checks and verifies the installation of Go language version, kubectl tool, and kind tool.
It will prepare go environment and read into the installation functions and make them available. 

```shell
source "${KUBEEDGE}/hack/lib/golang.sh"
source "${KUBEEDGE}/hack/lib/install.sh"
```

Depending on the chosen container runtime type, verifies if the related tools are already installed.
If user does not set runtime container, containerd will be used by default.

```shell
install_docker
install_crio
install_isulad
```

For each installation, the script will verify whether the installation is successful. 


```shell
verify_docker_installed
verify_crio_installed
verify_isulad_installed
```

4. Building CloudCore and EdgeCore:

Compiles the executable files for CloudCore and EdgeCore.

```shell
make -C "${KUBEEDGE_ROOT}" WHAT="cloudcore"
make -C "${KUBEEDGE_ROOT}" WHAT="edgecore"
```

5. Cluster Initialization:

Uses the kind tool to create a Kubernetes cluster.

```shell
kind create cluster ${CLUSTER_CONTEXT} --image ${KIND_IMAGE}
```

6. CRD Creation:

Creates the necessary Custom Resource Definitions (CRDs) for KubeEdge, such as devices, object sync, rules, operations, etc.

```shell
create_device_crd
create_objectsync_crd
create_rule_crd
create_operation_crd
create_serviceaccountaccess_crd
```


7. Starting CloudCore, EdgeCore and services:

Configures and starts the CloudCore service, which is the control plane component of KubeEdge
Based on the user's choice of container runtime (docker, cri-o, isulad), restart the corresponding tools.
Configures and starts the EdgeCore service, which runs on edge nodes and manages edge devices and applications.

```shell
start_cloudcore
install_cni_plugins
sudo systemctl restart docker
sudo systemctl restart cri-docker
sudo systemctl restart containerd
sudo systemctl restart isulad
start_edgecore
```

8. Start using local kubeedge:

```shell
export PATH=$PATH:$GOPATH/bin
export KUBECONFIG=$HOME/.kube/config
kubectl get nodes
```

9. Health Checks and Cleanup:

Regularly checks the running status of CloudCore and EdgeCore and provides cleanup tasks.
```shell
healthcheck
kubectl get nodes | grep edge-node | grep -q -w Ready && break
```
Health check is generally used inside this script. For user, they could use k8s API to check the health status.


**Note：**
For CloudCore, EdgeCore and some related services, the module installation processes are detailed in `hack/lib/install.sh`