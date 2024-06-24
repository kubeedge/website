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
| KubeEdge   | 1.15.1                             |
| Jetson型号 | NVIDIA Jetson Xavier NX (16GB ram) |

> 关于 KubeEdge 版本说明：建议1.15.0及以上版本使用此功能。由于 v1.17.0 支持使用 InclusterConfig 的边缘 pod，因此 v1.17.0 之前和之后的版本的方法是不同的。本文档将以 v1.15.1 和 v1.17.0 为例来说明操作步骤。


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

部署完 KubeEdge 发现，node-exporter 在边缘节点的 pod 起不来。

去节点上查看 node-exporter 容器日志，发现是其中的 kube-rbac-proxy 这个 container 启动失败，看这个 container 的logs。发现是 kube-rbac-proxy 想要获取 KUBERNETES_SERVICE_HOST 和 KUBERNETES_SERVICE_PORT 这两个环境变量，但是获取失败，所以启动失败。

![](../../../../../static\img\advanced\image-20240612153658785.png)



和华为 KubeEdge 的社区同学咨询，KubeEdge 1.17版本将会增加这两个环境变量的设置。[KubeEdge 社区  proposals 链接](https://github.com/wackxu/kubeedge/blob/4a7c00783de9b11e56e56968b2cc950a7d32a403/docs/proposals/edge-pod-list-watch-natively.md)。

另一方面，推荐安装 edgemesh，安装之后在 edge 的 pod 上就可以访问 kubernetes.default.svc.cluster.local:443 了。

####  1. edgemesh部署

1. 配置 cloudcore configmap

   `kubectl edit cm cloudcore -n kubeedge`   设置 dynamicController=true.

   修改完 重启 cloudcore `kubectl delete pod cloudcore-776ffcbbb9-s6ff8 -n kubeedge`

2. 配置 edgecore 模块，配置 metaServer=true 和 clusterDNS  

   ```shell
   $ vim /etc/kubeedge/config/edgecore.yaml
   
   modules:
     ...
     metaManager:
       metaServer:
         enable: true   //配置这里
   ...
   
   modules:
     ...
     edged:
       ...
       tailoredKubeletConfig:
         ...
         clusterDNS:     //配置这里
         - 169.254.96.16
   ...
   
   //重启edgecore
   $ systemctl restart edgecore
   ```

   

   

   ![](../../../../..\static\img\advanced\image-20240329152628525.png)

   

   修改完 验证是否修改成功
   
   ```
   $ curl 127.0.0.1:10550/api/v1/services
   
   {"apiVersion":"v1","items":[{"apiVersion":"v1","kind":"Service","metadata":{"creationTimestamp":"2021-04-14T06:30:05Z","labels":{"component":"apiserver","provider":"kubernetes"},"name":"kubernetes","namespace":"default","resourceVersion":"147","selfLink":"default/services/kubernetes","uid":"55eeebea-08cf-4d1a-8b04-e85f8ae112a9"},"spec":{"clusterIP":"10.96.0.1","ports":[{"name":"https","port":443,"protocol":"TCP","targetPort":6443}],"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}},{"apiVersion":"v1","kind":"Service","metadata":{"annotations":{"prometheus.io/port":"9153","prometheus.io/scrape":"true"},"creationTimestamp":"2021-04-14T06:30:07Z","labels":{"k8s-app":"kube-dns","kubernetes.io/cluster-service":"true","kubernetes.io/name":"KubeDNS"},"name":"kube-dns","namespace":"kube-system","resourceVersion":"203","selfLink":"kube-system/services/kube-dns","uid":"c221ac20-cbfa-406b-812a-c44b9d82d6dc"},"spec":{"clusterIP":"10.96.0.10","ports":[{"name":"dns","port":53,"protocol":"UDP","targetPort":53},{"name":"dns-tcp","port":53,"protocol":"TCP","targetPort":53},{"name":"metrics","port":9153,"protocol":"TCP","targetPort":9153}],"selector":{"k8s-app":"kube-dns"},"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}}],"kind":"ServiceList","metadata":{"resourceVersion":"377360","selfLink":"/api/v1/services"}}
   
   ```

   3. 安装 edgemesh
   
      ```
      git clone https://github.com/kubeedge/edgemesh.git
      cd edgemesh
      
      kubectl apply -f build/crds/istio/
      
      PSK 和 Relay Node 设置
      vim 04-configmap.yaml
      
        relayNodes:
        - nodeName: masternode ## your relay node name
          advertiseAddress:
          - x.x.x.x ## your relay node ip
          
          
      
      kubectl apply -f build/agent/resources/
      ```
      
      ![](../../../../..\static\img\advanced\image-20240329154436074.png)

#### 2. 修改dnsPolicy

edgemesh部署完成后，edge节点上的node-exporter中的两个境变量还是空的，也无法访问kubernetes.default.svc.cluster.local:443，原因是该pod中的dns服务器配置错误，应该是169.254.96.16的，但是却是跟宿主机一样的dns配置。

```shell
kubectl exec -it node-exporter-hcmfg -n monitoring -- sh
Defaulted container "node-exporter" out of: node-exporter, kube-rbac-proxy
$ cat /etc/resolv.conf 
nameserver 127.0.0.53
```

将dnsPolicy修改为ClusterFirstWithHostNet，之后重启node-exporter，dns的配置正确

`kubectl edit ds node-exporter -n monitoring`

      dnsPolicy: ClusterFirstWithHostNet
      hostNetwork: true

#### 3. 添加环境变量

vim /etc/systemd/system/edgecore.service

![](../../../../..\static\img\advanced\image-20240329155133337.png)

```
Environment=METASERVER_DUMMY_IP=kubernetes.default.svc.cluster.local
Environment=METASERVER_DUMMY_PORT=443
```

修改完重启 edgecore

```
systemctl daemon-reload
systemctl restart edgecore
```

**node-exporter 变成 running**!!!!

在边缘节点 `curl http://127.0.0.1:9100/metrics`  可以发现 采集到了边缘节点的数据。

