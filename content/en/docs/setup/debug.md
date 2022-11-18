---
draft: false
linktitle: Frequently Asked Installation Questions
menu:
  docs:
    parent: setup
    weight: 1
title: Frequently Asked Installation Questions
toc: true
type: docs
---

If you encounter problems during installation, such as cloudcore/edgecore don't start successfully, or they both start but edge nodes are always in `NotReady`, or pod cannot be deployed to edge nodes as what is described in [Deploy demo on edge nodes](../local#deploy-demo-on-edge-nodes). This doc can help you debug how to fix the issues.

# Common knowledge
## How to checks logs?

You know the best way to debug why one progress is NOT runnig successfully as we expect is to look into its releated logs.

### How to check cloudcore logs?

#### cloudcore in container mode
If you deploy `cloudcore` in container mode. In other words, `cloudcore` is deployed in k8s cluster and managed by k8s directly. You can use `kubectl logs` command to get cloudcore logs, just like below, first use `kubectl get pod -n kubeedge` to get `cloudcore` pod NAME, and then run `kubectl logs cloudcore-f88bbf5bb-kcvf4 -n kubeedge`(please replace `cloudcore-f88bbf5bb-kcvf4` with the actual cloudcore pod name), and now you can get logs
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
If you deploy `cloudcore` in binary mode, in other words, `cloudcore` is running in binary progress on the physical machine directly. You should check whether `cloudcore` is managed by `systemd` or not. If so, you should run `journalctl -u cloudcore.service -xe`. If not, the cloudcore logs are written to file `/var/log/kubeedge/cloudcore.log`, you can run `tail` or `cat` related to read log file.

```shell
# journalctl -u cloudcore.service -xe
# tail -f /var/log/kubeedge/cloudcore.log
# cat /var/log/kubeedge/cloudcore.log
```

### How to check edgecore logs?
`edgecore` is always installed in binary mode, that means `edgecore` cannot be deployed to a container, it can only run as a physical progress on a machine. You should check whether `edgecore` is managed by `systemd` or not. If so, you should run `journalctl -u edgecore.service -xe`. Or, the edgecore logs are written to file `/etc/kubeedge/kubeedge/edge/edgecore.log`, you can run `tail` or `cat` related to read log file.
```shell
# journalctl -u edgecore.service -xe
# tail -f /etc/kubeedge/kubeedge/edge/edgecore.log
# cat /etc/kubeedge/kubeedge/edge/edgecore.log
```

## How to update configuration?
### How to modify cloudcore configuration?
#### cloudcore in container mode
If you deploy `cloudcore` in container mode, cloudcore configure file is stored in configmap `cloudcore` of `kubeedge` namespace, and is mounted to the `cloudcore` pod. You can get it using command `kubectl get configmap cloudcore -nkubeedge -oyaml`. cloudcore config is stored data field.
```shell
# kubectl get configmap cloudcore -nkubeedge -oyaml
apiVersion: v1
data:
  cloudcore.yaml: "apiVersion: cloudcore.config.kubeedge.io/v1alpha2\nkind: CloudCore\nkubeAPIConfig:\n
    \ kubeConfig: \"\"\n  master: \"\"\nmodules:\n  cloudHub:\n    advertiseAddress:\n
    ...
    ...
```
If you want to update cloudcore configuration, you can run `kubectl edit configmap cloudcore -nkubeedge` to update it. And after modifying configmap data, you can find the configuration `/etc/kubeedge/config/cloudcore.yaml` is updated just what you expect by attaching to the cloudcore pod(using `kubectl exec` command).


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

And to make the configuration file take effect, we need to restart `cloudcore`. You can run `kubectl delete pod` command to stop the origin `cloudcore` pod, and k8s will ensure a new `cloudcore` pod is created with the new updated confiuration.
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

## timed out waiting for the condition
When you install `cloudcore` in container mode with command `keadm init`, if you enconter the below problems:
```shell
# keadm init --profile version=v1.12.19
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

Due to the process of installing cloudcore componet in container mode is the same as deploying an application in a k8s cluster. We can reference all the methods of debugging an application in k8s. In `keadm init` command, we'll deploy all of `cloudcore` related resources in k8s `kubeedge` namespace. So you can get important information about all related resouces with command `kubectl get all -n kubeedge`
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

And according to the above description, you can find that the `cloudcore` pod is not Ready. And now we can use `kubectl describe` command to find more details
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
And then we can find the core reason why cloudcore did't start successfully. It's due to `Failed to pull image "kubeedge/cloudcore:v1.12.19": rpc error: code = NotFound desc = failed to pull and unpack image "docker.io/kubeedge/cloudcore:v1.12.19": failed to resolve reference "docker.io/kubeedge/cloudcore:v1.12.19": docker.io/kubeedge/cloudcore:v1.12.19: not found`. In other words, we specify a wrong kubeedge version, it's not exist. So we can run `keadm reset` to clear the last installation, and run `keadm init` to start a new installation, with a right version.

And sometimes, users may find a different reason when using `kubectl describe` command. The output maybe is like below.
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
Now the reason becomes `0/1 nodes are available: 1 node(s) had taint {node-role.kubernetes.io/control-plane: }, that the pod didn't tolerate.` This is often occurs when you have only one control plane node. By default, your cluster will not schedule Pods on the control plane nodes for security reasons. If you want to be able to schedule Pods on the control plane nodes, for example for a single machine Kubernetes cluster, run:
`kubectl taint nodes --all node-role.kubernetes.io/control-plane- node-role.kubernetes.io/master-`
For more details, please reference [k8s docs](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/#control-plane-node-isolation). And then you can find your `cloudcore` is running successfully and in `Running` status.
```shell
# kubectl get pod -n kubeedge
NAME                        READY   STATUS    RESTARTS   AGE
cloudcore-f88bbf5bb-78hzb   1/1     Running   0          9m1s
```

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

One more important thing about `cloudcore` container mode is about how to expose cloudcore port to edge nodes. In container mode, we will also create a cloudcore service. By default, we'll use `ClusterIP` as its ServiceType. And it's your duty to choose a LoadBalancer or adjust it to `NodePort` ServiceType, to expose `cloudcore` service to edge nodes. For more details, please reference [k8s service docs](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types)
