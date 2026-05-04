---
title: CloudHub-EdgeHub Supports IPv6
sidebar_position: 8
---

## Abstract

With the surge of Internet of Things (IoT) devices and the increasing demand for real-time data processing, edge computing has emerged as a vital computing paradigm. Edge computing brings data processing and storage capabilities closer to the data sources and users by decentralizing them to the network's edge, effectively reducing latency and enhancing network performance. However, the traditional IPv4 protocol has many limitations in terms of address space, routing efficiency, and security, which cannot meet the growing needs of edge computing. IPv6, as the next-generation Internet protocol, offers vast address space, efficient routing mechanisms, and robust security, making it an ideal choice for edge computing.


## Getting Started

### Cloud configuration

When EdgeCore uses the K8s native service to access CloudCore (Ingress or NodePort), the K8s cluster network needs to enable the IPv4/IPv6 dual-stack.

:::note
If CloudCore uses hostNetwork mode to expose service, the K8s cluster does not need to enable dual-stack networking, and EdgeCore can access CloudCore through the IPv6 address + port of the node where CloudCore is located.
:::


#### Check IPv6 is enabled on the node

First, you need to make sure that IPv6 is enabled on the node. Use the command `ip -6 route show` to view IPv6 routing. If there is output, it means that it is supported. Otherwise, you need to configure /etc/sysctl.conf to modify kernel parameters and set the network card configuration to enable IPv6 according to the operating system type.


#### Enable IPv4/IPv6 dual-stack on K8s cluster

Configure the CIDR of K8s components and network plugin. Normally, kube-apiserver and kube-controller-manager are maintained by static container in the control node, static container YAMLs are in the /etc/kubernetes/manifests directory. kube-proxy and network plugin are maintained by DaemonSet. Kubelet is maintained by Systemd in each node.

- kube-apiserver: Configure the command args
  - `--server-cluster-ip-range=<IPv4 CIDR>,<IPv6 CIDR>`
- kube-controller-manager: Configure the command args
  - `--cluster-cidr=<IPv4 CIDR>,<IPv6 CIDR>`
  - `--service-cluster-ip-range=<IPv4 CIDR>,<IPv6 CIDR>`
  - `--node-cidr-mask-size-ipv4 | --node-cidr-mask-size-ipv6` defaults to /24 for IPv4 and /64 for IPv6
- kube-proxy: Configure the ConfigMap and restart the DaemonSet
  - `kubectl -n kube-system edit configmaps kube-proxy`, edit the property `clusterCIDR: <IPv4 CIDR>,<IPv6 CIDR>`
  - Restart the kube-proxy (if it does not work, delete the Pod)
    ```bash
    kubectl -n kube-system rollout restart daemonsets kube-proxy
    ```
- kubelet: Configure the command args
  - `--node-ip=<IPv4 IP>,<IPv6 IP>`
- Network plugin Calico (other plugins can refer to relevant documents to modify the configuration)
  - Edit the ConfigMap of Calico
    ```bash
    kubectl -n kube-system edit configmap calico-config
    ```
    Edit the ipam property
    ```json
    "ipam": {
        "type": "calico-ipam",
        "assign_ipv4": true,
        "assign_ipv6": true
    }
    ```
  - Edit the DaemonSet environments of Calico
    ```bash
    kubectl -n kube-system set env daemonset/calico-node IP6=autodetect
    kubectl -n kube-system set env daemonset/calico-node FELIX_IPV6SUPPORT="true"
    kubectl -n kube-system set env daemonset/calico-node CALICO_IPV6POOL_NAT_OUTGOING="true"
    kubectl -n kube-system set env daemonset/calico-node CALICO_IPV4POOL_CIDR="<IPv4 CIDR>"
    kubectl -n kube-system set env daemonset/calico-node CALICO_IPV6POOL_CIDR="<IPv6 CIDR>"
    kubectl -n kube-system set env daemonset/calico-node IP_AUTODETECTION_METHOD="interface=<Name>"
    kubectl -n kube-system set env daemonset/calico-node IP6_AUTODETECTION_METHOD="interface=<Name>"
    ```


#### Edit the Service of CloudCore

```bash
kubectl -n kubeedge edit svc cloudcore
```

Edit ipFamilies and ipFamilyPolicy properties in YAML.
```yaml
kind: Service
apiVersion: v1
metadata:
  name: cloudcore
  namespace: kubeedge
  ...
spec:
  ...
  ipFamilies:
    - IPv4
    - IPv6
  ipFamilyPolicy: PreferDualStack
```

Call the https service of CloudCore to verify whether the configuration is successful.
```bash
curl -gk6 "https://[<node_ipv6_address>]:<cloudhub-https-port>/ca.crt"
```

#### Regenerate the KubeEdge certificate (Optional)

If K8s supports IPv6 before installing KubeEdge, skip this step. 

Edit the ConfigMap of CloudCore.
```bash
kubectl -n kubeedge edit configmaps cloudcore
```

Edit the advertiseAddress property to add IPv6 IP.
```yaml
modules:
  cloudHub:
    advertiseAddress:
    - <IPv4 IP>
    - <IPv6 IP>
```

Delete the old secrets.
```bash
kubectl -n kubeedge delete secrets tokensecret casecret cloudcoresecret
```

Restart CloudCore (if it does not work, delete the Pod).
```bash
kubectl -n kubeedge rollout restart deployments/cloudcore
```


### Join the edge node with IPv6

Directly use the IPv6 address to join the edge node, the IPv6 address needs to be defined in `[]`.
```bash
keadm join --cloudcore-ipport=[<IPv6 IP>]:<Port> --token=...
```

Normally, the edge node will only report the IPv4 address to the cloud. If you need to report the IPv6 address, you can modify the configuration file /etc/kubeedge/config/edgecore.yaml and add the nodeIP under the edged property to specify the reported address.
```yaml
modules:
  edged:
    nodeIP: <Node IPv4 IP>,<Node IPv6 IP>
```

After configuration, the node will report two IP addresses and show them in the status.
```yaml
status:
  addresses:
    - type: InternalIP
      address: <IPv4 IP>
    - type: InternalIP
      address: <IPv6 IP>
```

Finally, use `kubectl get node` command on the cloud to check whether the edge node is ready.
