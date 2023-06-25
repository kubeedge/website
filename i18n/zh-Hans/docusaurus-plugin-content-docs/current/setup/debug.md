---
title: Frequently Asked Questions About Installation
sidebar_position: 6
---

If you encounter problems during installation, such as cloudcore/edgecore don't start successfully, or they both start but edge nodes are always in `NotReady`, or pod cannot be deployed to edge nodes as what is described in [Deploy demo on edge nodes](./local#deploy-demo-on-edge-nodes). This doc can help you debug how to fix the issues.

# Common knowledge
## How to check logs?

The first step to start investigating installation failures or when a thing does not work as expected, is to find and look at the related installation logs.

### How to check cloudcore logs?

#### cloudcore in container mode
If you deploy `cloudcore` in container mode, in other words, when `cloudcore` is deployed inside a k8s cluster and managed by k8s directly, you can use `kubectl logs` command to get cloudcore logs, just like below. First use `kubectl get pod -n kubeedge` to get `cloudcore` pod NAME, and then run `kubectl logs cloudcore-f88bbf5bb-kcvf4 -n kubeedge`(please replace `cloudcore-f88bbf5bb-kcvf4` with the actual cloudcore pod name), and then you can get logs
```shell
# kubectl get pod -n kubeedge
NAME                        READY   STATUS    RESTARTS   AGE
cloudcore-f88bbf5bb-kcvf4   1/1     Running   0          50m
# kubectl logs cloudcore-f88bbf5bb-kcvf4 -n kubeedge
W1118 02:16:02.810219       1 validation.go:154] TLSTunnelPrivateKeyFile does not exist in /etc/kubeedge/certs/server.key, will load from secret
W1118 02:16:02.810256       1 validation.go:157] TLSTunnelCertFile does not exist in /etc/kubeedge/certs/server.crt, will load from secret
W1118 02:16:02.810263       1 validation.go:160] TLSTunnelCAFile does not exist in /etc/kubeedge/ca/rootCA.crt, will load from secret
I1118 02:16:02.810280       1 server.go:92] Version: v1.12.0
...
...
```

#### cloudcore in binary mode
If you deploy `cloudcore` in binary mode, in other words, `cloudcore` is running as a service/process on the physical machine directly, you should check whether `cloudcore` is managed by `systemd` or not. If so, you can run `journalctl -u cloudcore.service -xe` to get cloudcore logs. If not, the cloudcore logs are written to file `/var/log/kubeedge/cloudcore.log`, you can run `tail` or `cat` related commands to read log file.

```shell
# journalctl -u cloudcore.service -xe
# tail -f /var/log/kubeedge/cloudcore.log
# cat /var/log/kubeedge/cloudcore.log
```

### How to check edgecore logs?
`edgecore` is always installed in binary mode, that means `edgecore` cannot be deployed to a container, it can only run as a physical progress on a machine. You should check whether `edgecore` is managed by `systemd` or not. If so, you should run `journalctl -u edgecore.service -xe`. Or, the edgecore logs are written to file `/etc/kubeedge/kubeedge/edge/edgecore.log`, you can run `tail` or `cat` related commands to read log file.
```shell
# journalctl -u edgecore.service -xe
# tail -f /etc/kubeedge/kubeedge/edge/edgecore.log
# cat /etc/kubeedge/kubeedge/edge/edgecore.log
```

## How to update configuration?
### How to modify cloudcore configuration?
#### cloudcore in container mode
If you deploy `cloudcore` in container mode, the cloudcore configuration file is stored in the `cloudcore` configmap of the `kubeedge` namespace, and is automatically mounted to the `cloudcore` pod. You can get it using command `kubectl get configmap cloudcore -nkubeedge -oyaml`. Cloudcore configuration is stored in its data field.
```shell
# kubectl get configmap cloudcore -nkubeedge -oyaml
apiVersion: v1
data:
  cloudcore.yaml: "apiVersion: cloudcore.config.kubeedge.io/v1alpha2\nkind: CloudCore\nkubeAPIConfig:\n
    \ kubeConfig: \"\"\n  master: \"\"\nmodules:\n  cloudHub:\n    advertiseAddress:\n
    ...
    ...
```
If you want to update the cloudcore configuration, you can run `kubectl edit configmap cloudcore -n kubeedge` to update it. After modifying the configmap data, you can find that the configuration file mapped in the pod to `/etc/kubeedge/config/cloudcore.yaml` is updated the same as you would expect by exec to the cloudcore pod (using `kubectl exec` command).


