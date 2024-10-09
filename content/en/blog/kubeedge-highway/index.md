---
authors:
- Trilok Geer
categories:
- Security
date: 2021-06-12
draft: false
lastmod: 2021-06-12
summary: Kubernetes and KubeEdge Help Chinese Highways Manage over 100,000 Edge Nodes
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8S edge orchestration
- edge computing platform
title: Kubernetes and KubeEdge Help Chinese Highways Manage over 100,000 Edge Nodes
---
## Project background

A large number of ETC gantries and controllers need to be deployed on the highways. This involves nearly 100,000 edge nodes and more than 500,000 edge applications. After collecting information, the system will upload data to the provincial centers and the Highway Monitoring and Response Center (HMRC) under China's Ministry of Transport via the dedicated toll network.

We have met the following challenges:

- Manage nearly 100,000 heterogeneous devices, including Arm and x86 devices.

- Manage the lifecycle management of more than 500,000 applications.

To ensure the successful implementation of the project, we made researches on the architecture and ultimately selected K8s and KubeEdge to manage all applications edge nodes.

## Why Kubernetes?

Many microservice applications are deployed on edge devices. Kubernetes is able to support the deployment and large-scale management of these and cloud-native microservice applications, making it an ideal choice for our project.

We have the following deployment requirements:

- Hot standby
- Multi-node, multi-active, and mutual backup
- Associated applications must be deployed on the same node to improve the interaction efficiency between the applications.
- Different instances of the same application must be deployed on different nodes to improve availability.
- Applications must be deployed in different edge node groups based on the properties of edge nodes.
- Application deployment should be defined as an independent object and also applications must be automatically deployed after new edge nodes that meet requirements are brought online.

Kubernetes can meet our requirements with its Deployments, Pods, ReplicaSets, and DaemonSets. Kubernetes' architecture is easily scalable and highly flexible, enabling us to scale it based on our own requirements of edge management. 

## Why KubeEdge?

We choose KubeEdge owing to the following reasons:

- Characteristics of our business. A large quantity of edge devices with different architectures from different vendors are deployed nationwide, which requires heterogeneous support. Some edge industrial computers have a minimum of 4-core Arm SOC and 1G available memory, which requires a low resource-consuming solution to manage nodes on the edge devices. Management and operation are complex, and there are six management levels from the network center to the final route. Management costs are high, so we need a highly integrated edge solution to minimize risks and reduce operational costs.

- Characteristics of the edge environment. The ETC network is divided into two layers: one is from the Highway Monitoring & Response Center to each provincial center, and the other is from each provincial center to toll stations on highways. A proxy server forwards data between the two layers. Across these network layers and proxy, edge devices must be highly flexible and support multiple modes of access through private line, proxy, and public network, in either wired or wireless mode. The network infrastructure varies significantly between each province. In some provinces, the network bandwidth is as low as 3 Mbit/s. The ETC solution must minimize the usage of the management network between the edge and cloud to fit within this low bandwidth. In addition, the network quality on some highways is very poor, which frequently causes network disconnections. The solution must be able to operate offline in the case of network loss.

## Overall solution

### Application deployment

Businesses deployed on the edge devices are very complex, and the cloud-native architecture is composed of multiple microservices. Containerized microservices and middleware help us adapt to different heterogeneous operating systems and facilitate unified management.

As shown in the figure below, the microservice architecture consists of a front end and a back end. The front end deploys services on ETC gantries as Deployments and communicates with the back end through EdgeMesh. In this way, frontend and backend pods of microservices can communicate with each other. Redis and MySQL are deployed using StatefulSets. This deployment model perfectly encapsulates and automates the entire set of highly available systems at the edge.

![expressway-1](images/expressway-1.jpg)

However, using the native Kubernetes deployment method alone cannot fully meet our needs. In this project, a road section has hundreds or thousands of toll stations. It is labor-consuming to deploy these toll stations one by one. Therefore, a workflow engine system was constructed based on Kubernetes to define each step for deploying a microservice as a job. In this way, hundreds of thousands of identical microservice systems and environments can be rapidly deployed in batches.

![expressway-2](images/expressway-2.jpg)

### Large-scale node access

We also need to address the following challenges:

- Each province manages its own K8s cluster. One Kubernetes cluster was configured for each province, and a unified management layer was deployed to process complex cross-cluster data, allowing the central site to manage the edge side of each province. This method is called multi-cluster management.

- Previously, the Highway Monitoring & Response Center or a provincial center upgraded its network, all edge nodes in the provinces were disconnected from their Kubernetes clusters in case of a network failure. After the network recovered, all edge nodes simultaneously connected to the Kubernetes cluster at the central side. A large number of concurrent connections would impact the system at the central site and cause application exceptions. Therefore, a dynamic back-off algorithm was used to relieve such impacts.

- It is a must to simplify the information reported by NodeStatus and PodStatus. As mentioned earlier, the infrastructure varies in each province. Therefore, we need to reduce the impact of data reporting on the network.

- Hierarchical acceleration of the container registry mirror effectively reduces the impact on the central site and improves the efficiency of large-scale deployment.


### High availability of edge business

When it comes to the upgrade of native Kubernetes, the common practice is that the system deletes the pod of the old version, pulls the new image tag, and creates a new pod, which works well when the network on the public cloud is in a good condition. However, on the edge devices, this will interrupt services and result in loss of toll data.

To address the challenge, we have another solution. The system sends a notification to instruct the edge node to pre-download the image of the new version. After the image is downloaded, the system deletes the old pod and starts the new application. In this way, the overall service interruption duration during the upgrade was shortened from minutes to less than 10 seconds, greatly reducing the impact on the services.

Considering that edge devices are deployed in active/standby mode,  but they cannot communicate with each other through services like Elastic Load Balance (ELB), we deploy keepalived on the edge node to provide container services for cameras and other devices in the gateway system through the virtual IP addresses (VIPs).


## Summary

- Currently, the KubeEdge-based edge management system manages nearly 100,000 edge nodes across 29 provinces, cities, and autonomous regions in China, with more than 500,000 edge applications deployed. With these applications, the system processes more than 300 million data records daily and supports continuous update of ETC services on highways.

- It provides support for the development of innovative businesses such as V2X and autonomous driving.

- The general deployment and scheduling model provided by Kubernetes is suitable for deploying large-scale edge applications.

- Native Kubernetes cannot meet all the needs of edge business. KubeEdge integrates the cloud-native management ability of Kubernetes and is suitable for edge business deployment and management.