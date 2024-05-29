---
api_metadata:
  apiVersion: "operations.kubeedge.io/v1alpha1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/operations/v1alpha1"
  kind: "ImagePrePullJob"
content_type: "api_reference"
description: "ImagePrePullJob is used to prepull images on edge node."
title: "ImagePrePullJob v1alpha1"
weight: 1
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: operations.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/operations/v1alpha1"`


## ImagePrePullJob 

ImagePrePullJob is used to prepull images on edge node.

<hr/>

- **apiVersion**: operations.kubeedge.io/v1alpha1


- **kind**: ImagePrePullJob


- **metadata** ([ObjectMeta](../common-definitions/object-meta#objectmeta))


- **spec** ([ImagePrePullJobSpec](/image-pre-pull-job-v1alpha1#imageprepulljobspec)), required

  Spec represents the specification of the desired behavior of ImagePrePullJob.

- **status** ([ImagePrePullJobStatus](/image-pre-pull-job-v1alpha1#imageprepulljobstatus))

  Status represents the status of ImagePrePullJob.





## ImagePrePullJobSpec 

ImagePrePullSpec represents the specification of the desired behavior of ImagePrePullJob.

<hr/>

- **imagePrePullTemplate** (ImagePrePullTemplate)

  ImagePrepullTemplate represents original templates of imagePrePull

  <a name="ImagePrePullTemplate"></a>

  *ImagePrePullTemplate represents original templates of imagePrePull*

  - **imagePrePullTemplate.checkItems** ([]string)

    CheckItems specifies the items need to be checked before the task is executed. The default CheckItems value is disk.

  - **imagePrePullTemplate.concurrency** (int32)

    Concurrency specifies the maximum number of edge nodes that can pull images at the same time. The default Concurrency value is 1.

  - **imagePrePullTemplate.failureTolerate** (string)

    FailureTolerate specifies the task tolerance failure ratio. The default FailureTolerate value is 0.1.

  - **imagePrePullTemplate.imageSecrets** (string)

    ImageSecret specifies the secret for image pull if private registry used. Use [namespace]/[secretName] in format.

  - **imagePrePullTemplate.images** ([]string)

    Images is the image list to be prepull

  - **imagePrePullTemplate.labelSelector** ([LabelSelector](../common-definitions/label-selector#labelselector))

    LabelSelector is a filter to select member clusters by labels. It must match a node's labels for the NodeUpgradeJob to be operated on that node. Please note that sets of NodeNames and LabelSelector are ORed. Users must set one and can only set one.

  - **imagePrePullTemplate.nodeNames** ([]string)

    NodeNames is a request to select some specific nodes. If it is non-empty, the upgrade job simply select these edge nodes to do upgrade operation. Please note that sets of NodeNames and LabelSelector are ORed. Users must set one and can only set one.

  - **imagePrePullTemplate.retryTimes** (int32)

    RetryTimes specifies the retry times if image pull failed on each edgenode. Default to 0

  - **imagePrePullTemplate.timeoutSeconds** (int64)

    TimeoutSeconds limits the duration of the node prepull job on each edgenode. Default to 300. If set to 0, we'll use the default value 300.





## ImagePrePullJobStatus 

ImagePrePullJobStatus stores the status of ImagePrePullJob. contains images prepull status on multiple edge nodes.

<hr/>

- **action** (string)

  Action represents for the action of the ImagePrePullJob. There are two possible action values: Success, Failure.

- **event** (string)

  Event represents for the event of the ImagePrePullJob. There are four possible event values: Init, Check, Pull, TimeOut.

- **reason** (string)

  Reason represents for the reason of the ImagePrePullJob.

- **state** (string)

  State represents for the state phase of the ImagePrePullJob. There are five possible state values: "", checking, pulling, successful, failed.

- **status** ([]ImagePrePullStatus)

  Status contains image prepull status for each edge node.

  <a name="ImagePrePullStatus"></a>

  *ImagePrePullStatus stores image prepull status for each edge node.*

  - **status.imageStatus** ([]ImageStatus)

    ImageStatus represents the prepull status for each image

    <a name="ImageStatus"></a>

    *ImageStatus stores the prepull status for each image.*

    - **status.imageStatus.image** (string)

      Image is the name of the image

    - **status.imageStatus.reason** (string)

      Reason represents the fail reason if image pull failed

    - **status.imageStatus.state** (string)

      State represents for the state phase of this image pull on the edge node There are two possible state values: successful, failed.

  - **status.nodeStatus** (TaskStatus)

    TaskStatus represents the status for each node

    <a name="TaskStatus"></a>

    *TaskStatus stores the status of Upgrade for each edge node.*

    - **status.nodeStatus.action** (string)

      Action represents for the action of the ImagePrePullJob. There are three possible action values: Success, Failure, TimeOut.

    - **status.nodeStatus.event** (string)

      Event represents for the event of the ImagePrePullJob. There are three possible event values: Init, Check, Pull.

    - **status.nodeStatus.nodeName** (string)

      NodeName is the name of edge node.

    - **status.nodeStatus.reason** (string)

      Reason represents for the reason of the ImagePrePullJob.

    - **status.nodeStatus.state** (string)

      State represents for the upgrade state phase of the edge node. There are several possible state values: "", Upgrading, BackingUp, RollingBack and Checking.

    - **status.nodeStatus.time** (string)

      Time represents for the running time of the ImagePrePullJob.

- **time** (string)

  Time represents for the running time of the ImagePrePullJob.





## ImagePrePullJobList 

ImagePrePullJobList is a list of ImagePrePullJob.

<hr/>

- **apiVersion**: operations.kubeedge.io/v1alpha1


- **kind**: ImagePrePullJobList


- **metadata** ([ListMeta](../common-definitions/list-meta#listmeta))

  Standard list metadata.

- **items** ([][ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)), required

  List of ImagePrePullJob.





## Operations 



<hr/>






### `get` read the specified ImagePrePullJob

#### HTTP Request

GET /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK


### `get` read status of the specified ImagePrePullJob

#### HTTP Request

GET /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK


### `list` list or watch objects of kind ImagePrePullJob

#### HTTP Request

GET /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs

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


200 ([ImagePrePullJobList](/image-pre-pull-job-v1alpha1#imageprepulljoblist)): OK


### `create` create an ImagePrePullJob

#### HTTP Request

POST /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs

#### Parameters


- **body**: [ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK

201 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): Created

202 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): Accepted


### `update` replace the specified ImagePrePullJob

#### HTTP Request

PUT /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


- **body**: [ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK

201 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): Created


### `update` replace status of the specified ImagePrePullJob

#### HTTP Request

PUT /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


- **body**: [ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob), required

  


- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)



#### Response


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK

201 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): Created


### `patch` partially update the specified ImagePrePullJob

#### HTTP Request

PATCH /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


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


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK

201 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): Created


### `patch` partially update status of the specified ImagePrePullJob

#### HTTP Request

PATCH /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


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


200 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): OK

201 ([ImagePrePullJob](/image-pre-pull-job-v1alpha1#imageprepulljob)): Created


### `delete` delete an ImagePrePullJob

#### HTTP Request

DELETE /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ImagePrePullJob


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


### `deletecollection` delete collection of ImagePrePullJob

#### HTTP Request

DELETE /apis/operations.kubeedge.io/v1alpha1/imageprepulljobs

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

