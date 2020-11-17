---
authors:
- Yin Ding
categories:
- General
- Announcements
date: 2020-02-15
draft: false
lastmod: 2020-02-15
summary: KubeEdge v1.2 is released.
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8S edge orchestration
- edge computing platform
- release v1.2
- v1.2
title: KubeEdge v1.2 is out now
---
**KubeEdge** is an open source system extending native containerized application orchestration and device management to hosts at the Edge. It is built upon Kubernetes and provides core infrastructure support for networking, application deployment and metadata synchronization between cloud and edge. It also supports MQTT and allows developers to author custom logic and enable resource constrained device communication at the Edge.  

## **Today we announce the v1.2 release of KubeEdge.**


On February 9th, the KubeEdge community is proud to announce the availability of KubeEdge 1.2. This release includes a major upgrade on reliability, which includes more reliable message delivery from cloud to edge, component Config API, edge nodes auto-registration, Kubernetes v1.17.1 support, and 30+ fixes.

Please refer to https://github.com/kubeedge/kubeedge/blob/release-1.2/CHANGELOG-1.2.md for a full list of features in this release, and the following for some highlights.

{{% alert note %}}
Check out the release here:  [Release v1.2](https://github.com/kubeedge/kubeedge/releases/tag/v1.2.0)  
{{% /alert %}}

{{% alert note %}}
Instructions on how to setup KubeEdge can be found [here](https://github.com/kubeedge/kubeedge#usage)  
{{% /alert %}}

### A major upgrade on Cloud-Edge transmission reliability

In an Edge Computing scenario, the instability of edge network could cause the reliability issues of edge’s communication to cloud, which could further cause data loss during communication. To improve Cloud-Edge transmission reliability, KubeEdge v1.2 includes following update：

1. Added a verification mechanism for application layer message sending. There is a handshake mechanism built in to acknowledge (via ACK message) the successful state synchronization between cloud and edge. If the acknowledgement fails due to some reason, the application layer loop will trigger the retransmission mechanism to re-synchronize the state.
1. Implemented persistent cloud side collaborative messages. During the cloud-edge status synchronization process, cloud will record in real time the latest message version number (ResourceVersion) of each edge node that is successfully synchronized, and persist it to Kubernetes in the form of CRD. This mechanism can ensure the order and the continuity of message after a cloud failure or an edge node offline restart, avoiding cloud/edge inconsistent status caused by resending old messages.
1. Implemented a periodic check for cloud-edge data to ensure consistency. Based on the above two features, KubeEdge 1.2 includes a new module that synchronizes Controller to CloudCore. This module periodically checks the synchronization status of edge nodes, compares the information of resources in Kubernetes, and synchronizes states, and ensure the ultimate state consistency between cloud and edge. 

See more details here:
https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/reliable-message-delivery.md

### Component Config API

An important improvement that KubeEdge v1.2 offers is the ability to update configuration of all components such as CloudCore, EdgeCore, EdgeSite, etc. by using the Kubernetes style Component Config API, and API versions to support backward compatibility.

In previous KubeEdge versions, the configuration of KubeEdge components were scattered in separate files for each module, so the maintenance was cumbersome. In this release, the team has aggregated all configurations, so users need to only update a configuration file, and the path of the configuration file can be easily set by using *"- -config"*.

This release also offers two options for configuration: default configuration and minimum configuration. Users can use either option to generate configuration files and deploy KubeEdge quickly. 

See more details here: https://github.com/kubeedge/kubeedge/pull/1172

### Edge Nodes Auto-registration

In previous versions, users needed to create a Node object on the cloud side first, and then start EdgeCore on the edge side when adding an edge node.

In release v1.2, KubeEdge provides the ability of automating edge node registration on the cloud side. This feature is enabled by default to improve ease of use. Users can turn it off by setting the "registerNode" configuration of EdgeCore to "false".

See more details here: https://github.com/kubeedge/kubeedge/pull/1401


### Kubernetes v1.17.1 support

KubeEdge v1.2 supports Kubernetes v1.17.1, so users can use the most recent Kubernetes application management, storage management etc.

Here is the full compatibility table: https://github.com/kubeedge/kubeedge

### Other Fixes

- Fixed CPU usage issues when EdgeCore runs multiple PODs
- Moved Beehive, Viaduct sub-projects under Staging directory for more friendly development experience
- More checks to insure EdgeCore and Kubelet are not running on the same host

### Summary

KubeEdge V1.2 offers a more stable and reliable cloud-edge transmission, enhanced edge application management and device management capabilities, a better user experience, and a more friendly community contributor experience. 

A big “thank you” to all the community contributors and we hope to continue this momentum.  Future releases of KubeEdge will further enhance KubeEdge user experience, better intelligent edge computing platform, and other advanced features to make KubeEdge a high performing, reliable, and intelligent solution to Connect Cloud to Edge.  
 
For more details regarding KubeEdge, please follow and join us here: https://kubeedge.io .
