---
title: Monitoring KubeEdge Edge Nodes with Prometheus
sidebar_position: 6
---
# Monitoring KubeEdge Edge Nodes with Prometheus

## Environment Information

| Component  | Version                            |
|------------| ---------------------------------- |
| containerd | 1.7.2                              |
| k8s        | 1.26.0                             |
| KubeEdge   | 1.15.1 or 1.17.0                   |
| Jetson model type    | NVIDIA Jetson Xavier NX (16GB ram) |

> Regarding the KubeEdge version description:This feature is recommended for version 1.15.0 and above. Since v1.17.0 supports edge pods using InclusterConfig, the approach is different for versions before and after v1.17.0. This document will use v1.15.1 and v1.17.0 as examples to illustrate the steps.
## Deploying Prometheus

We can quickly install using the [Helm Charts](https://prometheus-community.github.io/helm-charts/)  of [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus), or we can install it manually.

It is important to pay attention to the compatibility between the Kubernetes version and kube-prometheus.

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

You can see that a ClusterIP type Service has been created for grafana, alertmanager, and prometheus. Of course, if we want to access these two services from the Internet, we can create the corresponding Ingress objects or use NodePort type Services. Here, for simplicity, we directly use NodePort type services. Edit the 3 Services of grafana, alertmanager-main, and prometheus-k8s to change the service type to NodePort:

![](..\..\static\img\advanced\image-20240524161614721.png)

```shell
kubectl edit svc grafana -n monitoring
kubectl edit svc alertmanager-main -n monitoring
kubectl edit svc prometheus-k8s -n monitoring
```

Due to the latest version of kube-prometheus setting NetworkPolicy, even if NodePort is configured, access is not possible. You need to modify the NetworkPolicy to allow access from the 10 network segment IP.

![](..\..\static\img\advanced\image-20240530111340823.png)

```
kubectl edit  NetworkPolicy prometheus-k8s -n monitoring
kubectl edit  NetworkPolicy grafana -n monitoring
kubectl edit  NetworkPolicy alertmanager-main -n monitoring
```

Now you can access the prometheus and grafana services via NodePort.

![](..\..\static\img\advanced\image-20240530111642034.png)



## **Deploying**  KubeEdge 

### KubeEdge < 1.17.0 

After deploying KubeEdge, it was found that the node-exporter pod on the edge node could not start.

Edit the failed pod with `kubectl edit` and found that the kube-rbac-proxy container failed to start. Looking at the logs of this container, it was found that kube-rbac-proxy wanted to obtain the environment variables KUBERNETES_SERVICE_HOST and KUBERNETES_SERVICE_PORT, but failed to do so, hence the startup failure.

![](..\..\static\img\advanced\image-20240612153658785.png)

Consulting with the KubeEdge community from Huawei, it was learned that version 1.17 of KubeEdge will add the settings for these two environment variables. The KubeEdge [community proposal link](https://github.com/wackxu/kubeedge/blob/4a7c00783de9b11e56e56968b2cc950a7d32a403/docs/proposals/edge-pod-list-watch-natively.md).

On the other hand, it is recommended to install edgemesh. After installation, pods on the edge can access kubernetes.default.svc.cluster.local:443.

####  1. Install  edgemesh

1. Configure the cloudcore configmap 

   `kubectl edit cm cloudcore -n kubeedge`   Set  dynamicController=true.

   After modification, restart cloudcore `kubectl delete pod cloudcore-776ffcbbb9-s6ff8 -n kubeedge`

2. Configure the edgecore module, set metaServer=true and clusterDNS

   ```shell
   $ vim /etc/kubeedge/config/edgecore.yaml
   
   modules:
     ...
     metaManager:
       metaServer:
         enable: true   //Configure here
   ...
   
   modules:
     ...
     edged:
       ...
       tailoredKubeletConfig:
         ...
         clusterDNS:     //Configure here
         - 169.254.96.16
   ...
   
   //Restart edgecore
   $ systemctl restart edgecore
   ```

   ![](..\..\static\img\advanced\image-20240329152628525.png)

   

   After modification, verify whether the modification was successful.

   ```
   $ curl 127.0.0.1:10550/api/v1/services
   
   {"apiVersion":"v1","items":[{"apiVersion":"v1","kind":"Service","metadata":{"creationTimestamp":"2021-04-14T06:30:05Z","labels":{"component":"apiserver","provider":"kubernetes"},"name":"kubernetes","namespace":"default","resourceVersion":"147","selfLink":"default/services/kubernetes","uid":"55eeebea-08cf-4d1a-8b04-e85f8ae112a9"},"spec":{"clusterIP":"10.96.0.1","ports":[{"name":"https","port":443,"protocol":"TCP","targetPort":6443}],"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}},{"apiVersion":"v1","kind":"Service","metadata":{"annotations":{"prometheus.io/port":"9153","prometheus.io/scrape":"true"},"creationTimestamp":"2021-04-14T06:30:07Z","labels":{"k8s-app":"kube-dns","kubernetes.io/cluster-service":"true","kubernetes.io/name":"KubeDNS"},"name":"kube-dns","namespace":"kube-system","resourceVersion":"203","selfLink":"kube-system/services/kube-dns","uid":"c221ac20-cbfa-406b-812a-c44b9d82d6dc"},"spec":{"clusterIP":"10.96.0.10","ports":[{"name":"dns","port":53,"protocol":"UDP","targetPort":53},{"name":"dns-tcp","port":53,"protocol":"TCP","targetPort":53},{"name":"metrics","port":9153,"protocol":"TCP","targetPort":9153}],"selector":{"k8s-app":"kube-dns"},"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}}],"kind":"ServiceList","metadata":{"resourceVersion":"377360","selfLink":"/api/v1/services"}}
   
   ```

   3. install edgemesh

      ```
      git clone https://github.com/kubeedge/edgemesh.git
      cd edgemesh
      
      kubectl apply -f build/crds/istio/
      
      Configure PSK and Relay Node 
      vim 04-configmap.yaml
      
        relayNodes:
        - nodeName: masternode ## your relay node name
          advertiseAddress:
          - x.x.x.x ## your relay node ip
      
      kubectl apply -f build/agent/resources/
      ```
      
      ![](..\..\static\img\advanced\image-20240329154436074.png)

#### 2. Modify dnsPolicy

After the deployment of edgemesh is complete, the two environment variables in node-exporter on the edge node are still empty, and it is not possible to access kubernetes.default.svc.cluster.local:443. The reason is that the DNS server configuration in the pod is incorrect. It should be 169.254.96.16, but it is the same as the host's DNS configuration.

```shell
kubectl exec -it node-exporter-hcmfg -n monitoring -- sh
Defaulted container "node-exporter" out of: node-exporter, kube-rbac-proxy
$ cat /etc/resolv.conf 
nameserver 127.0.0.53
```

Change the dnsPolicy to ClusterFirstWithHostNet, then restart node-exporter.

`kubectl edit ds node-exporter -n monitoring`

      dnsPolicy: ClusterFirstWithHostNet
      hostNetwork: true

#### 3. Add environment variables

vim /etc/systemd/system/edgecore.service

![](..\..\static\img\advanced\image-20240329155133337.png)

```
Environment=METASERVER_DUMMY_IP=kubernetes.default.svc.cluster.local
Environment=METASERVER_DUMMY_PORT=443
```

After modification, restart edgecore

```
systemctl daemon-reload
systemctl restart edgecore
```

**node-exporter is now running!**!!!!

In the edge node, you can find that the data of the edge node has been collected by curling http://127.0.0.1:9100/metrics.

### KubeEdge = 1.17.0 

When deploying version 1.17.0, pay attention that it is necessary to support edge Pods to use InClusterConfig to access Kube-APIServer, so you need to configure the specified cloudCore.featureGates.requireAuthorization=true and cloudCore.modules.dynamicController.enable=true. Details can be found in the [KubeEdge public account article](https://mp.weixin.qq.com/s/Dw2IKRDvOWH52xTOStI7dg)

```shell
keadm init --advertise-address=10.108.96.24  --set cloudCore.featureGates.requireAuthorization=true,cloudCore.modules.dynamicController.enable=true --kubeedge-version=v1.17.0
```

- After starting EdgeCore, modify the edgecore.yaml and restart EdgeCore as follows.

  Modify **metaServer.enable = true** and add **featureGates: requireAuthorization: true**

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

After modification, restart edgecore

```
systemctl daemon-reload
systemctl restart edgecore
```

#### Create  clusterrolebinding

It was found that the container inside node-exporter reported an error: `Unable to authenticate the request due to an error: tokenreviews.authentication.k8s.io is forbidden: User "system:serviceaccount:kubeedge:cloudcore" cannot create resource "tokenreviews" in API group "authentication.k8s.io" at the cluster scope.`

Because cloudcore does not have permission, create a clusterrolebinding.

![](..\..\static\img\advanced\9b5b3561b967051b6cab073f7eda10d.png)

```
kubectl create clusterrolebinding cloudcore-promethus-binding --clusterrole=cluster-admin --serviceaccount=kubeedge:cloudcore
```

After creating the clusterrolebinding, you can query the monitoring information of the edge nodes.

![](..\..\static\img\advanced\image-20240604094828377.png)

