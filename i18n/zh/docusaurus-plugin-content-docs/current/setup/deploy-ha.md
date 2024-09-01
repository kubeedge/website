---
title: 部署高可用的CloudCore
sidebar_position: 6
---

## CloudCore 高可用部署（K8s集群中）

**注意：**
实现CloudCore的高可用有多种方式，例如ingress、keepalived等。这次我们采用keepalived方式，而基于ingress的CloudCore高可用将在后续实现。

## 确定CloudCore的虚拟IP

确认并设置CloudCore服务向边缘节点暴露的虚拟IP（VIP），这里我们推荐使用`keepalived`来实现。在使用`keepalived`时，最好通过`nodeSelector`直接将pod调度到特定数量的节点上，并且需要在每个运行CloudCore的节点上安装`keepalived`。`keepalived`的配置将在最后展示。这里假设VIP是 `10.10.102.242`

`nodeSelector`的使用方式如下：

```bash
kubectl label nodes [nodename] [key]=[value]  # 将有CloudCore运行的节点打上相应的标签
```

修改`nodeselector`的配置：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudcore
spec:
  template:
    spec:
      nodeSelector: # 在这里配置nodeSelector！
        [key]: [value]
```

## 创建k8s资源

`github.com/kubeedge/kubeedge/build/cloud/ha`中的manifests和scripts被用于HA的构建，因此需要将这些文件放到kubectl可以访问的位置（您需要对manifests/scrips进行一些修改以适应您的环境）。

首先，确保您的k8s集群可以拉取cloudcore镜像。如果镜像不存在，我们可以通过以下命令构建一个 cloudcore 镜像，然后推送到您自己的镜像仓库。

```bash
cd $GOPATH/src/github.com/kubeedge/kubeedge
make image WHAT=cloudcore
```

我们按照名称顺序从manifests中创建k8s资源。在创建之前，**检查每个manifest的内容，确保其适配您的环境**。

**注意：** 目前下面的manifests还不支持`kubectl logs`命令。如果需要，您需要手动修改更多配置。·

### 02-ha-configmap.yaml

在`advertiseAddress`中配置CloudCore暴露给边缘节点的VIP地址，该VIP地址将被添加到CloudCore证书的SAN中。例如：

```yaml
modules:
  cloudHub:
    advertiseAddress:
    - 10.10.102.242
```

**注意**：如果您想重置CloudCore，请在创建k8s资源之前执行以下命令：

```bash
kubectl delete namespace kubeedge
```

再创建k8s资源：

```shell
cd build/cloud/ha
for resource in $(ls *.yaml); do kubectl create -f $resource; done
```

## keepalived

我们推荐的`keepalived`配置如下。您可以根据自己的需求进行调整。

**keepalived.conf:**

- master:

```yaml
! Configuration File for keepalived

global_defs {
  router_id lb01
  vrrp_mcast_group4 224.0.0.19
}
# CloudCore
vrrp_script CloudCore_check {
  script "/etc/keepalived/check_cloudcore.sh" # 用于健康检查的脚本
  interval 2
  weight 2
  fall 2
  rise 2
}
vrrp_instance CloudCore {
  state MASTER
  interface eth0 # 根据您的主机修改
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

- backup:

```yaml
! Configuration File for keepalived

global_defs {
  router_id lb02
  vrrp_mcast_group4 224.0.0.19
}
# CloudCore
vrrp_script CloudCore_check {
  script "/etc/keepalived/check_cloudcore.sh" # 用于健康检查的脚本
  interval 2
  weight 2
  fall 2
  rise 2
}
vrrp_instance CloudCore {
  state BACKUP
  interface eth0 # 根据您的主机修改
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

check_cloudcore.sh:

```shell
#!/usr/bin/env bash
http_code=`curl -k -o /dev/null -s -w %{http_code} https://127.0.0.1:10002/readyz`
if [ $http_code == 200 ]; then
    exit 0
else
    exit 1
fi

```
