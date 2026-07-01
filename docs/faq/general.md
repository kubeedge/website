---
title: General
sidebar_position: 2
---

## What is KubeEdge?

KubeEdge is basically Kubernetes extended to work at the edge. It takes the same container orchestration stuff you use in the cloud and makes it work on edge devices that might be miles away from your data center, possibly with spotty internet.

If you're already familiar with Kubernetes, think of KubeEdge as the piece that handles the "edge" part of the equation. The cloud side still runs standard Kubernetes, but the edge nodes run a lightweight component called `edgecore` instead of the full kubelet.

It's a CNCF graduated project, so it's not some experimental thing - it's been battle-tested in production environments.

## How is KubeEdge different from just running Kubernetes?

Okay so technically KubeEdge runs on top of Kubernetes, but there are some pretty important differences you should know about:

**1. EdgeCore is way lighter than kubelet**

Standard kubelet is a chunky binary. EdgeCore is built to run on devices with limited resources - we're talking less than 70MB of RAM. It combines a bunch of components (container runtime, volume management, device twin syncronization) into one small binary. I've seen it run on Raspberry Pi Zeros without issues.

**2. It actually works offline**

This is the big one. Regular Kubernetes nodes go into `NotReady` state the moment they lose connection to the API server. KubeEdge nodes don't care. The `MetaManager` component keeps a SQLite database locally on the edge node. When the network goes down, pods keep running. When it comes back, everything syncs up automatically.

You can test this pretty easily:
```shell
# On edge node, check edgecore is running
systemctl status edgecore

# Pull the network cable or disable the interface
sudo ip link set eth0 down

# Pods are still running
crictl ps

# Re-enable network - everything syncs back
sudo ip link set eth0 up
```

**3. Different transport protocols**

Instead of the usual gRPC/HTTP-2 that Kubernetes uses internally, KubeEdge uses WebSocket or QUIC for cloud-edge communication. QUIC is actually really nice for edge scenarios - it handles packet loss better than TCP and the handshake is faster. You can switch between them in the config:

```yaml
# In cloudcore.yaml
modules:
  cloudHub:
    websocket:
      enable: true
    quic:
      enable: false
```

**4. Device management built-in**

KubeEdge has this whole CRD system for managing IoT devices directly through Kubernetes APIs. So instead of building custom device management platforms, you can define your devices as Kubernetes resources and manage them with `kubectl`. More on this in the device management FAQ.

## What are people actually using KubeEdge for?

Honestly, the use cases are pretty broad, but here's where I see it most:

- **Manufacturing**: Real-time monitoring of production lines, predictive maintainence. One factory I know of uses it to monitor 500+ sensors on their assembly line.
- **Smart cities**: Traffic monitoring, license plate recognition, toll systems. The low latency matters here.
- **Energy**: Wind turbine monitoring, solar panel management. These sites often have terrible connectivity, so the offline autonomy is crucial.
- **Edge AI**: Running ML inference locally instead of sending data to the cloud. Think camera-based quality inspection on a factory floor.
- **Retail**: Inventory tracking, smart cameras, store analytics.

## Can KubeEdge really run with no internet connection?

Yes, and this is one of its core features. Here's what happens:

1. EdgeCore caches all the metadata (pod specs, configmaps, secrets, etc.) in a local SQLite database
2. If the connection to the cloud drops, pods keep running as normal
3. If you reboot an edge node while it's offline, EdgeCore restores everything from the local database
4. When connectivity returns, EdgeCore syncs everything back to the cloud API server

The sync is pretty smart about it - it does a diff and only sends what changed. I've tested this by disconnecting nodes for days and everything comes back cleanly.

One thing to watch out for: if you deploy new workloads to an offline node, they won't show up in the cloud until connectivity is restored. The edge node only knows about what it knew when it went offline.

## What kind of hardware do I need for EdgeCore?

EdgeCore is designed to be super lightweight:

- **CPU architectures**: x86_64, ARMv7 (32-bit ARM), ARMv8 (64-bit ARM), and RISC-V
- **RAM**: The binary itself uses less than 70MB. I'd recommend at least 128MB total on your device to be safe.
- **Disk**: Around 100MB for the binary plus the SQLite database (which grows over time dependig on how many pods you run)

Practically speaking, it runs fine on:
- Raspberry Pi 3/4 (2GB+ recommended)
- Industrial gateways (most of them are overkill honestly)
- Any x86 mini-PC

I wouldn't try running it on a Pi Zero with 512MB RAM if you're doing anything beyond basic pod hosting. The SQLite database can get big if you have lots of configmaps and secrets.

## How do I check which version of KubeEdge I'm running?

Pretty straightforward:

```shell
# On cloud side
cloudcore --version

# On edge node
edgecore --version
```

Or if you're running cloudcore in a container:
```shell
kubectl get deployment cloudcore -n kubeedge -o jsonpath='{.spec.template.spec.containers[0].image}'
```

The version output looks like:
```
KubeEdge v1.14.0 CloudCore
```

Make sure your cloud and edge components are on compatible versions. Generally you want them on the same minor version (both 1.14.x for example). Running mismatched versions can cause wierd sync issues.
