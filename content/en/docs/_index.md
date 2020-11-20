---
date: 2019-01-28
draft: false
lastmod: 2019-01-29
menu:
  docs:
    parent: welcome
    weight: 1
title: Getting Started
toc: true
type: docs
---
KubeEdge is an open source system for extending native containerized application orchestration capabilities to hosts at Edge.

In this quick-start guide, we will explain:

- How to ask questions, build and contribute to KubeEdge.
- A few common ways of deploying KubeEdge.
- Links for further reading.

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

Check [setup docs](setup/keadm.md).

## Contributing

Contributions are very welcome! See our [CONTRIBUTING.md](contributing/contribute.md) for more information.

## Community

KubeEdge is an open source project and we value and welcome new contributors and members
of the community. Here are ways to get in touch with the community:

- [Mailing list](https://groups.google.com/forum/#!forum/kubeedge)
- [Slack](https://join.slack.com/t/kubeedge/shared_invite/enQtNjc0MTg2NTg2MTk0LWJmOTBmOGRkZWNhMTVkNGU1ZjkwNDY4MTY4YTAwNDAyMjRkMjdlMjIzYmMxODY1NGZjYzc4MWM5YmIxZjU1ZDI)
- [Twitter](https://twitter.com/kubeedge)
- [GitHub Issues](https://github.com/kubeedge/kubeedge/issues)
