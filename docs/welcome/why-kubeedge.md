---
title: Why KubeEdge
sidebar_position: 1
slug: /
---
**KubeEdge** is an open source system extending native containerized application orchestration and device management to hosts at the Edge. It is built upon Kubernetes and provides core infrastructure support for networking, application deployment and metadata synchronization between cloud and edge. It also supports MQTT and allows developers to author custom logic and enable resource constrained device communication at the Edge. KubeEdge consists of a cloud part and an edge part. Both edge and cloud parts are now open-sourced.

## Advantages

The advantages of KubeEdge include mainly:

* **Edge Computing**

     With business logic running at the Edge, much larger volumes of data can be secured & processed locally where the data is produced. This reduces the network bandwidth requirements and consumption between Edge and Cloud. This increases responsiveness, decreases costs, and protects customers' data privacy.

* **Simplified development**

     Developers can write regular HTTP or MQTT based applications, containerize these, and run them anywhere - either at the Edge or in the Cloud - whichever is more appropriate.

* **Kubernetes-native support**

     With KubeEdge, users can orchestrate apps, manage devices and monitor app and device status on Edge nodes just like a traditional Kubernetes cluster in the Cloud.

* **Abundant applications**

     It is easy to get and deploy existing complicated machine learning, image recognition, event processing and other high-level applications to the Edge.

## Architecture

For more details about the architecture, please refer to [Architecture](docs/architecture/index.md) for further information.

![KubeEdge Architecture](/img/kubeedge_arch.png)
