---
authors:
- Yin Ding
- Kevin Wang
categories:
- General
- Announcements
date: 2020-05-30
draft: false
lastmod: 2020-05-30
summary: KubeEdge v1.3 is live!
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8S edge orchestration
- edge computing platform
- cloud native
- iot
- iiot
- release v1.3
- v1.3
title: KubeEdge v1.3 is live!
---
**KubeEdge** is an open source system extending native containerized application orchestration and device management to hosts at the Edge. It is built upon Kubernetes and provides core infrastructure support for networking, application deployment and metadata synchronization between cloud and edge. It also supports MQTT and allows developers to author custom logic and enable resource constrained device communication at the Edge.  

## **KubeEdge v1.3: A major upgrade for maintainability**

On May 15th, the KubeEdge community is proud to announce the availability of KubeEdge 1.3. This release includes a major upgrade for maintainability, which includes:

- Collecting logs from pods at edge in cloud

- Edge node and container monitoring

- High availability of KubeEdge cloud components

- Automated TLS bootstrapping for edge nodes

- CRI-O and Kata Containers runtime support

- 25+ bug fixes and enhancements.

Please refer to https://github.com/kubeedge/kubeedge/blob/master/CHANGELOG-1.3.md for a full list of features in this release

{{% alert note %}}
Release details - [Release v1.3](https://github.com/kubeedge/kubeedge/releases/tag/v1.3.0)
{{% /alert %}}

{{% alert note %}}
How to set up KubeEdge - [https://github.com/kubeedge/kubeedge - usage](https://github.com/kubeedge/kubeedge#usage)
{{% /alert %}}

## **Release Highlights**

### Collecting logs from pods at edge in cloud

In most edge computing scenarios, the edge node is in a private network, and the pod logs running on the edge node cannot be directly pulled from the cloud, resulting issues for maintenance and debugging.

KubeEdge v1.3 includes a built-in streaming data channel which enables cloud to easily obtain edge application container logs via the *kubectl* *logs* command, without having to build another VPN server to solve private network access problems.

In addition, the KubeEdge community plans to provide a *kubectl exec* command support for edge containers in subsequent versions, so that users can easily connect to the edge application container from the cloud for debugging purposes. 

See more feature details: https://docs.kubeedge.io/en/latest/setup/kubeedge_install_source.html

### Edge node and container monitoring

KubeEdge v1.3 provides a monitoring interface for edge nodes. Users can obtain edge node and its container information, and integrate it with third-party monitoring systems. This feature is enabled by default. Users have the option to disable this built-in monitoring module through the EnableMetrics item during configuration.

In the next version, KubeEdge will support the aggregation of edge node and application container monitoring information in the cloud.

See more feature details: https://github.com/kubeedge/kubeedge/pull/1573

### High availability of KubeEdge cloud components

In previous releases, the availability of KubeEdge cloud components rely on the automatic recovery mechanism of Kubernetes Deployment. In some extreme cases, this recovery can take a long time to recover from failures.

KubeEdge v1.3 has a built-in high-availability for the KubeEdge cloud component, CloudCore. When the CloudCore instance fails, a standby CloudCore instance is automatically switched on to minimize the impact of cloud component failures. 

In subsequent versions, the KubeEdge community will further optimize the high concurrency of cloud components to improve throughput in large-scale edge nodes scenarios. 

### Automated TLS bootstrapping for edge nodes

KubeEdge v1.3 introduced automated TLS bootstrapping for edge nodes, which simplifies the operation for users to configure cloud-edge secure channels and improves ease-of-use.

By default, KubeEdge generates a self-signed certificate for users, which is used for encrypted communication between cloud components and edge nodes. For scenarios that require an unified management of certificates, users can also use certificates issued by designated trust authorities.

For future releases, the KubeEdge community will support automatic renewal of the node's certificate after expiration.

See more feature details: https://github.com/kubeedge/kubeedge/blob/master/docs/setup/kubeedge_configure.md

### More container runtime support

KubeEdge v1.3 adds support of CRI-O and Kata Containers as container runtime.

- CRI-O, a CNCF incubation project, is a lightweight container, taking up to 30MB memory, and is in compliance with OCI standards. 

- Kata Containers is an open source container runtime based on lightweight virtual machines. It is designed to combine the security advantages of virtual machines (VMs) with the speed and the manageability of containers.

With v1.3, KubeEdge has official support for all mainstream container runtimes including Docker, containerd, CRI-O and Kata Containers.

See more feature details: https://github.com/kubeedge/kubeedge/blob/master/docs/setup/kubeedge_cri_configure.md

### 25+ bug fixes and enhancements

In addition to the above new features, KubeEdge v1.3 also includes the following enhancements:

- Added the support for keadm to install KubeEdge on CentOS systems

- EdgeMesh no longer depends on initContainer, and will take over traffic on the host during startup

- Fixed the issue that some pods in “the terminating state” cannot be deleted 

## **Future Outlook**

With the release of v1.3, KubeEdge provides more complete edge application monitoring and management capabilities, a more stable and reliable cloud-side collaborative transmission mechanism, a more friendly user experience, and a more friendly community contributor experience. Thanks to Huawei, China Unicom, Zhejiang University SEL Lab, ARM and other organizations for their contributions, as well as all community contributors for their support!

The community plans to further improve the user experience and the stability of KubeEdge in subsequent versions and create the best “open source” intelligent edge computing platform for everyone to freely use. Please refer to the roadmap document for future release plans:

https://github.com/kubeedge/kubeedge/blob/master/docs/getting-started/roadmap.md

For more details regarding KubeEdge, please follow and join us here:

https://kubeedge.io
