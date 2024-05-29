---
api_metadata:
  apiVersion: "devices.kubeedge.io/v1alpha2"
  import: "github.com/kubeedge/kubeedge/pkg/apis/devices/v1alpha2"
  kind: "Device"
content_type: "api_reference"
description: "Device is the Schema for the devices API."
title: "Device v1alpha2"
weight: 1
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: devices.kubeedge.io/v1alpha2`

`import "github.com/kubeedge/kubeedge/pkg/apis/devices/v1alpha2"`


## Device 

Device is the Schema for the devices API

<hr/>

- **apiVersion**: devices.kubeedge.io/v1alpha2


- **kind**: Device


- **metadata** ([ObjectMeta](../Common-Definitions/object-meta#objectmeta))


- **spec** ([DeviceSpec](/device-v1alpha2#devicespec))


- **status** ([DeviceStatus](/device-v1alpha2#devicestatus))






## DeviceSpec 

DeviceSpec represents a single device instance. It is an instantation of a device model.

<hr/>

- **data** (DeviceData)

  Data section describe a list of time-series properties which should be processed on edge node.

  <a name="DeviceData"></a>

  *DeviceData reports the device's time-series data to edge MQTT broker. These data should not be processed by edgecore. Instead, they can be processed by third-party data-processing apps like EMQX kuiper.*

  - **data.dataProperties** ([]DataProperty)

    Required: A list of data properties, which are not required to be processed by edgecore

    <a name="DataProperty"></a>

    *DataProperty represents the device property for external use.*

    - **data.dataProperties.metadata** (map[string]string)

      Additional metadata like timestamp when the value was reported etc.

    - **data.dataProperties.propertyName** (string)

      Required: The property name for which should be processed by external apps. This property should be present in the device model.

  - **data.dataTopic** (string)

    Topic used by mapper, all data collected from dataProperties should be published to this topic, the default value is $ke/events/device/+/data/update

- **deviceModelRef** (LocalObjectReference)

  Required: DeviceModelRef is reference to the device model used as a template to create the device instance.

  <a name="LocalObjectReference"></a>

  *LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.*

  - **deviceModelRef.name** (string)

    Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

- **nodeSelector** (NodeSelector)

  NodeSelector indicates the binding preferences between devices and nodes. Refer to k8s.io/kubernetes/pkg/apis/core NodeSelector for more details

  <a name="NodeSelector"></a>

  *A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.*

  - **nodeSelector.nodeSelectorTerms** ([]NodeSelectorTerm), required

    Required. A list of node selector terms. The terms are ORed.

    <a name="NodeSelectorTerm"></a>

    *A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.*

    - **nodeSelector.nodeSelectorTerms.matchExpressions** ([][NodeSelectorRequirement](../Common-Definitions/node-selector-requirement#nodeselectorrequirement))

      A list of node selector requirements by node's labels.

    - **nodeSelector.nodeSelectorTerms.matchFields** ([][NodeSelectorRequirement](../Common-Definitions/node-selector-requirement#nodeselectorrequirement))

      A list of node selector requirements by node's fields.

- **propertyVisitors** ([]DevicePropertyVisitor)

  List of property visitors which describe how to access the device properties. PropertyVisitors must unique by propertyVisitor.propertyName.

  <a name="DevicePropertyVisitor"></a>

  *DevicePropertyVisitor describes the specifics of accessing a particular device property. Visitors are intended to be consumed by device mappers which connect to devices and collect data / perform actions on the device.*

  - **propertyVisitors.bluetooth** (VisitorConfigBluetooth)

    Bluetooth represents a set of additional visitor config fields of bluetooth protocol.

    <a name="VisitorConfigBluetooth"></a>

    *Common visitor configurations for bluetooth protocol*

    - **propertyVisitors.bluetooth.characteristicUUID** (string)

      Required: Unique ID of the corresponding operation

    - **propertyVisitors.bluetooth.dataConverter** (BluetoothReadConverter)

      Responsible for converting the data being read from the bluetooth device into a form that is understandable by the platform

      <a name="BluetoothReadConverter"></a>

      *Specifies the operations that may need to be performed to convert the data*

      - **propertyVisitors.bluetooth.dataConverter.endIndex** (int32)

        Required: Specifies the end index of incoming byte stream to be considered to convert the data the value specified should be inclusive for example if 3 is specified it includes the third index

      - **propertyVisitors.bluetooth.dataConverter.orderOfOperations** ([]BluetoothOperations)

        Specifies in what order the operations(which are required to be performed to convert incoming data into understandable form) are performed

        <a name="BluetoothOperations"></a>

        *Specify the operation that should be performed to convert incoming data into understandable form*

        - **propertyVisitors.bluetooth.dataConverter.orderOfOperations.operationType** (string)

          Required: Specifies the operation to be performed to convert incoming data

        - **propertyVisitors.bluetooth.dataConverter.orderOfOperations.operationValue** (double)

          Required: Specifies with what value the operation is to be performed

      - **propertyVisitors.bluetooth.dataConverter.shiftLeft** (int32)

        Refers to the number of bits to shift left, if left-shift operation is necessary for conversion

      - **propertyVisitors.bluetooth.dataConverter.shiftRight** (int32)

        Refers to the number of bits to shift right, if right-shift operation is necessary for conversion

      - **propertyVisitors.bluetooth.dataConverter.startIndex** (int32)

        Required: Specifies the start index of the incoming byte stream to be considered to convert the data. For example: start-index:2, end-index:3 concatenates the value present at second and third index of the incoming byte stream. If we want to reverse the order we can give it as start-index:3, end-index:2

    - **propertyVisitors.bluetooth.dataWrite** (map[string][]byte)

      Responsible for converting the data coming from the platform into a form that is understood by the bluetooth device For example: "ON":[1], "OFF":[0]

  - **propertyVisitors.collectCycle** (int64)

    Define how frequent mapper will collect from device.

  - **propertyVisitors.customizedProtocol** (VisitorConfigCustomized)

    CustomizedProtocol represents a set of visitor config fields of bluetooth protocol.

    <a name="VisitorConfigCustomized"></a>

    *Common visitor configurations for customized protocol*

    - **propertyVisitors.customizedProtocol.configData** (CustomizedValue)

      Required: The configData of customized protocol

      <a name="CustomizedValue"></a>

      *CustomizedValue contains a map type data*

    - **propertyVisitors.customizedProtocol.protocolName** (string)

      Required: name of customized protocol

  - **propertyVisitors.customizedValues** (CustomizedValue)

    Customized values for visitor of provided protocols

    <a name="CustomizedValue"></a>

    *CustomizedValue contains a map type data*

  - **propertyVisitors.modbus** (VisitorConfigModbus)

    Modbus represents a set of additional visitor config fields of modbus protocol.

    <a name="VisitorConfigModbus"></a>

    *Common visitor configurations for modbus protocol*

    - **propertyVisitors.modbus.isRegisterSwap** (boolean)

      Indicates whether the high and low register swapped. Defaults to false.

    - **propertyVisitors.modbus.isSwap** (boolean)

      Indicates whether the high and low byte swapped. Defaults to false.

    - **propertyVisitors.modbus.limit** (int64)

      Required: Limit number of registers to read/write.

    - **propertyVisitors.modbus.offset** (int64)

      Required: Offset indicates the starting register number to read/write data.

    - **propertyVisitors.modbus.register** (string)

      Required: Type of register

    - **propertyVisitors.modbus.scale** (double)

      The scale to convert raw property data into final units. Defaults to 1.0

  - **propertyVisitors.opcua** (VisitorConfigOPCUA)

    Opcua represents a set of additional visitor config fields of opc-ua protocol.

    <a name="VisitorConfigOPCUA"></a>

    *Common visitor configurations for opc-ua protocol*

    - **propertyVisitors.opcua.browseName** (string)

      The name of opc-ua node

    - **propertyVisitors.opcua.nodeID** (string)

      Required: The ID of opc-ua node, e.g. "ns=1,i=1005"

  - **propertyVisitors.propertyName** (string)

    Required: The device property name to be accessed. This should refer to one of the device properties defined in the device model.

  - **propertyVisitors.reportCycle** (int64)

    Define how frequent mapper will report the value.

- **protocol** (ProtocolConfig)

  Required: The protocol configuration used to connect to the device.

  <a name="ProtocolConfig"></a>

  *Only one of its members may be specified.*

  - **protocol.bluetooth** (ProtocolConfigBluetooth)

    Protocol configuration for bluetooth

    <a name="ProtocolConfigBluetooth"></a>

    **

    - **protocol.bluetooth.macAddress** (string)

      Unique identifier assigned to the device.

  - **protocol.common** (ProtocolConfigCommon)

    Configuration for protocol common part

    <a name="ProtocolConfigCommon"></a>

    *Only one of COM or TCP may be specified.*

    - **protocol.common.collectRetryTimes** (int64)

      Define retry times of mapper will collect from device.

    - **protocol.common.collectTimeout** (int64)

      Define timeout of mapper collect from device.

    - **protocol.common.collectType** (string)

      Define collect type, sync or async.

    - **protocol.common.com** (ProtocolConfigCOM)


      <a name="ProtocolConfigCOM"></a>

      **

      - **protocol.common.com.baudRate** (int64)

        Required. BaudRate 115200|57600|38400|19200|9600|4800|2400|1800|1200|600|300|200|150|134|110|75|50

      - **protocol.common.com.dataBits** (int64)

        Required. Valid values are 8, 7, 6, 5.

      - **protocol.common.com.parity** (string)

        Required. Valid options are "none", "even", "odd". Defaults to "none".

      - **protocol.common.com.serialPort** (string)

        Required.

      - **protocol.common.com.stopBits** (int64)

        Required. Bit that stops 1|2

    - **protocol.common.commType** (string)

      Communication type, like tcp client, tcp server or COM

    - **protocol.common.customizedValues** (CustomizedValue)

      Customized values for provided protocol

      <a name="CustomizedValue"></a>

      *CustomizedValue contains a map type data*

    - **protocol.common.reconnRetryTimes** (int64)

      Reconnecting retry times

    - **protocol.common.reconnTimeout** (int64)

      Reconnection timeout

    - **protocol.common.tcp** (ProtocolConfigTCP)


      <a name="ProtocolConfigTCP"></a>

      **

      - **protocol.common.tcp.ip** (string)

        Required.

      - **protocol.common.tcp.port** (int64)

        Required.

  - **protocol.customizedProtocol** (ProtocolConfigCustomized)

    Configuration for customized protocol

    <a name="ProtocolConfigCustomized"></a>

    **

    - **protocol.customizedProtocol.configData** (CustomizedValue)

      Any config data

      <a name="CustomizedValue"></a>

      *CustomizedValue contains a map type data*

    - **protocol.customizedProtocol.protocolName** (string)

      Unique protocol name Required.

  - **protocol.modbus** (ProtocolConfigModbus)

    Protocol configuration for modbus

    <a name="ProtocolConfigModbus"></a>

    *Only one of its members may be specified.*

    - **protocol.modbus.slaveID** (int64)

      Required. 0-255

  - **protocol.opcua** (ProtocolConfigOpcUA)

    Protocol configuration for opc-ua

    <a name="ProtocolConfigOpcUA"></a>

    **

    - **protocol.opcua.certificate** (string)

      Certificate for access opc server.

    - **protocol.opcua.password** (string)

      Password for access opc server.

    - **protocol.opcua.privateKey** (string)

      PrivateKey for access opc server.

    - **protocol.opcua.securityMode** (string)

      Defaults to "none".

    - **protocol.opcua.securityPolicy** (string)

      Defaults to "none".

    - **protocol.opcua.timeout** (int64)

      Timeout seconds for the opc server connection.???

    - **protocol.opcua.url** (string)

      Required: The URL for opc server endpoint.

    - **protocol.opcua.userName** (string)

      Username for access opc server.





## DeviceStatus 

DeviceStatus reports the device state and the desired/reported values of twin attributes.

<hr/>

- **twins** ([]Twin)

  A list of device twins containing desired/reported desired/reported values of twin properties. Optional: A passive device won't have twin properties and this list could be empty.

  <a name="Twin"></a>

  *Twin provides a logical representation of control properties (writable properties in the device model). The properties can have a Desired state and a Reported state. The cloud configures the `Desired`state of a device property and this configuration update is pushed to the edge node. The mapper sends a command to the device to change this property value as per the desired state . It receives the `Reported` state of the property once the previous operation is complete and sends the reported state to the cloud. Offline device interaction in the edge is possible via twin properties for control/command operations.*

  - **twins.desired** (TwinProperty)

    Required: the desired property value.

    <a name="TwinProperty"></a>

    *TwinProperty represents the device property for which an Expected/Actual state can be defined.*

    - **twins.desired.value** (string), required

      Required: The value for this property.

    - **twins.desired.metadata** (map[string]string)

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

- **apiVersion**: devices.kubeedge.io/v1alpha2


- **kind**: DeviceList


- **metadata** ([ListMeta](../Common-Definitions/list-meta#listmeta))


- **items** ([][Device](/device-v1alpha2#device)), required






## Operations 



<hr/>






### `get` read the specified Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK


### `get` read status of the specified Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devices/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK


### `list` list or watch objects of kind Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devices

#### Parameters


- **allowWatchBookmarks** (*in query*): boolean

  allowWatchBookmarks requests watch events with type "BOOKMARK". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server's discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.


- **continue** (*in query*): string

  [continue](../Common-Parameter/common-parameters#continue)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common-Parameter/common-parameters#fieldselector)


- **labelSelector** (*in query*): string

  [labelSelector](../Common-Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common-Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common-Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common-Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common-Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common-Parameter/common-parameters#timeoutseconds)


- **watch** (*in query*): boolean

  Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.



#### Response


200 ([DeviceList](/device-v1alpha2#devicelist)): OK


### `create` create a Device

#### HTTP Request

POST /apis/devices.kubeedge.io/v1alpha2/devices

#### Parameters


- **body**: [Device](/device-v1alpha2#device), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK

201 ([Device](/device-v1alpha2#device)): Created

202 ([Device](/device-v1alpha2#device)): Accepted


### `update` replace the specified Device

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **body**: [Device](/device-v1alpha2#device), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK

201 ([Device](/device-v1alpha2#device)): Created


### `update` replace status of the specified Device

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1alpha2/devices/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **body**: [Device](/device-v1alpha2#device), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK

201 ([Device](/device-v1alpha2#device)): Created


### `patch` partially update the specified Device

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **body**: [Patch](../Common-Definitions/patch#patch), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **force** (*in query*): boolean

  [force](../Common-Parameter/common-parameters#force)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK

201 ([Device](/device-v1alpha2#device)): Created


### `patch` partially update status of the specified Device

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1alpha2/devices/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **body**: [Patch](../Common-Definitions/patch#patch), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **force** (*in query*): boolean

  [force](../Common-Parameter/common-parameters#force)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Device](/device-v1alpha2#device)): OK

201 ([Device](/device-v1alpha2#device)): Created


### `delete` delete a Device

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Device


- **body**: [DeleteOptions](../Common-Definitions/delete-options#deleteoptions)

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../Common-Parameter/common-parameters#graceperiodseconds)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../Common-Parameter/common-parameters#propagationpolicy)



#### Response


200 ([Status](../Common-Definitions/status#status)): OK

202 ([Status](../Common-Definitions/status#status)): Accepted


### `deletecollection` delete collection of Device

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1alpha2/devices

#### Parameters


- **body**: [DeleteOptions](../Common-Definitions/delete-options#deleteoptions)

  


- **continue** (*in query*): string

  [continue](../Common-Parameter/common-parameters#continue)


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common-Parameter/common-parameters#fieldselector)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../Common-Parameter/common-parameters#graceperiodseconds)


- **labelSelector** (*in query*): string

  [labelSelector](../Common-Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common-Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../Common-Parameter/common-parameters#propagationpolicy)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common-Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common-Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common-Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common-Parameter/common-parameters#timeoutseconds)



#### Response


200 ([Status](../Common-Definitions/status#status)): OK

