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

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: apps.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/apps/v1alpha1"`

## EdgeApplication 

EdgeApplication is the Schema for the edgeapplications API

<hr/>

- **apiVersion**: apps.kubeedge.io/v1alpha1

- **kind**: EdgeApplication

- **metadata** (ObjectMeta)

  <a name="ObjectMeta"></a>

  *ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.*

  - **metadata.annotations** (map[string]string)

    Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations

  - **metadata.creationTimestamp** (Time)

    CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
    
    Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

    <a name="Time"></a>

    *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

  - **metadata.deletionGracePeriodSeconds** (int64)

    Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.

  - **metadata.deletionTimestamp** (Time)

    DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
    
    Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

    <a name="Time"></a>

    *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

  - **metadata.finalizers** ([]string)

    Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.

  - **metadata.generateName** (string)

    GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
    
    If this field is specified and the generated name exists, the server will return a 409.
    
    Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency

  - **metadata.generation** (int64)

    A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.

  - **metadata.labels** (map[string]string)

    Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels

  - **metadata.managedFields** ([]ManagedFieldsEntry)

    ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.

    <a name="ManagedFieldsEntry"></a>

    *ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.*

    - **metadata.managedFields.apiVersion** (string)

      APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.

    - **metadata.managedFields.fieldsType** (string)

      FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"

    - **metadata.managedFields.fieldsV1** (FieldsV1)

      FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.

      <a name="FieldsV1"></a>

      *FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
      
      Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:&lt;name&gt;', where &lt;name&gt; is the name of a field in a struct, or key in a map 'v:&lt;value&gt;', where &lt;value&gt; is the exact json formatted value of a list item 'i:&lt;index&gt;', where &lt;index&gt; is position of a item in a list 'k:&lt;keys&gt;', where &lt;keys&gt; is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
      
      The exact format is defined in sigs.k8s.io/structured-merge-diff*

    - **metadata.managedFields.manager** (string)

      Manager is an identifier of the workflow managing these fields.

    - **metadata.managedFields.operation** (string)

      Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.

    - **metadata.managedFields.subresource** (string)

      Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.

    - **metadata.managedFields.time** (Time)

      Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.

      <a name="Time"></a>

      *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

  - **metadata.name** (string)

    Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

  - **metadata.namespace** (string)

    Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
    
    Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces

  - **metadata.ownerReferences** ([]OwnerReference)

    *Patch strategy: merge on key `uid`*
    
    List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.

    <a name="OwnerReference"></a>

    *OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.*

    - **metadata.ownerReferences.apiVersion** (string), required

      API version of the referent.

    - **metadata.ownerReferences.kind** (string), required

      Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

    - **metadata.ownerReferences.name** (string), required

      Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

    - **metadata.ownerReferences.uid** (string), required

      UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

    - **metadata.ownerReferences.blockOwnerDeletion** (boolean)

      If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.

    - **metadata.ownerReferences.controller** (boolean)

      If true, this reference points to the managing controller.

  - **metadata.resourceVersion** (string)

    An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
    
    Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

  - **metadata.selfLink** (string)

    Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

  - **metadata.uid** (string)

    UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
    
    Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

