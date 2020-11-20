---
authors:
- Kevin Wang
- Fei Xu
categories:
- General
- Announcements
date: 2020-08-15
draft: false
lastmod: 2020-08-15
summary: KubeEdge v1.4 is live!
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8s edge orchestration
- edge computing platform
- cloud native
- iot
- iiot
- release v1.4
- v1.4
title: KubeEdge v1.4 is live!
---
**KubeEdge** is an open source system extending native containerized application orchestration and device management to hosts at the Edge. It is built upon Kubernetes and provides core infrastructure support for networking, application deployment and metadata synchronization between cloud and edge. It also supports MQTT and allows developers to author custom logic and enable resource constrained device communication at the Edge.  

## **KubeEdge v1.4: A major upgrade for maintainability and edge devices management**

On August 15th, the KubeEdge community is proud to announce the availability of KubeEdge 1.4. This release includes a major upgrade for maintainability and edge devices management, which includes:

- Enhance Devices Management

- Metrics-Server Support for metrics collection across cloud and edge

- EdgeNode Certificate Rotation

- Kubernetes Dependencies Upgrade

- 34+ bug fixes and enhancements.

Please refer to https://github.com/kubeedge/kubeedge/blob/master/CHANGELOG/CHANGELOG-1.4.md for a full list of features in this release

{{% alert note %}}
Release details - [Release v1.4](https://github.com/kubeedge/kubeedge/releases/tag/v1.4.0)
{{% /alert %}}

{{% alert note %}}
How to set up KubeEdge - [https://github.com/kubeedge/kubeedge - usage](https://github.com/kubeedge/kubeedge#usage)
{{% /alert %}}

## **Release Highlights**

### Enhance Devices Management

Upgrade device API from v1alpha1 to v1alpha2, enhancement include:

- A new field is added to explicitly provide customized protocol support
- Introduced data section to allow users defining data to get and process on the edge
- Moved propertyVistors from device model to Device instance API

Users are now able to customize the protocol of the edge device and also able to get and process the date in edge side.

### Metrics-Server Support for metrics collection across cloud and edge

With KubeEdge v1.4 users are now able to deploy metrics-server to collect resource metrics from edge nodes. Follow the instructions here to deploy the metrics-server.

Ref: https://github.com/kubeedge/kubeedge/blob/master/docs/setup/keadm.md#support-metrics-server-in-cloud

### EdgeNode Certificate Rotation

EdgeNodes are now able to automatically apply for new certificate when the certificate is about to expire and enforce TLS between CloudCore and EdgeCore.

### Kubernetes Dependencies Upgrade

Upgrade the venderod kubernetes version to v1.18.6, users now can use the feature of new version on the cloud and on the edge side. 

### 34+ bug fixes and enhancements

In addition to the above new features, KubeEdge v1.4 also includes the following enhancements:

- Add tree to store copy of dependency's license

- Add garbage collection of reliablesyncs when node unregisters

- Fix too long time to get node ready when reconnect 

- Auto detect sandbox image

- Run edgecore as system service

## **Future Outlook**

With the release of v1.4, KubeEdge provides more complete edge application monitoring and management capabilities, a more stable and reliable cloud-side collaborative transmission mechanism, a more friendly user experience, and a more friendly community contributor experience. Thanks to Huawei, China Unicom, Zhejiang University SEL Lab, ARM and other organizations for their contributions, as well as all community contributors for their support!

The community plans to further improve the user experience and the stability of KubeEdge in subsequent versions and create the best “open source” intelligent edge computing platform for everyone to freely use.

For more details regarding KubeEdge, please follow and join us here:

https://kubeedge.io
