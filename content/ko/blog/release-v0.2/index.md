---
authors:
- KubeEdge
categories:
- General
- Announcements
date: 2019-03-05
draft: false
image:
  caption: KubeEdge v0.2 is out. Try it now!
  focal_point: Center
lastmod: 2019-03-05
summary: KubeEdge is a Kubernetes Native Edge Computing Framework. KubeEdge v0.2 is
  released today.
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8S edge orchestration
- edge computing platform
- release v0.2
- v0.2
title: KubeEdge v0.2 is out now
---
**KubeEdge** is an open source system extending native containerized application orchestration and device management to hosts at the Edge. It is built upon Kubernetes and provides core infrastructure support for networking, application deployment and metadata synchronization between cloud and edge. It also supports MQTT and allows developers to author custom logic and enable resource constrained device communication at the Edge.  

## **Today we announce the v0.2 release of KubeEdge.**

{{% alert note %}}
Check out the release here:  [Release v0.2](https://github.com/kubeedge/kubeedge/releases/tag/v0.2)  
{{% /alert %}}

{{% alert note %}}
Instructions on how to setup KubeEdge can be found [here](https://github.com/kubeedge/kubeedge#usage)  
{{% /alert %}}

### Features added  
- Edge-controller which connects to Kubernetes api-server and sync node/pod status between edge and Kubernetes api-server.  
- Cloudhub which is a websocket server in cloud part of KubeEdge.
- Internal MQTT mode in which MQTT broker is started with edge_core and removes dependency on external MQTT broker.
- Integration test framework for edge. Improved edge_core unit-test coverage.

### Known issues  
- We do not have any e2e tests yet.  
- Unit tests coverage should be improved for cloud part.

### Features Work In Progress (Future release)  
- Describe device API via CRD.
- Edge to Edge Communication.
- Different Protocol support for KubeEdge like BLE, Zigbee,etc
