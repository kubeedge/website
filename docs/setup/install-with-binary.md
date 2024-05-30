---
title: Installing KubeEdge with Binary
sidebar_position: 4
---

Deploying KubeEdge with binary is used for testing purposes and should not be used in a production environment.

## Limitation

- It Requires super user rights (or root rights).

## Setup Cloud Side (KubeEdge Master Node)

### Create CRDs

Before setting up the cloud side, you need to create the necessary Custom Resource Definitions (CRDs) for KubeEdge. These CRDs define the custom resources that KubeEdge uses for managing devices, applications, and other components. To create the CRDs, run the following commands:

```shell
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/devices/devices_v1alpha2_device.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/devices/devices_v1alpha2_devicemodel.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/reliablesyncs/cluster_objectsync_v1alpha1.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/reliablesyncs/objectsync_v1alpha1.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/router/router_v1_ruleEndpoint.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/router/router_v1_rule.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/apps/apps_v1alpha1_edgeapplication.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/apps/apps_v1alpha1_nodegroup.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/operations/operations_v1alpha1_nodeupgradejob.yaml
```

### Prepare CloudCore binary

There are two ways to download the `cloudcore` binary.

1. Download from GitHub release

    KubeEdge officially provides three arch releases: amd64, arm, and arm64. Choose the appropriate package for your platform and download it. 
    
    ```shell
    wget https://github.com/kubeedge/kubeedge/releases/download/v1.17.0/kubeedge-v1.17.0-linux-amd64.tar.gz
    tar -zxvf kubeedge-v1.17.0-linux-amd64.tar.gz
    cp kubeedge-v1.17.0-linux-amd64/cloud/cloudcore/cloudcore /usr/local/bin/cloudcore
    ```

2. Build from source

    Refer to the [Build from Source](#build-from-source) section.

### Prepare config file

```shell
cloudcore --defaultconfig > cloudcore.yaml
```

Please refer to the [Configuration for Cloud](./config#configuration-cloud-side-kubeedge-master) section for more details.

### Run

```shell
# cloudcore --config cloudcore.yaml
```

Run `cloudcore -h` to get help info and add options if needed.

## Setup Edge Side (KubeEdge Worker Node)

### Prepare EdgeCore binary

There are three ways to download the `edgecore` binary:

1. Download from GitHub release

  Similar to the `cloudcore` binary, Download the appropriate package for your platform from the GitHub releases page, extract it, but this time copy the `edgecore` binary to a different directory.

    ```shell
    wget https://github.com/kubeedge/kubeedge/releases/download/v1.17.0/kubeedge-v1.17.0-linux-amd64.tar.gz
    tar -zxvf kubeedge-v1.17.0-linux-amd64.tar.gz
    cp kubeedge-v1.17.0-linux-amd64/edge/edgecore /usr/local/bin/edgecore
    ```

2. Download from the official KubeEdge release image on DockerHub.

```shell
docker run --rm kubeedge/installation-package:v1.17.0 cat /usr/local/bin/edgecore > /usr/local/bin/edgecore && chmod +x /usr/local/bin/edgecore
```

3. Build from source

    Refer to the [Build from Source](#build-from-source) section.

### Prepare config file

- Generate the config file for `edgecore`:

```shell
edgecore --defaultconfig > edgecore.yaml
```

- Get token value at the cloud side:

```shell
kubectl get secret -nkubeedge tokensecret -o=jsonpath='{.data.tokendata}' | base64 -d
```

- Once you have the token value, update the edgecore.yaml file with this value:

```shell
# sed -i -e "s|token: .*|token: ${token}|g" edgecore.yaml
```

Replace `token` with the value obtained from the previous step.

For detailed information about configuring the edge side, please refer to the [Configuration for Edge section](./config#configuration-edge-side-kubeedge-worker-node) for details.

### Run

If you want to run CloudCore and EdgeCore at the same host, you need to disable the EgdeCore environment checks:

```shell
export CHECK_EDGECORE_ENVIRONMENT="false"
```

To start the EdgeCore component, run the following command:

```shell
edgecore --config edgecore.yaml
```

> Run `edgecore -h` for additional assistance and add options if needed.

### Build from Source

There are two ways to build KubeEdge from source:

1. Build on host directly (requires a working Go environment)

```shell
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
make BUILD_WITH_CONTAINER=false
```

2. Build inside a container for simplified environment consistency. (requires a working Docker environment)

```shell
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
make
```

You can find the compiled KubeEdge binaries in the `_output/local/bin` directory.

### Deploy a demo Pod on edge nodes

After you have successfully started both `cloudcore` and `edgecore`, you can run `kubectl get node` to ensure that EdgeCore has registered with CloudCore successfully. The edge nodes should be in the `Ready` status, as shown below:

```shell
# kubectl get node
NAME                 STATUS   ROLES                  AGE     VERSION
ecs-8f95             Ready    agent,edge             5m45s   v1.22.6-kubeedge-v1.12.0
kind-control-plane   Ready    control-plane,master   13m     v1.23.4
```
Now, you can deploy a Pod to the edge node by running the following command:

```
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
  nodeSelector:
    "node-role.kubernetes.io/edge": ""
EOF
```

This command will create an Nginx Pod and schedule it to run on the edge node. You can then verify that the Pod is successfully deployed to the edge node:

```shell
# kubectl get pod -owide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          11s   172.17.0.2   ecs-8f95   <none>           <none>
```

Congratulations! Your KubeEdge cluster is now running successfully.