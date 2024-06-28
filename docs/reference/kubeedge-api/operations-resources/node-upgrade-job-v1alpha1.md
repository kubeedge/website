---
api_metadata:
  apiVersion: "operations.kubeedge.io/v1alpha1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/operations/v1alpha1"
  kind: "NodeUpgradeJob"
content_type: "api_reference"
description: "NodeUpgradeJob is used to upgrade edge node from cloud side."
title: "NodeUpgradeJob v1alpha1"
weight: 2
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: operations.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/operations/v1alpha1"`

## NodeUpgradeJob 

NodeUpgradeJob is used to upgrade edge node from cloud side.

<hr/>

- **apiVersion**: operations.kubeedge.io/v1alpha1

- **kind**: NodeUpgradeJob

- **metadata** ([ObjectMeta](../common-definitions/object-meta#objectmeta))

- **spec** ([NodeUpgradeJobSpec](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejobspec))

  Specification of the desired behavior of NodeUpgradeJob.

- **status** ([NodeUpgradeJobStatus](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejobstatus))

  Most recently observed status of the NodeUpgradeJob.

## NodeUpgradeJobSpec 

NodeUpgradeJobSpec is the specification of the desired behavior of the NodeUpgradeJob.

<hr/>

- **checkItems** ([]string)

  CheckItems specifies the items need to be checked before the task is executed. The default CheckItems value is nil.

- **concurrency** (int32)

  Concurrency specifies the max number of edge nodes that can be upgraded at the same time. The default Concurrency value is 1.

- **failureTolerate** (string)

  FailureTolerate specifies the task tolerance failure ratio. The default FailureTolerate value is 0.1.

- **image** (string)

  Image specifies a container image name, the image contains: keadm and edgecore. keadm is used as upgradetool, to install the new version of edgecore. The image name consists of registry hostname and repository name, if it includes the tag or digest, the tag or digest will be overwritten by Version field above. If the registry hostname is empty, docker.io will be used as default. The default image name is: kubeedge/installation-package.

- **labelSelector** ([LabelSelector](../common-definitions/label-selector#labelselector))

  LabelSelector is a filter to select member clusters by labels. It must match a node's labels for the NodeUpgradeJob to be operated on that node. Please note that sets of NodeNames and LabelSelector are ORed. Users must set one and can only set one.

- **nodeNames** ([]string)

  NodeNames is a request to select some specific nodes. If it is non-empty, the upgrade job simply select these edge nodes to do upgrade operation. Please note that sets of NodeNames and LabelSelector are ORed. Users must set one and can only set one.

- **timeoutSeconds** (int64)

  TimeoutSeconds limits the duration of the node upgrade job. Default to 300. If set to 0, we'll use the default value 300.

- **version** (string)

## NodeUpgradeJobStatus 

NodeUpgradeJobStatus stores the status of NodeUpgradeJob. contains multiple edge nodes upgrade status.

<hr/>

- **action** (string)

  Action represents for the action of the ImagePrePullJob. There are two possible action values: Success, Failure.

- **currentVersion** (string)

  CurrentVersion represents for the current status of the EdgeCore.

- **event** (string)

  Event represents for the event of the ImagePrePullJob. There are six possible event values: Init, Check, BackUp, Upgrade, TimeOut, Rollback.

- **historicVersion** (string)

  HistoricVersion represents for the historic status of the EdgeCore.

- **nodeStatus** ([]TaskStatus)

  Status contains upgrade Status for each edge node.

  <a name="TaskStatus"></a>

  *TaskStatus stores the status of Upgrade for each edge node.*

  - **nodeStatus.action** (string)

    Action represents for the action of the ImagePrePullJob. There are three possible action values: Success, Failure, TimeOut.

  - **nodeStatus.event** (string)

    Event represents for the event of the ImagePrePullJob. There are three possible event values: Init, Check, Pull.

  - **nodeStatus.nodeName** (string)

    NodeName is the name of edge node.

  - **nodeStatus.reason** (string)

    Reason represents for the reason of the ImagePrePullJob.

  - **nodeStatus.state** (string)

    State represents for the upgrade state phase of the edge node. There are several possible state values: "", Upgrading, BackingUp, RollingBack and Checking.

  - **nodeStatus.time** (string)

    Time represents for the running time of the ImagePrePullJob.

- **reason** (string)

  Reason represents for the reason of the ImagePrePullJob.

- **state** (string)

  State represents for the state phase of the NodeUpgradeJob. There are several possible state values: "", Upgrading, BackingUp, RollingBack and Checking.

- **time** (string)

  Time represents for the running time of the ImagePrePullJob.

## NodeUpgradeJobList 

NodeUpgradeJobList is a list of NodeUpgradeJob.

<hr/>

- **apiVersion**: operations.kubeedge.io/v1alpha1

- **kind**: NodeUpgradeJobList

- **metadata** ([ListMeta](../common-definitions/list-meta#listmeta))

  Standard list metadata.

- **items** ([][NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)), required

  List of NodeUpgradeJobs.

## Operations 

<hr/>

### `get` read the specified NodeUpgradeJob

#### HTTP Request

GET /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

### `get` read status of the specified NodeUpgradeJob

#### HTTP Request

GET /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

### `list` list or watch objects of kind NodeUpgradeJob

#### HTTP Request

GET /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs

#### Parameters

- **allowWatchBookmarks** (*in query*): boolean

  [allowWatchBookmarks](../common-parameter/common-parameters#allowwatchbookmarks)

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

  [watch](../common-parameter/common-parameters#watch)

#### Response

200 ([NodeUpgradeJobList](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejoblist)): OK

### `create` create a NodeUpgradeJob

#### HTTP Request

POST /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs

#### Parameters

- **body**: [NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

201 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): Created

202 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): Accepted

### `update` replace the specified NodeUpgradeJob

#### HTTP Request

PUT /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

- **body**: [NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

201 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): Created

### `update` replace status of the specified NodeUpgradeJob

#### HTTP Request

PUT /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

- **body**: [NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

201 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): Created

### `patch` partially update the specified NodeUpgradeJob

#### HTTP Request

PATCH /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

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

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

201 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): Created

### `patch` partially update status of the specified NodeUpgradeJob

#### HTTP Request

PATCH /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

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

200 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): OK

201 ([NodeUpgradeJob](../operations-resources/node-upgrade-job-v1alpha1#nodeupgradejob)): Created

### `delete` delete a NodeUpgradeJob

#### HTTP Request

DELETE /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the NodeUpgradeJob

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

### `deletecollection` delete collection of NodeUpgradeJob

#### HTTP Request

DELETE /apis/operations.kubeedge.io/v1alpha1/nodeupgradejobs

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

