---
title: Kubernetes
sidebar_position: 2
---

Kubernetes acts as a foundation for KubeEdge, which extends Kubernetes' capabilities to edge computing. KubeEdge leverages the core functionalities of Kubernetes, enabling it to manage workloads not just in a centralized cloud environment, but also across various edge locations. This extension includes adapting Kubernetes to the unique requirements of edge computing, such as network unreliability and resource constraints.

In summary, while a deep understanding of Kubernetes is highly beneficial for working with KubeEdge, it's also necessary to have a Kubernetes control plane in place. This control plane is crucial for KubeEdge to function, as it extends the native Kubernetes capabilities to edge devices, allowing them to run, orchestrate, and manage workloads in edge environments.

## Kubernetes compatibility

|                        | Kubernetes 1.20 | Kubernetes 1.21 | Kubernetes 1.22 | Kubernetes 1.23 | Kubernetes 1.24 |
|------------------------| --------------- | --------------- | --------------- | --------------- |-----------------|
| KubeEdge 1.12          | ✓               | ✓               | ✓               | -               | -               |
| KubeEdge 1.13          | +               | ✓               | ✓               | ✓               | -               |
| KubeEdge 1.14          | +               | +               | ✓               | ✓               | ✓               |



Key:
* `✓` KubeEdge and the Kubernetes version are exactly compatible.
* `+` KubeEdge has features or API objects that may not be present in the Kubernetes version.
* `-` The Kubernetes version has features or API objects that KubeEdge can't use.