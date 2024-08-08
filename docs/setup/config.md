---
title: CloudCore && EdgeCore Config
sidebar_position: 7
---

KubeEdge requires configuration on both [Cloud side (KubeEdge Master)](#configuration-cloud-side-kubeedge-master) and [Edge side (KubeEdge Worker Node)](#configuration-edge-side-kubeedge-worker-node).

## Configuring Cloud side (KubeEdge Master)

Setting up the cloud side involves two steps:

1. [Modifying the configuration file](#modification-of-the-configuration-file)
2. Registering Edge nodes (happens automatically by default), [users can also choose to register manually](#adding-the-edge-nodes-kubeedge-worker-node-on-the-cloud-side-kubeedge-master).

### Modifying the configuration file

CloudCore requires changes in the `cloudcore.yaml` configuration file. Follow these steps to create and set up the CloudCore config file:

1. Create the `/etc/kubeedge/config` folder to store the configuration file:

```shell
# the default configuration file path is '/etc/kubeedge/config/cloudcore.yaml'
# also you can specify it anywhere with '--config'
mkdir -p /etc/kubeedge/config/
```

2. You have two options for creating the configuration file:

  - Either create a minimal configuration file using the `~/kubeedge/cloudcore --minconfig` command:

    ```shell
    ~/kubeedge/cloudcore --minconfig > /etc/kubeedge/config/cloudcore.yaml
    ```

  - or create a full configuration file using the `~/kubeedge/cloudcore --defaultconfig`  command:

    ```shell
    ~/kubeedge/cloudcore --defaultconfig > /etc/kubeedge/config/cloudcore.yaml
    ```

3. Edit the configuration file:

  ```shell
  vim /etc/kubeedge/config/cloudcore.yaml
  ```

4. Ensure all configurations are correct before running `cloudcore`.

#### Modifying cloudcore.yaml

In the cloudcore.yaml, modify the following settings:

1. Configure either `kubeAPIConfig.kubeConfig` or `kubeAPIConfig.master` to specify the path to your kubeconfig file. The path might be either:

    ```shell
    /root/.kube/config 
    ```

    or

    ```shell
    /home/<your_username>/.kube/config
    ```

    depending on where you have set up your Kubernetes cluster. To generate the kubeconfig file, run the following commands:

    ```shell
    # To start using your cluster, you need to run the following as a regular user:

    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```

    By default, CloudCore uses an HTTPS connection to Kubernetes API server. If both `master` and `kubeConfig` are set, the value in `master` will override the one in kubeConfig.


2. Configure all the IP addresses of CloudCore that are exposed to the edge nodes (e.g., floating IP) in the `advertiseAddress` field. These IP addresses will be added to the SANs in the CloudCore cert.

    ```yaml
    modules:
      cloudHub:
        advertiseAddress:
        - 10.1.11.85
    ```

### Registering the Edge nodes (KubeEdge Worker Node) on the Cloud side (KubeEdge Master)

Edge nodes can be registered with the KubeEdge Master using one of the following ways:

1. Automatic Registration
2. Manual Registration

#### 1. Automatic Registration

Edge nodes can be automatically registered if the `modules.edged.registerNode` field in [edgecore's config](#create-and-set-edgecore-config-file) is set to true:

```yaml
modules:
  edged:
    registerNode: true
```

#### 2. Manual Registration

To manually register an edge node, follow the given steps:

- **Copy the `$GOPATH/src/github.com/kubeedge/kubeedge/build/node.json` file to your working directory:**

  ```shell
  mkdir -p ~/kubeedge/yaml
  cp $GOPATH/src/github.com/kubeedge/kubeedge/build/node.json ~/kubeedge/yaml
  ```

- **Modify the `metadata.name` field in the node.json file to the name of the edge node:**

  ```json
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

:::note

- The `metadata.name` field must match the `modules.edged.hostnameOverride` in the edgecore config.

- Make sure role is set to edge for the node. For this a key of the form `"node-role.kubernetes.io/edge"` must be present in `metadata.labels`. If this role is not set for the node, the pods, configmaps and secrets created/updated in the cloud cannot be synced with the targeted edge node.
:::

- **To deploy edge node, run the command on the cloud side:**

  ```shell
  kubectl apply -f ~/kubeedge/yaml/node.json
  ```

## Configuration Edge side (KubeEdge Worker Node)

### Create and set edgecore config file

EdgeCore requires changes in the `edgecore.yaml` configuration file. Follow these steps to create and set up the EdgeCore config file:

1. Create the `/etc/kubeedge/config` folder to store the configuration file:

  ```shell
      # the default configration file path is '/etc/kubeedge/config/edgecore.yaml'
      # also you can specify it anywhere with '--config'
      mkdir -p /etc/kubeedge/config/
  ```
2. You have two options for creating the configuration file:

- Either create a minimal configuration file using the `~/kubeedge/edgecore --minconfig` command:

    ```shell
    ~/kubeedge/edgecore --minconfig > /etc/kubeedge/config/edgecore.yaml
    ```

- or create a full configuration file using the `~/kubeedge/edgecore --defaultconfig`  command:

    ```shell
    ~/kubeedge/edgecore --defaultconfig > /etc/kubeedge/config/edgecore.yaml
    ```

3. Edit the configuration file:

    ```shell
        vim /etc/kubeedge/config/edgecore.yaml
    ```

4. Ensure all configurations are correct before running `edgecore`.

#### Modification in edgecore.yaml

1. Check `modules.edged.podSandboxImage`, This setting is critical and must be configured correctly. To check the architecture of your machine, run the following command:

  ```shell
    getconf LONG_BIT
  ```

    + Use `kubeedge/pause-arm:3.1` for arm arch
    + Use `kubeedge/pause-arm64:3.1` for arm64 arch
    + Use `kubeedge/pause:3.1` for x86 arch

2. **For KubeEdge versions before v1.3:** Verify that the cert files specified for `modules.edgehub.tlsCaFile`, `modules.edgehub.tlsCertFile`, and `modules.edgehub.tlsPrivateKeyFile` exist. If these files do not exist, you need to copy them from the cloud side.File` and `modules.edgehub.tlsPrivateKeyFile` exists. If those files not exist, you need to copy them from cloud side.

  **From KubeEdge v1.3 onwards:** You can skip the above check for cert files. However, if you configure the edgecore certificate manually, ensure that the certificat path is correct.

3. Update the IP address and port of the KubeEdge CloudCore in the `modules.edgehub.websocket.server` and `modules.edgehub.quic.server` fields. Set the CloudCore IP address accordingly.

4. Configure the desired container runtime to be used as either Docker or remote (for all CRI-based runtimes, including containerd). If this parameter is not specified, the Docker runtime will be used by default.

    ```yaml
    runtimeType: docker
    ```

    or

    ```yaml
    runtimeType: remote
    ```

5. If your runtime-type is remote, follow the [KubeEdge CRI Configuration](../setup/prerequisites/runtime.md) guide to set up KubeEdge with the remote/CRI-based runtimes.

  **Note:** If your KubeEdge version is before v1.3, you can skip steps 6-7.

6. Configure the IP address and port of the KubeEdge CloudCore in `modules.edgehub.httpServer`, which is used to apply for the certificate. For example:

    ```yaml
    modules:
      edgeHub:
        httpServer: https://10.1.11.85:10002
    ```

7. Configure the token:

    ```shell
    kubectl get secret tokensecret -n kubeedge -oyaml
    ```

    You will get an output similar to the following:

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

    Decode the tokendata field using base64:

    ```shell
    echo ODEzNTZjY2MwODIzMmIxMTU0Y2ExYmI5MmRlZjY4YWQwMGQ3ZDcwOTIzYmU3YjcyZWZmOTVlMTdiZTk5MzdkNS5leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGVIQWlPakUxT0RreE5qRTVPRGw5LmpxNENXNk1WNHlUVkpVOWdBUzFqNkRCdE5qeVhQT3gxOHF5RnFfOWQ4WFkK |base64 -d
    # then we get:
    81356ccc08232b1154ca1bb92def68ad00d7d70923be7b72eff95e17be9937d5.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkxNjE5ODl9.jq4CW6MV4yTVJU9gAS1j6DBtNjyXPOx18qyFq_9d8XY
    ```

    Copy the decoded string to the edgecore.yaml file as follows:

    ```yaml
    modules:
      edgeHub:
        token: 81356ccc08232b1154ca1bb92def68ad00d7d70923be7b72eff95e17be9937d5.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODkxNjE5ODl9.jq4CW6MV4yTVJU9gAS1j6DBtNjyXPOx18qyFq_9d8XY
    ```

#### Configuring MQTT mode

The Edge part of KubeEdge uses MQTT for communication between deviceTwin and devices. KubeEdge supports 3 MQTT modes (`internalMqttMode`, `bothMqttMode`, `externalMqttMode`). Set the `mqttMode` field in edgecore.yaml to the desired mode:

+ **internalMqttMode:** Internal MQTT broker is enabled (`mqttMode`=0).
+ **bothMqttMode:** Both internal and external brokers are enabled (`mqttMode`=1).
+ **externalMqttMode:** Only external broker is enabled  (`mqttMode`=2).

To use KubeEdge in double MQTT or external mode, ensure that mosquitto or emqx edge is installed on the edge node as an MQTT Broker.

At this point, we have completed all configuration changes related to edgecore.