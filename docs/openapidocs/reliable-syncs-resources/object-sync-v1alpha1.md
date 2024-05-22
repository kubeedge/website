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

<!--
The file is auto-generated from the Go source code of the component using a generic
[generator](https://github.com/kubernetes-sigs/reference-docs/). To learn how
to generate the reference documentation, please read
[Contributing to the reference documentation](/docs/contribute/generate-ref-docs/).
To update the reference content, please follow the 
[Contributing upstream](/docs/contribute/generate-ref-docs/contribute-upstream/)
guide. You can file document formatting bugs against the
[reference-docs](https://github.com/kubernetes-sigs/reference-docs/) project.
-->

`apiVersion: reliablesyncs.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/reliablesyncs/v1alpha1"`


## ObjectSync {#ObjectSync}

ObjectSync stores the state of the namespaced object that was successfully persisted to the edge node. ObjectSync name is a concatenation of the node name which receiving the object and the object UUID.

<hr>

- **apiVersion**: reliablesyncs.kubeedge.io/v1alpha1


- **kind**: ObjectSync


- **metadata** (<a href="{{< ref "../common-definitions/object-meta#ObjectMeta" >}}">ObjectMeta</a>)

  Standard Kubernetes object's metadata.

- **spec** (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSyncSpec" >}}">ObjectSyncSpec</a>)


- **status** (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSyncStatus" >}}">ObjectSyncStatus</a>)






## ObjectSyncSpec {#ObjectSyncSpec}

ObjectSyncSpec stores the details of objects that persist to the edge.

<hr>

- **objectAPIVersion** (string)

  ObjectAPIVersion is the APIVersion of the object that was successfully persist to the edge node.

- **objectKind** (string)

  ObjectType is the kind of the object that was successfully persist to the edge node.

- **objectName** (string)

  ObjectName is the name of the object that was successfully persist to the edge node.





## ObjectSyncStatus {#ObjectSyncStatus}

ObjectSyncStatus stores the resourceversion of objects that persist to the edge.

<hr>

- **objectResourceVersion** (string)

  ObjectResourceVersion is the resourceversion of the object that was successfully persist to the edge node.





## ObjectSyncList {#ObjectSyncList}

ObjectSyncList is a list of ObjectSync.

<hr>

- **apiVersion**: reliablesyncs.kubeedge.io/v1alpha1


- **kind**: ObjectSyncList


- **metadata** (<a href="{{< ref "../common-definitions/list-meta#ListMeta" >}}">ListMeta</a>)

  Standard list metadata.

- **items** ([]<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>), required

  List of ObjectSync.





## Operations {#Operations}



<hr>






### `get` read the specified ObjectSync

#### HTTP Request

GET /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK


### `get` read status of the specified ObjectSync

#### HTTP Request

GET /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK


### `list` list or watch objects of kind ObjectSync

#### HTTP Request

GET /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs

#### Parameters


- **allowWatchBookmarks** (*in query*): boolean

  allowWatchBookmarks requests watch events with type "BOOKMARK". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server's discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.


- **continue** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#continue" >}}">continue</a>


- **fieldSelector** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldSelector" >}}">fieldSelector</a>


- **labelSelector** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#labelSelector" >}}">labelSelector</a>


- **limit** (*in query*): integer

  <a href="{{< ref "../common-parameters/common-parameters#limit" >}}">limit</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>


- **resourceVersion** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#resourceVersion" >}}">resourceVersion</a>


- **resourceVersionMatch** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#resourceVersionMatch" >}}">resourceVersionMatch</a>


- **sendInitialEvents** (*in query*): boolean

  <a href="{{< ref "../common-parameters/common-parameters#sendInitialEvents" >}}">sendInitialEvents</a>


- **timeoutSeconds** (*in query*): integer

  <a href="{{< ref "../common-parameters/common-parameters#timeoutSeconds" >}}">timeoutSeconds</a>


- **watch** (*in query*): boolean

  Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSyncList" >}}">ObjectSyncList</a>): OK


### `create` create an ObjectSync

#### HTTP Request

POST /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs

#### Parameters


- **body**: <a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK

201 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): Created

202 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): Accepted


### `update` replace the specified ObjectSync

#### HTTP Request

PUT /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: <a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK

201 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): Created


### `update` replace status of the specified ObjectSync

#### HTTP Request

PUT /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: <a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK

201 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): Created


### `patch` partially update the specified ObjectSync

#### HTTP Request

PATCH /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: <a href="{{< ref "../common-definitions/patch#Patch" >}}">Patch</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **force** (*in query*): boolean

  <a href="{{< ref "../common-parameters/common-parameters#force" >}}">force</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK

201 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): Created


### `patch` partially update status of the specified ObjectSync

#### HTTP Request

PATCH /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: <a href="{{< ref "../common-definitions/patch#Patch" >}}">Patch</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **force** (*in query*): boolean

  <a href="{{< ref "../common-parameters/common-parameters#force" >}}">force</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): OK

201 (<a href="{{< ref "../reliable-syncs-resources/object-sync-v1alpha1#ObjectSync" >}}">ObjectSync</a>): Created


### `delete` delete an ObjectSync

#### HTTP Request

DELETE /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ObjectSync


- **body**: <a href="{{< ref "../common-definitions/delete-options#DeleteOptions" >}}">DeleteOptions</a>

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **gracePeriodSeconds** (*in query*): integer

  <a href="{{< ref "../common-parameters/common-parameters#gracePeriodSeconds" >}}">gracePeriodSeconds</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>


- **propagationPolicy** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#propagationPolicy" >}}">propagationPolicy</a>



#### Response


200 (<a href="{{< ref "../common-definitions/status#Status" >}}">Status</a>): OK

202 (<a href="{{< ref "../common-definitions/status#Status" >}}">Status</a>): Accepted


### `deletecollection` delete collection of ObjectSync

#### HTTP Request

DELETE /apis/reliablesyncs.kubeedge.io/v1alpha1/objectsyncs

#### Parameters


- **body**: <a href="{{< ref "../common-definitions/delete-options#DeleteOptions" >}}">DeleteOptions</a>

  


- **continue** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#continue" >}}">continue</a>


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldSelector** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldSelector" >}}">fieldSelector</a>


- **gracePeriodSeconds** (*in query*): integer

  <a href="{{< ref "../common-parameters/common-parameters#gracePeriodSeconds" >}}">gracePeriodSeconds</a>


- **labelSelector** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#labelSelector" >}}">labelSelector</a>


- **limit** (*in query*): integer

  <a href="{{< ref "../common-parameters/common-parameters#limit" >}}">limit</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>


- **propagationPolicy** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#propagationPolicy" >}}">propagationPolicy</a>


- **resourceVersion** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#resourceVersion" >}}">resourceVersion</a>


- **resourceVersionMatch** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#resourceVersionMatch" >}}">resourceVersionMatch</a>


- **sendInitialEvents** (*in query*): boolean

  <a href="{{< ref "../common-parameters/common-parameters#sendInitialEvents" >}}">sendInitialEvents</a>


- **timeoutSeconds** (*in query*): integer

  <a href="{{< ref "../common-parameters/common-parameters#timeoutSeconds" >}}">timeoutSeconds</a>



#### Response


200 (<a href="{{< ref "../common-definitions/status#Status" >}}">Status</a>): OK