- **spec** ([EdgeApplicationSpec](../apps-resources/edge-application-v1alpha1#edgeapplicationspec))

  Spec represents the desired behavior of EdgeApplication.

- **status** ([EdgeApplicationStatus](../apps-resources/edge-application-v1alpha1#edgeapplicationstatus))

  Status represents the status of PropagationStatus.

## EdgeApplicationSpec 

EdgeApplicationSpec defines the desired state of EdgeApplication

<hr/>

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

              Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['&lt;KEY&gt;']`, `metadata.annotations['&lt;KEY&gt;']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.

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

              - **workloadScope.targetNodeGroups.overriders.envOverriders.value.valueFrom.resourceFieldRef.divisor** (Quantity)

                Specifies the output format of the exposed resources, defaults to "1"

                <a name="Quantity"></a>

                *Quantity is a fixed-point representation of a number. It provides convenient marshaling/unmarshaling in JSON and YAML, in addition to String() and AsInt64() accessors.
                
                The serialization format is:
                
                ``` <quantity>        ::= <signedNumber><suffix>
                
                	(Note that <suffix> may be empty, from the "" case in <decimalSI>.)
                
                <digit>           ::= 0 | 1 | ... | 9 <digits>          ::= <digit> | <digit><digits> <number>          ::= <digits> | <digits>.<digits> | <digits>. | .<digits> <sign>            ::= "+" | "-" <signedNumber>    ::= <number> | <sign><number> <suffix>          ::= <binarySI> | <decimalExponent> | <decimalSI> <binarySI>        ::= Ki | Mi | Gi | Ti | Pi | Ei
                
                	(International System of units; See: http://physics.nist.gov/cuu/Units/binary.html)
                
                <decimalSI>       ::= m | "" | k | M | G | T | P | E
                
                	(Note that 1024 = 1Ki but 1000 = 1k; I didn't choose the capitalization.)
                
                <decimalExponent> ::= "e" <signedNumber> | "E" <signedNumber> ```
                
                No matter which of the three exponent forms is used, no quantity may represent a number greater than 2^63-1 in magnitude, nor may it have more than 3 decimal places. Numbers larger or more precise will be capped or rounded up. (E.g.: 0.1m will rounded up to 1m.) This may be extended in the future if we require larger or smaller quantities.
                
                When a Quantity is parsed from a string, it will remember the type of suffix it had, and will use the same type again when it is serialized.
                
                Before serializing, Quantity will be put in "canonical form". This means that Exponent/suffix will be adjusted up or down (with a corresponding increase or decrease in Mantissa) such that:
                
                - No precision is lost - No fractional digits will be emitted - The exponent (or suffix) is as large as possible.
                
                The sign will be omitted unless the number is negative.
                
                Examples:
                
                - 1.5 will be serialized as "1500m" - 1.5Gi will be serialized as "1536Mi"
                
                Note that the quantity will NEVER be internally represented by a floating point number. That is the whole point of this exercise.
                
                Non-canonical values will still parse as long as they are well formed, but will be re-emitted in their canonical form. (So always use canonical form, or don't diff.)
                
                This format is intended to make it difficult to use these numbers without writing some sort of special handling code in the hopes that that will cause implementors to also use a fixed point implementation.*

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
            - Pod: /spec/containers/&lt;N&gt;/image
            - ReplicaSet: /spec/template/spec/containers/&lt;N&gt;/image
            - Deployment: /spec/template/spec/containers/&lt;N&gt;/image
            - StatefulSet: /spec/template/spec/containers/&lt;N&gt;/image
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

          - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value.limits** (map[string]Quantity)

            Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

            <a name="Quantity"></a>

            *Quantity is a fixed-point representation of a number. It provides convenient marshaling/unmarshaling in JSON and YAML, in addition to String() and AsInt64() accessors.
            
            The serialization format is:
            
            ``` <quantity>        ::= <signedNumber><suffix>
            
            	(Note that <suffix> may be empty, from the "" case in <decimalSI>.)
            
            <digit>           ::= 0 | 1 | ... | 9 <digits>          ::= <digit> | <digit><digits> <number>          ::= <digits> | <digits>.<digits> | <digits>. | .<digits> <sign>            ::= "+" | "-" <signedNumber>    ::= <number> | <sign><number> <suffix>          ::= <binarySI> | <decimalExponent> | <decimalSI> <binarySI>        ::= Ki | Mi | Gi | Ti | Pi | Ei
            
            	(International System of units; See: http://physics.nist.gov/cuu/Units/binary.html)
            
            <decimalSI>       ::= m | "" | k | M | G | T | P | E
            
            	(Note that 1024 = 1Ki but 1000 = 1k; I didn't choose the capitalization.)
            
            <decimalExponent> ::= "e" <signedNumber> | "E" <signedNumber> ```
            
            No matter which of the three exponent forms is used, no quantity may represent a number greater than 2^63-1 in magnitude, nor may it have more than 3 decimal places. Numbers larger or more precise will be capped or rounded up. (E.g.: 0.1m will rounded up to 1m.) This may be extended in the future if we require larger or smaller quantities.
            
            When a Quantity is parsed from a string, it will remember the type of suffix it had, and will use the same type again when it is serialized.
            
            Before serializing, Quantity will be put in "canonical form". This means that Exponent/suffix will be adjusted up or down (with a corresponding increase or decrease in Mantissa) such that:
            
            - No precision is lost - No fractional digits will be emitted - The exponent (or suffix) is as large as possible.
            
            The sign will be omitted unless the number is negative.
            
            Examples:
            
            - 1.5 will be serialized as "1500m" - 1.5Gi will be serialized as "1536Mi"
            
            Note that the quantity will NEVER be internally represented by a floating point number. That is the whole point of this exercise.
            
            Non-canonical values will still parse as long as they are well formed, but will be re-emitted in their canonical form. (So always use canonical form, or don't diff.)
            
            This format is intended to make it difficult to use these numbers without writing some sort of special handling code in the hopes that that will cause implementors to also use a fixed point implementation.*

          - **workloadScope.targetNodeGroups.overriders.resourcesOverriders.value.requests** (map[string]Quantity)

            Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. Requests cannot exceed Limits. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

            <a name="Quantity"></a>

            *Quantity is a fixed-point representation of a number. It provides convenient marshaling/unmarshaling in JSON and YAML, in addition to String() and AsInt64() accessors.
            
            The serialization format is:
            
            ``` <quantity>        ::= <signedNumber><suffix>
            
            	(Note that <suffix> may be empty, from the "" case in <decimalSI>.)
            
            <digit>           ::= 0 | 1 | ... | 9 <digits>          ::= <digit> | <digit><digits> <number>          ::= <digits> | <digits>.<digits> | <digits>. | .<digits> <sign>            ::= "+" | "-" <signedNumber>    ::= <number> | <sign><number> <suffix>          ::= <binarySI> | <decimalExponent> | <decimalSI> <binarySI>        ::= Ki | Mi | Gi | Ti | Pi | Ei
            
            	(International System of units; See: http://physics.nist.gov/cuu/Units/binary.html)
            
            <decimalSI>       ::= m | "" | k | M | G | T | P | E
            
            	(Note that 1024 = 1Ki but 1000 = 1k; I didn't choose the capitalization.)
            
            <decimalExponent> ::= "e" <signedNumber> | "E" <signedNumber> ```
            
            No matter which of the three exponent forms is used, no quantity may represent a number greater than 2^63-1 in magnitude, nor may it have more than 3 decimal places. Numbers larger or more precise will be capped or rounded up. (E.g.: 0.1m will rounded up to 1m.) This may be extended in the future if we require larger or smaller quantities.
            
            When a Quantity is parsed from a string, it will remember the type of suffix it had, and will use the same type again when it is serialized.
            
            Before serializing, Quantity will be put in "canonical form". This means that Exponent/suffix will be adjusted up or down (with a corresponding increase or decrease in Mantissa) such that:
            
            - No precision is lost - No fractional digits will be emitted - The exponent (or suffix) is as large as possible.
            
            The sign will be omitted unless the number is negative.
            
            Examples:
            
            - 1.5 will be serialized as "1500m" - 1.5Gi will be serialized as "1536Mi"
            
            Note that the quantity will NEVER be internally represented by a floating point number. That is the whole point of this exercise.
            
            Non-canonical values will still parse as long as they are well formed, but will be re-emitted in their canonical form. (So always use canonical form, or don't diff.)
            
            This format is intended to make it difficult to use these numbers without writing some sort of special handling code in the hopes that that will cause implementors to also use a fixed point implementation.*

- **workloadTemplate** (ResourceTemplate)

  WorkloadTemplate contains original templates of resources to be deployed as an EdgeApplication.

  <a name="ResourceTemplate"></a>

  *ResourceTemplate represents original templates of resources to be deployed as an EdgeApplication.*

  - **workloadTemplate.manifests** ([]Manifest)

    Manifests represent a list of Kubernetes resources to be deployed on the managed node groups.

    <a name="Manifest"></a>

    *Manifest represents a resource to be deployed on managed node groups.*

## EdgeApplicationStatus 

EdgeApplicationStatus defines the observed state of EdgeApplication

<hr/>

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

## EdgeApplicationList 

EdgeApplicationList contains a list of EdgeApplication

<hr/>

- **apiVersion**: apps.kubeedge.io/v1alpha1

- **kind**: EdgeApplicationList

- **metadata** (ListMeta)

  <a name="ListMeta"></a>

  *ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of [ObjectMeta, ListMeta].*

  - **metadata.continue** (string)

    continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.

  - **metadata.remainingItemCount** (int64)

    remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.

  - **metadata.resourceVersion** (string)

    String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

  - **metadata.selfLink** (string)

    Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

- **items** ([][EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)), required

## Operations 

<hr/>

### `get` read the specified EdgeApplication

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

### `get` read status of the specified EdgeApplication

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

### `list` list or watch objects of kind EdgeApplication

#### HTTP Request

GET /apis/apps.kubeedge.io/v1alpha1/edgeapplications

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

200 ([EdgeApplicationList](../apps-resources/edge-application-v1alpha1#edgeapplicationlist)): OK

### `create` create an EdgeApplication

#### HTTP Request

POST /apis/apps.kubeedge.io/v1alpha1/edgeapplications

#### Parameters

- **body**: [EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

201 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): Created

202 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): Accepted

### `update` replace the specified EdgeApplication

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **body**: [EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

201 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): Created

### `update` replace status of the specified EdgeApplication

#### HTTP Request

PUT /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **body**: [EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

201 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): Created

### `patch` partially update the specified EdgeApplication

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **body**: Patch, required

  

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

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

201 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): Created

### `patch` partially update status of the specified EdgeApplication

#### HTTP Request

PATCH /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **body**: Patch, required

  

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

200 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): OK

201 ([EdgeApplication](../apps-resources/edge-application-v1alpha1#edgeapplication)): Created

### `delete` delete an EdgeApplication

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/edgeapplications/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the EdgeApplication

- **body**: DeleteOptions

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **gracePeriodSeconds** (*in query*): integer

  [gracePeriodSeconds](../common-parameter/common-parameters#graceperiodseconds)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

- **propagationPolicy** (*in query*): string

  [propagationPolicy](../common-parameter/common-parameters#propagationpolicy)

#### Response

200 (Status): OK

202 (Status): Accepted

### `deletecollection` delete collection of EdgeApplication

#### HTTP Request

DELETE /apis/apps.kubeedge.io/v1alpha1/edgeapplications

#### Parameters

- **body**: DeleteOptions

  

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

200 (Status): OK

