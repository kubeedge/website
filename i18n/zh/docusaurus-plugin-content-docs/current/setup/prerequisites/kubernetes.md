---
title: Kubernetes
sidebar_position: 2
---


## Kubernetes 兼容性

|                        | Kubernetes 1.20 | Kubernetes 1.21 | Kubernetes 1.22 | Kubernetes 1.23 | Kubernetes 1.24 | Kubernetes 1.25 |
|------------------------| --------------- | --------------- | --------------- | --------------- |-----------------| --------------- |
| KubeEdge 1.12          | ✓               | ✓               | ✓               | -               | -               | -               | -               |
| KubeEdge 1.13          | +               | ✓               | ✓               | ✓               | -               | -               | -               |
| KubeEdge 1.14          | +               | +               | ✓               | ✓               | ✓               | -               | -               |
| KubeEdge 1.15          | +               | +               | +               | +               | ✓               | ✓               | ✓               |

Key:
* `✓` KubeEdge 和 Kubernetes 版本完全兼容。
* `+` KubeEdge 具有 Kubernetes 版本中可能不存在的功能或 API 。
* `-` Kubernetes 版本具有 KubeEdge 无法使用的功能或 API 。