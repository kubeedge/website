---
title: Build
sidebar_position: 1
---

This guide provides instructions for developers who want to build and contribute to the KubeEdge project.

## Prerequisites

- A recent Go distribution (>=1.20)
- Git
- Make

Additionally, if you are on macOS, you will need bash > v4, GNU sed (gsed), jq, and wget. You can install these dependencies using Homebrew:

```bash
brew install bash gnu-sed jq wget
```

## Downloading the source

To get started, clone the KubeEdge project to your local machine:

```bash
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
```

## Compiling KubeEdge

To compile KubeEdge, just run the make command. You can find all the binaries in the `_output/local/bin/` directory.

```bash
make
```

:::note
Currently keadm is only supported on Ubuntu and CentOS, so the binaries are built with `GOOS=linux` and placed in `_output/local/bin`.
:::

## Running tests

KubeEdge has a comprehensive test suite. To run the various tests, use the following commands:

```bash
make verify
make test
make integrationtest
```

:::note
Please note that the integration tests are currently only supported on Ubuntu.
:::