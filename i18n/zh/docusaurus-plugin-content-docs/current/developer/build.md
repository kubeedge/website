---
title: Build
sidebar_position: 1
---

## Prerequisites

* A recent Go distribution (>=1.16)

Additionally, if you are on macOS, you will need bash > v4, GNU sed (gsed), jq, and wget.

```bash
brew install bash gnu-sed jq wget
```

## Downloading the source

```bash
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
```

## Compiling kubeedge

```bash
make
```

Note: Currently keadm is only supported on Ubuntu and CentOS, so the binaries are built with `GOOS=linux` and placed in `_output/local/bin`.

## Running tests

```bash
make verify
make test
make integrationtest
```

Note: Currently the integrationtest is only supported on Ubuntu.
