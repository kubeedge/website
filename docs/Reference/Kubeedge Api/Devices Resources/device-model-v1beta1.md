---
api_metadata:
  apiVersion: "devices.kubeedge.io/v1beta1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/devices/v1beta1"
  kind: "DeviceModel"
content_type: "api_reference"
description: "DeviceModel is the Schema for the device model API."
title: "DeviceModel v1beta1"
weight: 4
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: devices.kubeedge.io/v1beta1`

`import "github.com/kubeedge/kubeedge/pkg/apis/devices/v1beta1"`


## DeviceModel 

DeviceModel is the Schema for the device model API

<hr/>

- **apiVersion**: devices.kubeedge.io/v1beta1


- **kind**: DeviceModel


- **metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))


- **spec** ([DeviceModelSpec](/device-model-v1beta1#devicemodelspec))






## DeviceModelSpec 

DeviceModelSpec defines the model for a device.It is a blueprint which describes the device capabilities and access mechanism via property visitors.

<hr/>

- **properties** ([]ModelProperty)

  Required: List of device properties.

  <a name="ModelProperty"></a>

  *ModelProperty describes an individual device property / attribute like temperature / humidity etc.*

  - **properties.accessMode** (string)

    Required: Access mode of property, ReadWrite or ReadOnly.

  - **properties.description** (string)

    The device property description.

  - **properties.maximum** (string)


  - **properties.minimum** (string)


  - **properties.name** (string)

    Required: The device property name. Note: If you need to use the built-in stream data processing function, you need to define Name as saveFrame or saveVideo

  - **properties.type** (string)

    Required: Type of device property, ENUM: INT,FLOAT,DOUBLE,STRING,BOOLEAN,BYTES,STREAM

  - **properties.unit** (string)

    The unit of the property

- **protocol** (string)

  Required: Protocol name used by the device.





## DeviceModelList 

DeviceModelList contains a list of DeviceModel

<hr/>

- **apiVersion**: devices.kubeedge.io/v1beta1


- **kind**: DeviceModelList


- **metadata** ([ListMeta](../Common%20Definitions/list-meta#listmeta))


- **items** ([][DeviceModel](/device-model-v1beta1#devicemodel)), required






## Operations 



<hr/>






### `get` read the specified DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK


### `get` read status of the specified DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK


### `list` list or watch objects of kind DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels

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


200 ([DeviceModelList](/device-model-v1beta1#devicemodellist)): OK


### `list` list or watch objects of kind DeviceModel

#### HTTP Request

GET /apis/devices.kubeedge.io/v1beta1/devicemodels

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


200 ([DeviceModelList](/device-model-v1beta1#devicemodellist)): OK


### `create` create a DeviceModel

#### HTTP Request

POST /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeviceModel](/device-model-v1beta1#devicemodel), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK

201 ([DeviceModel](/device-model-v1beta1#devicemodel)): Created

202 ([DeviceModel](/device-model-v1beta1#devicemodel)): Accepted


### `update` replace the specified DeviceModel

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeviceModel](/device-model-v1beta1#devicemodel), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK

201 ([DeviceModel](/device-model-v1beta1#devicemodel)): Created


### `update` replace status of the specified DeviceModel

#### HTTP Request

PUT /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the DeviceModel


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [DeviceModel](/device-model-v1beta1#devicemodel), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK

201 ([DeviceModel](/device-model-v1beta1#devicemodel)): Created


### `patch` partially update the specified DeviceModel

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}

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


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK

201 ([DeviceModel](/device-model-v1beta1#devicemodel)): Created


### `patch` partially update status of the specified DeviceModel

#### HTTP Request

PATCH /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}/status

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


200 ([DeviceModel](/device-model-v1beta1#devicemodel)): OK

201 ([DeviceModel](/device-model-v1beta1#devicemodel)): Created


### `delete` delete a DeviceModel

#### HTTP Request

DELETE /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels/{name}

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

DELETE /apis/devices.kubeedge.io/v1beta1/namespaces/{namespace}/devicemodels

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

