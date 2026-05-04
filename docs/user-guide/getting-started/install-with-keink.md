```yaml
title: Installing KubeEdge with Keink
sidebar_position: 5
```

Deploying KubeEdge with Keink is only used for trial kubeedge, please do not use it in a production environment.

## Keink

keink(represent for [KubeEdge](https://github.com/kubeedge/kubeedge) IN [kind](https://github.com/kubernetes-sigs/kind)) is a tool for running local KubeEdge clusters using Docker container "nodes".It allows for the easy deployment of a KubeEdge cluster on a single machine.

## Environment Preparation

### KubeEdge Codes

You need to download the KubeEdge codes locally. It's recommended to place it in the `$GOPATH` directory, as keink can automatically detect the KubeEdge source code in this directory. Alternatively, you can manually enter the code location.

When running the `bin/keink build edge-image` command to build the kubeedge/node image that includes the KubeEdge components cloudcore, edgecore, and keadm, keink will use the aforementioned KubeEdge source code.

### Keink Codes

Pull the keink code locally. You need to build the keink binary from the source code. Navigate to the keink folder and build the binary using the `make` command.

```shell
# build keink binary
make
```

### Other Environment

You also need to install Docker, Go, kind, and kubectl locally.

Deploy the latest recommended version of KubeEdge v1.17:

```
docker 26.0.0
go 1.22.1
kind 0.22.0
kubectl 1.29.3
containerd 1.7.15
```

## Start the KubeEdge Cluster

### Build Node Image

```shell
bin/keink build edge-image
```

keink will search for the KubeEdge code path under the `$GOPATH` directory. If it's not found, it will automatically pull the code locally.

You can also use `--kube-root` to specify the local KubeEdge directory.

For example:

```shell
bin/keink build edge-image --kube-root /home/user/go/src/kubeedge
```

You can also use `--base-image` to specify different versions of the k8s image.

For example:

```
bin/keink build edge-image --base-image kindest/node:v1.28.7@sha256:9bc6c451a289cf96ad0bbaf33d416901de6fd632415b076ab05f5fa7e4f65c58 --kube-root ../kubeedge
```

### Create Cluster

Enter the following command to start the KubeEdge cluster using the image built in the previous step.

```shell
# create KubeEdge cluster based on the k8s cluster
bin/keink create kubeedge --image kubeedge/node:latest --wait 120s
```

You can see the following content:

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

You can use `kubectl get node -owide` to check the status of the nodes.

```shell
# kubectl get node -owide
NAME                 STATUS   ROLES                  AGE    VERSION                                                   INTERNAL-IP   EXTERNAL-IP   OS-IMAGE       KERNEL-VERSION       CONTAINER-RUNTIME
kind-control-plane   Ready    control-plane,master   116s   v1.29.1                                                   172.18.0.2    <none>        Ubuntu 21.10   4.15.0-169-generic   containerd://1.5.10
kind-worker          Ready    agent,edge             50s    v1.27.7-kubeedge-v1.16.0-beta.0.42+6dcb291c228861-dirty   172.18.0.3    <none>        Ubuntu 21.10   4.15.0-169-generic   containerd://1.5.10
```

If there are issues with starting the cluster, you can generate logs using the `bin/keink export logs` command.

```shell
# bin/keink export logs
Exporting logs for cluster "kind" to:
/tmp/1650693209
```

Deploy a nginx demo to edge-node.

```shell
kubectl apply -f ./pod.yaml
```

Check the status of the nginx pod.

```shell
# kubectl get pod -owide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE          NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          30s   10.244.1.2   kind-worker   <none>           <none>
```

As shown above, the nginx pod is successfully running on the edge node.

Congratulations, you have successfully deployed a KubeEdge cluster using keink!