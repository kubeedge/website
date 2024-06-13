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


- **metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))


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

      - **spec.accessClusterRoleBinding.clusterRoleBinding.metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))

        Standard object's metadata.

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

      - **spec.accessRoleBinding.roleBinding.metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))

        Standard object's metadata.

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

    - **spec.serviceAccount.metadata** ([ObjectMeta](../Common%20Definitions/object-meta#objectmeta))

      Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

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


- **metadata** ([ListMeta](../Common%20Definitions/list-meta#listmeta))


- **items** ([][ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)), required






## Operations 



<hr/>






### `get` read the specified ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK


### `get` read status of the specified ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK


### `list` list or watch objects of kind ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


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


200 ([ServiceAccountAccessList](/service-account-access-v1alpha1#serviceaccountaccesslist)): OK


### `list` list or watch objects of kind ServiceAccountAccess

#### HTTP Request

GET /apis/policy.kubeedge.io/v1alpha1/serviceaccountaccesses

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


200 ([ServiceAccountAccessList](/service-account-access-v1alpha1#serviceaccountaccesslist)): OK


### `create` create a ServiceAccountAccess

#### HTTP Request

POST /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): Created

202 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): Accepted


### `update` replace the specified ServiceAccountAccess

#### HTTP Request

PUT /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): Created


### `update` replace status of the specified ServiceAccountAccess

#### HTTP Request

PUT /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


- **body**: [ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess), required

  


- **dryRun** (*in query*): string

  [dryRun](../Common%20Parameter/common-parameters#dryrun)


- **fieldManager** (*in query*): string

  [fieldManager](../Common%20Parameter/common-parameters#fieldmanager)


- **fieldValidation** (*in query*): string

  [fieldValidation](../Common%20Parameter/common-parameters#fieldvalidation)


- **pretty** (*in query*): string

  [pretty](../Common%20Parameter/common-parameters#pretty)



#### Response


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): Created


### `patch` partially update the specified ServiceAccountAccess

#### HTTP Request

PATCH /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


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


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): Created


### `patch` partially update status of the specified ServiceAccountAccess

#### HTTP Request

PATCH /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}/status

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


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


200 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): OK

201 ([ServiceAccountAccess](/service-account-access-v1alpha1#serviceaccountaccess)): Created


### `delete` delete a ServiceAccountAccess

#### HTTP Request

DELETE /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses/{name}

#### Parameters


- **name** (*in path*): string, required

  name of the ServiceAccountAccess


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


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


### `deletecollection` delete collection of ServiceAccountAccess

#### HTTP Request

DELETE /apis/policy.kubeedge.io/v1alpha1/namespaces/{namespace}/serviceaccountaccesses

#### Parameters


- **namespace** (*in path*): string, required

  [namespace](../Common%20Parameter/common-parameters#namespace)


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

