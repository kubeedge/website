---
title: Mappers 
id: mappers-index
---

## Overview
Mapper is an application that is used to connect and control devices. The responsibilities of mapper are as follows:

- Scan and connect to the device.
- Collect telemetry data from device.
- Standardize device data.
- Push and Pull the device data.
- Set up the expected state of device-twin.
- Check health of the device.(todo)

KubeEdge uses device controller, device twin and mapper to control
the devices. The device controller is on the cloud side, it uses CRD to define and control devices.
The device twin is on the edge side, it stores the value/status from the mapper and transfers the messages
with device controller and mapper. Meanwhile, DMI in the device twin is used for registing mapper and transfer
device instance and device model to user mapper.

## How to create your own mappers
Now we use **[mapper framework](../mapper-framework)** to genenrate your own mapper to control the edge devices.
### 1. Design the device model and device instance CRDs
If you don’t know how to define the configuration files of device model and device instance, please 
get more details in the **[page](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd-v1beta1.md)**.

### 2. Generate the mapper project
The command below will generate a framework for the basic mapper. Run the command and input your mapper's name:
```shell
make generate
Please input the mapper name (like 'Bluetooth', 'BLE'): foo
```
A project named as your input will be generated. The file tree is as below:
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
├── pkg ------------------------ Mapper register process, almost need not change
└── Makefile
```
In most cases, you need to fill in the code in the driver folder as follows:
In the devicetype.go file, you need to fill in the ProtocolConfig and VisitorConfig structure information in the way you defined in the instance yaml file,
so that the mapper can correctly parse the configuration information.
In the driver.go file, you need to customize the method of initializing the device and obtaining device data, and standardize the data collected by the mapper.
In config.yaml, you need to define the protocol name of mapper.

### 3. Deploy your mapper
After generating the mapper project and filling driver folder, users can make their own mapper image based on the Dockerfile file and
deploy the mapper in the cluster through deployment and other methods. 
```shell
docker build -t [YOUR MAPPER IMAGE NAME] .
```

The following is an example of a mapper Deployment
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

You can deploy the mapper using the same way in Kubernetes:
```shell
kubectl apply -f <path to mapper yaml>
```
If you want to debug locally first, you can also compile and run the mapper code directly:

```shell
go run cmd/main.go --v <log level,like 3> --config-file <path to config yaml>
```

## Examples
We have a virtualdevice mapper as example for mapper framework,

- [virtualdevice mapper](https://github.com/kubeedge/mappers-go/pull/112)

We will provide more build-in mappers like modbus and bluetooth later.
