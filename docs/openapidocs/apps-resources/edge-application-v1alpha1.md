---
api_metadata:
  apiVersion: "apps.kubeedge.io/v1alpha1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/apps/v1alpha1"
  kind: "EdgeApplication"
content_type: "api_reference"
description: "EdgeApplication is the Schema for the edgeapplications API."
title: "EdgeApplication v1alpha1"
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

`apiVersion: apps.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/apps/v1alpha1"`


## EdgeApplication {#EdgeApplication}

EdgeApplication is the Schema for the edgeapplications API

<hr>

- **apiVersion**: apps.kubeedge.io/v1alpha1


- **kind**: EdgeApplication


- **metadata** (<a href="{{< ref "../common-definitions/object-meta#ObjectMeta" >}}">ObjectMeta</a>)


- **spec** (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplicationSpec" >}}">EdgeApplicationSpec</a>)

  Spec represents the desired behavior of EdgeApplication.

- **status** (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplicationStatus" >}}">EdgeApplicationStatus</a>)

  Status represents the status of PropagationStatus.





## EdgeApplicationSpec {#EdgeApplicationSpec}

EdgeApplicationSpec defines the desired state of EdgeApplication

<hr>

- **workloadScope** (WorkloadScope), required

  WorkloadScope represents which node groups the workload will be deployed in.

  <a name="WorkloadScope"></a>
  *WorkloadScope represents which node groups the workload should be deployed in.*

  - **workloadScope.targetNodeGroups** ([]TargetNodeGroup)

    TargetNodeGroups represents the target node groups of workload to be deployed.

    <a name="TargetNodeGroup"></a>
    *TargetNodeGroup represents the target node group of workload to be deployed, including override rules to apply for this node group.*

    - **workloadScope.targetNodeGroups.name** (string), required

      Name represents the name of target node group

    - **workloadScope.targetNodeGroups.overriders** (Overriders)

      Overriders represents the override rules that would apply on workload.

      <a name="Overriders"></a>
      *Overriders represents the override rules that would apply on resources.*

      - **workloadScope.targetNodeGroups.overriders.argsOverriders** ([]CommandArgsOverrider)

        ArgsOverriders represents the rules dedicated to handling container args

        <a name="CommandArgsOverrider"></a>
        *CommandArgsOverrider represents the rules dedicated to handling command/args overrides.*

        - **workloadScope.targetNodeGroups.overriders.argsOverriders.containerName** (string), required

          The name of container

        - **workloadScope.targetNodeGroups.overriders.argsOverriders.operator** (string), required

          Operator represents the operator which will apply on the command/args.

        - **workloadScope.targetNodeGroups.overriders.argsOverriders.value** ([]string)

          Value to be applied to command/args. Items in Value which will be appended after command/args when Operator is 'add'. Items in Value which match in command/args will be deleted when Operator is 'remove'. If Value is empty, then the command/args will remain the same.

      - **workloadScope.targetNodeGroups.overriders.commandOverriders** ([]CommandArgsOverrider)

        CommandOverriders represents the rules dedicated to handling container command

        <a name="CommandArgsOverrider"></a>
        *CommandArgsOverrider represents the rules dedicated to handling command/args overrides.*

        - **workloadScope.targetNodeGroups.overriders.commandOverriders.containerName** (string), required

          The name of container

        - **workloadScope.targetNodeGroups.overriders.commandOverriders.operator** (string), required

          Operator represents the operator which will apply on the command/args.

        - **workloadScope.targetNodeGroups.overriders.commandOverriders.value** ([]string)

          Value to be applied to command/args. Items in Value which will be appended after command/args when Operator is 'add'. Items in Value which match in command/args will be deleted when Operator is 'remove'. If Value is empty, then the command/args will remain the same.

      - **workloadScope.targetNodeGroups.overriders.envOverriders** ([]EnvOverrider)

        EnvOverriders will override the env field of the container

        <a name="EnvOverrider"></a>
        *EnvOverrider represents the rules dedicated to handling env overrides.*

        - **workloadScope.targetNodeGroups.overriders.envOverriders.containerName** (string), required

          The name of container

        - **workloadScope.targetNodeGroups.overriders.envOverriders.operator** (string), required

          Operator represents the operator which will apply on the env.

        - **workloadScope.targetNodeGroups.overriders.envOverriders.value** ([]EnvVar)

          Value to be applied to env. Must not be empty when operator is 'add' or 'replace'. When the operator is 'remove', the matched value in env will be deleted and only the name of the value will be matched. If Value is empty, then the env will remain the same.

          <a name="EnvVar"></a>
          *EnvVar represents an environment variable present in a Container.*

          - **workloadScope.targetNodeGroups.overriders.envOverriders.value.name** (string), required

            Name of the environment variable. Must be a C_IDENTIFIER.

          - **workloadScope.targetNodeGroups.overriders.envOverriders.value.value** (string)

            Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".

          - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom** (EnvVarSource)

            Source for the environment variable's value. Cannot be used if value is not empty.

            <a name="EnvVarSource"></a>
            *EnvVarSource represents a source for the value of an EnvVar.*

            - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.configMapKeyRef** (ConfigMapKeySelector)

              Selects a key of a ConfigMap.

              <a name="ConfigMapKeySelector"></a>
              *Selects a key from a ConfigMap.*

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.configMapKeyRef.key** (string), required

                The key to select.

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.configMapKeyRef.name** (string)

                Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.configMapKeyRef.optional** (boolean)

                Specify whether the ConfigMap or its key must be defined

            - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.fieldRef** (ObjectFieldSelector)

              Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['\<KEY>']`, `metadata.annotations['\<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.

              <a name="ObjectFieldSelector"></a>
              *ObjectFieldSelector selects an APIVersioned field of an object.*

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.fieldRef.fieldPath** (string), required

                Path of the field to select in the specified API version.

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.fieldRef.apiVersion** (string)

                Version of the schema the FieldPath is written in terms of, defaults to "v1".

            - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.resourceFieldRef** (ResourceFieldSelector)

              Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.

              <a name="ResourceFieldSelector"></a>
              *ResourceFieldSelector represents container resources (cpu, memory) and their output format*

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.resourceFieldRef.resource** (string), required

                Required: resource to select

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.resourceFieldRef.containerName** (string)

                Container name: required for volumes, optional for env vars

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.resourceFieldRef.divisor** (<a href="{{< ref "../common-definitions/quantity#Quantity" >}}">Quantity</a>)

                Specifies the output format of the exposed resources, defaults to "1"

            - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.secretKeyRef** (SecretKeySelector)

              Selects a key of a secret in the pod's namespace

              <a name="SecretKeySelector"></a>
              *SecretKeySelector selects a key of a Secret.*

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.secretKeyRef.key** (string), required

                The key of the secret to select from.  Must be a valid secret key.

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.secretKeyRef.name** (string)

                Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.secretKeyRef.optional** (boolean)

                Specify whether the Secret or its key must be defined

      - **workloadScope.targetNodeGroups.overriders.imageOverriders** ([]ImageOverrider)

        ImageOverriders represents the rules dedicated to handling image overrides.

        <a name="ImageOverrider"></a>
        *ImageOverrider represents the rules dedicated to handling image overrides.*

        - **workloadScope.targetNodeGroups.overriders.imageOverriders.component** (string), required

          Component is part of image name. Basically we presume an image can be made of '[registry/]repository[:tag]'. The registry could be: - k8s.gcr.io - fictional.registry.example:10443 The repository could be: - kube-apiserver - fictional/nginx The tag cloud be: - latest - v1.19.1 - @sha256:dbcc1c35ac38df41fd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c

        - **workloadScope.targetNodeGroups.overriders.imageOverriders.operator** (string), required

          Operator represents the operator which will apply on the image.

        - **workloadScope.targetNodeGroups.overriders.imageOverriders.predicate** (ImagePredicate)

          Predicate filters images before applying the rule.
          
          Defaults to nil, in that case, the system will automatically detect image fields if the resource type is Pod, ReplicaSet, Deployment or StatefulSet by following rule:
            - Pod: /spec/containers/\<N>/image
            - ReplicaSet: /spec/template/spec/containers/\<N>/image
            - Deployment: /spec/template/spec/containers/\<N>/image
            - StatefulSet: /spec/template/spec/containers/\<N>/image
          In addition, all images will be processed if the resource object has more than one containers.
          
          If not nil, only images matches the filters will be processed.

          <a name="ImagePredicate"></a>
          *ImagePredicate describes images filter.*

          - **workloadScope.targetNodeGroups.overriders.imageOverriders.predicate.path** (string), required

            Path indicates the path of target field

        - **workloadScope.targetNodeGroups.overriders.imageOverriders.value** (string)

          Value to be applied to image. Must not be empty when operator is 'add' or 'replace'. Defaults to empty and ignored when operator is 'remove'.

      - **workloadScope.targetNodeGroups.overriders.replicas** (int32)

        Replicas will override the replicas field of deployment

      - **workloadScope.targetNodeGroups.overriders.resourcesOverriders** ([]ResourcesOverrider)

        ResourcesOverriders will override the resources field of the container

        <a name="ResourcesOverrider"></a>
        *ResourcesOverrider represents the rules dedicated to handling resources overrides.*

        - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.containerName** (string), required

          The name of container

        - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value** (ResourceRequirements)

          Value to be applied to resources. Must not be empty

          <a name="ResourceRequirements"></a>
          *ResourceRequirements describes the compute resource requirements.*

          - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value.claims** ([]ResourceClaim)

            *Map: unique values on key name will be kept during a merge*
            
            Claims lists the names of resources, defined in spec.resourceClaims, that are used by this container.
            
            This is an alpha field and requires enabling the DynamicResourceAllocation feature gate.
            
            This field is immutable. It can only be set for containers.

            <a name="ResourceClaim"></a>
            *ResourceClaim references one entry in PodSpec.ResourceClaims.*

            - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value.claims.name** (string), required

              Name must match the name of one entry in pod.spec.resourceClaims of the Pod where this field is used. It makes that resource available inside a container.

          - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value.limits** (map[string]<a href="{{< ref "../common-definitions/quantity#Quantity" >}}">Quantity</a>)

            Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

          - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value.requests** (map[string]<a href="{{< ref "../common-definitions/quantity#Quantity" >}}">Quantity</a>)

            Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

- **workloadTemplate** (ResourceTemplate)

  WorkloadTemplate contains original templates of resources to be deployed as an EdgeApplication.

  <a name="ResourceTemplate"></a>
  *ResourceTemplate represents original templates of resources to be deployed as an EdgeApplication.*

  - **workloadTemplate.manifests** ([]Manifest)

    Manifests represent a list of Kubernetes resources to be deployed on the managed node groups.

    <a name="Manifest"></a>
    *Manifest represents a resource to be deployed on managed node groups.*





## EdgeApplicationStatus {#EdgeApplicationStatus}

EdgeApplicationStatus defines the observed state of EdgeApplication

<hr>

- **workloadStatus** ([]ManifestStatus)

  WorkloadStatus contains running statuses of generated resources.

  <a name="ManifestStatus"></a>
  *ManifestStatus contains running status of a specific manifest in spec.*

  - **workloadStatus.identifier** (ResourceIdentifier), required

    Identifier represents the identity of a resource linking to manifests in spec.

    <a name="ResourceIdentifier"></a>
    *ResourceIdentifier provides the identifiers needed to interact with any arbitrary object.*

    - **workloadStatus.identifier.ordinal** (int32), required

      Ordinal represents an index in manifests list, so the condition can still be linked to a manifest even though manifest cannot be parsed successfully.

    - **workloadStatus.identifier.group** (string)

      Group is the group of the resource.

    - **workloadStatus.identifier.kind** (string)

      Kind is the kind of the resource.

    - **workloadStatus.identifier.name** (string)

      Name is the name of the resource

    - **workloadStatus.identifier.namespace** (string)

      Namespace is the namespace of the resource

    - **workloadStatus.identifier.resource** (string)

      Resource is the resource type of the resource

    - **workloadStatus.identifier.version** (string)

      Version is the version of the resource.

  - **workloadStatus.conditions** (string)

    Conditions contain the different condition statuses for this manifest. Valid condition types are: 1. Processing: this workload is under processing and the current state of manifest does not match the desired. 2. Available: the current status of this workload matches the desired.





## EdgeApplicationList {#EdgeApplicationList}

EdgeApplicationList contains a list of EdgeApplication

<hr>

- **apiVersion**: apps.kubeedge.io/v1alpha1


- **kind**: EdgeApplicationList


- **metadata** (<a href="{{< ref "../common-definitions/list-meta#ListMeta" >}}">ListMeta</a>)


- **items** ([]<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>), required






## Operations {#Operations}



<hr>






### `get` read the specified EdgeApplication

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK


### `get` read status of the specified EdgeApplication

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK


### `list` list or watch objects of kind EdgeApplication

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/edgeapplications

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


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplicationList" >}}">EdgeApplicationList</a>): OK


### `create` create an EdgeApplication

#### HTTP Request

POST /apis/apps.kubeedge.io/v1alpha1/edgeapplications

#### Parameters


- **body**: <a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK

201 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): Created

202 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): Accepted


### `update` replace the specified EdgeApplication

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


- **body**: <a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK

201 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): Created


### `update` replace status of the specified EdgeApplication

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


- **body**: <a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>, required

  


- **dryRun** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#dryRun" >}}">dryRun</a>


- **fieldManager** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldManager" >}}">fieldManager</a>


- **fieldValidation** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#fieldValidation" >}}">fieldValidation</a>


- **pretty** (*in query*): string

  <a href="{{< ref "../common-parameters/common-parameters#pretty" >}}">pretty</a>



#### Response


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK

201 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): Created


### `patch` partially update the specified EdgeApplication

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


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


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK

201 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): Created


### `patch` partially update status of the specified EdgeApplication

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


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


200 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): OK

201 (<a href="{{< ref "../apps-resources/edge-application-v1alpha1#EdgeApplication" >}}">EdgeApplication</a>): Created


### `delete` delete an EdgeApplication

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the EdgeApplication


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


### `deletecollection` delete collection of EdgeApplication

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/edgeapplications

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

