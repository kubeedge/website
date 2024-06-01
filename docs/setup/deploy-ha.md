---
title: Deploying HA CloudCore
sidebar_position: 6
---

## The HA of CloudCore (deployed in k8s cluster)

**Note:**
There are several ways to achieve high availability of CloudCore, for example, using ingress, keepalived, etc. In this guide, we have adopted the keepalived approach. The HA of CloudCore using an ingress controller will be covered later.

## Determine the virtual IP of CloudCore

Determine a VIP that the CloudCore service exposed to the edge nodes. Here, we recommend using `keepalived` for this purpose. When using `keepalived`, it is better to schedule pods directly to a specific number of nodes by using `nodeSelector`. Additionally, you will have to install `keepalived` on each node where CloudCore runs. The configuration of `keepalived` is shown at the end. Let's assume the VIP is `10.10.102.242` for this guide.

The use of `nodeSelector` is as follow:

```bash
kubectl label nodes [nodename] [key]=[value]  # label the nodes where the cloudcore will run
```

Modify the `nodeSelector` section in the deployment manifest:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudcore
spec:
  template:
    spec:
      nodeSelector: # configure the nodeSelector here!
        [key]: [value]
```

## Create k8s resources

The manifests and scripts in `github.com/kubeedge/kubeedge/build/cloud/ha` will be used. Place these files in a location where you can access them with kubectl. (You may need to make some modifications to manifests/scripts to suit your environment.)

First, ensure that your Kubernetes cluster can pull the CloudCore image. If the image doesn't exist, you can build it and push it to your registry:

```bash
cd $GOPATH/src/github.com/kubeedge/kubeedge
make image WHAT=cloudcore
```

We will create Kubernetes resources from the manifests in name order. Before creating them, **check the content of each manifest to ensure it meets your environment requirements.**

:::note
**Note:** Currently, the following manifests do not support the `kubectl logs` command. If needed, you will have to make additional configurations manually.
:::

### 02-ha-configmap.yaml

Configure the VIP address of CloudCore which is exposed to the edge nodes in the `advertiseAddress` field. This address will be added to the Subject Alternative Names (SANs) in the CloudCore cert. For example:

```yaml
modules:
  cloudHub:
    advertiseAddress:
    - 10.10.102.242
```

:::note
**Note:** If you want to reset the CloudCore, run this command before creating k8s resources:
:::

```bash
kubectl delete namespace kubeedge
```

Then create the k8s resources:

```shell
cd build/cloud/ha
for resource in $(ls *.yaml); do kubectl create -f $resource; done
```

## keepalived

The `keepalived` configuration we recommend is as following. You can adjust it according to your needs.

**keepalived.conf:**

- **master:**

```yaml
! Configuration File for keepalived

global_defs {
  router_id lb01
  vrrp_mcast_group4 224.0.0.19
}
# CloudCore
vrrp_script CloudCore_check {
  script "/etc/keepalived/check_cloudcore.sh" # the script for health check
  interval 2
  weight 2
  fall 2
  rise 2
}
vrrp_instance CloudCore {
  state MASTER
  interface eth0 # based on your host
  virtual_router_id 167
  priority 100
  advert_int 1
  authentication {
    auth_type PASS
    auth_pass 1111
  }
  virtual_ipaddress {
    10.10.102.242/24 # VIP
  }
  track_script {
    CloudCore_check
 }
}
```

- **backup:**

```yaml
! Configuration File for keepalived

global_defs {
  router_id lb02
  vrrp_mcast_group4 224.0.0.19
}
# CloudCore
vrrp_script CloudCore_check {
  script "/etc/keepalived/check_cloudcore.sh" # the script for health check
  interval 2
  weight 2
  fall 2
  rise 2
}
vrrp_instance CloudCore {
  state BACKUP
  interface eth0 # based on your host
  virtual_router_id 167
  priority 99
  advert_int 1
  authentication {
    auth_type PASS
    auth_pass 1111
  }
  virtual_ipaddress {
    10.10.102.242/24 # VIP
  }
  track_script {
    CloudCore_check
 }
}
```

**check_cloudcore.sh:**

```shell
#!/usr/bin/env bash
http_code=`curl -k -o /dev/null -s -w %{http_code} https://127.0.0.1:10002/readyz`
if [ $http_code == 200 ]; then
    exit 0
else
    exit 1
fi

```
