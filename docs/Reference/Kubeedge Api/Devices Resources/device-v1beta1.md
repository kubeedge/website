---
api_metadata:
  apiVersion: "devices.kubeedge.io/v1beta1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/devices/v1beta1"
  kind: "Device"
content_type: "api_reference"
description: "Device is the Schema for the devices API."
title: "Device v1beta1"
weight: 2
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: devices.kubeedge.io/v1beta1`

`import "github.com/kubeedge/kubeedge/pkg/apis/devices/v1beta1"`


## Device 

Device is the Schema for the devices API

<hr/>

- **apiVersion**: devices.kubeedge.io/v1beta1


- **kind**: Device


- **metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))


- **spec** ([DeviceSpec](/device-v1beta1#devicespec))


- **status** ([DeviceStatus](/device-v1beta1#devicestatus))






## DeviceSpec 

DeviceSpec represents a single device instance.

<hr/>

- **deviceModelRef** (LocalObjectReference)

  Required: DeviceModelRef is reference to the device model used as a template to create the device instance.

  <a name="LocalObjectReference"></a>

  *LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.*

  - **deviceModelRef.name** (string)

    Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

- **nodeName** (string)

  NodeName is a request to schedule this device onto a specific node. If it is non-empty, the scheduler simply schedules this device onto that node, assuming that it fits resource requirements.

- **properties** ([]DeviceProperty)

  List of properties which describe the device properties. properties list item must be unique by properties.Name.

  <a name="DeviceProperty"></a>

  *DeviceProperty describes the specifics all the properties of the device.*

  - **properties.collectCycle** (int64)

    Define how frequent mapper will collect from device.

  - **properties.desired** (TwinProperty)

    The desired property value.

    <a name="TwinProperty"></a>

    *TwinProperty represents the device property for which an Expected/Actual state can be defined.*

    - **properties.desired.value** (string), required

      Required: The value for this property.

    - **properties.desired.metadata** (map[string]string)

      Additional metadata like timestamp when the value was reported etc.

  - **properties.name** (string)

    Required: The device property name to be accessed. It must be unique. Note: If you need to use the built-in stream data processing function, you need to define Name as saveFrame or saveVideo

  - **properties.pushMethod** (PushMethod)

    PushMethod represents the protocol used to push data, please ensure that the mapper can access the destination address.

    <a name="PushMethod"></a>

    **

    - **properties.pushMethod.dbMethod** (DBMethodConfig)

      DBMethod represents the method used to push data to database, please ensure that the mapper can access the destination address.

      <a name="DBMethodConfig"></a>

      **

      - **properties.pushMethod.dbMethod.TDEngine** (DBMethodTDEngine)


        <a name="DBMethodTDEngine"></a>

        **

        - **properties.pushMethod.dbMethod.TDEngine.TDEngineClientConfig** (TDEngineClientConfig)

          tdengineClientConfig of tdengine database

          <a name="TDEngineClientConfig"></a>

          **

          - **properties.pushMethod.dbMethod.TDEngine.TDEngineClientConfig.addr** (string)

            addr of tdEngine database

          - **properties.pushMethod.dbMethod.TDEngine.TDEngineClientConfig.dbName** (string)

            dbname of tdEngine database

      - **properties.pushMethod.dbMethod.influxdb2** (DBMethodInfluxdb2)

        method configuration for database

        <a name="DBMethodInfluxdb2"></a>

        **

        - **properties.pushMethod.dbMethod.influxdb2.influxdb2ClientConfig** (Influxdb2ClientConfig)

          Config of influx database

          <a name="Influxdb2ClientConfig"></a>

          **

          - **properties.pushMethod.dbMethod.influxdb2.influxdb2ClientConfig.bucket** (string)

            Bucket of the user in influx database

          - **properties.pushMethod.dbMethod.influxdb2.influxdb2ClientConfig.org** (string)

            Org of the user in influx database

          - **properties.pushMethod.dbMethod.influxdb2.influxdb2ClientConfig.url** (string)

            Url of influx database

        - **properties.pushMethod.dbMethod.influxdb2.influxdb2DataConfig** (Influxdb2DataConfig)

          config of device data when push to influx database

          <a name="Influxdb2DataConfig"></a>

          **

          - **properties.pushMethod.dbMethod.influxdb2.influxdb2DataConfig.fieldKey** (string)

            FieldKey of the user data

          - **properties.pushMethod.dbMethod.influxdb2.influxdb2DataConfig.measurement** (string)

            Measurement of the user data

          - **properties.pushMethod.dbMethod.influxdb2.influxdb2DataConfig.tag** (map[string]string)

            the tag of device data

      - **properties.pushMethod.dbMethod.mysql** (DBMethodMySQL)


        <a name="DBMethodMySQL"></a>

        **

        - **properties.pushMethod.dbMethod.mysql.mysqlClientConfig** (MySQLClientConfig)


          <a name="MySQLClientConfig"></a>

          **

          - **properties.pushMethod.dbMethod.mysql.mysqlClientConfig.addr** (string)

            mysql address,like localhost:3306

          - **properties.pushMethod.dbMethod.mysql.mysqlClientConfig.database** (string)

            database name

          - **properties.pushMethod.dbMethod.mysql.mysqlClientConfig.userName** (string)

            user name

      - **properties.pushMethod.dbMethod.redis** (DBMethodRedis)


        <a name="DBMethodRedis"></a>

        **

        - **properties.pushMethod.dbMethod.redis.redisClientConfig** (RedisClientConfig)

          RedisClientConfig of redis database

          <a name="RedisClientConfig"></a>

          **

          - **properties.pushMethod.dbMethod.redis.redisClientConfig.addr** (string)

            Addr of Redis database

          - **properties.pushMethod.dbMethod.redis.redisClientConfig.db** (int32)

            Db of Redis database

          - **properties.pushMethod.dbMethod.redis.redisClientConfig.minIdleConns** (int32)

            MinIdleConns of Redis database

          - **properties.pushMethod.dbMethod.redis.redisClientConfig.poolsize** (int32)

            Poolsize of Redis database

    - **properties.pushMethod.http** (PushMethodHTTP)

      HTTP Push method configuration for http

      <a name="PushMethodHTTP"></a>

      **

      - **properties.pushMethod.http.hostName** (string)


      - **properties.pushMethod.http.port** (int64)


      - **properties.pushMethod.http.requestPath** (string)


      - **properties.pushMethod.http.timeout** (int64)


    - **properties.pushMethod.mqtt** (PushMethodMQTT)

      MQTT Push method configuration for mqtt

      <a name="PushMethodMQTT"></a>

      **

      - **properties.pushMethod.mqtt.address** (string)

        broker address, like mqtt://127.0.0.1:1883

      - **properties.pushMethod.mqtt.qos** (int32)

        qos of mqtt publish param

      - **properties.pushMethod.mqtt.retained** (boolean)

        Is the message retained

      - **properties.pushMethod.mqtt.topic** (string)

        publish topic for mqtt

  - **properties.reportCycle** (int64)

    Define how frequent mapper will report the value.

  - **properties.reportToCloud** (boolean)

    whether be reported to the cloud

  - **properties.visitors** (VisitorConfig)

    Visitors are intended to be consumed by device mappers which connect to devices and collect data / perform actions on the device. Required: Protocol relevant config details about the how to access the device property.

    <a name="VisitorConfig"></a>

    **

    - **properties.visitors.configData** (CustomizedValue)

      Required: The configData of customized protocol

      <a name="CustomizedValue"></a>

      *CustomizedValue contains a map type data*

    - **properties.visitors.protocolName** (string)

      Required: name of customized protocol

- **protocol** (ProtocolConfig)

  Required: The protocol configuration used to connect to the device.

  <a name="ProtocolConfig"></a>

  **

  - **protocol.configData** (CustomizedValue)

    Any config data

    <a name="CustomizedValue"></a>

    *CustomizedValue contains a map type data*

  - **protocol.protocolName** (string)

    Unique protocol name Required.





## DeviceStatus 

DeviceStatus reports the device state and the desired/reported values of twin attributes.

<hr/>

- **twins** ([]Twin)

  A list of device twins containing desired/reported desired/reported values of twin properties. Optional: A passive device won't have twin properties and this list could be empty.

  <a name="Twin"></a>

  *Twin provides a logical representation of control properties (writable properties in the device model). The properties can have a Desired state and a Reported state. The cloud configures the `Desired`state of a device property and this configuration update is pushed to the edge node. The mapper sends a command to the device to change this property value as per the desired state . It receives the `Reported` state of the property once the previous operation is complete and sends the reported state to the cloud. Offline device interaction in the edge is possible via twin properties for control/command operations.*

  - **twins.observedDesired** (TwinProperty)

    The meaning of here is to indicate desired value of `deviceProperty.Desired` that the mapper has received in current cycle. Useful in cases that people want to check whether the mapper is working appropriately and its internal status is up-to-date. This value should be only updated by devicecontroller upstream.

    <a name="TwinProperty"></a>

    *TwinProperty represents the device property for which an Expected/Actual state can be defined.*

    - **twins.observedDesired.value** (string), required

      Required: The value for this property.

    - **twins.observedDesired.metadata** (map[string]string)

      Additional metadata like timestamp when the value was reported etc.

  - **twins.propertyName** (string)

    Required: The property name for which the desired/reported values are specified. This property should be present in the device model.

  - **twins.reported** (TwinProperty)

    Required: the reported property value.

    <a name="TwinProperty"></a>

    *TwinProperty represents the device property for which an Expected/Actual state can be defined.*

    - **twins.reported.value** (string), required

      Required: The value for this property.

    - **twins.reported.metadata** (map[string]string)

      Additional metadata like timestamp when the value was reported etc.





## DeviceList 

DeviceList contains a list of Device

<hr/>

- **apiVersion**: devices.kubeedge.io/v1beta1


- **kind**: DeviceList


- **metadata** ([ListMeta](../Common%20Definitions/list-meta#listmeta))


- **items** ([][Device](/device-v1beta1#device)), required






## Operations 



<hr/>






### `get` read the specified Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK


### `get` read status of the specified Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK


### `list` list or watch objects of kind Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **allowWatchBookmarks** (*in query*): boolean

  [allowWatchBookmarks](../Common%20Parameter/common-parameters#allowwatchbookmarks)


- **continue** (*in query*): string

  [continue](../Common%20Parameter/common-parameters#continue)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common%20Parameter/common-parameters#fieldselector)


- **labelSelector** (*in query*): string

  [labelSelector](../Common%20Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common%20Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common%20Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common%20Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common%20Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common%20Parameter/common-parameters#timeoutseconds)


- **watch** (*in query*): boolean

  [watch](../Common%20Parameter/common-parameters#watch)



#### Response


200 ([DeviceList](/device-v1beta1#devicelist)): OK


### `list` list or watch objects of kind Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/devices

#### Parameters


- **allowWatchBookmarks** (*in query*): boolean

  [allowWatchBookmarks](../Common%20Parameter/common-parameters#allowwatchbookmarks)


- **continue** (*in query*): string

  [continue](../Common%20Parameter/common-parameters#continue)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common%20Parameter/common-parameters#fieldselector)


- **labelSelector** (*in query*): string

  [labelSelector](../Common%20Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common%20Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common%20Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common%20Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common%20Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common%20Parameter/common-parameters#timeoutseconds)


- **watch** (*in query*): boolean

  [watch](../Common%20Parameter/common-parameters#watch)



#### Response


200 ([DeviceList](/device-v1beta1#devicelist)): OK


### `create` create a Device

#### HTTP Request

POST /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [Device](/device-v1beta1#device), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK

201 ([Device](/device-v1beta1#device)): Created

202 ([Device](/device-v1beta1#device)): Accepted


### `update` replace the specified Device

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [Device](/device-v1beta1#device), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK

201 ([Device](/device-v1beta1#device)): Created


### `update` replace status of the specified Device

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [Device](/device-v1beta1#device), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK

201 ([Device](/device-v1beta1#device)): Created


### `patch` partially update the specified Device

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [Patch](../Common%20Definitions/patch#patch), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **force** (*in query*): boolean

  [force](../Common%20Parameter/common-parameters#force)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK

201 ([Device](/device-v1beta1#device)): Created


### `patch` partially update status of the specified Device

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [Patch](../Common%20Definitions/patch#patch), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **force** (*in query*): boolean

  [force](../Common%20Parameter/common-parameters#force)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1beta1#device)): OK

201 ([Device](/device-v1beta1#device)): Created


### `delete` delete a Device

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeleteOptions](../Common%20Definitions/delete-options#deleteoptions)

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../Common%20Parameter/common-parameters#graceperiodseconds)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../Common%20Parameter/common-parameters#propagationpolicy)



#### Response


200 ([Status](../Common%20Definitions/status#status)): OK

202 ([Status](../Common%20Definitions/status#status)): Accepted


### `deletecollection` delete collection of Device

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devices

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeleteOptions](../Common%20Definitions/delete-options#deleteoptions)

  


- **continue** (*in query*): string

  [continue](../Common%20Parameter/common-parameters#continue)


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common%20Parameter/common-parameters#fieldselector)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../Common%20Parameter/common-parameters#graceperiodseconds)


- **labelSelector** (*in query*): string

  [labelSelector](../Common%20Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common%20Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../Common%20Parameter/common-parameters#propagationpolicy)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common%20Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common%20Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common%20Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common%20Parameter/common-parameters#timeoutseconds)



#### Response


200 ([Status](../Common%20Definitions/status#status)): OK

