---
api_metadata:
  apiVersion: "reliablesyncs.kubeedge.io/v1alpha1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/reliablesyncs/v1alpha1"
  kind: "ObjectSync"
content_type: "api_reference"
description: "ObjectSync stores the state of the namespaced object that was successfully persisted to the edge node."
title: "ObjectSync v1alpha1"
weight: 1
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: reliablesyncs.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/reliablesyncs/v1alpha1"`


## ObjectSync 

ObjectSync stores the state of the namespaced object that was successfully persisted to the edge node. ObjectSync name is a concatenation of the node name which receiving the object and the object UUID.

<hr/>

- **apiVersion**: reliablesyncs.kubeedge.io/v1alpha1


- **kind**: ObjectSync


- **metadata** ([ObjectMeta](../common-definitions/object-meta#objectmeta))

  Standard Kubernetes object's metadata.

- **spec** ([ObjectSyncSpec](/object-sync-v1alpha1#objectsyncspec))


- **status** ([ObjectSyncStatus](/object-sync-v1alpha1#objectsyncstatus))






## ObjectSyncSpec 

ObjectSyncSpec stores the details of objects that persist to the edge.

<hr/>

- **objectAPIVersion** (string)

  ObjectAPIVersion is the APIVersion of the object that was successfully persist to the edge node.

- **objectKind** (string)

  ObjectType is the kind of the object that was successfully persist to the edge node.

- **objectName** (string)

  ObjectName is the name of the object that was successfully persist to the edge node.





## ObjectSyncStatus 

ObjectSyncStatus stores the resourceversion of objects that persist to the edge.

<hr/>

- **objectResourceVersion** (string)

  ObjectResourceVersion is the resourceversion of the object that was successfully persist to the edge node.





## ObjectSyncList 

ObjectSyncList is a list of ObjectSync.

<hr/>

- **apiVersion**: reliablesyncs.kubeedge.io/v1alpha1


- **kind**: ObjectSyncList


- **metadata** ([ListMeta](../common-definitions/list-meta#listmeta))

  Standard list metadata.

- **items** ([][ObjectSync](/object-sync-v1alpha1#objectsync)), required

  List of ObjectSync.





## Operations 



<hr/>






### `get` read the specified ObjectSync

#### HTTP Request

GET /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK


### `get` read status of the specified ObjectSync

#### HTTP Request

GET /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK


### `list` list or watch objects of kind ObjectSync

#### HTTP Request

GET /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs

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


200 ([ObjectSyncList](/object-sync-v1alpha1#objectsynclist)): OK


### `create` create an ObjectSync

#### HTTP Request

POST /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs

#### Parameters


- **body**: [ObjectSync](/object-sync-v1alpha1#objectsync), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK

201 ([ObjectSync](/object-sync-v1alpha1#objectsync)): Created

202 ([ObjectSync](/object-sync-v1alpha1#objectsync)): Accepted


### `update` replace the specified ObjectSync

#### HTTP Request

PUT /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: [ObjectSync](/object-sync-v1alpha1#objectsync), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK

201 ([ObjectSync](/object-sync-v1alpha1#objectsync)): Created


### `update` replace status of the specified ObjectSync

#### HTTP Request

PUT /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: [ObjectSync](/object-sync-v1alpha1#objectsync), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK

201 ([ObjectSync](/object-sync-v1alpha1#objectsync)): Created


### `patch` partially update the specified ObjectSync

#### HTTP Request

PATCH /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: [Patch](../common-definitions/patch#patch), required

  


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


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK

201 ([ObjectSync](/object-sync-v1alpha1#objectsync)): Created


### `patch` partially update status of the specified ObjectSync

#### HTTP Request

PATCH /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: [Patch](../common-definitions/patch#patch), required

  


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


200 ([ObjectSync](/object-sync-v1alpha1#objectsync)): OK

201 ([ObjectSync](/object-sync-v1alpha1#objectsync)): Created


### `delete` delete an ObjectSync

#### HTTP Request

DELETE /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: [DeleteOptions](../common-definitions/delete-options#deleteoptions)

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../common-parameter/common-parameters#graceperiodseconds)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../common-parameter/common-parameters#propagationpolicy)



#### Response


200 ([Status](../common-definitions/status#status)): OK

202 ([Status](../common-definitions/status#status)): Accepted


### `deletecollection` delete collection of ObjectSync

#### HTTP Request

DELETE /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs

#### Parameters


- **body**: [DeleteOptions](../common-definitions/delete-options#deleteoptions)

  


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


200 ([Status](../common-definitions/status#status)): OK

