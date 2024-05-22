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

- **metadata** (ObjectMeta)

  <a name="ObjectMeta"></a>

  *ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.*

  - **metadata.annotations** (map[string]string)

    Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations

  - **metadata.creationTimestamp** (Time)

    CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
    
    Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

    <a name="Time"></a>

    *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

  - **metadata.deletionGracePeriodSeconds** (int64)

    Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.

  - **metadata.deletionTimestamp** (Time)

    DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
    
    Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

    <a name="Time"></a>

    *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

  - **metadata.finalizers** ([]string)

    Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.

  - **metadata.generateName** (string)

    GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
    
    If this field is specified and the generated name exists, the server will return a 409.
    
    Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency

  - **metadata.generation** (int64)

    A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.

  - **metadata.labels** (map[string]string)

    Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels

  - **metadata.managedFields** ([]ManagedFieldsEntry)

    ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.

    <a name="ManagedFieldsEntry"></a>

    *ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.*

    - **metadata.managedFields.apiVersion** (string)

      APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.

    - **metadata.managedFields.fieldsType** (string)

      FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"

    - **metadata.managedFields.fieldsV1** (FieldsV1)

      FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.

      <a name="FieldsV1"></a>

      *FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
      
      Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:&lt;name&gt;', where &lt;name&gt; is the name of a field in a struct, or key in a map 'v:&lt;value&gt;', where &lt;value&gt; is the exact json formatted value of a list item 'i:&lt;index&gt;', where &lt;index&gt; is position of a item in a list 'k:&lt;keys&gt;', where &lt;keys&gt; is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
      
      The exact format is defined in sigs.k8s.io/structured-merge-diff*

    - **metadata.managedFields.manager** (string)

      Manager is an identifier of the workflow managing these fields.

    - **metadata.managedFields.operation** (string)

      Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.

    - **metadata.managedFields.subresource** (string)

      Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.

    - **metadata.managedFields.time** (Time)

      Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.

      <a name="Time"></a>

      *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

  - **metadata.name** (string)

    Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

  - **metadata.namespace** (string)

    Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
    
    Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces

  - **metadata.ownerReferences** ([]OwnerReference)

    *Patch strategy: merge on key `uid`*
    
    List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.

    <a name="OwnerReference"></a>

    *OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.*

    - **metadata.ownerReferences.apiVersion** (string), required

      API version of the referent.

    - **metadata.ownerReferences.kind** (string), required

      Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

    - **metadata.ownerReferences.name** (string), required

      Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

    - **metadata.ownerReferences.uid** (string), required

      UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

    - **metadata.ownerReferences.blockOwnerDeletion** (boolean)

      If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.

    - **metadata.ownerReferences.controller** (boolean)

      If true, this reference points to the managing controller.

  - **metadata.resourceVersion** (string)

    An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
    
    Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

  - **metadata.selfLink** (string)

    Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

  - **metadata.uid** (string)

    UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
    
    Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

