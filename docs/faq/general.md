---
title: General
sidebar_position: 2
---

## What is KubeEdge?

KubeEdge extends Kubernetes to manage containerized applications and devices at edge locations. Its cloud and edge components sync application and device metadata; EdgeCore runs on edge nodes, while CloudCore runs on the cloud side. See the [CloudCore](../architecture/cloud/cloudhub.md) and [EdgeCore](../architecture/edge/edgehub.md) pages for component details.

## What happens when an edge node loses its cloud connection?

EdgeCore keeps the last workloads it received running locally. MetaManager stores and retrieves local metadata using SQLite, and EdgeHub reconnects to CloudHub when the connection returns. Changes that require the cloud API are unavailable while disconnected. See the [MetaManager](../architecture/edge/metamanager.md) and [EdgeHub](../architecture/edge/edgehub.md) pages for details.

## What can KubeEdge be used for?

KubeEdge supports applications that need to run near their data source, including telemetry processing, analytics, and machine-learning workloads. It also provides Kubernetes-native device management through DeviceModel and Device resources. Actual use depends on the workload, device mapper, network, and edge hardware.

## What hardware and operating systems are supported?

Choose a release package that matches the operating system and CPU architecture of your machine. The [binary installation guide](../setup/install-with-binary.md) lists the published packages. KubeEdge does not specify one universal RAM or disk requirement for every workload, so size the node for its containers, runtime, and local data.

## How do I check which KubeEdge version is running?

For a binary installation, run `cloudcore --version` on the cloud host or `edgecore --version` on the edge host. For a container installation, inspect the image tag used by the CloudCore deployment. Keep CloudCore and EdgeCore on versions supported by the [KubeEdge release policy](../community/release.md).
