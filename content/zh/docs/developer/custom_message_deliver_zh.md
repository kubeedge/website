---
draft: false
linktitle: 路由管理
menu:
docs:
parent: developer guide
weight: 2
title: 路由管理
toc: true
type: docs
---
KubeEdge 通过 Kubernetes 支持路由管理 [CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions) .
用户可以在云边之间通信传递使用自定义消息使用MQTT代理。

## 使用场景
- 用于用户控制数据的传递;
- 用于不大的数据传递;
- 一次传输的数据不能大于 12MB.

## 使用案例

- 用户可以通过在云上的 api 传递自定义消息从云端到边缘端。最后消息会传递到边缘端的MQTT代理。

    1. 用户通过定义一条路由来规定消息的源端口和目的端口。
    2. 用户的云上应用通过云上api来传递消息；该消息通过topic来传递和发布到边缘端。
    3. 在第二步骤之后，用户的云上应用可以获取到消息。
- 用户可以通过调用云上的 api 传递自定义消息云端到边缘。

    1. 用户可以定义一条路由来规定消息的源端口和目的端口。
    2. 用户的边缘应用通过边缘端的MQTT代理传递消息。
    3. 在第二步骤之后，用户的云上应用可以获取到消息。

- 用户可以通过在云上的 api 传递自定义消息从云端到边缘端， 它将会调用边缘端的rest api来获取消息

    1. 用户可以定义一条路由来规定消息的源端口和目的端口.
    2. 用户的云上应用通过云上 api 来传递消息； 云端传递消息到边缘端， 云端会调用边缘端的 rest api.
    3. 在第二步骤之后，用户的边缘应用可以获取到消息.

## 路由和路由节点

### 路由和路由节点的定义
* 一个路由节点定义了消息从哪里来和要到那里去。 它有三种类型: rest, eventbus, servicebus.
    1. **rest**: 一个在云端的 rest 类型的路由节点。 它是一个发送源路由节点发送 rest 请求到边缘节点 ，或者是一个在边缘端接收消息的目的路由节点。

    2. **eventbus**: 它是一个发送数据到云端的发送源路由节点， 或者是一个在边缘端接收消息的目的路由节点。

    3. **servicebus**:  一个在边缘端的 rest api，它是一个接收从云端传递过来信息的目的路由节点。

* 一条路由定义了消息传递的源路由节点和目的路由节点。它有三种类型。

    1. rest->eventbus: 用户可以调用云上的rest api，消息将会通过发送到边缘端的MQTT代理。
    2. eventbus->rest: 用户可以通过边缘端的MQTT代理发布消息，消校会被发送到云端的rest api。
    3. rest->servicebus: 用户可以调用云端的rest api，消息将会用发送到边缘端的应用上。

### 路由节点和路由的自定义资源的注册
* 路由节点

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: ruleendpoints.rules.kubeedge.io
spec:
  group: rules.kubeedge.io
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                ruleEndpointType:
                  description: |
                    ruleEndpointType is a string value representing rule-endpoint type. its value is
                    one of rest/eventbus/servicebus.
                  type: string
                properties:
                  description: |
                    properties is not required except for servicebus rule-endpoint type. It is a map
                    value representing rule-endpoint properties.when ruleEndpointType is servicebus,
                    its value is {"service_port":"8080"}.
                  type: object
                  additionalProperties:
                    type: string
              required:
                - ruleEndpointType
  scope: Namespaced
  names:
    plural: ruleendpoints
    singular: ruleendpoint
    kind: RuleEndpoint
    shortNames:
      - re

