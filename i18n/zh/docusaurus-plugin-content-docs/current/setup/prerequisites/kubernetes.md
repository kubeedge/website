---
title: Kubernetes
sidebar_position: 2
---

KubeEdge基于原生Kubernetes基础上构建，将Kubernetes能力从云端延伸到边缘，并使其适配边缘计算的要求，比如网络不稳定性以及资源受限场景等，因此在部署KubeEdge前，请先准备好一个Kubernetes集群。


## Kubernetes 兼容性

|                        | Kubernetes 1.20 | Kubernetes 1.21 | Kubernetes 1.22 | Kubernetes 1.23 | Kubernetes 1.24 | Kubernetes 1.25 | Kubernetes 1.26 | Kubernetes 1.27 | 
|------------------------| --------------- | --------------- | --------------- | --------------- |-----------------| --------------- |-----------------| --------------- | 
| KubeEdge 1.12          | ✓               | ✓               | ✓               | -               | -               | -               | -               | -               | 
| KubeEdge 1.13          | +               | ✓               | ✓               | ✓               | -               | -               | -               | -               | 
| KubeEdge 1.14          | +               | +               | ✓               | ✓               | ✓               | -               | -               | -               | 
| KubeEdge 1.15          | +               | +               | +               | +               | ✓               | ✓               | ✓               | -               | 
| KubeEdge 1.16          | +               | +               | +               | +               | +               | ✓               | ✓               | ✓               |

Key:
* `✓` KubeEdge 和 Kubernetes 版本完全兼容。
* `+` KubeEdge 具有 Kubernetes 版本中可能不存在的功能或 API 。
* `-` Kubernetes 版本具有 KubeEdge 无法使用的功能或 API 。
