---
draft: false
linktitle: Integrate third party storage with CSI
menu:
  docs:
    parent: advanced configuration 
    weight: 20
title: Integrate third party storage with CSI
toc: true
type: docs
---
Consider use case at edge side, we only support following volume types, all of those are same as Kubernetes:

- [configMap](https://kubernetes.io/docs/concepts/storage/volumes/#configmap)
- [csi](https://kubernetes.io/docs/concepts/storage/volumes/#csi)
- [downwardApi](https://kubernetes.io/docs/concepts/storage/volumes/#downwardapi)
- [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir)
- [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath)
- [projected](https://kubernetes.io/docs/concepts/storage/volumes/#projected)
- [secret](https://kubernetes.io/docs/concepts/storage/volumes/#secret)

If you want to want more volume types support, please file an issue and comment use case, we will support it if necessary.


Here we introduce how to integrate third party storage with CSI in KubeEdge.
