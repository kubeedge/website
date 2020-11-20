---
authors:
- Sanil Kumar
- Jun Du
categories:
- General
- Announcements
date: 2019-03-19
draft: false
image:
  caption: KubeEdge is officially accepted in CNCF Sandbox
  focal_point: Center
lastmod: 2019-03-19
subtitle: KubeEdge was accepted into the CNCF sandbox in March 2019
summary: KubeEdge is a Kubernetes Native Edge Computing Framework. KubeEdge was accepted
  into the CNCF sandbox in March 2019
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8S edge orchestration
- edge computing platform
- cncf sandbox
- cloud native
title: 'From the K8S blog: KubeEdge - a Kubernetes Native Edge Computing Framework'
---
The **KubeEdge** team presented their case for sandboxing at the CNCF TOC meeting on 12th March 2019.  
  

## **Today we announce the acceptance of KubeEdge under the CNCF sandbox.**

{{% alert note %}}
Original Article: [Source](https://kubernetes.io/blog/2019/03/19/kubeedge-k8s-based-edge-intro/)
{{% /alert %}}
{{% alert note %}}
CNCF Sandbox page:  [CNCF Sandbox Projects](https://www.cncf.io/sandbox-projects/)  
{{% /alert %}}

{{% alert note %}}
[KubeEdge Repository](https://github.com/kubeedge/kubeedge)  | [KubeEdge Documentation](https://docs.kubeedge.io) | [Setup KubeEdge](https://docs.kubeedge.io/en/latest/setup/setup.html)
{{% /alert %}}


## **KubeEdge becomes the first Kubernetes Native Edge Computing Platform with both Edge and Cloud components open sourced!**  

Open source edge computing is going through its most dynamic phase of development in the industry. So many open source platforms, so many consolidations and so many initiatives for standardization! This shows the strong drive to build better platforms to bring cloud computing to the edges to meet ever increasing demand. KubeEdge, which was announced last year, now brings great news for cloud native computing! It provides a complete edge computing solution based on Kubernetes with separate cloud and edge core modules. Currently, both the cloud and edge modules are open sourced.

Unlike certain light weight kubernetes platforms available around, KubeEdge is made to build edge computing solutions extending the cloud. The control plane resides in cloud, though scalable and extendable. At the same time, the edge can work in offline mode. Also it is lightweight and containerized, and can support heterogeneous hardware at the edge. With the optimization in edge resource utlization, KubeEdge positions to save significant setup and operation cost for edge solutions. This makes it the most compelling edge computing platform in the world currently, based on Kubernetes!

### **_Kube(rnetes)Edge_!** - Opening up a new Kubernetes-based ecosystem for Edge Computing
The key goal for KubeEdge is extending Kubernetes ecosystem from cloud to edge. From the time it was announced to the public at KubeCon in Shanghai in November 2018, the architecture direction for KubeEdge was aligned to Kubernetes, as its name!

It started with its v0.1 providing the basic edge computing features. Now, with its latest release v0.2, it brings the cloud components to connect and complete the loop. With consistent and scalable Kubernetes-based interfaces, KubeEdge enables the orchestration and management of edge clusters similar to how Kubernetes manages in the cloud. This opens up seamless possibilities of bringing cloud computing capabilities to the edge, quickly and efficiently.

Based on its roadmap and architecture, KubeEdge tries to support all edge nodes, applications, devices and even the cluster management consistent with the Kuberenetes interface. This will help the edge cloud act exactly like a cloud cluster. This can save a lot of time and cost on the edge cloud development deployment based on KubeEdge.

KubeEdge provides a containerized edge computing platform, which is inherently scalable. As it’s modular and optimized, it is lightweight (66MB foot print and ~30MB running memory) and could be deployed on low resource devices. Similarly, the edge node can be of different hardware architecture and with different hardware configurations. For the device connectivity, it can support multiple protocols and it uses a standard MQTT-based communication. This helps in scaling the edge clusters with new nodes and devices efficiently.


## **You heard it right!**

> **KubeEdge Cloud Core modules are open sourced!**

By open sourcing both the edge and cloud modules, KubeEdge brings a complete cloud vendor agnostic lightweight heterogeneous edge computing platform. It is now ready to support building a complete Kubernetes ecosystem for edge computing, exploiting most of the existing cloud native projects or software modules. This can enable a mini-cloud at the edge to support demanding use cases like data analytics, video analytics, machine learning and more.

KubeEdge Architecture: Building Kuberenetes Native Edge computing!
The core architecture tenet for KubeEdge is to build interfaces that are consistent with Kubernetes, be it on the cloud side or edge side.

**Edged**: Manages containerized Applications at the Edge.

**EdgeHub**: Communication interface module at the Edge. It is a web socket client responsible for interacting with Cloud Service for edge computing.

**CloudHub**: Communication interface module at the Cloud. A web socket server responsible for watching changes on the cloud side, caching and sending messages to EdgeHub.

**EdgeController**: Manages the Edge nodes. It is an extended Kubernetes controller which manages edge nodes and pods metadata so that the data can be targeted to a specific edge node.

**EventBus**: Handles the internal edge communications using MQTT. It is an MQTT client to interact with MQTT servers (mosquitto), offering publish and subscribe capabilities to other components.

**DeviceTwin**: It is software mirror for devices that handles the device metadata. This module helps in handling device status and syncing the same to cloud. It also provides query interfaces for applications, as it interfaces to a lightweight database (SQLite).

**MetaManager**: It manages the metadata at the edge node. This is the message processor between edged and edgehub. It is also responsible for storing/retrieving metadata to/from a lightweight database (SQLite).

Even if you want to add more control plane modules based on the architecture refinement and improvement (for example enhanced security), it is simple as it uses consistent registration and modular communication within these modules.

{{% alert note %}}
- KubeEdge provides scalable lightweight Kubernetes Native Edge Computing Platform which can work in offline mode.


- It helps simplify edge application development and deployment.


- Cloud vendor agnostic and can run the cloud core modules on any compute node.

{{% /alert %}}


## **Release 0.1 to 0.2 – game changer!**
KubeEdge v0.1 was released at the end of December 2018 with very basic edge features to manage edge applications along with Kubernetes API primitives for node, pod, config etc. In ~2 months, KubeEdge v0.2 was release on March 5th, 2019. This release provides the cloud core modules and enables the end to end open source edge computing solution. The cloud core modules can be deployed to any compute node from any cloud vendors or on-prem.

Now, the complete edge solution can be installed and tested very easily, also with a laptop.

Run Anywhere - Simple and Light
As described, the KubeEdge Edge and Cloud core components can be deployed easily and can run the user applications. The edge core has a foot print of 66MB and just needs 30MB memory to run. Similarly the cloud core can run on any cloud nodes. (User can experience by running it on a laptop as well)

The installation is simple and can be done in few steps:

- Setup the pre-requisites Docker, Kubernetes, MQTT and openssl
- Clone and Build KubeEdge Cloud and Edge
- Run Cloud
- Run Edge
- The detailed steps for each are available at [KubeEdge Setup](https://docs.kubeedge.io/en/latest/setup/setup.html)

## **Future: Taking off with competent features and community collaboration**
KubeEdge has been developed by members from the community who are active contributors to Kubernetes/CNCF and doing research in edge computing. The KubeEdge team is also actively collaborating with Kubernetes IOT/EDGE WORKING GROUP. Within a few months of the KubeEdge announcement it has attracted members from different organizations including JingDong, Zhejiang University, SEL Lab, Eclipse, China Mobile, ARM, Intel to collaborate in building the platform and ecosystem.

KubeEdge has a clear [roadmap](https://docs.kubeedge.io/en/latest/getting-started/roadmap.html) for its upcoming major releases in 2019. v1.0 targets to provide a complete edge cluster and device management solution with standard edge to edge communication, while v2.0 targets to have advanced features like service mesh, function service , data analytics etc at edge. Also, for all the features, KubeEdge architecture would attempt to utilize the existing CNCF projects/software.

The KubeEdge community needs varied organizations, their requirements, use cases and support to build it. Please join to make a kubernetes native edge computing platform which can extend the cloud native computing paradigm to edge cloud.

## **How to Get Involved?**
We welcome more collaboration to build the Kubernetes native edge computing ecosystem. Please join us!

{{% alert note %}}
- Twitter: [https://twitter.com/KubeEdge](https://twitter.com/KubeEdge)
- Slack: [https://kubeedge.slack.com](https://kubeedge.slack.com)
- Website: [https://kubeedge.io](https://kubeedge.io)
- Documentation: [https://docs.kubeedge.io](https://docs.kubeedge.io)
- GitHub: [https://github.com/kubeedge/kubeedge](https://github.com/kubeedge/kubeedge)
- Email: [kubeedge@gmail.com](mailto:kubeedge@gmail.com)
{{% /alert %}}
