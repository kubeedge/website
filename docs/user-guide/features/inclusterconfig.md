---
title: Edge pods use in-cluster config to access Kube-APIServer
sidebar_position: 7
---

## Abstract

In edge scenario, edge and cloud are in different network environment typically, so edge pods cannot access Kube-APIServer through in-cluster config directly. When you deploy edge pods which need to use `in-cluster config` mode, it will fail and the error message is as below: 

```
unable to load in-cluster configuration, KUBERNETES_SERVICE_HOST and KUBERNETES_SERVICE_PORT must be defined
```

From KubeEdge v1.17.0, KubeEdge supports edge pods using `in-cluster config` mechanism to access Kube-APIServer. If you need to use `in-cluster config` feature, you need to enable `metaServer` and turn on `requireAuthorization` featureGate. The steps to perform the operation will be described in detail below.

Please ref to [support in-cluster config proposal](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/inclusterconfig.md) to get more details about the design of this feature.


## Getting Started

### Cloud

When using `keadm init` to deploy CloudCore, please enable `dynamiccontroller` module and `requireAuthorization` featureGate:

```
keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.17.0 --set cloudCore.modules.dynamicController.enable=true,cloudCore.featureGates.requireAuthorization=true
```

If you have already deployed CloudCore without set `dynamiccontroller` and featureGate, you can modify the configuration following these steps: 

1. Modify CloudCore configuration

   Execute `kubectl edit cm cloudcore -nkubeedge` and then set `featureGates.requireAuthorization=true` and `dynamiccontroller.enable=true`

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

2. Create clusterrole for this feature. 

   The clusterrole required for this feature can be referenced from the file [rbac_cloudcore_requireAuthorization](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/templates/rbac_cloudcore_feature.yaml). Add these clusterrole in the cluster.

3. Restart CloudCore Pod. 

### Edge

1. Install EdgeCore first 

2. Modify EdgeCore configuration. 

    Execute `vi /etc/kubeedge/config/edgecore.yaml` and then set `featureGates.requireAuthorization=true` and `metaServer.enable=true`

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

Save these modification and then execute `sudo systemctl restart edgecore.service` to restart EdgeCore. 

### Deploy your edge pods

After set CloudCore and EdgeCore successfully, you can deploy your edge pods which need `in-cluster config` mode to access Kube-APIServer. 

:::note
If pods unable to access the Kube-APIServer normally, and the error message is as follows:

```
User "system:xxx:kubeedge:cloudcore" cannot create resource "xxx" in API group "xxx.k8s.io" at the cluster scope
``` 

It indicates that your pod requires additional `clusterrole` permissions. You can manually configure the corresponding `clusterrole` on the cloud side.
:::
