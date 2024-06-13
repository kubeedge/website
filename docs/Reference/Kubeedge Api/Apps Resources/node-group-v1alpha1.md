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


- **metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))


- **spec** ([NodeGroupSpec](/node-group-v1alpha1#nodegroupspec))

  Spec represents the specification of the desired behavior of member nodegroup.

- **status** ([NodeGroupStatus](/node-group-v1alpha1#nodegroupstatus))

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


- **metadata** ([ListMeta](../Common%20Definitions/list-meta#listmeta))


- **items** ([][NodeGroup](/node-group-v1alpha1#nodegroup)), required






## Operations 



<hr/>






### `get` read the specified NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK


### `get` read status of the specified NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK


### `list` list or watch objects of kind NodeGroup

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/nodegroups

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


200 ([NodeGroupList](/node-group-v1alpha1#nodegrouplist)): OK


### `create` create a NodeGroup

#### HTTP Request

POST /apis/apps.kubeedge.io/v1alpha1/nodegroups

#### Parameters


- **body**: [NodeGroup](/node-group-v1alpha1#nodegroup), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](/node-group-v1alpha1#nodegroup)): Created

202 ([NodeGroup](/node-group-v1alpha1#nodegroup)): Accepted


### `update` replace the specified NodeGroup

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **body**: [NodeGroup](/node-group-v1alpha1#nodegroup), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](/node-group-v1alpha1#nodegroup)): Created


### `update` replace status of the specified NodeGroup

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


- **body**: [NodeGroup](/node-group-v1alpha1#nodegroup), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](/node-group-v1alpha1#nodegroup)): Created


### `patch` partially update the specified NodeGroup

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](/node-group-v1alpha1#nodegroup)): Created


### `patch` partially update status of the specified NodeGroup

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


200 ([NodeGroup](/node-group-v1alpha1#nodegroup)): OK

201 ([NodeGroup](/node-group-v1alpha1#nodegroup)): Created


### `delete` delete a NodeGroup

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/nodegroups/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the NodeGroup


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


### `deletecollection` delete collection of NodeGroup

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/nodegroups

#### Parameters


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

