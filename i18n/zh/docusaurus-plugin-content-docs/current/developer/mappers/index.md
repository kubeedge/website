---
title: Mappers 
id: mappers-index
---

## 概述
Mapper是用来连接并控制设备的应用，它负责的功能如下：

- 扫描并连接设备。
- 收集设备观测到的值。
- 对设备数据进行标准化处理。
- 推送或拉取设备数据。
- 设置设备孪生的期望值。
- 对设备进行健康检查。(todo)

KubeEdge使用Device Controller、Device Twin和Mapper来控制设备。Device Controller位于云端，它使用CRD来定义和控制设备。
Device Twin位于边缘侧，它能够存储来自Mapper的值/状态并在Mapper与Device Controller之间传递消息。
同时，Device Twin中的DMI用于向云端注册Mapper并把Device Model与Device Instance传递给Mapper。

## 如何创建Mapper
现在用户能够使用 **[mapper framework](../mapper-framework)** 来生成自己的Mapper并控制边缘设备。
### 1. 设计设备模型与设备实例的CRDs
如果你不清楚如何定义Device Model和Device Instance的配置文件，你可以从**[page](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd-v1beta1.md)**中获取更多细节。
### 2. 生成Mapper工程
下方的命令能够生成一个基础的Mapper框架。运行命令并输入定义的Mapper名称：
```shell
make generate
Please input the mapper name (like 'Bluetooth', 'BLE'): foo
```
上述命令将生成一个以您的输入命名的项目。文件树如下：
```
mapper
├── cmd ------------------------ Main process.
│ └── main.go ------------------ Almost need not change.
├── config.yaml ---------------- Configuration file including DMI's grpc settting
├── data ----------------------- Publish data and database implementation layer, almost need not change
│ ├── dbmethod ----------------- Provider implement database interfaces to save data
│ │ ├── influxdb2 -------------- Implementation of Time Series Database(InfluxDB)
│ │ │ └── client.go ------------ InfluxDB client
│ │ ├── redis -------------------Implementation of K/V Database(Redis)
│ │ │ └── client.go ------------ Redis client
│ │ └── tdengine  ---------------Implementation of Time Series Database(TDengine)
│ │   └── client.go ------------ TDengine client
│ └── publish ------------------ Publisher implement push interfaces to push data,will add more protocols in the future
│     ├── http ----------------- HTTP client will push data to server
│     │ └── client.go  --------- WIP
│     └── mqtt ----------------- MQTT client will push data to broker
│         └── client.go  ------- WIP
├── device --------------------- Implementation device layer, almost need not change
│ ├── device.go ---------------- Device control, almost need not change
│ └── devicetwin.go ------------ Push twin data to EdgeCore, almost need not change
├── Dockerfile
├── driver --------------------- Device driver layer, complete TODO item in this 
│ ├── devicetype.go ------------ Refine the struct as your CRD
│ └── driver.go ---------------- Fill in the functions like getting data/setting register.
├── hack
│ └── make-rules
│     └── mapper.sh
└── Makefile
```

大多数情况下，需要在Driver文件夹中填写如下代码：
- 在devicetype.go文件中，需要按照设备实例yaml文件中定义的方式填写ProtocolConfig和VisitorConfig结构体信息，以便Mapper能够正确解析配置信息。
- 在driver.go文件中，需要自定义初始化设备和获取设备数据的方法，并对Mapper收集的数据进行标准化。
- 在config.yaml中，需要定义Mapper的协议名称。

### 3. 部署Mapper
生成Mapper项目并填充Driver文件夹后，用户可以根据Dockerfile文件制作自己的Mapper镜像，随后通过Deployment等方式将Mapper部署在集群中。
```shell
docker build -t [YOUR MAPPER IMAGE NAME] .
```

一个Mapper Deployment配置文件的例子如下：
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mapper-test
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:
        app: demo
    spec:
      nodeName: edge-node  # Replace with your edge node name
      containers:
        - name: demo
          volumeMounts:  #Required, mapper need to communicate with grpcclient
            - mountPath: /etc/kubeedge
              name: test-volume  
          env:  #Not Required, this field is used to mount the user database key
            - name: TOKEN   
              valueFrom:
                secretKeyRef:
                  name: demo-secret
                  key: token
          image: docker.io/library/mapper-demo:v1.0.1 # Replace with your mapper image name
          imagePullPolicy: IfNotPresent
          resources:
            limits:
              cpu: 300m
              memory: 500Mi
            requests:
              cpu: 100m
              memory: 100Mi
          command: [ "/bin/sh","-c" ]
          args: [ "/kubeedge/main --config-file /kubeedge/config.yaml --v 4" ]
      volumes:
        - name: test-volume
          hostPath:
            path: /etc/kubeedge
            type: Directory
```

你可以使用Kubernetes原生方式部署Mapper：
```shell
kubectl apply -f <path to mapper yaml>
```
如果你想先在本地调试，也可以直接编译运行Mapper代码：

```shell
go run cmd/main.go --v <log level,like 3> --config-file <path to config yaml>
```

## Examples
我们当前提供虚拟设备virtualdevice mapper、modbus协议mapper以及USB协议mapper作为Mapper Framework的例子：

- [virtualdevice mapper](https://github.com/kubeedge/mappers-go/pull/112)
- [modbus mapper](https://github.com/kubeedge/mappers-go/pull/113)
- [USB camera mapper](https://github.com/kubeedge/mappers-go/tree/main/mappers/kubeedge-v1.15.0/usbcamera-dmi)

我们之后将提供更多内置的Mapper工程，如bluetooth和onvif。