```
# kubectl get pod -nkubeedge
NAME                        READY   STATUS    RESTARTS   AGE
cloudcore-f88bbf5bb-kcvf4   1/1     Running   0          3m29s
# kubectl exec -it cloudcore-f88bbf5bb-kcvf4 -nkubeedge sh
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
/ # cat /etc/kubeedge/config/cloudcore.yaml 
apiVersion: cloudcore.config.kubeedge.io/v1alpha2
kind: CloudCore
kubeAPIConfig:
  kubeConfig: ""
  master: ""
modules:
  cloudHub:
    advertiseAddress:
    - 127.0.0.1
    ...
    ...
```

To apply the changed the configuration file and take it into effect, we need to restart the `cloudcore` pod. You can run `kubectl delete pod` command to stop the original `cloudcore` pod, and k8s will ensure a new `cloudcore` pod is created with the new updated configuration.
```shell
# kubectl get pod -n kubeedge
NAME                        READY   STATUS    RESTARTS   AGE
cloudcore-f88bbf5bb-kcvf4   1/1     Running   0          82m
# kubectl delete pod cloudcore-f88bbf5bb-kcvf4 -nkubeedge
pod "cloudcore-f88bbf5bb-kcvf4" deleted
```

#### cloudcore in binary mode
If you deploy `cloudcore` in binary mode. The default configuration file is located on `/etc/kubeedge/config/cloudcore.yaml`. You can modify it with `vim` or `vi` command. If your operating system supports `systemd` and manage `cloudcore` with `systemd`, you can run `systemctl restart cloudcore` to restart `cloudcore` with updated configuration. If not, you can just use `pkill` command to stop origin `cloudcore` progress, and start it again manually.

### How to modify edgecore configuration?
We always deploy `edgecore` in binary mode, that means, we couldn't deploy `edgecore` in a pod. And the default configuration file is located on `/etc/kubeedge/config/edgecore.yaml`. You can modify it with `vim` or `vi` command. If your operating system supports `systemd` and manage `edgecore` with `systemd`, you can run `systemctl restart edgecore` to restart `edgecore` with updated configuration. If not, you can just use `pkill` command to stop origin `edgecore` progress, and start it again manually.


# Frequently Asked Questions
The following description contains some common problems that might happen during the installation progress, and includes the recommended solutions to resolve it.

## cloudcore pre-flight check failed
cloudcore error log contains the below words:
```shell
error execution phase preflight: [preflight] Some fatal errors occurred
```
This may be related to a previous installation failure having left over files from the previous installation attempt. You should run `keadm reset` command to clean up those files.

Other errors during the installation you can fix by following the steps shown on the screen according to the error prompt.

## timed out waiting for the condition
When you install `cloudcore` in container mode with command `keadm init`, if you encounter the below problems:
```shell
# keadm init
Kubernetes version verification passed, KubeEdge installation will start...
Error: timed out waiting for the condition
Usage:
  keadm init [flags]

Examples:

keadm init
- This command will render and install the Charts for Kubeedge cloud component

...
...

execute keadm command failed:  timed out waiting for the condition
```


Due to the fact that the progress of installing cloudcore components in container mode is the same as deploying any one application within a k8s cluster, we can use all the default k8s methods of debugging an application in k8s. By invoking the `keadm init` command, we'll deploy all of `cloudcore` related resources in k8s `kubeedge` namespace. So you can get important information about all related resources with command `kubectl get all -n kubeedge`
```shell
# kubectl get all -nkubeedge
NAME                             READY   STATUS             RESTARTS   AGE
pod/cloudcore-644d8f55df-sj7xc   0/1     ImagePullBackOff   0          5m58s

NAME                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                                             AGE
service/cloudcore   ClusterIP   10.96.179.211   <none>        10000/TCP,10001/TCP,10002/TCP,10003/TCP,10004/TCP   5m58s

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/cloudcore   0/1     1            0           5m58s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/cloudcore-644d8f55df   1         1         0       5m58s
```

If all the resources are created, then you can check whether `cloudcore` pod is in Running status.

