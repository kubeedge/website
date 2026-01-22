---
title: Installing KubeEdge with Keadm
sidebar_position: 3
---

Keadm is used to install the cloud and edge components of KubeEdge.  
It does **not** handle Kubernetes installation or its [runtime environment](https://kubeedge.io/docs/setup/prerequisites/runtime).  
Check [Kubernetes compatibility](https://github.com/kubeedge/kubeedge?tab=readme-ov-file#kubernetes-compatibility) to confirm supported versions.

---

## Prerequisite

Requires **super user (root) access**.

---

##  Install Keadm

There are three ways to download the `keadm` binary:

### 1. Download from GitHub release

```bash
wget https://github.com/kubeedge/kubeedge/releases/download/v1.21.0/keadm-v1.21.0-linux-amd64.tar.gz
tar -zxvf keadm-v1.21.0-linux-amd64.tar.gz
cp keadm-v1.21.0-linux-amd64/keadm /usr/local/bin/keadm
```

### 2\. Download from Docker Hub

```bash
docker run --rm kubeedge/installation-package:v1.21.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm
chmod +x /usr/local/bin/keadm
```

### 3\. Build from Source

Refer to [build from source instructions](https://kubeedge.io/docs/developer/build/).

---

## Setup Cloud Side (KubeEdge Master Node)

- Ports **10000** and **10002** must be open.
- Ensure edge nodes can reach the cloud node.
- Use `--advertise-address` to specify a public IP (added to CloudCore certificate SANs).

### keadm init

```bash
keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.21.0 --kube-config=/root/.kube/config
```

Verify CloudCore:

```bash
kubectl get all -n kubeedge
```

### keadm manifest generate

```bash
keadm manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
```

Use `--skip-crds` flag to skip CRDs.

### Deprecated Commands (Cloud)

```bash
keadm deprecated init --advertise-address="THE-EXPOSED-IP"
```

Check CloudCore:

```bash
ps -elf | grep cloudcore
```

### Helm Notes

Set flags `--set key=value` for CloudCore Helm chart. See [CloudCore Helm Charts README.md](https://github.com/kubeedge/kubeedge/blob/release-1.21/manifests/charts/cloudcore/README.md).

Refer to `version.yaml` as `values.yaml`. You can create your own values file and add flags like:

```bash
--kubeedge-version=v1.21.0 --set key=value
```

To deploy CloudCore as a binary, use `keadm deprecated init`.

---

## Setup Edge Side (KubeEdge Worker Node)

### Get Token

```bash
keadm gettoken
```

### Join Edge Node

```bash
keadm join --cloudcore-ipport=<CLOUD-IP>:10000 --token=<TOKEN> --kubeedge-version=v1.21.0
```

Verify EdgeCore:

```bash
systemctl status edgecore
```

### Deprecated Commands (Edge)

```bash
keadm deprecated join --cloudcore-ipport=<CLOUD-IP>:10000 --token=<TOKEN> --kubeedge-version=v1.21.0
```

---

## Deploy Demo on Edge Nodes

Refer to [Deploy demo on edge nodes](https://kubeedge.io/docs/setup/install-with-binary#deploy-demo-on-edge-nodes).

---

## Enable kubectl logs/exec Feature

This is required before deploying metrics-server.

Refer to [Enable Kubectl logs/exec documentation](../advanced/debug.md).

---

## Support Metrics-server in Cloud

Reuses cloudstream and edgestream modules. Metrics-server \<0.4.x requires manual compilation.

### Steps:

```bash
git clone https://github.com/kubernetes-sigs/metrics-server.git
cd metrics-server
make container
```

### Tag the image:

```bash
docker images
docker tag <IMAGE_ID> metrics-server-kubeedge:latest
```

### Apply deployment YAML:

```bash
kubectl apply -f <deployment-yaml>
```

### Update iptables:

```bash
iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
```

### Make master node schedulable:

```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

### Example Deployment (metrics-server-deployment.yaml):

```yaml
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
  volumes:
  - name: tmp-dir
    emptyDir: {}
  containers:
  - name: metrics-server
    image: metrics-server-kubeedge:latest
    imagePullPolicy: Never
    volumeMounts:
    - name: tmp-dir
      mountPath: /tmp
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
```

### Notes:

- Use `hostNetwork` mode.
- Use the image you built (`imagePullPolicy: Never`).
- Enable `--kubelet-use-node-status-port` in `args`.

---

## Reset KubeEdge Master and Worker Nodes

### Master

```bash
keadm reset --kube-config=$HOME/.kube/config
# or
keadm deprecated reset
```

### Node

```bash
keadm reset
# or
keadm deprecated reset
```

Stops cloudcore/edgecore, deletes KubeEdge resources, but does not remove prerequisites.

