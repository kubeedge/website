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

`apiVersion: rules.kubeedge.io/v1`

`import "github.com/kubeedge/kubeedge/pkg/apis/rules/v1"`


## Rule {#Rule}

Rule is the Schema for the rules API

<hr>

- **apiVersion**: rules.kubeedge.io/v1


- **kind**: Rule


- **metadata** (<a href="{{< ref "../common-definitions/object-meta#ObjectMeta" >}}">ObjectMeta</a>)


- **spec** (<a href="{{< ref "../rules-resources/rule-v1#RuleSpec" >}}">RuleSpec</a>), required


- **status** (<a href="{{< ref "../rules-resources/rule-v1#RuleStatus" >}}">RuleStatus</a>)






## RuleSpec {#RuleSpec}

RuleSpec defines rule of message delivery.

<hr>

- **source** (string), required

  Source represents where the messages come from. Its value is the same with ruleendpoint name. For example, rest or eventbus.

- **sourceResource** (map[string]string), required

  SourceResource is a map representing the resource info of source. For rest ruleendpoint type its value is {"path":"/a/b"}. For eventbus ruleendpoint type its value is {"topic":"\<user define string>","node_name":"xxxx"}

- **target** (string), required

  Target represents where the messages go to. its value is the same with ruleendpoint name. For example, eventbus or api or servicebus.

- **targetResource** (map[string]string), required

  targetResource is a map representing the resource info of target. For api ruleendpoint type its value is {"resource":"http://a.com"}. For eventbus ruleendpoint type its value is {"topic":"/xxxx"}. For servicebus ruleendpoint type its value is {"path":"/request_path"}.





## RuleStatus {#RuleStatus}

RuleStatus defines status of message delivery.

<hr>

- **errors** ([]string), required

  Errors represents failed reasons of message delivery of rule.

- **failMessages** (int64), required

  FailMessages represents failed count of message delivery of rule.

- **successMessages** (int64), required

  SuccessMessages represents success count of message delivery of rule.





## RuleList {#RuleList}

RuleList contains a list of Rule

<hr>

- **apiVersion**: rules.kubeedge.io/v1


- **kind**: RuleList


- **metadata** (<a href="{{< ref "../common-definitions/list-meta#ListMeta" >}}">ListMeta</a>)


- **items** ([]<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>), required






## Operations {#Operations}



<hr>






### `get` read the specified Rule

#### HTTP Request

GET /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK


### `get` read status of the specified Rule

#### HTTP Request

GET /apis/rules.kubeedge.io/v1/rules/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK


### `list` list or watch objects of kind Rule

#### HTTP Request

GET /apis/rules.kubeedge.io/v1/rules

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


200 (<a href="{{< ref "../rules-resources/rule-v1#RuleList" >}}">RuleList</a>): OK


### `create` create a Rule

#### HTTP Request

POST /apis/rules.kubeedge.io/v1/rules

#### Parameters


- **body**: <a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK

201 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): Created

202 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): Accepted


### `update` replace the specified Rule

#### HTTP Request

PUT /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: <a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK

201 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): Created


### `update` replace status of the specified Rule

#### HTTP Request

PUT /apis/rules.kubeedge.io/v1/rules/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


- **body**: <a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK

201 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): Created


### `patch` partially update the specified Rule

#### HTTP Request

PATCH /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


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


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK

201 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): Created


### `patch` partially update status of the specified Rule

#### HTTP Request

PATCH /apis/rules.kubeedge.io/v1/rules/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


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


200 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): OK

201 (<a href="{{< ref "../rules-resources/rule-v1#Rule" >}}">Rule</a>): Created


### `delete` delete a Rule

#### HTTP Request

DELETE /apis/rules.kubeedge.io/v1/rules/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the Rule


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


### `deletecollection` delete collection of Rule

#### HTTP Request

DELETE /apis/rules.kubeedge.io/v1/rules

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

