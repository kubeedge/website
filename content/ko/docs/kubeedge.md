---
date: 2019-01-28
description: Quickly get running with your kubeedge
draft: false
lastmod: 2019-01-29
linktitle: What is KubeEdge
menu:
  docs:
    parent: concepts
    weight: 1
reading_time: true
share: true
title: What is KubeEdge
toc: true
type: docs
---
## The KubeEdge mission

Our goal is to make an open platform to enable Edge computing, extending native containerized
application orchestration capabilities to hosts at Edge. which built upon kubernetes and provides
fundamental infrastructure support for network, app.deployment and metadata synchronization
between cloud and edge. It also supports `MQTT` and allows developers to author customer logic
and enable resource constraint devices communication at Edge. Kubeedge is *the open platform to enable Edge computing*.
The advantages of Kubeedge include mainly:

* **Edge Computing**

     With business logic running at Edge, volumes of data can be secured & processed locally. It reduces the bandwidth
     request between Edge and Cloud; increases the response speak; and protects customers' data privacy.

* **Simplify development**

     Developers can write regular http or mqtt based applications; containerize and run anywhere at Edge or Cloud.

* **Kubernetes-native support**

     With KubeEdge, users can orchestrate apps, manage devices and monitor app/device status against Edge nodes like
     a normal K8s cluster in the Cloud.

* **Abundant applications**

     You can easily get and deploy complicated machine learning, image recognition, event processing and other high
     level applications to your Edge side.

* **And so on**

## What is KubeEdge?

KubeEdge is an open source system for extending native containerized application
orchestration capabilities to hosts at Edge. It is built upon kubernetes and provides
fundamental infrastructure support for network, app. deployment and metadata
synchronization between cloud and edge.

## Workflow 

The basic workflow is:

* Make sure some basically tool in your Env, such as `mosquitto` and `docker`.
* Download the Kubeedge scripts and configuration files.
* Customize the configuration.
* Run `mosquitto` and `Kubeedge` binary to your chosen environment.

You adapt the configuration to choose the platforms and services that you want
to use for your environment: `certfile`, `keyfile`, and so on.

## Components
KubeEdge is composed of these components:

- **Edged:** Edged is an agent running on edge node for managing user's application.
- **[EdgeHub](/en/docs/edgehub):** EdgeHub is a web socket client, which is responsible for interacting with **Huawei Cloud IEF service**, including sync cloud side resources update, report edged side host and device status changes.
- **[EventBus](/en/docs/event-bus):** EventBus is a MQTT client to interact with MQTT server(mosquitto), offer subscribe and publish capability to other components.
- **DeviceTwin:** DeviceTwin is responsible for storing device status and syncing device status to the cloud. It also provides query interfaces for applications.
- **[MetaManager](/en/docs/meta-manager):** MetaManager is the message processor and between edged and edgehub. It's also responsible for storing/retrieving metadata to/from a lightweight database(SQLite). 

## Architecture

{{<figure library="1" src="kubeedge_arch.png" title="">}}

## Getting involved

There are many ways to contribute to Kubeedge, and we welcome contributions! 
Read the [contributor's guide](/en/docs/contributing) to get started on the 
code.