- **spec** ([DeviceSpec](../devices-resources/device-v1alpha2#devicespec))

- **status** ([DeviceStatus](../devices-resources/device-v1alpha2#devicestatus))

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

    - **nodeSelector.nodeSelectorTerms.matchExpressions** ([]NodeSelectorRequirement)

      A list of node selector requirements by node's labels.

      <a name="NodeSelectorRequirement"></a>

      *A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.*

      - **nodeSelector.nodeSelectorTerms.matchExpressions.key** (string), required

        The label key that the selector applies to.

      - **nodeSelector.nodeSelectorTerms.matchExpressions.operator** (string), required

        Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
        
        Possible enum values:
         - `"DoesNotExist"`
         - `"Exists"`
         - `"Gt"`
         - `"In"`
         - `"Lt"`
         - `"NotIn"`

      - **nodeSelector.nodeSelectorTerms.matchExpressions.values** ([]string)

        An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.

    - **nodeSelector.nodeSelectorTerms.matchFields** ([]NodeSelectorRequirement)

      A list of node selector requirements by node's fields.

      <a name="NodeSelectorRequirement"></a>

      *A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.*

      - **nodeSelector.nodeSelectorTerms.matchFields.key** (string), required

        The label key that the selector applies to.

      - **nodeSelector.nodeSelectorTerms.matchFields.operator** (string), required

        Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
        
        Possible enum values:
         - `"DoesNotExist"`
         - `"Exists"`
         - `"Gt"`
         - `"In"`
         - `"Lt"`
         - `"NotIn"`

      - **nodeSelector.nodeSelectorTerms.matchFields.values** ([]string)

        An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.

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

- **metadata** (ListMeta)

  <a name="ListMeta"></a>

  *ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of [ObjectMeta, ListMeta].*

  - **metadata.continue** (string)

    continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.

  - **metadata.remainingItemCount** (int64)

    remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.

  - **metadata.resourceVersion** (string)

    String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

  - **metadata.selfLink** (string)

    Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

- **items** ([][Device](../devices-resources/device-v1alpha2#device)), required

## Operations 

<hr/>

### `get` read the specified Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

### `get` read status of the specified Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devices/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

### `list` list or watch objects of kind Device

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devices

#### Parameters

- **allowWatchBookmarks** (*in query*): boolean

  allowWatchBookmarks requests watch events with type "BOOKMARK". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server's discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.

- **continue** (*in query*): string

  [continue](../common-parameter/common-parameters#continue)

- **fieldSelector** (*in query*): string

  [fieldSelector](../common-parameter/common-parameters#fieldselector)

- **labelSelector** (*in query*): string

  [labelSelector](../common-parameter/common-parameters#labelselector)

- **limit** (*in query*): integer

  [limit](../common-parameter/common-parameters#limit)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

- **resourceVersion** (*in query*): string

  [resourceVersion](../common-parameter/common-parameters#resourceversion)

- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../common-parameter/common-parameters#resourceversionmatch)

- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../common-parameter/common-parameters#sendinitialevents)

- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../common-parameter/common-parameters#timeoutseconds)

- **watch** (*in query*): boolean

  Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.

#### Response

200 ([DeviceList](../devices-resources/device-v1alpha2#devicelist)): OK

### `create` create a Device

#### HTTP Request

POST /apis/devices.kubeedge.io/v1alpha2/devices

#### Parameters

- **body**: [Device](../devices-resources/device-v1alpha2#device), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

201 ([Device](../devices-resources/device-v1alpha2#device)): Created

202 ([Device](../devices-resources/device-v1alpha2#device)): Accepted

### `update` replace the specified Device

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **body**: [Device](../devices-resources/device-v1alpha2#device), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

201 ([Device](../devices-resources/device-v1alpha2#device)): Created

### `update` replace status of the specified Device

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1alpha2/devices/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **body**: [Device](../devices-resources/device-v1alpha2#device), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

201 ([Device](../devices-resources/device-v1alpha2#device)): Created

### `patch` partially update the specified Device

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **body**: Patch, required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **force** (*in query*): boolean

  [force](../common-parameter/common-parameters#force)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

201 ([Device](../devices-resources/device-v1alpha2#device)): Created

### `patch` partially update status of the specified Device

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1alpha2/devices/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **body**: Patch, required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **force** (*in query*): boolean

  [force](../common-parameter/common-parameters#force)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([Device](../devices-resources/device-v1alpha2#device)): OK

201 ([Device](../devices-resources/device-v1alpha2#device)): Created

### `delete` delete a Device

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1alpha2/devices/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the Device

- **body**: DeleteOptions

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../common-parameter/common-parameters#graceperiodseconds)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

- **propagationPolicy** (*in query*): string

  [propagationPolicy](../common-parameter/common-parameters#propagationpolicy)

#### Response

200 (Status): OK

202 (Status): Accepted

### `deletecollection` delete collection of Device

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1alpha2/devices

#### Parameters

- **body**: DeleteOptions

  

- **continue** (*in query*): string

  [continue](../common-parameter/common-parameters#continue)

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldSelector** (*in query*): string

  [fieldSelector](../common-parameter/common-parameters#fieldselector)

- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../common-parameter/common-parameters#graceperiodseconds)

- **labelSelector** (*in query*): string

  [labelSelector](../common-parameter/common-parameters#labelselector)

- **limit** (*in query*): integer

  [limit](../common-parameter/common-parameters#limit)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

- **propagationPolicy** (*in query*): string

  [propagationPolicy](../common-parameter/common-parameters#propagationpolicy)

- **resourceVersion** (*in query*): string

  [resourceVersion](../common-parameter/common-parameters#resourceversion)

- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../common-parameter/common-parameters#resourceversionmatch)

- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../common-parameter/common-parameters#sendinitialevents)

- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../common-parameter/common-parameters#timeoutseconds)

#### Response

200 (Status): OK