```

* 路由

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: rules.rules.kubeedge.io
spec:
  group: rules.kubeedge.io
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                source:
                  description: |
                    source is a string value representing where the messages come from. Its
                    value is the same with rule-endpoint name. For example, my-rest or my-eventbus.
                  type: string
                sourceResource:
                  description: |
                    sourceResource is a map representing the resource info of source. For rest
                    rule-endpoint type its value is {"path":"/a/b"}. For eventbus rule-endpoint type its
                    value is {"topic":"<user define string>","node_name":"xxxx"}
                  type: object
                  additionalProperties:
                    type: string
                target:
                  description: |
                    target is a string value representing where the messages go to. its value is
                    the same with rule-endpoint name. For example, my-eventbus or my-rest or my-servicebus.
                  type: string
                targetResource:
                  description: |
                    targetResource is a map representing the resource info of target. For rest
                    rule-endpoint type its value is {"resource":"http://a.com"}. For eventbus rule-endpoint
                    type its value is {"topic":"/xxxx"}. For servicebus rule-endpoint type its value is
                    {"path":"/request_path"}.
                  type: object
                  additionalProperties:
                    type: string
              required:
                - source
                - sourceResource
                - target
                - targetResource
            status:
              type: object
              properties:
                successMessages:
                  type: integer
                failMessages:
                  type: integer
                errors:
                  items:
                    type: string
                  type: array
  scope: Namespaced
  names:
    plural: rules
    singular: rule
    kind: Rule

```

### 怎么样传递自定义消息

1. 从云到边 : **rest->eventbus**

1.1 创建一个 rest 和 eventbus 类型的路由节点，如果你还没有创建。操作命令行:

`kubectl create -f create-ruleEndpoint-rest.yaml`

`kubectl create -f create-ruleEndpoint-eventbus.yaml`

create-ruleEndpoint-rest.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: RuleEndpoint
metadata:
  name: my-rest
  labels:
    description: test
spec:
  ruleEndpointType: "rest"
  properties: {}
```

create-ruleEndpoint-eventbus.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: RuleEndpoint
metadata:
  name: my-eventbus
  labels:
    description: test
spec:
  ruleEndpointType: "eventbus"
  properties: {}
```


1.2 创建路由的命令行:

`kubectl create -f create-rule-rest-eventbus.yaml`

create-rule-rest-eventbus.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: Rule
metadata:
  name: my-rule
  labels:
    description: test
spec:
  source: "my-rest"
  sourceResource: {"path":"/a"}
  target: "my-eventbus"
  targetResource: {"topic":"test"}
```

1.3 在云上调用rest api 发送消息到边缘端.

在node name 和 sourceResource 的帮助下，在云上的rest api 被调用可以发送消息到边缘节点的eventbus上。

- Method: POST
- URL: **http://{rest_endpoint}/{node_name}/{namespace}/{path}**, {rest_endpoint} 是路由节点, {node_name} 是边缘端的名字, {namespace} 路由的命名空间, {path} 是源路由节点的路径。
- Body: {user_message}, {user_message} 用户要发送的消息

For example:
- Method: POST
- URL: http://{rest_endpoint}/{node_name}/default/a
- Body： {"message":"123"}

1.4 用户的应用可以通过边缘端的MQTT代理订阅自定义topic，从而接收云上发送的消息.

- Topic: {topic}, {topic} 是源路由节点的 targetResource.
- Message:  {user_message}

For example:
- subscribe Topic: 'test', exec command with mosquitto: `mosquitto_sub -t 'test' -d`
- Get Message: {"message":"123"}

2. 边到云: **eventbus->rest**:

2.1 创建 rest 类型和 eventbus 类型的路由节点，如果你还没有创建。操作命令行:

`kubectl create -f create-ruleEndpoint-rest.yaml`

`kubectl create -f create-ruleEndpoint-eventbus.yaml`


create-ruleEndpoint-rest.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: RuleEndpoint
metadata:
  name: my-rest
  labels:
    description: test
spec:
  ruleEndpointType: "rest"
  properties: {}
```

create-ruleEndpoint-eventbus.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: RuleEndpoint
metadata:
  name: my-eventbus
  labels:
    description: test
spec:
  ruleEndpointType: "eventbus"
  properties: {}
