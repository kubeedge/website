````md
---
title: "Quick Installation Guide (KubeEdge v1.21)"
sidebar_label: "Quick Install v1.21"
---

# KubeEdge v1.21 Quick Installation Guide

**Kubernetes Cluster Version:** v1.25  

## Prerequisites

- Root (superuser) rights are required.
- Ensure the edge node can connect to the cloud node via local or public IP.
- Required ports: **10000, 10002, 10003, 10004**.
- Compatible container runtime installed (**containerd** recommended).

## Step 1: Install `keadm`

### Option 1: Download from GitHub release
```bash
wget https://github.com/kubeedge/kubeedge/releases/download/v1.21.0/keadm-v1.21.0-linux-amd64.tar.gz
tar -zxvf keadm-v1.21.0-linux-amd64.tar.gz
cp keadm-v1.21.0-linux-amd64/keadm/keadm /usr/local/bin/keadm
```

### Option 2: Download from Docker Hub

```bash
docker run --rm kubeedge/installation-package:v1.21.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm
chmod +x /usr/local/bin/keadm
```

### Option 3: Build from source

Follow the [KubeEdge source build instructions](https://github.com/kubeedge/kubeedge#compilation).

## Step 2: Setup Cloud Side (Master Node)

Initialize CloudCore:

```bash
keadm init --advertise-address="<CLOUD-IP>" --kubeedge-version=v1.21.0 --kube-config=/root/.kube/config
```

Check CloudCore status:

```bash
kubectl get all -n kubeedge
```

Generate manifests:

```bash
keadm manifest generate --advertise-address="<CLOUD-IP>" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
```

## Step 3: Setup Edge Side (Worker Node)

Get token from Cloud Node:

```bash
keadm gettoken
```

Join Edge Node:

```bash
keadm join --cloudcore-ipport="<CLOUD-IP>:10000" --token=<TOKEN> --kubeedge-version=v1.21.0
```

Verify EdgeCore:

```bash
systemctl status edgecore
```

## Step 4: Enable `kubectl logs` Feature

```bash
export CLOUDCOREIPS="<CLOUD-IP>"

cp $GOPATH/src/github.com/kubeedge/kubeedge/build/tools/certgen.sh /etc/kubeedge/
cd /etc/kubeedge/
/etc/kubeedge/certgen.sh stream

iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
```

* Update `cloudcore.yaml` and `edgecore.yaml` to enable **CloudStream** and **EdgeStream**.
* Restart services:

  ```bash
  kubectl -n kubeedge rollout restart deployment cloudcore
  systemctl restart edgecore
  ```

Optional (disable kube-proxy checks):

```ini
Environment="CHECK_EDGECORE_ENVIRONMENT=false"
```

## Step 5: Support Metrics Server

```bash
git clone https://github.com/kubernetes-sigs/metrics-server.git
cd metrics-server
make container
docker tag <IMAGE-ID> metrics-server-kubeedge:latest
```

* Deploy on master node with `hostNetwork: true` and `imagePullPolicy: Never`.
* Ensure iptables rules for CloudCore tunneling are applied.

## Step 6: Reset KubeEdge Nodes

On Master Node:

```bash
keadm reset --kube-config=$HOME/.kube/config
```

On Edge Node:

```bash
keadm reset
```

## Improvements and Updates in v1.21 Guide

1. Updated guide to **KubeEdge v1.21** with **Kubernetes v1.25**.
2. Clarified required ports.
3. Added certificate generation & iptables setup.
4. Updated metrics-server deployment instructions.
5. Highlighted EdgeCore systemd updates for kube-proxy handling.
6. Included notes on CloudStream and EdgeStream.

```

---
