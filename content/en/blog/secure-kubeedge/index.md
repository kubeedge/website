+++
title = "Secure Kubeedge workloads with SPIRE"
date = 2019-04-16
lastmod = 2019-04-16

draft = false

# Authors. Comma separated list, e.g. `["Bob Smith", "David Jones"]`.
authors = ["Trilok Geer"]

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["KubeEdge", "kubeedge", "edge computing", "kubernetes edge computing", "K8S edge orchestration", "edge computing platform", "security"]
categories = ["Security"]
summary = "Secure kubeedge workloads using SPIFFE/SPIRE"

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["deep-learning"]` references 
#   `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
# projects = ["internal-project"]

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
+++

## Security for edge computing

Security is a paramount requirement for edge computing architecture as security breaches can make a complete organization to come to a halt (IIot) , data breach can lead to privacy issues and also control of the complete edge computing infrastructure. 

To enable better security, following needs to be satisfied for kubeedge framework

* Decentralized identity framework which works when cloud connectivity is offline.

* Only verified and attested edge nodes should be able to join cluster and connect to cloud.

* Applications connecting to edge computing framework should be verified and attested against the assigned identities.

* Applications should be authorized to send and receive data from edge computing framework.

* Certificate rotation should be possible at each workload/application instance.

* Audit at workload/service for all communciation between services.


## SPIFFE and SPIRE

The Secure Production Identity Framework For Everyone (SPIFFE) Project defines a framework and set of standards for identifying and securing communications between services.
SPIFFE enables enterprises to transform their security posture from just protecting the edge to consistently securing all inter-service communications deep within their applications.
SPIFFE recommends industry standards like TLS and JWT for forming a identity document for every service. The service-level identity AuthN and AuthZ removes the dependency of complex network-level ACL strategies.

More information about SPIFFE can be found at [*https://github.com/spiffe/spiffe*](https://github.com/spiffe/spiffe).

SPIRE (SPIFFE Runtime Environment) is a reference implementation of SPIFFE specification. SPIRE manages identities for node and workloads.
It provides API for controlling attestation policies and identity issuance and rotation strategies.

More information about SPIRE can be found at [*https://github.com/spiffe/spire*](https://github.com/spiffe/spire). 

## Benefits of securing Kubeedge with SPIRE

* Decentralized identity management for edge workloads when there cloud connectivity is offline.

* Node attestation: Only verifiable edge nodes can join the edge clusters. Every node is issued an identity on verification.
 In case of failed node attestations, no identity documents can be issued for services running on the node.

* Workload attestation: Only verifiable workload can run on edge nodes. In case of failed workload attestations, there are no identities issues for the workloads.
All communications are blocked from unverified workloads.

* Certificate rotation: Short-lived certificates are generated and rotation policies can be configured for every service communication.
There is no need for custom agents and reliance on specific orchestrators for certificate rotation configuration and management.

* Edge applications can be deployed securely in multi-cloud environment.

* Cloud-offline mode is supported using heirarchical deployment of SPIRE servers.

## Example Demo

An example demo using SPIRE for secure deployment of edge node and sample applications can be found at 

[*https://github.com/kubeedge/examples/tree/master/security-demo*](https://github.com/kubeedge/examples/tree/master/security-demo)





