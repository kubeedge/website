---
sidebar_position: 2
title: Getting Started
---
KubeEdge is an open source system for extending native containerized application orchestration capabilities to hosts at Edge.

In this quick-start guide, we will explain:

- How to ask questions, build and contribute to KubeEdge.
- A few common ways of deploying KubeEdge.
- Links for further reading.

## Choose an installation method

KubeEdge provides two common installation approaches: using `keadm` and installing from binaries manually. 

- **`keadm`** is recommended for most users who want a simpler and more automated installation experience.
- **Binary installation** is more suitable for users who need more flexibility and full control over binary placement, configuration files, and service setup.

| Method | Best for | Automation | Configuration and service setup |
| --- | --- | --- | --- |
| `keadm` | quick start, evaluation, and standard deployments | higher | mostly handled by `keadm` |
| binary installation | custom environments, development, and debugging | lower | managed manually |

## Dependencies

For cloud side, we need:

- [Kubernetes](https://kubernetes.io) cluster

For edge side, we need:

- Container runtimes, now we support:
  - [Docker](https://www.docker.com)
  - [Containerd](https://github.com/containerd/containerd)
  - [Cri-o](https://cri-o.io)
  - [Virtlet](https://docs.virtlet.cloud)
- [MQTT Server(Optional)](https://mosquitto.org)

## Get KubeEdge!

You can find the latest KubeEdge release [here](https://github.com/kubeedge/kubeedge/releases).

During release, we build tarballs for major platforms and release docker images in kubeedge dockerhub.

## Deploying KubeEdge

Check [setup docs](../setup/install-with-keadm.md).

## Contributing

Contributions are very welcome! See our [CONTRIBUTING.md](../community/contribute) for more information.

## Community

KubeEdge is an open source project and we value and welcome new contributors and members
of the community. Here are ways to get in touch with the community:

- [Mailing list](https://groups.google.com/forum/#!forum/kubeedge)
- [Slack](https://kubeedge.io/docs/community/slack/)
- [Twitter](https://twitter.com/kubeedge)
- [GitHub Issues](https://github.com/kubeedge/kubeedge/issues)
