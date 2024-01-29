---
title: Mapper-Framework
sidebar_position: 1
---
## Mapper-Framework
Mapper-Framework 提供全新Mapper开发框架，集成DMI管理面与数据面能力，允许设备在边缘或云端处理数据，
提高设备数据管理的灵活性。 Mapper-Framework可以自动生成用户的Mapper项目，
简化Mapper用户设计和实现的复杂度，提高Mapper开发效率。

## 架构
![mapper framework](/img/device/mapper-framework.png)

1. Mapper-Framework提供数据推送接口用于把设备数据推送到用户应用程序，目的地规则通过CRD定义.
2. Mapper-Framework提供数据库接口，可以将数据保存到数据库中，通过CRD定义推送规则.
3. Mapper-Framework提供了REST API，这些API可以访问设备来获取数据。 API不支持更改设备属性，因为这会导致云端和边缘之间的消息不一致.
4. Mapper-Framework提供设备驱动接口来初始化设备、获取设备数据.
5. Mapper-Framework提供Makefile，可以通过一个命令生成一个Mapper.

DMI设备管理面和设备数据面可以通过Mapper-Framework实现，开发者只需要关注设备驱动即可。Mapper-Framework中灰色部分（Driver）
表示需要开发者实现。
我们定义了接口DevPanel来管理设备，当添加功能时会添加新的接口。

## 实现细节
### 数据流
![dmi datapanel](/img/device/dmi-datapanel.png)
#### 数据标准化

为了在接口模块之间传输数据，需要数据标准化。这些数据应包含数据生成的必要信息。
标准化数据定义是[DataModel](https://github.com/kubeedge/kubeedge/blob/master/staging/src/github.com/kubeedge/mapper-framework/pkg/common/datamodel.go#L4)。

#### 数据推送
数据推送模块可以根据CRD中定义的目的地规则把设备数据至可达的用户消费应用，为了满足新的要求，当前v1beta1 CRD在Device Instance的定义
中添加新字段 [PushMethod](https://github.com/kubeedge/kubeedge/blob/master/pkg/apis/devices/v1beta1/device_instance_types.go#L116)。

定义Mapper将数据推送到用户应用程序的配置文件示例如下：
```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: Device
metadata:
  name: beta1-device
spec:
  deviceModelRef:
    name: beta1-model
  nodeName: worker-node1
  properties:
    - name: temp
      pushMethod:
        mqtt:
          address: tcp://127.0.0.1:1883
          topic: temp
          qos: 0
          retained: false
      ...
```

目前的CRD定义中支持MQTT和HTTP协议，上报周期由`DeviceProperty.ReportCycle`定义（默认1秒上报一次）。
当Mapper执行时，会自动解析`pushMethod`字段的值并执行`DataPanel`接口来推送数据。
未来`DataPanel`将会增加更多接口，保证数据安全。

#### 数据库
数据库模块可以根据[DBMethod](https://github.com/kubeedge/kubeedge/blob/master/pkg/apis/devices/v1beta1/device_instance_types.go#L155)定义的目标规则将设备数据存储到数据库。
定义Mapper将数据推送到用户数据库的配置文件示例如下：
```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: Device
metadata:
  name: beta1-device
spec:
  deviceModelRef:
    name: beta1-model
  nodeName: worker-node1
  properties:
    - name: temp
      pushMethod:
         dbMethod:
            influxdb2:
               influxdb2ClientConfig:
                  url: http://127.0.0.1:8086
                  org: test-org
                  bucket: test-bucket
               influxdb2DataConfig:
                  measurement: stat
                  tag:
                     unit: temperature
                  fieldKey: beta1test
      ...
```

现在我们提供了Influx2、Redis、TDengine数据库接口，后续我们会添加更多的数据库。

#### 拉取数据
我们创建HTTP服务用以提供API拉取功能，支持直接从设备拉取设备数据。
下面列出的 URL 以本地 IP 的形式给出。你可以从Mapper可访问的任何网络使用这些服务。

默认情况下启用端口“7777”。

`deviceInstance-ID` 根据你自己的 CRD 定义

`propertyName` 根据你自己的 CRD 定义

#### Ping
1. 检测RESTful服务是否正常启动  
   Method: **GET**  
   Url: https://127.0.0.1:7777/api/v1/ping  
   Response: 
   ```json
   {
    "apiVersion": "v1",
    "statusCode": 200,
    "timeStamp": "2023-08-18T09:57:29+08:00",
    "Message": "This is v1 API, the server is running normally."
    }
   ```
#### 设备数据处理
1. 获取设备数据  
   Method=**GET**  
   Url: https://127.0.0.1:7777/api/v1/device/deviceInstance-ID/propertyName
   Response: 
   ```json
   {
    "apiVersion": "v1",
    "statusCode": 200,
    "timeStamp": "2023-08-18T09:57:35+08:00",
    "Data": {
        "DeviceName": "deviceInstance-ID",
        "PropertyName": "propertyName",
        "Value": "data",
        "Type": "dataType",
        "CollectTimeStamp": 1692323855044
        }
    }
   ```
#### 设备元数据
1. 获取设备模型  
   Method=**GET**  
   Url: https://127.0.0.1:7777/api/v1/meta/model/deviceInstance-ID  
   Response: 
   ```json
   {
    "apiVersion": "v1",
    "statusCode": 200,
    "timeStamp": "2023-08-18T09:57:37+08:00",
    "name": "model-name",
    "properties": [
        {
            "name": "propertyName-1",
            "dataType": "property data type",
            "description": "property description",
            "accessMode": "ReadWrite",
            "defaultValue": 100
        },
        ...
        ]
    }
   ```





