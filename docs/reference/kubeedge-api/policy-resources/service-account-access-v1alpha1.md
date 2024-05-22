---
api_metadata:
  apiVersion: "policy.kubeedge.io/v1alpha1"
  import: "github.com/kubeedge/kubeedge/pkg/apis/policy/v1alpha1"
  kind: "ServiceAccountAccess"
content_type: "api_reference"
description: "ServiceAccountAccess is the Schema for the ServiceAccountAccess API."
title: "ServiceAccountAccess v1alpha1"
weight: 1
auto_generated: true
---

[//]: # (The file is auto-generated from the Go source code of the component using a generic generator,)
[//]: # (which is forked from [reference-docs](https://github.com/kubernetes-sigs/reference-docs.)
[//]: # (To update the reference content, please follow the `reference-api.sh`.)

`apiVersion: policy.kubeedge.io/v1alpha1`

`import "github.com/kubeedge/kubeedge/pkg/apis/policy/v1alpha1"`

## ServiceAccountAccess 

ServiceAccountAccess is the Schema for the ServiceAccountAccess API

<hr/>

- **apiVersion**: policy.kubeedge.io/v1alpha1

- **kind**: ServiceAccountAccess

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

- **spec** (AccessSpec)

  Spec represents the specification of rbac.

  <a name="AccessSpec"></a>

  *AccessSpec defines the desired state of AccessSpec*

  - **spec.accessClusterRoleBinding** ([]AccessClusterRoleBinding)

    AccessClusterRoleBinding represents rbac ClusterRoleBinding plus detailed ClusterRole info.

    <a name="AccessClusterRoleBinding"></a>

    *AccessClusterRoleBinding represents rbac ClusterRoleBinding plus detailed ClusterRole info.*

    - **spec.accessClusterRoleBinding.clusterRoleBinding** (ClusterRoleBinding)

      ClusterRoleBinding represents rbac ClusterRoleBinding.

      <a name="ClusterRoleBinding"></a>

      *ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole in the global namespace, and adds who information via Subject.*

      - **spec.accessClusterRoleBinding.clusterRoleBinding.roleRef** (RoleRef), required

        RoleRef can only reference a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error. This field is immutable.

        <a name="RoleRef"></a>

        *RoleRef contains information that points to the role being used*

        - **spec.accessClusterRoleBinding.clusterRoleBinding.roleRef.apiGroup** (string), required

          APIGroup is the group for the resource being referenced

        - **spec.accessClusterRoleBinding.clusterRoleBinding.roleRef.kind** (string), required

          Kind is the type of resource being referenced

        - **spec.accessClusterRoleBinding.clusterRoleBinding.roleRef.name** (string), required

          Name is the name of resource being referenced

      - **spec.accessClusterRoleBinding.clusterRoleBinding.apiVersion** (string)

        APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

      - **spec.accessClusterRoleBinding.clusterRoleBinding.kind** (string)

        Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

      - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata** (ObjectMeta)

        Standard object's metadata.

        <a name="ObjectMeta"></a>

        *ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.*

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.annotations** (map[string]string)

          Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.creationTimestamp** (Time)

          CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
          
          Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

          <a name="Time"></a>

          *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.deletionGracePeriodSeconds** (int64)

          Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.deletionTimestamp** (Time)

          DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
          
          Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

          <a name="Time"></a>

          *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.finalizers** ([]string)

          Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.generateName** (string)

          GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
          
          If this field is specified and the generated name exists, the server will return a 409.
          
          Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.generation** (int64)

          A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.labels** (map[string]string)

          Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields** ([]ManagedFieldsEntry)

          ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.

          <a name="ManagedFieldsEntry"></a>

          *ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.*

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.apiVersion** (string)

            APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.fieldsType** (string)

            FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.fieldsV1** (FieldsV1)

            FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.

            <a name="FieldsV1"></a>

            *FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
            
            Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:&lt;name&gt;', where &lt;name&gt; is the name of a field in a struct, or key in a map 'v:&lt;value&gt;', where &lt;value&gt; is the exact json formatted value of a list item 'i:&lt;index&gt;', where &lt;index&gt; is position of a item in a list 'k:&lt;keys&gt;', where &lt;keys&gt; is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
            
            The exact format is defined in sigs.k8s.io/structured-merge-diff*

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.manager** (string)

            Manager is an identifier of the workflow managing these fields.

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.operation** (string)

            Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.subresource** (string)

            Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.managedFields.time** (Time)

            Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.

            <a name="Time"></a>

            *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.name** (string)

          Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.namespace** (string)

          Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
          
          Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences** ([]OwnerReference)

          *Patch strategy: merge on key `uid`*
          
          List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.

          <a name="OwnerReference"></a>

          *OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.*

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences.apiVersion** (string), required

            API version of the referent.

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences.kind** (string), required

            Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences.name** (string), required

            Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences.uid** (string), required

            UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences.blockOwnerDeletion** (boolean)

            If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.

          - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.ownerReferences.controller** (boolean)

            If true, this reference points to the managing controller.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.resourceVersion** (string)

          An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
          
          Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.selfLink** (string)

          Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata.uid** (string)

          UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
          
          Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

      - **spec.accessClusterRoleBinding.clusterRoleBinding.subjects** ([]Subject)

        Subjects holds references to the objects the role applies to.

        <a name="Subject"></a>

        *Subject contains a reference to the object or user identities a role binding applies to.  This can either hold a direct API object reference, or a value for non-objects such as user and group names.*

        - **spec.accessClusterRoleBinding.clusterRoleBinding.subjects.kind** (string), required

          Kind of object being referenced. Values defined by this API group are "User", "Group", and "ServiceAccount". If the Authorizer does not recognized the kind value, the Authorizer should report an error.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.subjects.name** (string), required

          Name of the object being referenced.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.subjects.apiGroup** (string)

          APIGroup holds the API group of the referenced subject. Defaults to "" for ServiceAccount subjects. Defaults to "rbac.authorization.k8s.io" for User and Group subjects.

        - **spec.accessClusterRoleBinding.clusterRoleBinding.subjects.namespace** (string)

          Namespace of the referenced object.  If the object kind is non-namespace, such as "User" or "Group", and this value is not empty the Authorizer should report an error.

    - **spec.accessClusterRoleBinding.rules** ([]PolicyRule)

      Rules contains role rules.

      <a name="PolicyRule"></a>

      *PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.*

      - **spec.accessClusterRoleBinding.rules.verbs** ([]string), required

        Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.

      - **spec.accessClusterRoleBinding.rules.apiGroups** ([]string)

        APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. "" represents the core API group and "*" represents all API groups.

      - **spec.accessClusterRoleBinding.rules.nonResourceURLs** ([]string)

        NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.

      - **spec.accessClusterRoleBinding.rules.resourceNames** ([]string)

        ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.

      - **spec.accessClusterRoleBinding.rules.resources** ([]string)

        Resources is a list of resources this rule applies to. '*' represents all resources.

  - **spec.accessRoleBinding** ([]AccessRoleBinding)

    AccessRoleBinding represents rbac rolebinding plus detailed role info.

    <a name="AccessRoleBinding"></a>

    *AccessRoleBinding represents rbac rolebinding plus detailed role info.*

    - **spec.accessRoleBinding.roleBinding** (RoleBinding)

      RoleBinding represents rbac rolebinding.

      <a name="RoleBinding"></a>

      *RoleBinding references a role, but does not contain it.  It can reference a Role in the same namespace or a ClusterRole in the global namespace. It adds who information via Subjects and namespace information by which namespace it exists in.  RoleBindings in a given namespace only have effect in that namespace.*

      - **spec.accessRoleBinding.roleBinding.roleRef** (RoleRef), required

        RoleRef can reference a Role in the current namespace or a ClusterRole in the global namespace. If the RoleRef cannot be resolved, the Authorizer must return an error. This field is immutable.

        <a name="RoleRef"></a>

        *RoleRef contains information that points to the role being used*

        - **spec.accessRoleBinding.roleBinding.roleRef.apiGroup** (string), required

          APIGroup is the group for the resource being referenced

        - **spec.accessRoleBinding.roleBinding.roleRef.kind** (string), required

          Kind is the type of resource being referenced

        - **spec.accessRoleBinding.roleBinding.roleRef.name** (string), required

          Name is the name of resource being referenced

      - **spec.accessRoleBinding.roleBinding.apiVersion** (string)

        APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

      - **spec.accessRoleBinding.roleBinding.kind** (string)

        Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

      - **spec.accessRoleBinding.roleBinding.metadata** (ObjectMeta)

        Standard object's metadata.

        <a name="ObjectMeta"></a>

        *ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.*

        - **spec.accessRoleBinding.roleBinding.metadata.annotations** (map[string]string)

          Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations

        - **spec.accessRoleBinding.roleBinding.metadata.creationTimestamp** (Time)

          CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
          
          Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

          <a name="Time"></a>

          *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

        - **spec.accessRoleBinding.roleBinding.metadata.deletionGracePeriodSeconds** (int64)

          Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.

        - **spec.accessRoleBinding.roleBinding.metadata.deletionTimestamp** (Time)

          DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
          
          Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

          <a name="Time"></a>

          *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

        - **spec.accessRoleBinding.roleBinding.metadata.finalizers** ([]string)

          Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.

        - **spec.accessRoleBinding.roleBinding.metadata.generateName** (string)

          GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
          
          If this field is specified and the generated name exists, the server will return a 409.
          
          Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency

        - **spec.accessRoleBinding.roleBinding.metadata.generation** (int64)

          A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.

        - **spec.accessRoleBinding.roleBinding.metadata.labels** (map[string]string)

          Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels

        - **spec.accessRoleBinding.roleBinding.metadata.managedFields** ([]ManagedFieldsEntry)

          ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.

          <a name="ManagedFieldsEntry"></a>

          *ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.*

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.apiVersion** (string)

            APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.fieldsType** (string)

            FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.fieldsV1** (FieldsV1)

            FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.

            <a name="FieldsV1"></a>

            *FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
            
            Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:&lt;name&gt;', where &lt;name&gt; is the name of a field in a struct, or key in a map 'v:&lt;value&gt;', where &lt;value&gt; is the exact json formatted value of a list item 'i:&lt;index&gt;', where &lt;index&gt; is position of a item in a list 'k:&lt;keys&gt;', where &lt;keys&gt; is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
            
            The exact format is defined in sigs.k8s.io/structured-merge-diff*

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.manager** (string)

            Manager is an identifier of the workflow managing these fields.

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.operation** (string)

            Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.subresource** (string)

            Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.

          - **spec.accessRoleBinding.roleBinding.metadata.managedFields.time** (Time)

            Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.

            <a name="Time"></a>

            *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

        - **spec.accessRoleBinding.roleBinding.metadata.name** (string)

          Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

        - **spec.accessRoleBinding.roleBinding.metadata.namespace** (string)

          Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
          
          Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces

        - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences** ([]OwnerReference)

          *Patch strategy: merge on key `uid`*
          
          List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.

          <a name="OwnerReference"></a>

          *OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.*

          - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences.apiVersion** (string), required

            API version of the referent.

          - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences.kind** (string), required

            Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

          - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences.name** (string), required

            Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

          - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences.uid** (string), required

            UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

          - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences.blockOwnerDeletion** (boolean)

            If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.

          - **spec.accessRoleBinding.roleBinding.metadata.ownerReferences.controller** (boolean)

            If true, this reference points to the managing controller.

        - **spec.accessRoleBinding.roleBinding.metadata.resourceVersion** (string)

          An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
          
          Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

        - **spec.accessRoleBinding.roleBinding.metadata.selfLink** (string)

          Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

        - **spec.accessRoleBinding.roleBinding.metadata.uid** (string)

          UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
          
          Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

      - **spec.accessRoleBinding.roleBinding.subjects** ([]Subject)

        Subjects holds references to the objects the role applies to.

        <a name="Subject"></a>

        *Subject contains a reference to the object or user identities a role binding applies to.  This can either hold a direct API object reference, or a value for non-objects such as user and group names.*

        - **spec.accessRoleBinding.roleBinding.subjects.kind** (string), required

          Kind of object being referenced. Values defined by this API group are "User", "Group", and "ServiceAccount". If the Authorizer does not recognized the kind value, the Authorizer should report an error.

        - **spec.accessRoleBinding.roleBinding.subjects.name** (string), required

          Name of the object being referenced.

        - **spec.accessRoleBinding.roleBinding.subjects.apiGroup** (string)

          APIGroup holds the API group of the referenced subject. Defaults to "" for ServiceAccount subjects. Defaults to "rbac.authorization.k8s.io" for User and Group subjects.

        - **spec.accessRoleBinding.roleBinding.subjects.namespace** (string)

          Namespace of the referenced object.  If the object kind is non-namespace, such as "User" or "Group", and this value is not empty the Authorizer should report an error.

    - **spec.accessRoleBinding.rules** ([]PolicyRule)

      Rules contains role rules.

      <a name="PolicyRule"></a>

      *PolicyRule holds information that describes a policy rule, but does not contain information about who the rule applies to or which namespace the rule applies to.*

      - **spec.accessRoleBinding.rules.verbs** ([]string), required

        Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.

      - **spec.accessRoleBinding.rules.apiGroups** ([]string)

        APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed. "" represents the core API group and "*" represents all API groups.

      - **spec.accessRoleBinding.rules.nonResourceURLs** ([]string)

        NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.

      - **spec.accessRoleBinding.rules.resourceNames** ([]string)

        ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.

      - **spec.accessRoleBinding.rules.resources** ([]string)

        Resources is a list of resources this rule applies to. '*' represents all resources.

  - **spec.serviceAccount** (ServiceAccount)

    ServiceAccount is one-to-one corresponding relations with the serviceaccountaccess.

    <a name="ServiceAccount"></a>

    *ServiceAccount binds together: * a name, understood by users, and perhaps by peripheral systems, for an identity * a principal that can be authenticated and authorized * a set of secrets*

    - **spec.serviceAccount.apiVersion** (string)

      APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

    - **spec.serviceAccount.automountServiceAccountToken** (boolean)

      AutomountServiceAccountToken indicates whether pods running as this service account should have an API token automatically mounted. Can be overridden at the pod level.

    - **spec.serviceAccount.imagePullSecrets** ([]LocalObjectReference)

      ImagePullSecrets is a list of references to secrets in the same namespace to use for pulling any images in pods that reference this ServiceAccount. ImagePullSecrets are distinct from Secrets because Secrets can be mounted in the pod, but ImagePullSecrets are only accessed by the kubelet. More info: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod

      <a name="LocalObjectReference"></a>

      *LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.*

      - **spec.serviceAccount.imagePullSecrets.name** (string)

        Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

    - **spec.serviceAccount.kind** (string)

      Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

    - **spec.serviceAccount.metadata** (ObjectMeta)

      Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

      <a name="ObjectMeta"></a>

      *ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.*

      - **spec.serviceAccount.metadata.annotations** (map[string]string)

        Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations

      - **spec.serviceAccount.metadata.creationTimestamp** (Time)

        CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
        
        Populated by the system. Read-only. Null for lists. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

        <a name="Time"></a>

        *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

      - **spec.serviceAccount.metadata.deletionGracePeriodSeconds** (int64)

        Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.

      - **spec.serviceAccount.metadata.deletionTimestamp** (Time)

        DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field, once the finalizers list is empty. As long as the finalizers list contains items, deletion is blocked. Once the deletionTimestamp is set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
        
        Populated by the system when a graceful deletion is requested. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

        <a name="Time"></a>

        *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

      - **spec.serviceAccount.metadata.finalizers** ([]string)

        Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.

      - **spec.serviceAccount.metadata.generateName** (string)

        GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
        
        If this field is specified and the generated name exists, the server will return a 409.
        
        Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency

      - **spec.serviceAccount.metadata.generation** (int64)

        A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.

      - **spec.serviceAccount.metadata.labels** (map[string]string)

        Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels

      - **spec.serviceAccount.metadata.managedFields** ([]ManagedFieldsEntry)

        ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like "ci-cd". The set of fields is always in the version that the workflow used when modifying the object.

        <a name="ManagedFieldsEntry"></a>

        *ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.*

        - **spec.serviceAccount.metadata.managedFields.apiVersion** (string)

          APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.

        - **spec.serviceAccount.metadata.managedFields.fieldsType** (string)

          FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"

        - **spec.serviceAccount.metadata.managedFields.fieldsV1** (FieldsV1)

          FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.

          <a name="FieldsV1"></a>

          *FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
          
          Each key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:&lt;name&gt;', where &lt;name&gt; is the name of a field in a struct, or key in a map 'v:&lt;value&gt;', where &lt;value&gt; is the exact json formatted value of a list item 'i:&lt;index&gt;', where &lt;index&gt; is position of a item in a list 'k:&lt;keys&gt;', where &lt;keys&gt; is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.
          
          The exact format is defined in sigs.k8s.io/structured-merge-diff*

        - **spec.serviceAccount.metadata.managedFields.manager** (string)

          Manager is an identifier of the workflow managing these fields.

        - **spec.serviceAccount.metadata.managedFields.operation** (string)

          Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.

        - **spec.serviceAccount.metadata.managedFields.subresource** (string)

          Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.

        - **spec.serviceAccount.metadata.managedFields.time** (Time)

          Time is the timestamp of when the ManagedFields entry was added. The timestamp will also be updated if a field is added, the manager changes any of the owned fields value or removes a field. The timestamp does not update when a field is removed from the entry because another manager took it over.

          <a name="Time"></a>

          *Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.*

      - **spec.serviceAccount.metadata.name** (string)

        Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

      - **spec.serviceAccount.metadata.namespace** (string)

        Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
        
        Must be a DNS_LABEL. Cannot be updated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces

      - **spec.serviceAccount.metadata.ownerReferences** ([]OwnerReference)

        *Patch strategy: merge on key `uid`*
        
        List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.

        <a name="OwnerReference"></a>

        *OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.*

        - **spec.serviceAccount.metadata.ownerReferences.apiVersion** (string), required

          API version of the referent.

        - **spec.serviceAccount.metadata.ownerReferences.kind** (string), required

          Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

        - **spec.serviceAccount.metadata.ownerReferences.name** (string), required

          Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#names

        - **spec.serviceAccount.metadata.ownerReferences.uid** (string), required

          UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

        - **spec.serviceAccount.metadata.ownerReferences.blockOwnerDeletion** (boolean)

          If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.

        - **spec.serviceAccount.metadata.ownerReferences.controller** (boolean)

          If true, this reference points to the managing controller.

      - **spec.serviceAccount.metadata.resourceVersion** (string)

        An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
        
        Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

      - **spec.serviceAccount.metadata.selfLink** (string)

        Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.

      - **spec.serviceAccount.metadata.uid** (string)

        UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
        
        Populated by the system. Read-only. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names#uids

    - **spec.serviceAccount.secrets** ([]ObjectReference)

      *Patch strategy: merge on key `name`*
      
      Secrets is a list of the secrets in the same namespace that pods running using this ServiceAccount are allowed to use. Pods are only limited to this list if this service account has a "kubernetes.io/enforce-mountable-secrets" annotation set to "true". This field should not be used to find auto-generated service account token secrets for use outside of pods. Instead, tokens can be requested directly using the TokenRequest API, or service account token secrets can be manually created. More info: https://kubernetes.io/docs/concepts/configuration/secret

      <a name="ObjectReference"></a>

      *ObjectReference contains enough information to let you inspect or modify the referred object.*

      - **spec.serviceAccount.secrets.apiVersion** (string)

        API version of the referent.

      - **spec.serviceAccount.secrets.fieldPath** (string)

        If referring to a piece of an object instead of an entire object, this string should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2]. For example, if the object reference is to a container within a pod, this would take on a value like: "spec.containers[name]" (where "name" refers to the name of the container that triggered the event) or if no container name is specified "spec.containers[2]" (container with index 2 in this pod). This syntax is chosen only to have some well-defined way of referencing a part of an object.

      - **spec.serviceAccount.secrets.kind** (string)

        Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

      - **spec.serviceAccount.secrets.name** (string)

        Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names

      - **spec.serviceAccount.secrets.namespace** (string)

        Namespace of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/

      - **spec.serviceAccount.secrets.resourceVersion** (string)

        Specific resourceVersion to which this reference is made, if any. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency

      - **spec.serviceAccount.secrets.uid** (string)

        UID of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids

  - **spec.serviceAccountUid** (string)

    ServiceAccountUID is the uid of serviceaccount.

- **status** (AccessStatus)

  Status represents the node list which store the rules.

  <a name="AccessStatus"></a>

  *AccessStatus defines the observed state of ServiceAccountAccess*

  - **status.nodeList** ([]string)

    NodeList represents the node name which store the rules.

## ServiceAccountAccessList 

ServiceAccountAccessList contains a list of ServiceAccountAccess

<hr/>

- **apiVersion**: policy.kubeedge.io/v1alpha1

- **kind**: ServiceAccountAccessList

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

- **items** ([][ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)), required

## Operations 

<hr/>

### `get` read the specified ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

### `get` read status of the specified ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

### `list` list or watch objects of kind ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss

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

200 ([ServiceAccountAccessList](../policy-resources/service-account-access-v1alpha1#serviceaccountaccesslist)): OK

### `create` create a ServiceAccountAccess

#### HTTP Request

POST /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss

#### Parameters

- **body**: [ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): Created

202 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): Accepted

### `update` replace the specified ServiceAccountAccess

#### HTTP Request

PUT /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

- **body**: [ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): Created

### `update` replace status of the specified ServiceAccountAccess

#### HTTP Request

PUT /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

- **body**: [ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess), required

  

- **dryRun** (*in query*): string

  [dryRun](../common-parameter/common-parameters#dryrun)

- **fieldManager** (*in query*): string

  [fieldManager](../common-parameter/common-parameters#fieldmanager)

- **fieldValidation** (*in query*): string

  [fieldValidation](../common-parameter/common-parameters#fieldvalidation)

- **pretty** (*in query*): string

  [pretty](../common-parameter/common-parameters#pretty)

#### Response

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): Created

### `patch` partially update the specified ServiceAccountAccess

#### HTTP Request

PATCH /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

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

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): Created

### `patch` partially update status of the specified ServiceAccountAccess

#### HTTP Request

PATCH /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}/status

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

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

200 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](../policy-resources/service-account-access-v1alpha1#serviceaccountaccess)): Created

### `delete` delete a ServiceAccountAccess

#### HTTP Request

DELETE /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss/{name}

#### Parameters

- **name** (*in path*): string, required

  name of the ServiceAccountAccess

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

### `deletecollection` delete collection of ServiceAccountAccess

#### HTTP Request

DELETE /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesss

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

