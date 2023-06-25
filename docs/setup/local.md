---
title: Deploying with binary
sidebar_position: 2
---
Deploying KubeEdge with binary is used to test, never use this way in production environment.

## Limitation

- Need super user rights (or root rights) to run.

## Setup Cloud Side (KubeEdge Master Node)

### Create CRDs

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

### Prepare cloudcore binary
There're two ways to download `cloudcore` binary.

- Download from github release.

    Now KubeEdge github officially holds three arch releases: amd64, arm, arm64. Please download the right package according to your platform.
    
    ```shell
    wget https://github.com/kubeedge/kubeedge/releases/download/v1.12.0/kubeedge-v1.12.0-linux-amd64.tar.gz
    tar -zxvf kubeedge-v1.12.0-linux-amd64.tar.gz
    cp kubeedge-v1.12.0-linux-amd64/cloud/cloudcore/cloudcore /usr/local/bin/cloudcore
    ```

- Build from source
  
    ref: [build from source](#build-from-source)


### Prepare config file

```shell
cloudcore --defaultconfig > cloudcore.yaml
```

please refer to [configuration for cloud](./config#configuration-cloud-side-kubeedge-master) for details.

### Run

```shell
# cloudcore --config cloudcore.yaml
```

Run `cloudcore -h` to get help info and add options if needed.


## Setup Edge Side (KubeEdge Worker Node)

### Prepare edgecore binary
There're three ways to download a `edgecore` binary.

- Download from github release.
  
  Now KubeEdge github officially holds three arch releases: amd64, arm, arm64. Please download the right arch package according to your platform.
  ```shell
  wget https://github.com/kubeedge/kubeedge/releases/download/v1.12.0/kubeedge-v1.12.0-linux-amd64.tar.gz
  tar -zxvf kubeedge-v1.12.0-linux-amd64.tar.gz
  cp kubeedge-v1.12.0-linux-amd64/edge/edgecore /usr/local/bin/edgecore
  ```

- Download from dockerhub KubeEdge official release image.
```shell
docker run --rm kubeedge/installation-package:v1.12.0 cat /usr/local/bin/edgecore > /usr/local/bin/edgecore && chmod +x /usr/local/bin/edgecore
```

- Build from source
  
  ref: [build from source](#build-from-source)

### Prepare config file

- generate config file

```shell
edgecore --defaultconfig > edgecore.yaml
```

- get token value at cloud side:

```shell
kubectl get secret -nkubeedge tokensecret -o=jsonpath='{.data.tokendata}' | base64 -d
```

- update token value in edgecore config file:

```shell
# sed -i -e "s|token: .*|token: ${token}|g" edgecore.yaml
```

The `token` is what above step get.

please refer to [configuration for edge](./config#configuration-edge-side-kubeedge-worker-node) for details.

### Run

If you want to run cloudcore and edgecore at the same host, run following command first:

```shell
export CHECK_EDGECORE_ENVIRONMENT="false"
```

Start edgecore:

```shell
edgecore --config edgecore.yaml
```

Run `edgecore -h` to get help info and add options if needed.



### Build from source
If you want to build KubeEdge from source, there are two options:

You have a working Go environment, and would like to build on host directly.
```shell
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
make BUILD_WITH_CONTAINER=false
```

You have a working Docker environment, and enjoy building inside container for simplified environment consistency.
```shell
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
make
```

The compiled kubeedge binaries will be put to `_output/local/bin` directory.

### Deploy demo on edge nodes

After you start both `cloudcore` and `edgecore` successfully, you can run `kubectl get node` to ensure whether edgecore has already registered to cloudcore successfully. The edge nodes are in `Ready` status like below.
```shell
# kubectl get node
NAME                 STATUS   ROLES                  AGE     VERSION
ecs-8f95             Ready    agent,edge             5m45s   v1.22.6-kubeedge-v1.12.0
kind-control-plane   Ready    control-plane,master   13m     v1.23.4
```
Now we can deploy a Pod to edge node, just run the following command:
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

Then you can see the Pod is deployed to edge-node succesfully.
```shell
# kubectl get pod -owide
NAME    READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          11s   172.17.0.2   ecs-8f95   <none>           <none>
```

Congratulations, a KubeEdge cluster is running successfully.