### cloudcore in pending status
If the pod `cloudcore` is in `Pending` status, it's often due to pod scheduling failures. You can run `kubectl describe` command to try to fix it. For example, the output may be like shown below.
```shell
# kubectl get pod -n kubeedge
NAME                        READY   STATUS    RESTARTS   AGE
cloudcore-f88bbf5bb-78hzb   0/1     Pending   0          111s
# kubectl describe pod cloudcore-f88bbf5bb-78hzb -nkubeedge
Name:             cloudcore-f88bbf5bb-78hzb
Namespace:        kubeedge

...
...

Events:
  Type     Reason            Age                  From               Message
  ----     ------            ----                 ----               -------
  Warning  FailedScheduling  55s (x3 over 2m13s)  default-scheduler  0/1 nodes are available: 1 node(s) had taint {node-role.kubernetes.io/control-plane: }, that the pod didn't tolerate.
```
We can see that the reason is that `0/1 nodes are available: 1 node(s) had taint {node-role.kubernetes.io/control-plane: }, that the pod didn't tolerate.` This is often occurs when you only have one control plane node. By default, your cluster will not schedule Pods on the control plane nodes for security reasons. If you want to be able to schedule Pods on the control plane nodes, for example in a single machine Kubernetes cluster, run:
`kubectl taint nodes --all node-role.kubernetes.io/control-plane- node-role.kubernetes.io/master-`
For more details, please refer to [k8s docs](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#control-plane-node-isolation). And then you can find your `cloudcore` is running successfully and in `Running` status.
```shell
# kubectl get pod -n kubeedge
NAME                        READY   STATUS    RESTARTS   AGE
cloudcore-f88bbf5bb-78hzb   1/1     Running   0          9m1s
```
For more details about taint and toleration, you can refer to [k8s official docs](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)


### cloudcore in ImagePullBackOff status
If the pod `cloudcore` is in `ImagePullBackOff` status, it's often due to pod image issues. You can run `kubectl describe` command to find more details. For example, the output may be showing like below.

```shell
# kubectl describe pod cloudcore-644d8f55df-sj7xc -nkubeedge

...
...

Events:
  Type     Reason     Age                     From               Message
  ----     ------     ----                    ----               -------
  Normal   Scheduled  8m39s                   default-scheduler  Successfully assigned kubeedge/cloudcore-644d8f55df-sj7xc to kind-control-plane
  Normal   Pulling    6m59s (x4 over 8m39s)   kubelet            Pulling image "kubeedge/cloudcore:v1.12.19"
  Warning  Failed     6m58s (x4 over 8m37s)   kubelet            Failed to pull image "kubeedge/cloudcore:v1.12.19": rpc error: code = NotFound desc = failed to pull and unpack image "docker.io/kubeedge/cloudcore:v1.12.19": failed to resolve reference "docker.io/kubeedge/cloudcore:v1.12.19": docker.io/kubeedge/cloudcore:v1.12.19: not found
  Warning  Failed     6m58s (x4 over 8m37s)   kubelet            Error: ErrImagePull
  Warning  Failed     6m45s (x6 over 8m37s)   kubelet            Error: ImagePullBackOff
  Normal   BackOff    3m36s (x20 over 8m37s)  kubelet            Back-off pulling image "kubeedge/cloudcore:v1.12.19"
```
Here we can find the core reason why cloudcore did't start successfully. It's due to `Failed to pull image "kubeedge/cloudcore:v1.12.19": rpc error: code = NotFound desc = failed to pull and unpack image "docker.io/kubeedge/cloudcore:v1.12.19": failed to resolve reference "docker.io/kubeedge/cloudcore:v1.12.19": docker.io/kubeedge/cloudcore:v1.12.19: not found`. There's no `docker.io/kubeedge/cloudcore:v1.12.19` image. In other words, we specified a wrong kubeedge version, which does not exist. So we can run `keadm reset` to clear the last installation, or just run `kubectl delete ns kubeedge` directly, and then run `keadm init` to start a new installation, with a correct version.

During the cloudcore container installation progress, keadm will pull the required images from dockerhub by default. Users can pull the required images in advance, which is also supported by `keadm`. To do so, users can run `keadm config images` related commands to display or pull all the required images.
```shell
# keadm config images pull --kubeedge-version=v1.12.0 --part=cloud
Pulling kubeedge/iptables-manager:v1.12.0 ...
Successfully pulled kubeedge/iptables-manager:v1.12.0
Pulling kubeedge/controller-manager:v1.12.0 ...
Successfully pulled kubeedge/controller-manager:v1.12.0
Pulling kubeedge/admission:v1.12.0 ...
Successfully pulled kubeedge/admission:v1.12.0
Pulling kubeedge/cloudcore:v1.12.0 ...
Successfully pulled kubeedge/cloudcore:v1.12.0
```

### cloudcore in CrashLoopBackOff status
If `cloudcore` pod is in `CrashLoopBackOff` status, it means that cloudcore pod startup failed. Users should check cloudcore logs by running `kubectl logs` command. And fix it according to the log error.

## EdgeCore failed to get CA certificate
During the edgecore installation, edgecore will communicate with cloudcore to get the CA certificate. Users can encounter the below issues:
```shell
failed to get CA certificate, err: Get "https://192.168.47.128:10002/ca.crt": dial tcp 192.168.47.128:10002: connect: connection refused
```

```shell
failed to get CA certificate, err: Get "https://192.168.47.128:10002/ca.crt": EOF
```

```shell
Error: failed to get CA certificate, err: Get "https://192.168.47.128:10002/ca.crt": dial tcp 192.168.47.128:10002: connect: no route to host
```

```shell
failed to get CA certificate, err: Get "https://192.168.47.128:10002/ca.crt": dial tcp 192.168.47.128:10002: i/o timeout
```

Troubleshooting step:

- Does the cloudcore IP address, the edge node is configured to join to, exist in the cloudcore advertise-address list?

- Can the edgecore connect to the cloudcore IP address? Are the two nodes connected over the physical network? Are there firewall restrictions?

- Do cloudcore components on the cloud side start successfully and are the accessed ports(e.g. 10000 and 10002) listening?

- If all the above preceding steps were checked and are not showing any problems, run the following command to check whether cloudcore logs contain any errors: `kubectl logs cloudcore-xxxx -n kubeedge`

## `keadm join` pull image failed in edge nodes
Users may encounter the below errors when running `keadm join` command:
```
edge node join failed: pull Images failed: xxx
```
Troubleshooting steps:

- Can edge nodes access the Internet? `keadm join` will by default pull `kubeedge/installation-package` image, from dockerhub. If so, users should fix according to the specific error information.
- If edge nodes cannot access the Internet, there're two ways to avoid this error:
    1. download images on another machines which can access the Internet, and load images manually to the edge nodes
    2. download images on another machines which can access the Internet, and push images to an internal image repository, and then run `keadm join` command with flag `--image-repository=xxx` to specify the internal image repository.


## Token related issues

### Error: token credentials are in the wrong format

If you find that edgecore don't start, and the edgecore log contains error message like below
```shell
F1121 14:14:39.583329 3644556 certmanager.go:94] Error: token credentials are in the wrong format
```
This means the edgecore token is not correct. You should run `keadm gettoken` on the cloud side to get token, and then copy it to `modules.edgeHub.token` field.
```shell
# cat /etc/kubeedge/config/edgecore.yaml 
apiVersion: edgecore.config.kubeedge.io/v1alpha2
kind: EdgeCore
modules:
  edgeHub:
    ...
    ...
    token: ""      # --- here is token, which will be used when joining edge nodes to cloud.

```

### Invalid Token
If edgecore log contains errors like below
```shell
F1121 14:22:42.419103 3646881 certmanager.go:94] Error: failed to get edge certificate from the cloudcore, error: Invalid authorization token
```
And cloudcore log contains errors like below
```shell
E1121 06:22:42.418947       1 server.go:104] failed to sign the certificate for edgenode: edge-node, invalid token
```
This means that you copied an INCORRECT token to edgecore configuration. So you should run `keadm gettoken` on the cloud side to get token again, and copy it to `modules.edgeHub.token` field correctly and carefully.


## edgecore failed to pass the certificate verification

```
Error: failed to get edge certificate from the cloudcore, error: Get "https://192.168.47.128:10002/edge.crt": x509: certificate is valid for 192.168.47.127, not 192.168.47.128
```

```
Error: failed to get edge certificate from the cloudcore, error: Get "https://192.168.47.128:10002/edge.crt": x509: cannot validate certificate for 192.168.47.128 because it doesn't contain any IP SANs
```

cloudcore requires the configuration parameter advertise-address, which can contain multiple IP addresses, separated by commas, which need to be defined in advance. It's recommended to use a load balancer or gateway address, to ensure load balancing and high availability of cloudcore. Currently, this address cannot be changed once it's configured. The value of `cloudcore-ipport` at edgecore must exist in the cloudcore `advertise-address` list.

## Advertise-address related issues
The most common problems is due to that the IP address that cloudcore expose, is NOT the same as the IP address that edgecore use to connect to.

cloudcore expose IP address is located like below
```shell
# cat cloudcore.yaml 
apiVersion: cloudcore.config.kubeedge.io/v1alpha1
...
...
modules:
  cloudHub:
    advertiseAddress:
    - 192.168.1.251     # ------------- this IP address is what cloudcore expose.
...
...
```

IP address that edgecore use to connect to cloud is like below:
```shell
# cat edgecore.yaml 
apiVersion: edgecore.config.kubeedge.io/v1alpha2
kind: EdgeCore
modules:
  edgeHub:
    enable: true
    heartbeat: 15
    httpServer: https://192.168.1.251:10002   # ----- this is edgecore used to get ca/certs
    messageBurst: 60
    messageQPS: 30
    projectID: e632aba927ea4ac2b575ec1603d56f10
    quic:
      enable: false
      handshakeTimeout: 30
      readDeadline: 15
      server: 192.168.1.251:10001  # ----- this is edgecore used to connect cloud
      writeDeadline: 15
    websocket:
      enable: true
      handshakeTimeout: 30
      readDeadline: 15
      server: 192.168.1.251:10000 # ----- this is edgecore used to connect cloud
      writeDeadline: 15

...
...

```
First, now KubeEdge don't support update cloudcore advertiseAddress, so it's very important for users to set one or more advertise addresses in installation progress.

One important thing is that the two IP address should be kept the same. Or edgecore logs will report the following errors
```
E1118 16:00:52.632311 1947817 ws.go:78] dial websocket error(x509: certificate is valid for 192.168.1.251, not 127.0.0.1), response message: 
E1118 16:00:52.632338 1947817 websocket.go:90] Init websocket connection failed x509: certificate is valid for 192.168.1.251, not 127.0.0.1
```

So in one word, in our installation, we must ensure the two IP address are the same, regardless of which method we choose, `keadm init` or `keadm deprecated init` or run cloudcore manually, `keadm join` or `keadm deprecated join` or run edgecore manually. In other words, we must use `--advertise-address` and `--cloudcore-ipport` flags in the command line.
```
keadm init --advertise-address=${THE-EXPOSED-IP}
keadm deprecated init --advertise-address=${THE-EXPOSED-IP}
```
```
keadm join --cloudcore-ipport=${THE-EXPOSED-IP}:10000
keadm deprecated join --cloudcore-ipport=${THE-EXPOSED-IP}:10000
```

By default, if we just run `keadm init --advertise-address=${THE-EXPOSED-IP} --profile version=v1.12.0` to install cloudcore. We'll create a `cloudcore` service with `ClusterIP` as its ServiceType. And a `cloudcore` pod which will use `hostNetwork`, which means that the pod will run in the host network of the node where the pod is deployed. So here `${THE-EXPOSED-IP}` should be replaced with IP address of your k8s node, where `cloudcore` is deployed. You can run `kubectl get node -owide` to get k8s node IP addresses. And we also should use this IP address to join edge nodes.
```
# kubectl get pod -nkubeedge -owide
NAME                        READY   STATUS    RESTARTS   AGE     IP           NODE                 NOMINATED NODE   READINESS GATES
cloudcore-f88bbf5bb-blgzv   1/1     Running   0          8m42s   172.18.0.2   kind-control-plane   <none>           <none>

# kubectl get node -owide
NAME                      STATUS     ROLES                  AGE   VERSION                                                    INTERNAL-IP     EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION       CONTAINER-RUNTIME
kind-control-plane        Ready      control-plane,master   20m   v1.21.1                                                    172.18.0.2      <none>        Ubuntu 21.04         4.15.0-169-generic   containerd://1.5.2
```
The above output shows that the IP address of the pod is the same as that of the k8s node, both IP addresses are `172.18.0.2`. This also indicates that the pod is running in the host network of the node. So we should use `172.18.0.2` as `${THE-EXPOSED-IP}`, but not others. Or edgecore will report below errors:
```shell
F1121 15:21:15.154526 3671032 certmanager.go:94] Error: failed to get CA certificate, err: Get "https://10.96.179.211:10002/ca.crt": dial tcp 10.96.179.211:10002: i/o timeout
```

One more important thing about `cloudcore` container mode is about how to expose cloudcore port to edge nodes. In container mode, we will also create a cloudcore service. And it's your duty to choose a LoadBalancer or adjust it to `NodePort` ServiceType, to expose `cloudcore` service to edge nodes. For more details, please reference [k8s service docs](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types)


