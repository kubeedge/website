---
title: 使用 Prometheus 监控 KubeEdge 边缘节点
sidebar_position: 6
---

# 使用 Prometheus 监控 KubeEdge 边缘节点

## 环境信息

| 组件       | 版本                               |
| ---------- | ---------------------------------- |
| containerd | 1.7.2                              |
| k8s        | 1.26.0                             |
| KubeEdge   | 1.17.0                   |
| Jetson型号 | NVIDIA Jetson Xavier NX (16GB ram) |

> 关于 KubeEdge 版本说明：由于 v1.17.0 支持使用 InclusterConfig 的边缘 pod，因此 v1.17.0 之前和之后的版本的方法是不同的。本文档将以 v1.17.0 为例来说明操作步骤, v1.17.0 之前版本请参考对应版本文档。


## 部署 prometheus

我们可以直接使用 [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) 的 [Helm Charts](https://prometheus-community.github.io/helm-charts/) 来进行快速安装，也可以直接手动安装。

需要注意 Kubernetes 版本和 `kube-prometheus` 的兼容。

```shell
git clone https://github.com/prometheus-operator/kube-prometheus.git
cd kube-prometheus
kubectl apply --server-side -f manifests/setup
kubectl wait \
	--for condition=Established \
	--all CustomResourceDefinition \
	--namespace=monitoring
kubectl apply -f manifests/
```

可以看到上面针对 grafana、alertmanager 和 prometheus 都创建了一个类型为 ClusterIP 的 Service，当然如果我们想要在外网访问这两个服务的话可以通过创建对应的 Ingress 对象或者使用 NodePort 类型的 Service，我们这里为了简单，直接使用 NodePort 类型的服务即可，编辑 `grafana`、`alertmanager-main` 和 `prometheus-k8s` 这 3 个 Service，将服务类型更改为 NodePort:

![](../../../../..\static\img\advanced\image-20240524161614721.png)

```shell
kubectl edit svc grafana -n monitoring
kubectl edit svc alertmanager-main -n monitoring
kubectl edit svc prometheus-k8s -n monitoring
```

由于最新版本的 kube-prometheus 设置了网络策略，即使配置了 NodePort 也无法访问。需要修改 NetworkPolicy，允许 10网段的 IP访问。

![](../../../../..\static\img\advanced\image-20240530111340823.png)



```
kubectl edit  NetworkPolicy prometheus-k8s -n monitoring
kubectl edit  NetworkPolicy grafana -n monitoring
kubectl edit  NetworkPolicy alertmanager-main -n monitoring
```

这样就可以通过 NodePort 访问 prometheus 和 grafana 服务了

![](../../../../..\static\img\advanced\image-20240530111642034.png)

## 部署 KubeEdge 

### 开启 InClusterConfig 功能

部署 1.17.0版本注意，需要支持边缘 Pods 使用 InClusterConfig 访问 Kube-APIServer ，所以要配置指定 cloudCore.featureGates.requireAuthorization=true 以及 cloudCore.modules.dynamicController.enable=true。 详情可以查看 [KubeEdge 公众号文章](https://mp.weixin.qq.com/s/Dw2IKRDvOWH52xTOStI7dg)

```shell
keadm init --advertise-address=10.108.96.24  --set cloudCore.featureGates.requireAuthorization=true,cloudCore.modules.dynamicController.enable=true --kubeedge-version=v1.17.0
```

- 启动 EdgeCore 后，按如下修改 edgecore.yaml 后重启 EdgeCore。

  修改  **metaServer.enable = true** 同时增加  **featureGates: requireAuthorization: true**

```yaml
apiVersion: edgecore.config.kubeedge.io/v1alpha2
kind: EdgeCore
featureGates:
  requireAuthorization: true
modules:
  ...
  metaManager:
    metaServer:
      enable: true
```

修改完重启 edgecore

```
systemctl daemon-reload
systemctl restart edgecore
```

### 创建 clusterrolebinding

发现 node-exporter 里面的容器报错：`Unable to authenticate the request due to an error: tokenreviews.authentication.k8s.io is forbidden: User "system:serviceaccount:kubeedge:cloudcore" cannot create resource "tokenreviews" in API group "authentication.k8s.io" at the cluster scope`

因为  cloudcore 没有权限，所以创建一个 clusterrolebinding

![](../../../../..\static\img\advanced\9b5b3561b967051b6cab073f7eda10d.png)



```
kubectl create clusterrolebinding cloudcore-promethus-binding --clusterrole=cluster-admin --serviceaccount=kubeedge:cloudcore
```

创建完 clusterrolebinding 就可以查询到边缘节点的监控信息了。



![](../../../../..\static\img\advanced\image-20240604094828377.png)

