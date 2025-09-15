---

title: Installing KubeEdge with Keadm
sidebar_position: 3
---

Keadm is used to install the cloud and edge components of KubeEdge. It does **not** handle Kubernetes installation or its runtime environment.  

Check [Kubernetes compatibility](https://github.com/kubeedge/kubeedge?tab=readme-ov-file#kubernetes-compatibility) to confirm supported versions.


## Prerequisite

- Requires super user (root) access.

---

## Kubernetes Compatibility

KubeEdge v1.21.0 supports these Kubernetes versions:

| KubeEdge Version | Compatible Kubernetes Versions |
|-----------------|-------------------------------|
| v1.21.0         | v1.25, v1.26, v1.27          |

> ⚠️ Using an unsupported Kubernetes version may lead to errors.

---

## Install Keadm

There are three options:

1. **From GitHub release**

```bash
wget https://github.com/kubeedge/kubeedge/releases/download/v1.21.0/keadm-v1.21.0-linux-amd64.tar.gz
tar -zxvf keadm-v1.21.0-linux-amd64.tar.gz
cp keadm-v1.21.0-linux-amd64/keadm/keadm /usr/local/bin/keadm
From Docker Hub

docker run --rm kubeedge/installation-package:v1.21.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm
chmod +x /usr/local/bin/keadm
Build from Source

Refer to [build from source instructions](./install-with-binary#build-from-source).

Setup Cloud Side (Master Node)



Ports 10000 and 10002 must be open for edge connectivity.

Ensure edge nodes can reach the cloud node.

Use --advertise-address to specify a public IP; it is added to CloudCore certificates.



Initialize CloudCore

keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.21.0 --kube-config=/root/.kube/config
Verify:

kubectl get all -n kubeedge
Generate Manifests

keadm manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
Add --skip-crds if you want to skip CRDs.



Deprecated Binary Init

keadm deprecated init --advertise-address="THE-EXPOSED-IP"
Check CloudCore is running:

ps -elf | grep cloudcore
Setup Edge Side (Worker Node)



Get Token

keadm gettoken
Join Edge Node

keadm join --cloudcore-ipport=<CLOUD-IP>:10000 --token=<TOKEN> --kubeedge-version=v1.21.0
Verify EdgeCore:

systemctl status edgecore
Deploy Demo on Edge Nodes

Refer to [Deploy demo on edge nodes](./install-with-binary#deploy-demo-on-edge-nodes).

Enable 

kubectl logs/exec

 (Metrics-server)

Clone and build:

git clone https://github.com/kubernetes-sigs/metrics-server.git
cd metrics-server
make container
docker images
docker tag <IMAGE_ID> metrics-server-kubeedge:latest
Apply deployment:

kubectl apply -f <deployment-yaml>
Update iptables:

iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
Taint master node if necessary:

kubectl taint nodes --all node-role.kubernetes.io/master-
Ensure hostnetwork mode and enable --kubelet-use-node-status-port.
Reset Nodes



Master

keadm reset --kube-config=$HOME/.kube/config
# or
keadm deprecated reset
Worker

keadm reset
# or
keadm deprecated reset
This stops services and deletes KubeEdge resources but does not remove prerequisites.

All commands now reference KubeEdge v1.21.0, aligned with the Kubernetes compatibility matrix.


