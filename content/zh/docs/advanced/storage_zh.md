---
draft: false
linktitle: 通过CSI集成第三方存储
menu:
  docs:
    parent: 高级配置
    weight: 20
title: 通过CSI集成第三方存储
toc: true
type: docs
---
考虑边缘侧的使用场景，我们仅支持以下与Kubernetes相同的卷类型：

- [configMap](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#configmap)
- [csi](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#csi)
- [downwardApi](https://kubernetes.iozh-cn//docs/concepts/storage/volumes/#downwardapi)
- [emptyDir](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#emptydir)
- [hostPath](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#hostpath)
- [projected](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#projected)
- [secret](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/#secret)

如果您想要支持更多卷类型，请提出Issue或对使用场景发表评论，
如有必要，我们会提供相应支持。

此处介绍如何在KubeEdge中通过CSI集成第三方存储。
