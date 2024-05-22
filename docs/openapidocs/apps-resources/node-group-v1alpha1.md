---
api_metadata:
  apiVersion: "apps.kubeedge.io/v1alpha1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/apps/v1alpha1"
  kind: "NodeGroup"
content_type: "api_reference"
description: "NodeGroup is the Schema for the nodegroups API."
title: "NodeGroup v1alpha1"
weight: 2
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

`apiVersion: apps.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/apps/v1alpha1"`


## NodeGroup {#NodeGroup}

NodeGroup is the Schema for the nodegroups API

<hr>

- **apiVersion**: apps.kubeedge.io/v1alpha1


- **kind**: NodeGroup


- **metadata** (<a href="{{< ref "../common-definitions/object-meta#ObjectMeta" >}}">ObjectMeta</a>)


- **spec** (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroupSpec" >}}">NodeGroupSpec</a>)

  Spec represents the specification of the desired behavior of member nodegroup.

- **status** (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroupStatus" >}}">NodeGroupStatus</a>)

  Status represents the status of member nodegroup.





## NodeGroupSpec {#NodeGroupSpec}

NodeGroupSpec defines the desired state of NodeGroup

<hr>

- **matchLabels** (map[string]string)

  MatchLabels are used to select nodes that have these labels.

- **nodes** ([]string)

  Nodes contains names of all the nodes in the nodegroup.





## NodeGroupStatus {#NodeGroupStatus}

NodeGroupStatus contains the observed status of all selected nodes in this NodeGroup, including nodes that have been one of the members of this NodeGroup and those have not.

<hr>

- **nodeStatuses** ([]NodeStatus)

  NodeStatuses is a status list of all selected nodes.

  <a name="NodeStatus"></a>
  *NodeStatus contains status of node that selected by this NodeGroup.*

  - **nodeStatuses.nodeName** (string), required

    NodeName contains name of this node.

  - **nodeStatuses.readyStatus** (string), required

    ReadyStatus contains ready status of this node.

  - **nodeStatuses.selectionStatus** (string), required

    SelectionStatus contains status of the selection result for this node.

  - **nodeStatuses.selectionStatusReason** (string)

    SelectionStatusReason contains human-readable reason for this SelectionStatus.





## NodeGroupList {#NodeGroupList}

NodeGroupList contains a list of NodeGroup

<hr>

- **apiVersion**: apps.kubeedge.io/v1alpha1


- **kind**: NodeGroupList


- **metadata** (<a href="{{< ref "../common-definitions/list-meta#ListMeta" >}}">ListMeta</a>)


- **items** ([]<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>), required






## Operations {#Operations}



<hr>






### `get` read the specified NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK


### `get` read status of the specified NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK


### `list` list or watch objects of kind NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups

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


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroupList" >}}">NodeGroupList</a>): OK


### `create` create a NodeGroup

#### HTTP Request

POST /apis/apps.kubeedge.io/v1alpha1/nodegroups

#### Parameters


- **body**: <a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK

201 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): Created

202 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): Accepted


### `update` replace the specified NodeGroup

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **body**: <a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK

201 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): Created


### `update` replace status of the specified NodeGroup

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **body**: <a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK

201 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): Created


### `patch` partially update the specified NodeGroup

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK

201 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): Created


### `patch` partially update status of the specified NodeGroup

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


200 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): OK

201 (<a href="{{< ref "../apps-resources/node-group-v1alpha1#NodeGroup" >}}">NodeGroup</a>): Created


### `delete` delete a NodeGroup

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


### `deletecollection` delete collection of NodeGroup

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/nodegroups

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

