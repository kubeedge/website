---
api_metadata:
  apiVersion: "rules.kubeedge.io/v1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/rules/v1"
  kind: "Rule"
content_type: "api_reference"
description: "Rule is the Schema for the rules API."
title: "Rule"
weight: 1
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: rules.kubeedge.io/v1`

`import "github.com/kubeedge/kubeedge/pkg/apis/rules/v1"`


## Rule 

Rule is the Schema for the rules API

<hr/>

- **apiVersion**: rules.kubeedge.io/v1


- **kind**: Rule


- **metadata** ([ObjectMeta](../Common-Definitions/object-meta#objectmeta))


- **spec** ([RuleSpec](/rule-v1#rulespec)), required


- **status** ([RuleStatus](/rule-v1#rulestatus))






## RuleSpec 

RuleSpec defines rule of message delivery.

<hr/>

- **source** (string), required

  Source represents where the messages come from. Its value is the same with ruleendpoint name. For example, rest or eventbus.

- **sourceResource** (map[string]string), required

  SourceResource is a map representing the resource info of source. For rest ruleendpoint type its value is ["path":"/a/b"]. For eventbus ruleendpoint type its value is ["topic":"&lt;user define string&gt;","node_name":"xxxx"]

- **target** (string), required

  Target represents where the messages go to. its value is the same with ruleendpoint name. For example, eventbus or api or servicebus.

- **targetResource** (map[string]string), required

  targetResource is a map representing the resource info of target. For api ruleendpoint type its value is ["resource":"http://a.com"]. For eventbus ruleendpoint type its value is ["topic":"/xxxx"]. For servicebus ruleendpoint type its value is ["path":"/request_path"].





## RuleStatus 

RuleStatus defines status of message delivery.

<hr/>

- **errors** ([]string), required

  Errors represents failed reasons of message delivery of rule.

- **failMessages** (int64), required

  FailMessages represents failed count of message delivery of rule.

- **successMessages** (int64), required

  SuccessMessages represents success count of message delivery of rule.





## RuleList 

RuleList contains a list of Rule

<hr/>

- **apiVersion**: rules.kubeedge.io/v1


- **kind**: RuleList


- **metadata** ([ListMeta](../Common-Definitions/list-meta#listmeta))


- **items** ([][Rule](/rule-v1#rule)), required






## Operations 



<hr/>






### `get` read the specified Rule

#### HTTP Request

GET /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK


### `get` read status of the specified Rule

#### HTTP Request

GET /apis/rules.kubeedge.io/v1/rules/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK


### `list` list or watch objects of kind Rule

#### HTTP Request

GET /apis/rules.kubeedge.io/v1/rules

#### Parameters


- **allowWatchBookmarks** (*in query*): boolean

  allowWatchBookmarks requests watch events with type "BOOKMARK". Servers that do not implement bookmarks may ignore this flag and bookmarks are sent at the server's discretion. Clients should not assume bookmarks are returned at any specific interval, nor may they assume the server will send any BOOKMARK event during a session. If this is not a watch, this field is ignored.


- **continue** (*in query*): string

  [continue](../Common-Parameter/common-parameters#continue)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common-Parameter/common-parameters#fieldselector)


- **labelSelector** (*in query*): string

  [labelSelector](../Common-Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common-Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common-Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common-Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common-Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common-Parameter/common-parameters#timeoutseconds)


- **watch** (*in query*): boolean

  Watch for changes to the described resources and return them as a stream of add, update, and remove notifications. Specify resourceVersion.



#### Response


200 ([RuleList](/rule-v1#rulelist)): OK


### `create` create a Rule

#### HTTP Request

POST /apis/rules.kubeedge.io/v1/rules

#### Parameters


- **body**: [Rule](/rule-v1#rule), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK

201 ([Rule](/rule-v1#rule)): Created

202 ([Rule](/rule-v1#rule)): Accepted


### `update` replace the specified Rule

#### HTTP Request

PUT /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: [Rule](/rule-v1#rule), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK

201 ([Rule](/rule-v1#rule)): Created


### `update` replace status of the specified Rule

#### HTTP Request

PUT /apis/rules.kubeedge.io/v1/rules/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: [Rule](/rule-v1#rule), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK

201 ([Rule](/rule-v1#rule)): Created


### `patch` partially update the specified Rule

#### HTTP Request

PATCH /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: [Patch](../Common-Definitions/patch#patch), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **force** (*in query*): boolean

  [force](../Common-Parameter/common-parameters#force)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK

201 ([Rule](/rule-v1#rule)): Created


### `patch` partially update status of the specified Rule

#### HTTP Request

PATCH /apis/rules.kubeedge.io/v1/rules/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: [Patch](../Common-Definitions/patch#patch), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common-Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common-Parameter/common-parameters#fieldvalidation)


- **force** (*in query*): boolean

  [force](../Common-Parameter/common-parameters#force)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)



#### Response


200 ([Rule](/rule-v1#rule)): OK

201 ([Rule](/rule-v1#rule)): Created


### `delete` delete a Rule

#### HTTP Request

DELETE /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: [DeleteOptions](../Common-Definitions/delete-options#deleteoptions)

  


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../Common-Parameter/common-parameters#graceperiodseconds)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../Common-Parameter/common-parameters#propagationpolicy)



#### Response


200 ([Status](../Common-Definitions/status#status)): OK

202 ([Status](../Common-Definitions/status#status)): Accepted


### `deletecollection` delete collection of Rule

#### HTTP Request

DELETE /apis/rules.kubeedge.io/v1/rules

#### Parameters


- **body**: [DeleteOptions](../Common-Definitions/delete-options#deleteoptions)

  


- **continue** (*in query*): string

  [continue](../Common-Parameter/common-parameters#continue)


- **dryRun** (*in query*): string

  [dryRun](../Common-Parameter/common-parameters#dryrun)


- **fieldSelector** (*in query*): string

  [fieldSelector](../Common-Parameter/common-parameters#fieldselector)


- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../Common-Parameter/common-parameters#graceperiodseconds)


- **labelSelector** (*in query*): string

  [labelSelector](../Common-Parameter/common-parameters#labelselector)


- **limit** (*in query*): integer

  [limit](../Common-Parameter/common-parameters#limit)


- **pretty** (*in query*): string

  [pretty](../Common-Parameter/common-parameters#pretty)


- **propagationPolicy** (*in query*): string

  [propagationPolicy](../Common-Parameter/common-parameters#propagationpolicy)


- **resourceVersion** (*in query*): string

  [resourceVersion](../Common-Parameter/common-parameters#resourceversion)


- **resourceVersionMatch** (*in query*): string

  [resourceVersionMatch](../Common-Parameter/common-parameters#resourceversionmatch)


- **sendInitialEvents** (*in query*): boolean

  [sendInitialEvents](../Common-Parameter/common-parameters#sendinitialevents)


- **timeoutSeconds** (*in query*): integer

  [timeoutSeconds](../Common-Parameter/common-parameters#timeoutseconds)



#### Response


200 ([Status](../Common-Definitions/status#status)): OK

