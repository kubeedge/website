---
title: 配置CloudCore和EdgeCore
sidebar_position: 3
---
KubeEdge要求在 [云端(KubeEdge Master)](#配置云端（KubeEdge-Master节点）) 和 [边缘端(KubeEdge Worker Node)](#配置边缘端（KubeEdge工作节点）) 都进行对应的配置

## 配置云端（KubeEdge Master节点）

配置云端需要两个步骤：

1. [修改配置文件](#修改配置文件)
2. 默认情况下，边缘节点将自动注册。[用户仍然可以选择手动注册](#在云端（KubeEdge-master节点）添加边缘节点（KubeEdge工作节点）)。


### 修改配置文件

Cloudcore要求更改 `cloudcore.yaml` 配置文件。

创建并设置cloudcore配置文件

创建 `/etc/kubeedge/config` 文件夹

```shell
# the default configuration file path is '/etc/kubeedge/config/cloudcore.yaml'
# also you can specify it anywhere with '--config'
mkdir -p /etc/kubeedge/config/
```

使用 `~/kubeedge/cloudcore --minconfig` 命令获取最小配置模板

```shell
~/kubeedge/cloudcore --minconfig > /etc/kubeedge/config/cloudcore.yaml
```

或使用 `~/kubeedge/cloudcore --defaultconfig` 命令获取完整配置模板

```shell
~/kubeedge/cloudcore --defaultconfig > /etc/kubeedge/config/cloudcore.yaml
```

编辑配置文件

```shell
vim /etc/kubeedge/config/cloudcore.yaml
```

在运行之前验证配置 `cloudcore`

#### 修改 cloudcore.yaml

在 cloudcore.yaml 中，修改以下设置。

1. 无论是 `kubeAPIConfig.kubeConfig` 或 `kubeAPIConfig.master` ：都可能 kubeconfig 文件的路径。同时它也可能是

    ```shell
    /root/.kube/config
    ```

    或者

    ```shell
    /home/<your_username>/.kube/config
    ```

    在您安装kubernetes的地方执行以下步骤：

    ```shell
    要开始使用集群，您需要以普通用户身份运行以下命令

    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```

    默认情况下，cloudcore 使用 https 连接到 Kubernetes apiserver。如果 `master` 和 `kubeConfig` 都进行了配置， `master` 将覆盖kubeconfig中的对应值。


2. 在 `advertiseAddress` 中配置所有暴露给边缘节点（如动态IP）的 CloudCore 的IP地址，这些IP地址将添加到CloudCore证书中的SAN中。

    ```yaml
    modules:
      cloudHub:
        advertiseAddress:
        - 10.1.11.85
    ```

### 在云端（KubeEdge master节点）添加边缘节点（KubeEdge工作节点）

节点注册可以通过两种方式完成：

1. 节点 - 自动注册
2. 节点 - 手动注册

#### 节点 - 自动注册

如果 edgecore 的[配置](#创建并设置Edgecore配置文件) 中的`modules.edged.registerNode` 设置为true，Edge节点则会自动注册。

```yaml
modules:
  edged:
    registerNode: true
```

#### 节点 - 手动注册

##### 复制 `$GOPATH/src/github.com/kubeedge/kubeedge/build/node.json` 到您的工作目录并更改 `metadata.name` 为边缘节点的名称

```shell
mkdir -p ~/kubeedge/yaml
cp $GOPATH/src/github.com/kubeedge/kubeedge/build/node.json ~/kubeedge/yaml
```

Node.json

```script
{
  "kind": "Node",
  "apiVersion": "v1",
  "metadata": {
    "name": "edge-node",
    "labels": {
      "name": "edge-node",
      "node-role.kubernetes.io/edge": ""
    }
  }
}
```

**注意:**
1. `metadata.name` 必须和 edgecore 的 `modules.edged.hostnameOverride` 配置里保持一致

2. 确保该节点的角色被设置为“边缘节点”。对此， `metadata.labels` 中必须存在 `"node-role.kubernetes.io/edge"` 形式的密钥。如果未为节点设置角色，则无法在云端创建/更新pod、configmap和secrets，以及同步到它们所对应的节点的操作。


##### 部署边缘节点（**您必须在云端运行命令**）

```shell
kubectl apply -f ~/kubeedge/yaml/node.json
```

## 配置边缘端（KubeEdge工作节点）

### 创建并设置Edgecore配置文件

创建 `/etc/kubeedge/config` 文件夹

```shell
    # the default configration file path is '/etc/kubeedge/config/edgecore.yaml'
    # also you can specify it anywhere with '--config'
    mkdir -p /etc/kubeedge/config/
```

使用 `~/kubeedge/edgecore --minconfig` 命令创建最简配置

```shell
    ~/kubeedge/edgecore --minconfig > /etc/kubeedge/config/edgecore.yaml
```

或使用 `~/kubeedge/edgecore --defaultconfig` 命令创建完整配置


```shell
~/kubeedge/edgecore --defaultconfig > /etc/kubeedge/config/edgecore.yaml
```

编辑配置文件

```shell
    vim /etc/kubeedge/config/edgecore.yaml
```

在运行之前验证配置 `edgecore` 

#### 修改 edgecore.yaml

1. 检查 `modules.edged.podSandboxImage` ：这非常重要，必须正确设置。

   要检查计算机的体系结构，请运行以下命令

    ```shell
    getconf LONG_BIT
    ```

    + `kubeedge/pause-arm:3.1` for arm arch
    + `kubeedge/pause-arm64:3.1` for arm64 arch
    + `kubeedge/pause:3.1` for x86 arch

2. KubeEdge v1.3之前的版本：检查 `modules.edgehub.tlsCaFile` 、`modules.edgehub.tlsCertFile` 和 `modules.edgehub.tlsPrivateKeyFile` 的证书文件是否存在。如果这些文件不存在，您需要从云端拷贝它们。

    KubeEdge v1.3之后的版本：仅跳过以上有关证书文件的检查。但是，如果手动配置Edgecore证书，则必须检查证书的路径是否正确。

3. 在 `modules.edgehub.websocket.server` 和 `modules.edgehub.quic.server` 字段中更新KubeEdge CloudCore的IP地址和端口。您需要设置 cloudcore 的IP地址。

4. 配置docker或remote作为所需的runtime的容器（对于所有基于CRI的runtime（包括容器））。如果未指定此参数，则默认情况下将使用docker 作为 runtime 的容器

    ```yaml
    runtimeType: docker
    ```

    or

    ```yaml
    runtimeType: remote
    ```

5. 如果您的运行类型是remote，请遵循[KubeEdge CRI配置](../advanced/cri)指南来设置基于 remote/CRI 的运行时的KubeEdge。

    **注意：** 如果您的KubeEdge版本低于v1.3，则跳过步骤6-7。

6. 在用于申请证书的 `modules.edgehub.httpServer` 中配置 KubeEdge cloudcore 的IP地址和端口。例如：

    ```yaml
    modules:
      edgeHub:
        httpServer: https://10.1.11.85:10002
    ```

7. 配置token

    ```shell
    kubectl get secret tokensecret -n kubeedge -oyaml
    ```

    然后，您将获得如下内容：

    ```yaml
    apiVersion: v1
    data:
      tokendata: ODEzNTZjY2MwODIzMmIxMTU0Y2ExYmI5MmRlZjY4YWQwMGQ3ZDcwOTIzYmU3YjcyZWZmOTVlMTdiZTk5MzdkNS5leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGVIQWlPakUxT0RreE5qRTVPRGw5LmpxNENXNk1WNHlUVkpVOWdBUzFqNkRCdE5qeVhQT3gxOHF5RnFfOWQ4WFkK
    kind: Secret
    metadata:
      creationTimestamp: "2020-05-10T01:53:10Z"
      name: tokensecret
      namespace: kubeedge
      resourceVersion: "19124039"
      selfLink: /api/v1/namespaces/kubeedge/secrets/tokensecret
      uid: 48429ce1-2d5a-4f0e-9ff1-f0f1455a12b4
    type: Opaque
    ```

    通过base64解码 tokendata 字段：

    ```shell
    echo ODEzNTZjY2MwODIzMmIxMTU0Y2ExYmI5MmRlZjY4YWQwMGQ3ZDcwOTIzYmU3YjcyZWZmOTVlMTdiZTk5MzdkNS5leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGVIQWlPakUxT0RreE5qRTVPRGw5LmpxNENXNk1WNHlUVkpVOWdBUzFqNkRCdE5qeVhQT3gxOHF5RnFfOWQ4WFkK |base64 -d
    # then we get:
    81356ccc08232b1154ca1bb92def68ad00d7d70923be7b72eff95e17be9937d5.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkxNjE5ODl9.jq4CW6MV4yTVJU9gAS1j6DBtNjyXPOx18qyFq_9d8XY
    ```

    将解码后的字符串复制到 edgecore.yaml 中，如下所示：

    ```yaml
    modules:
      edgeHub:
        token: 81356ccc08232b1154ca1bb92def68ad00d7d70923be7b72eff95e17be9937d5.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkxNjE5ODl9.jq4CW6MV4yTVJU9gAS1j6DBtNjyXPOx18qyFq_9d8XY
    ```

#### MQTT模式配置

KubeEdge的边缘部分使用MQTT在deviceTwin和设备之间进行通信。KubeEdge支持3种MQTT模式(`internalMqttMode`, `bothMqttMode`, `externalMqttMode`)，将 edgecore.yaml 中的 `mqttMode` 字段设置为所需模式。
+ internalMqttMode: 启用内部mqtt代理 (`mqttMode`=0).
+ bothMqttMode: 启用内部和外部代理 (`mqttMode`=1).
+ externalMqttMode: 仅启用外部代理 (`mqttMode`=2).

要在双mqtt或外部模式下使用 KubeEdge，您需要确保将 mosquitto 或 emqx edge 作为MQTT Broker安装在边缘节点上。

至此，我们已经完成了与edgecore相关的所有配置的更改。
