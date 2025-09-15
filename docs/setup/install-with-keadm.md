---

title: Installing KubeEdge with Keadm
sidebar_position: 3
---

Keadm is used to install the cloud and edge components of KubeEdge. It does **not** handle Kubernetes installation or its [runtime environment](https://kubeedge.io/docs/setup/prerequisites/runtime).

Check [Kubernetes compatibility](https://github.com/kubeedge/kubeedge?tab=readme-ov-file#kubernetes-compatibility) to confirm supported versions.

## Prerequisite

- Requires super user (root) access.

---

## Kubernetes Compatibility

KubeEdge v1.21.0 is compatible with these Kubernetes versions:

| KubeEdge Version | Compatible Kubernetes Versions |
|-----------------|-------------------------------|
| v1.21.0         | v1.25, v1.26, v1.27          |

> ⚠️ Using an unsupported Kubernetes version may cause errors.

---

## Install Keadm

There are three ways to download the `keadm` binary:

1. **Download from GitHub release**

```bash
wget https://github.com/kubeedge/kubeedge/releases/download/v1.21.0/keadm-v1.21.0-linux-amd64.tar.gz
tar -zxvf keadm-v1.21.0-linux-amd64.tar.gz
cp keadm-v1.21.0-linux-amd64/keadm/keadm /usr/local/bin/keadm
Download from Docker Hub

docker run --rm kubeedge/installation-package:v1.21.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm
chmod +x /usr/local/bin/keadm
Build from Source

Refer to [build from source instructions](./install-with-binary#build-from-source)




Setup Cloud Side (KubeEdge Master Node)



Ports 10000 and 10002 must be open. Ensure edge nodes can reach the cloud node. Use --advertise-address to specify a public IP; it is added to CloudCore certificate SANs.



keadm init

keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.21.0 --kube-config=/root/.kube/config
Verify CloudCore:

kubectl get all -n kubeedge
keadm manifest generate

keadm manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
Use --skip-crds flag to skip CRDs.


keadm deprecated init

keadm deprecated init --advertise-address="THE-EXPOSED-IP"
Check CloudCore:

ps -elf | grep cloudcore
Helm Notes:

Set flags `--set key=value` for CloudCore Helm chart, see [CloudCore Helm Charts README.md](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/README.md).

Refer to the built-in configuration profile [version.yaml](https://github.com/kubeedge/kubeedge/blob/master/manifests/profiles/version.yaml) as `values.yaml`. You can create your custom values file and add flags like `--kubeedge-version=v1.21.0 --set key=value` to use this profile.

To deploy CloudCore as binary, use keadm deprecated init.

Setup Edge Side (KubeEdge Worker Node)



Get Token

keadm gettoken
Join Edge Node

keadm join --cloudcore-ipport=<CLOUD-IP>:10000 --token=<TOKEN> --kubeedge-version=v1.21.0
Verify EdgeCore:

systemctl status edgecore
Deprecated join

keadm deprecated join --cloudcore-ipport=<CLOUD-IP>:10000 --token=<TOKEN> --kubeedge-version=v1.21.0
Deploy Demo on Edge Nodes

Refer to [Deploy demo on edge nodes](./install-with-binary#deploy-demo-on-edge-nodes).




Enable 

kubectl logs/exec

 Feature

Required before deploying metrics-server.

Refer to [Enable Kubectl logs/exec](../advanced/debug.md) documentation.

Support Metrics-server in Cloud

Reuses cloudstream and edgestream modules.

Metrics-server <0.4.x requires manual compilation.

git clone https://github.com/kubernetes-sigs/metrics-server.git
cd metrics-server
make container
Tag image:

docker images
docker tag <IMAGE_ID> metrics-server-kubeedge:latest
Apply deployment YAML:

kubectl apply -f <deployment-yaml>
Update iptables:

iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
Make master node schedulable:

kubectl taint nodes --all node-role.kubernetes.io/master-
Deployment YAML example (metrics-server-deployment.yaml)

spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - charlie-latest
  hostNetwork: true
  containers:
  - name: metrics-server
    image: metrics-server-kubeedge:latest
    imagePullPolicy: Never
    args:
      - --cert-dir=/tmp
      - --secure-port=4443
      - --v=2
      - --kubelet-insecure-tls
      - --kubelet-preferred-address-types=InternalDNS,InternalIP,ExternalIP,Hostname
      - --kubelet-use-node-status-port
    ports:
    - name: main-port
      containerPort: 4443
      protocol: TCP
Notes:

Use hostnetwork mode.

Use image you built, set imagePullPolicy: Never.

Enable --kubelet-use-node-status-port in args.

Reset KubeEdge Master and Worker Nodes



Master

keadm reset --kube-config=$HOME/.kube/config
# or
keadm deprecated reset
Node

keadm reset
# or
keadm deprecated reset
Stops cloudcore/edgecore, deletes KubeEdge resources, but does not remove prerequisites.
---

This version:

- Updates **all commands to v1.21.0**  
- Fixes **GitHub/Docker URLs**  
- Makes all **links clickable**  
- Ensures **metrics-server, kubectl logs/exec, and Helm references** are included  

---