```


2.2 创建路由。操作命令符:

`kubectl create -f create-rule-eventbus-rest.yaml`

create-rule-eventbus-rest.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: Rule
metadata:
  name: my-rule-eventbus-rest
  labels:
    description: test
spec:
  source: "my-eventbus"
  sourceResource: {"topic": "test","node_name": "xxx"}
  target: "my-rest"
  targetResource: {"resource":"http://a.com"}
```

2.3 在边缘端，用户的边缘应用通过边缘端的MQTT代理使用自定义的topic发送消息。
- Topic: {namespace}/{topic}
- Message:  {user_api_body}

for example:
- 使用 mosquitto 发送消息, 操作命令符:

`mosquitto_pub -t 'default/test' -d -m '{"edgemsg":"msgtocloud"}'`

2.4 Kubeedge 发送消息到云上的 ip 地址。

- Method: POST
- URL: **http://{user_api}**, or **https://{user_api}**,{user_api} 是目的路由节点中的 targetResource.
- Body: {user_api_body}

For example: 在云上，用户可以获取消息： {"edgemsg":"msgtocloud"}

3. 云到边 : **rest->servicebus**

3.1 创建 rest 和 servicebus 类型的路由节点，如果你还没有创建。操作命令符:

`kubectl create -f create-ruleEndpoint-rest.yaml`

`kubectl create -f create-ruleEndpoint-servicebus.yaml`


create-ruleEndpoint-rest.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: RuleEndpoint
metadata:
  name: my-rest
  labels:
    description: test
spec:
  ruleEndpointType: "rest"
  properties: {}
```

create-ruleEndpoint-servicebus.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: RuleEndpoint
metadata:
  name: my-servicebus
  labels:
    description: test
spec:
  ruleEndpointType: "servicebus"
  properties: {"service_port":"6666"}
```


3.2 创建路由。操作命令符:

`kubectl create -f create-rule-rest-servicebus.yaml`

create-rule-rest-servicebus.yaml 的内容:

```yaml
apiVersion: rules.kubeedge.io/v1
kind: Rule
metadata:
  name: my-rule-rest-servicebus
  labels:
    description: test
spec:
  source: "my-rest"
  sourceResource: {"path":"/a"}
  target: "my-servicebus"
  targetResource: {"path":"/b"}
```

3.3 用户可以调用云上的 rest api 来发送消息到边缘端.

在node name 和 sourceResource 的帮助下，在云上的 rest api 被调用之后可以发送消息到边缘端的 servicebus 上。

- Method: POST/GET/DELETE/PUT
- URL: **http://{rest_endpoint}/{node_name}/{namespace}/{path}**, {rest_endpoint} 是路由节点, {node_name} 是边缘端的名字, {namespace} 路由的命名空间. {path} 是源路由节点的 sourceResource.
- Body: {user_message}, {user_message} 是用户发送的消息

然后, kubeedge 的 servicebus 可以调用 在边缘节点的 api.

- Method: POST/GET/DELETE/PUT
- URL: **http://127.0.0.1:{port}/{path}**, {port} 是目的路由节点的 properties 属性, {path} 是源路由节点的 targetResource.
- Body: {user_message}, {user_message} 用户发送的消息

For example:

- Method: POST
- URL: http://{rest_endpoint}/{node_name}/default/a
- Body： {"message":"123"}

然后, kubeedge 的 servicebus 可以调用边缘端的 api 。 例如:

- Method: POST
- URL: http://127.0.0.1:6666/b
- Body： {"message":"123"}

在边缘端，用户的应用可以获取到消息。

## 异常情况/异常处理

### CloudCore 重启

- 当 cloudcore 重启或者状态是正常的时候，它会获取所有的路由从 edge-controller 并且保存下来.

## 实现计划

- Alpha: v1.6 rest->eventbus, eventbus->rest
- Beta: v1.7 rest->servicebus
- GA: TBD
