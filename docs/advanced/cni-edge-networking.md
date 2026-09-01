---
title: CNI Plugins and Edge Networking Boundary
sidebar_position: 6
---

This page clarifies the boundary between KubeEdge and third-party CNI plugins for edge networking.
Understanding which component is responsible for each part of the network stack helps users troubleshoot
problems faster and choose the right tool for their use case.

## Overview

KubeEdge is an edge computing framework that extends Kubernetes orchestration to edge nodes. It does **not**
replace the container networking layer. Pod networking still requires a CNI plugin, just as it does in any
standard Kubernetes cluster.

The table below summarizes which component owns each responsibility:

| Responsibility | Owner |
|---|---|
| Pod IP assignment | CNI plugin (Flannel, Calico, Cilium, etc.) |
| Pod-to-pod connectivity on the same node | CNI plugin |
| Cross-node pod networking (within the same LAN) | CNI plugin |
| Cross-LAN / cross-region service discovery | EdgeMesh |
| Cloud-to-edge control plane tunnel | KubeEdge (CloudHub / EdgeHub) |
| Device management (DeviceTwin, Mapper) | KubeEdge |
| Kubernetes API proxy for edge agents | KubeEdge MetaManager |
| Node registration and lifecycle | KubeEdge EdgeCore |

## What KubeEdge Does in Networking

KubeEdge's networking involvement is limited to the **control plane tunnel** between CloudCore and EdgeCore.
This tunnel runs over WebSocket or QUIC and carries:

- Pod scheduling decisions (spec delivery)
- Device twin state synchronization
- ConfigMap and Secret delivery
- Node heartbeat and status reports

This tunnel does **not** carry application pod traffic. Pod-to-pod data plane traffic is always handled by the
CNI plugin installed on the node.

```
Cloud Node
  └─ CloudCore (EdgeHub) ──────────────────────┐
                              WebSocket / QUIC  │ (control plane only)
Edge Node                                       │
  └─ EdgeCore (EdgeHub) ◄──────────────────────┘
       ├─ MetaManager   (API proxy for CNI agent calls)
       ├─ DeviceTwin    (device state management)
       └─ (CNI plugin runs independently alongside EdgeCore)
```

## What the CNI Plugin Does

The CNI plugin is responsible for all pod data plane networking:

- Allocating an IP address to each pod
- Attaching a network interface to the pod's network namespace
- Programming routing rules and iptables entries so pods can reach each other
- Enforcing NetworkPolicy rules

KubeEdge does not intercept or modify pod traffic after the CNI plugin has set up the interface. If a pod can
reach another pod on the same node, that is entirely the CNI plugin working correctly.

## What EdgeMesh Does

[EdgeMesh](./edgemesh.md) is an optional data plane component developed by the KubeEdge project. It is **not**
a replacement for a CNI plugin. It sits on top of the network provided by the CNI and adds:

- Service discovery for pods running on edge nodes that are behind NAT or on different LANs
- Traffic proxying across network boundaries using LibP2P tunnels
- Cross-region pod-to-service communication without requiring a flat, routable network

You would deploy EdgeMesh in addition to your CNI plugin when edge nodes are on isolated networks that cannot
directly route to each other.

## Edge Node Configuration Considerations

Because edge nodes are often managed separately from the cloud, there are a few CNI-specific things users need
to handle manually on edge nodes that are typically automatic on cloud nodes:

1. **CNI binaries**: Ensure that CNI binaries are present at `/opt/cni/bin` (or the path configured in your
   container runtime, e.g., `cni_bin_dir` in containerd) on every edge node. Some CNI DaemonSets do not
   schedule onto edge nodes by default and need a toleration or nodeSelector to do so.

2. **Preventing CNI DaemonSets from scheduling on edge nodes unintentionally**: If your CNI DaemonSet is not
   designed for edge nodes, use a `nodeSelector` or `affinity` rule to prevent it from scheduling there.
   For example, when using Cilium with KubeEdge, the official
   [configure_cilium.sh](https://github.com/kubeedge/kubeedge/blob/master/hack/configure_cilium.sh) script
   automatically patches the Cilium DaemonSet to exclude edge nodes.

3. **MetaManager as API proxy**: CNI agents (such as `cilium-agent`) need to call the Kubernetes API server
   to configure themselves. On edge nodes, KubeEdge's MetaManager acts as a local proxy for these API calls
   so they work reliably even when the edge-to-cloud connection is intermittent. This requires
   **KubeEdge v1.16 or later**. See [Enable Cilium with KubeEdge](./cilium.md) for a working setup guide.

4. **IPv6 and dual-stack**: KubeEdge supports IPv6. See [IPv6 Support](./support_ipv6.md) for details.

## Troubleshooting Guide

Use the following decision tree to identify whether a networking problem is a CNI issue or a KubeEdge issue:

| Symptom | Likely Owner | Where to Look |
|---|---|---|
| Pod on edge node has no IP address | CNI plugin | CNI agent logs on the edge node, `/opt/cni/bin` presence |
| Pods on the same edge node cannot ping each other | CNI plugin | CNI agent logs, iptables rules on the edge node |
| Pod on edge node cannot reach a pod on a different edge node (same LAN) | CNI plugin or routing | CNI overlay config, node-to-node routes |
| Pod on edge node cannot reach a pod on a different LAN | EdgeMesh | EdgeMesh installation and configuration |
| EdgeCore is not connecting to CloudCore | KubeEdge | CloudCore and EdgeCore logs, firewall rules on port 10000 |
| Device twin state is not syncing | KubeEdge | EdgeCore DeviceTwin logs, Mapper logs |
| CNI agent (e.g., cilium-agent) crashes on edge node | KubeEdge MetaManager | Requires KubeEdge >= v1.16, check if `metaServer` is enabled in `edgecore.yaml` |

## Supported CNI Plugins

KubeEdge has been tested with the following CNI plugins in edge deployments:

| CNI Plugin | Notes |
|---|---|
| **Cilium** | Fully supported with KubeEdge v1.16+. Requires `configure_cilium.sh`. See [Enable Cilium with KubeEdge](./cilium.md). |
| **Flannel** | Works for basic intra-LAN scenarios. No special edge-specific configuration required. |
| **Calico** | Works in routed mode. Edge nodes may require manual BGP peer configuration depending on topology. |

## Related Documentation

- [Edge connection with EdgeMesh](./edgemesh.md)
- [Enable Cilium with KubeEdge](./cilium.md)
- [IPv6 Support](./support_ipv6.md)
- [MetaManager Architecture](https://kubeedge.io/docs/architecture/edge/metamanager)
