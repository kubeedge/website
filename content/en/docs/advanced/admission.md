---
draft: false
linktitle: Control resources on the edge with Admission
menu:
  docs:
    parent: advanced configuration
    weight: 50
title: Control resources on the edge with Admission
toc: true
type: docs
---

KubeEdge uses [admission webhooks](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks) for KubeEdge API validation and automated configurations for resources on the edge.

We provide a tool called [admission](https://github.com/kubeedge/kubeedge/tree/master/cloud/cmd/admission) to valid the type of each property should be Int or String.

You can use it to test admission then write your own one.

## Deploy

Refer to this [doc](https://github.com/kubeedge/kubeedge/tree/master/build/admission).

## Test

We test with a failed demo at first:

```
$ cat <<EOF | kubectl apply -f -
apiVersion: devices.kubeedge.io/v1alpha2
kind: DeviceModel
metadata:
 name: test-model
 namespace: default
spec:
 properties:
  - name: it-is-a-int
    description: the type should be int, will failed to apply if set as object
    type:
     object:
      accessMode: ReadWrite
EOF
```

It would failed to apply and get following error:
```
Error from server: error when creating "STDIN": admission webhook "validatedevicemodel.kubeedge.io" denied the request: Either Int or String must be set
```

Then change `type` as `int`:

```
$ cat <<EOF | kubectl apply -f -
apiVersion: devices.kubeedge.io/v1alpha2
kind: DeviceModel
metadata:
 name: test-model
 namespace: default
spec:
 properties:
  - name: it-is-a-int
    description: the type should be int, will failed to apply if set as object
    type:
     int:
      accessMode: ReadWrite
EOF
```

It works:

```
devicemodel.devices.kubeedge.io/test-model created
```
