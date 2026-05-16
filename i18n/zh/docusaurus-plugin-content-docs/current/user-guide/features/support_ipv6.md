---
title: CloudHub-EdgeHub 支持 IPv6
sidebar_position: 8
---

## 概要

随着物联网设备的激增和对实时数据处理需求的不断增长，边缘计算逐渐成为一种重要的计算模式。边缘计算通过将数据处理和存储功能下沉到网络边缘，靠近数据源和用户，有效降低了延迟，提高了网络性能。然而，传统的IPv4协议在地址空间、路由效率和安全性等方面存在诸多局限，无法满足边缘计算日益增长的需求。IPv6作为下一代互联网协议，凭借其广阔的空间、高效的路由机制和强大的安全性，成为边缘计算的理想选择。


## 操作方式

### 云端配置

当 EdgeCore 使用 K8s 原生服务能力访问 CloudCore（Ingress 或者 NodePort），则云端 K8s 集群网络需要开启 IPv4/IPv6 双协议栈。

:::note
如果 CloudCore 用 hostNetwork 模式暴露服务，则 K8s 集群无需开启双协议栈网络，EdgeCore 只需要通过 CloudCore 所在节点的 IPv6 地址+端口即可访问 CloudCore。
:::


#### 确保节点支持 IPv6

首先需要确保节点是否开启 IPv6，使用命令查看 IPv6 路由：`ip -6 route show`。如果有输出说明已支持，否则需要配置 /etc/sysctl.conf 修改内核参数，并且按操作系统类型设置网卡配置开启 IPv6。


#### 云端 K8s 集群开启双栈协议

配置 K8s 各个组件以及网络插件的 CIDR，正常情况 kube-apiserver 和 kube-controller-manager 在控制节点中使用静态容器维护，YAML 在 /etc/kubernetes/manifests 目录下。kube-proxy 和网络插件以 DaemonSet 方式维护。kubelet 则是在每个节点中以 Systemd 方式维护。
- kube-apiserver 修改启动参数
  - `--server-cluster-ip-range=<IPv4 CIDR>,<IPv6 CIDR>`
- kube-controller-manager 修改启动参数
  - `--cluster-cidr=<IPv4 CIDR>,<IPv6 CIDR>`
  - `--service-cluster-ip-range=<IPv4 CIDR>,<IPv6 CIDR>`
  - `--node-cidr-mask-size-ipv4 | --node-cidr-mask-size-ipv6` 对于 IPv4 默认为 /24，对于 IPv6 默认为 /64
- kube-proxy 修改配置文件并重启 DaemonSet
  - 修改配置 `kubectl -n kube-system edit configmaps kube-proxy`，修改字段 `clusterCIDR: <IPv4 CIDR>,<IPv6 CIDR>`
  - 重启 kube-proxy （如果不行，删除 Pod）
    ```bash
    kubectl -n kube-system rollout restart daemonsets kube-proxy
    ```
- kubelet 修改启动参数
  - `--node-ip=<IPv4 IP>,<IPv6 IP>`
- 修改网络插件 Calico （其他插件可以查找相关资料修改配置）
  - 修改 Calico 的 ConfigMap 配置
    ```bash
    kubectl -n kube-system edit configmap calico-config
    ```
    修改 ipam 字段
    ```json
    "ipam": {
        "type": "calico-ipam",
        "assign_ipv4": true,
        "assign_ipv6": true
    }
    ```
  - 修改 Calico 的 DaemonSet 环境变量
    ```bash
    kubectl -n kube-system set env daemonset/calico-node IP6=autodetect
    kubectl -n kube-system set env daemonset/calico-node FELIX_IPV6SUPPORT="true"
    kubectl -n kube-system set env daemonset/calico-node CALICO_IPV6POOL_NAT_OUTGOING="true"
    kubectl -n kube-system set env daemonset/calico-node CALICO_IPV4POOL_CIDR="<IPv4 CIDR>"
    kubectl -n kube-system set env daemonset/calico-node CALICO_IPV6POOL_CIDR="<IPv6 CIDR>"
    kubectl -n kube-system set env daemonset/calico-node IP_AUTODETECTION_METHOD="interface=<Name>"
    kubectl -n kube-system set env daemonset/calico-node IP6_AUTODETECTION_METHOD="interface=<Name>"
    ```


#### 修改 CloudCore 的 Service

```bash
kubectl -n kubeedge edit svc cloudcore
```

编辑 YAML 中的 ipFamilies 和 ipFamilyPolicy 字段
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

请求 CloudCore 的 https 服务验证配置是否成功
```bash
curl -gk6 "https://[<node_ipv6_address>]:<cloudhub-https-port>/ca.crt"
```

#### 重新生成云端证书（可选）

K8s 先支持 IPv6 再安装 KubeEdge 的话无需操作。

修改 CloudCore 的 ConfigMap 配置
```bash
kubectl -n kubeedge edit configmaps cloudcore
```

修改 advertiseAddress 添加 IPv6 的 IP 地址
```yaml
modules:
  cloudHub:
    advertiseAddress:
    - <IPv4 IP>
    - <IPv6 IP>
```

删除老证书 secrets 资源
```bash
kubectl -n kubeedge delete secrets tokensecret casecret cloudcoresecret
```

重启 CloudCore（如果不行，删除 Pod）
```bash
kubectl -n kubeedge rollout restart deployments/cloudcore
```


### 使用 IPv6 接入边缘节点

直接使用 IPv6 地址接入节点，注意 IPv6 地址需要定义在 `[]` 中
```bash
keadm join --cloudcore-ipport=[<IPv6 IP>]:<Port> --token=...
```

正常情况下，节点只会上报 IPv4 的地址到云端，如果需要上报 IPv6 的地址，可以修改配置文件 /etc/kubeedge/config/edgecore.yaml，在 edged 下添加 nodeIP 字段指定上报的地址：
```yaml
modules:
  edged:
    nodeIP: <Node IPv4 IP>,<Node IPv6 IP>
```

配置完后，节点会上报两个 IP 地址显示到节点状态中。
```yaml
status:
  addresses:
    - type: InternalIP
      address: <IPv4 IP>
    - type: InternalIP
      address: <IPv6 IP>
```

最后在云端使用 `kubectl get node` 查看接入的节点是否 Ready。
