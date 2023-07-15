---
title: Collect metrics from edge 
sidebar_position: 4
---

## Enable `kubectl logs/exec` feature

Refer to this [doc](./debug).


## Deploy metrics server

Here we use v0.4.1 metrics-server, please use v0.4.0+ version since it supports automatic port identification after v0.4.0.

v0.4.1 have fixed a harmless stack dump error, details see [this pr](https://github.com/kubernetes-sigs/metrics-server/pull/634).

### Download Configuration

```bash
$ wget https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.4.0/components.yaml -O deploy.yaml
```

### Update Deploy Configuration

Update `deploy.yaml` as below:

- Add affinity and tolerations configuration:

    ```yaml
    spec:
      template:
        spec:
          affinity:
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                  - key: node-role.kubernetes.io/master
                    operator: Exists
          tolerations:
          - key: node-role.kubernetes.io/master
            operator: Exists
            effect: NoSchedule
    ```

- Enable hostnetwork mode:

    ```yaml
    spec:
      template:
        spec:
          hostNetwork: true
    ```

- Skip tls insecure:

    ```yaml
    spec:
      template:
        spec:
          containers:
          - args:
            - --kubelet-insecure-tls
    ```

### Deploy

```bash
$ kubectl apply -f deploy.yaml
serviceaccount/metrics-server created
clusterrole.rbac.authorization.k8s.io/system:aggregated-metrics-reader created
clusterrole.rbac.authorization.k8s.io/system:metrics-server created
rolebinding.rbac.authorization.k8s.io/metrics-server-auth-reader created
clusterrolebinding.rbac.authorization.k8s.io/metrics-server:system:auth-delegator created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-server created
service/metrics-server created
deployment.apps/metrics-server created
apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created
```

### Test

```bash
$ kubectl top node
```

It would output all nodes as following:
```
NAME                 CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
edge-node            1169m        29%    3605Mi          45%
test-control-plane   121m         3%     664Mi           8%
```
