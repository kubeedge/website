---
title: 使用二进制部署
sidebar_position: 2
---
使用二进制部署KubeEdge进行测试，切勿在生产环境中使用这种方式。


## 局限性

- 需要超级用户权限（或root权限）才能运行。

## 设置云端（KubeEdge主节点）

### 创建CRD

```shell
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/devices/devices_v1alpha2_device.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/devices/devices_v1alpha2_devicemodel.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/reliablesyncs/cluster_objectsync_v1alpha1.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/reliablesyncs/objectsync_v1alpha1.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/router/router_v1_ruleEndpoint.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/router/router_v1_rule.yaml
```


### 准备配置文件

```shell
# cloudcore --minconfig > cloudcore.yaml
```

有关详细信息，请参阅[云端配置](./config#configuration-cloud-side-kubeedge-master)。

### 运行

```shell
# cloudcore --config cloudcore.yaml
```

运行 `cloudcore -h` 以获取帮助信息，并在需要时添加选项。


## 设置边缘端（KubeEdge工作节点）

### 准备配置文件

- 生成配置文件

```shell
# edgecore --minconfig > edgecore.yaml
```

- 在云端获取token值：

```shell
# kubectl get secret -nkubeedge tokensecret -o=jsonpath='{.data.tokendata}' | base64 -d
```

- 更新edgecore配置文件中的token值：

```shell
# sed -i -e "s|token: .*|token: ${token}|g" edgecore.yaml
```

`token` 值来自于之前步骤。

有关详细信息，请参阅[边缘配置](./config#configuration-edge-side-kubeedge-worker-node)。

### 运行

如果要在同一主机上运行 cloudcore 和 edgecore ，请首先运行以下命令：

```shell
# export CHECK_EDGECORE_ENVIRONMENT="false"
```

运行 edgecore:

```shell
# edgecore --config edgecore.yaml
```

运行 `edgecore -h` 以获取帮助信息，并在需要时添加选项。
