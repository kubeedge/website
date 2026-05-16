---
title: 边缘pods使用in-cluster config访问Kube-APIServer
sidebar_position: 7
---

## 概要

在边缘场景中，边缘端和云端通常处于不同的网络环境，因此边缘 Pod 无法直接通过 in-cluster config访问 Kube-APIServer。当您部署的边缘pods需要使用`in-cluster config`, pod日志会出现类似如下报错：

```
unable to load in-cluster configuration, KUBERNETES_SERVICE_HOST and KUBERNETES_SERVICE_PORT must be defined
```

从KubeEdge v1.17.0起, KubeEdge开始支持边缘pods使用`in-cluster config`机制访问Kube-APIServer. 如果您需要使用该特性，请参考下面的步骤。

您也可以参考[in-cluster config特性proposal](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/inclusterconfig.md) 来了解关于该特性的设计与实现.


## 操作步骤

### 云端

当您使用`keadm init`来安装CloudCore时，请打开`dynamiccontroller`模块以及`requireAuthorization`特性开关:

```
keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.17.0 --set cloudCore.modules.dynamicController.enable=true,cloudCore.featureGates.requireAuthorization=true
```

如果您已经安装过CloudCore，并且在安装时没有配置`dynamiccontroller`模块以及`requireAuthorization`特性开关，请按照以下步骤修改配置：

1. 修改CloudCore配置

   执行`kubectl edit cm cloudcore -nkubeedge`并配置`featureGates.requireAuthorization=true`以下`dynamiccontroller.enable=true`：

```yaml
apiVersion: v1
data:
  cloudcore.yaml: |
    apiVersion: cloudcore.config.kubeedge.io/v1alpha2
    ...
    featureGates:
      requireAuthorization: true
    modules:
      ...
      dynamicController:
        enable: true     
      ...
```

2. 创建该特性相关的clusterrole 

   特性相关的clusterrole请参考[rbac_cloudcore_requireAuthorization](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/templates/rbac_cloudcore_feature.yaml)。 在集群中添加参考文档中的clusterrole。

3. 重启CloudCore的pod

### 边缘端

1. 请先安装好EdgeCore

2. 修改EdgeCore配置 

   执行`vi /etc/kubeedge/config/edgecore.yaml`，配置 `featureGates.requireAuthorization=true` 以及 `metaServer.enable=true`

```yaml
apiVersion: edgecore.config.kubeedge.io/v1alpha2
...
kind: EdgeCore
featureGates:
  requireAuthorization: true
modules:
...
metaServer:
  enable: true
...
```

保存以上修改并执行`sudo systemctl restart edgecore.service`来重启EdgeCore. 

### 部署您的边缘应用

当CloudCore和EdgeCore配置完成后，您就可以部署边缘应用，并通过`in-cluster config`机制访问Kube-APIServer了。

:::note
如果您的pods无法直接访问Kube-APIServer，并且错误信息类似如下权限错误：

```
User "system:xxx:kubeedge:cloudcore" cannot create resource "xxx" in API group "xxx.k8s.io" at the cluster scope
``` 

说明该pod需要额外的`clusterrole`权限，您可以手动在集群中添加对应的`clusterrole`。
:::
