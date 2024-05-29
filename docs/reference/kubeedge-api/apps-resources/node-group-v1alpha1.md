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

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: apps.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/apps/v1alpha1"`


## NodeGroup 

NodeGroup is the Schema for the nodegroups API

<hr/>

- **apiVersion**: apps.kubeedge.io/v1alpha1


- **kind**: NodeGroup


- **metadata** ([ObjectMeta](../common-definitions/object-meta#objectmeta))


- **spec** ([NodeGroupSpec](../apps-resources/node-group-v1alpha1#nodegroupspec))

  Spec represents the specification of the desired behavior of member nodegroup.

- **status** ([NodeGroupStatus](../apps-resources/node-group-v1alpha1#nodegroupstatus))

  Status represents the status of member nodegroup.





## NodeGroupSpec 

NodeGroupSpec defines the desired state of NodeGroup

<hr/>

- **matchLabels** (map[string]string)

  MatchLabels are used to select nodes that have these labels.

- **nodes** ([]string)

  Nodes contains names of all the nodes in the nodegroup.





## NodeGroupStatus 

NodeGroupStatus contains the observed status of all selected nodes in this NodeGroup, including nodes that have been one of the members of this NodeGroup and those have not.

<hr/>

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





## NodeGroupList 

NodeGroupList contains a list of NodeGroup

<hr/>

- **apiVersion**: apps.kubeedge.io/v1alpha1


- **kind**: NodeGroupList


- **metadata** ([ListMeta](../common-definitions/list-meta#listmeta))


- **items** ([][NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)), required






## Operations 



<hr/>






### `get` read the specified NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK


### `get` read status of the specified NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK


### `list` list or watch objects of kind NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups

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


200 ([NodeGroupList](../apps-resources/node-group-v1alpha1#nodegrouplist)): OK


### `create` create a NodeGroup

#### HTTP Request

POST /apis/apps.kubeedge.io/v1alpha1/nodegroups

#### Parameters


- **body**: [NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): Created

202 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): Accepted


### `update` replace the specified NodeGroup

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **body**: [NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): Created


### `update` replace status of the specified NodeGroup

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **body**: [NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): Created


### `patch` partially update the specified NodeGroup

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): Created


### `patch` partially update status of the specified NodeGroup

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


200 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](../apps-resources/node-group-v1alpha1#nodegroup)): Created


### `delete` delete a NodeGroup

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


### `deletecollection` delete collection of NodeGroup

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/nodegroups

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

