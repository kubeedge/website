---
title: Installation
sidebar_position: 2
---

KubeEdge can be installed in several different ways depending on your needs.
This page provides a quick overview of each installation procedure so you can
pick the one that best fits your environment, then jump to the matching
sub-section for the detailed steps.

> Before installing KubeEdge, make sure you have reviewed the
> [Prerequisites](../prerequisites/kubernetes.md) and prepared a Kubernetes
> cluster as well as a container [runtime](../prerequisites/runtime.md).

## Choose an Installation Method

### Installing KubeEdge with Keadm

`keadm` is the **recommended way to install KubeEdge** for most users,
including production deployments. It is the official KubeEdge installer and
takes care of installing the cloud-side component (CloudCore) and joining edge
nodes (EdgeCore) with a few simple commands. `keadm` does **not** install
Kubernetes itself — you need to bring your own Kubernetes cluster.

Use this method when you want a straightforward, supported path to a working
KubeEdge cluster on existing infrastructure.

➡️ See [Installing KubeEdge with Keadm](./install-with-keadm.md).

### Installing KubeEdge with Binary

The binary installation walks you through deploying CloudCore and EdgeCore
manually from the released binaries (or from source). It gives you the most
control over configuration and is useful when you want to understand exactly
how the components are wired together, or when you need a customized setup
that the installer does not cover.

This method is intended for **testing, development, and learning** —
it is not recommended for production environments.

➡️ See [Installing KubeEdge with Binary](./install-with-binary.md).

### Installing KubeEdge with Keink

[`keink`](https://github.com/kubeedge/keink) (KubeEdge IN
[kind](https://github.com/kubernetes-sigs/kind)) brings up a complete local
KubeEdge cluster — both the Kubernetes control plane and the KubeEdge
components — inside Docker containers on a single machine. It is the fastest
way to get a fully working cluster for experimentation.

Use this method when you want to **try out KubeEdge locally** without
provisioning real cloud and edge nodes. It is not intended for production
use.

➡️ See [Installing KubeEdge with Keink](./install-with-keink.md).

## Which One Should I Pick?

| Goal                                                | Recommended Method |
| --------------------------------------------------- | ------------------ |
| Deploy KubeEdge on real cloud / edge infrastructure | Keadm              |
| Test, develop, or learn how the components work     | Binary             |
| Spin up a quick local cluster for experimentation   | Keink              |

Once you have picked a method, follow the matching sub-section for the full
step-by-step instructions.
