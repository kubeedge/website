---
api_metadata:
  apiVersion: "devices.kubeedge.io/v1alpha2"
  import: "github.com/kubeedge/kubeedge/pkg/apis/devices/v1alpha2"
  kind: "DeviceModel"
content_type: "api_reference"
description: "DeviceModel is the Schema for the device model API."
title: "DeviceModel v1alpha2"
weight: 3
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: devices.kubeedge.io/v1alpha2`

`import "github.com/kubeedge/kubeedge/pkg/apis/devices/v1alpha2"`


## DeviceModel 

DeviceModel is the Schema for the device model API

<hr/>

- **apiVersion**: devices.kubeedge.io/v1alpha2


- **kind**: DeviceModel


- **metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))


- **spec** ([DeviceModelSpec](/device-model-v1alpha2#devicemodelspec))






## DeviceModelSpec 

DeviceModelSpec defines the model / template for a device.It is a blueprint which describes the device capabilities and access mechanism via property visitors.

<hr/>

- **properties** ([]DeviceProperty)

  Required: List of device properties.

  <a name="DeviceProperty"></a>

  *DeviceProperty describes an individual device property / attribute like temperature / humidity etc.*

  - **properties.description** (string)

    The device property description.

  - **properties.name** (string)

    Required: The device property name.

  - **properties.type** (PropertyType)

    Required: PropertyType represents the type and data validation of the property.

    <a name="PropertyType"></a>

    *Represents the type and data validation of a property. Only one of its members may be specified.*

    - **properties.type.boolean** (PropertyTypeBoolean)


      <a name="PropertyTypeBoolean"></a>

      **

      - **properties.type.boolean.accessMode** (string)

        Required: Access mode of property, ReadWrite or ReadOnly.

      - **properties.type.boolean.defaultValue** (boolean)


    - **properties.type.bytes** (PropertyTypeBytes)


      <a name="PropertyTypeBytes"></a>

      **

      - **properties.type.bytes.accessMode** (string)

        Required: Access mode of property, ReadWrite or ReadOnly.

    - **properties.type.double** (PropertyTypeDouble)


      <a name="PropertyTypeDouble"></a>

      **

      - **properties.type.double.accessMode** (string)

        Required: Access mode of property, ReadWrite or ReadOnly.

      - **properties.type.double.defaultValue** (double)


      - **properties.type.double.maximum** (double)


      - **properties.type.double.minimum** (double)


      - **properties.type.double.unit** (string)

        The unit of the property

    - **properties.type.float** (PropertyTypeFloat)


      <a name="PropertyTypeFloat"></a>

      **

      - **properties.type.float.accessMode** (string)

        Required: Access mode of property, ReadWrite or ReadOnly.

      - **properties.type.float.defaultValue** (float)


      - **properties.type.float.maximum** (float)


      - **properties.type.float.minimum** (float)


      - **properties.type.float.unit** (string)

        The unit of the property

    - **properties.type.int** (PropertyTypeInt64)


      <a name="PropertyTypeInt64"></a>

      **

      - **properties.type.int.accessMode** (string)

        Required: Access mode of property, ReadWrite or ReadOnly.

      - **properties.type.int.defaultValue** (int64)


      - **properties.type.int.maximum** (int64)


      - **properties.type.int.minimum** (int64)


      - **properties.type.int.unit** (string)

        The unit of the property

    - **properties.type.string** (PropertyTypeString)


      <a name="PropertyTypeString"></a>

      **

      - **properties.type.string.accessMode** (string)

        Required: Access mode of property, ReadWrite or ReadOnly.

      - **properties.type.string.defaultValue** (string)


- **protocol** (string)

  Required for DMI: Protocol name used by the device.





## DeviceModelList 

DeviceModelList contains a list of DeviceModel

<hr/>

- **apiVersion**: devices.kubeedge.io/v1alpha2


- **kind**: DeviceModelList


- **metadata** ([ListMeta](../Common%20Definitions/list-meta#listmeta))


- **items** ([][DeviceModel](/device-model-v1alpha2#devicemodel)), required






## Operations 



<hr/>






### `get` read the specified DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK


### `get` read status of the specified DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK


### `list` list or watch objects of kind DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels

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


200 ([DeviceModelList](/device-model-v1alpha2#devicemodellist)): OK


### `list` list or watch objects of kind DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1alpha2/devicemodels

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


200 ([DeviceModelList](/device-model-v1alpha2#devicemodellist)): OK


### `create` create a DeviceModel

#### HTTP Request

POST /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeviceModel](/device-model-v1alpha2#devicemodel), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK

201 ([DeviceModel](/device-model-v1alpha2#devicemodel)): Created

202 ([DeviceModel](/device-model-v1alpha2#devicemodel)): Accepted


### `update` replace the specified DeviceModel

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeviceModel](/device-model-v1alpha2#devicemodel), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK

201 ([DeviceModel](/device-model-v1alpha2#devicemodel)): Created


### `update` replace status of the specified DeviceModel

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeviceModel](/device-model-v1alpha2#devicemodel), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK

201 ([DeviceModel](/device-model-v1alpha2#devicemodel)): Created


### `patch` partially update the specified DeviceModel

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


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


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK

201 ([DeviceModel](/device-model-v1alpha2#devicemodel)): Created


### `patch` partially update status of the specified DeviceModel

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


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


200 ([DeviceModel](/device-model-v1alpha2#devicemodel)): OK

201 ([DeviceModel](/device-model-v1alpha2#devicemodel)): Created


### `delete` delete a DeviceModel

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


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


### `deletecollection` delete collection of DeviceModel

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1alpha2/namespaces/{namespace}/devicemodels

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

