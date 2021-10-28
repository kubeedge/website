---
draft: false
linktitle: Build
menu:
  docs:
    parent: developer guide
    weight: 1
title: Build
toc: true
type: docs
---
KubeEdge use `Makefile` to compile both cloud and edge binaries. Developers can
also use `make` to do some lint checks or verifications.

## How to build binaries?
We can use `make all` to compile required binaries, this command will build
all the binaries for both cloud and edge, including `cloudcore`, `edgecore`, etc.

If we want to build only one binary, we can use `WHAT=xxx` to specify which component that we want to build.
We can use `make all WHAT=cloudcore` to specify that
we only want to build binary `cloudcore`.

And to search for more details about how to build binaries, we can use `make all HELP=y` to find
more help information.

## How to do some code static checks?
We can run command `make lint` to run golang linters. KubeEdge integrates
`golangci-lint` to do linter checks.


For more details, developers can refer to [Makefile](https://github.com/kubeedge/kubeedge/blob/master/Makefile).