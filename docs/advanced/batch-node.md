---
title: batch process edge node
sidebar_position: 5
---

## Abstract
In edge scenarios, the node scale is often very large. The management process of a single node can no longer efficiently cope with such large-scale scenarios. How to manage large-scale nodes is becoming more and more important. This document will teach you how to use keadm to manage and maintain edge nodes on a large scale. 

Please refer to the detailed design: [batch node proposal](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/batch-node-process.md)

## Getting Started

This case will guide you how to use the batch node join and reset capabilities, and introduce custom scripts using the `pre-run` and `post-run` parameters.

**Pre-run and Post-run Parameter Description**

To support custom scripts, we have introduced the optional parameters `pre-run` and `post-run` in various commands of keadm. These parameters allow users to pass in custom script files to perform some pre or post script tasks. For specific usage, refer to the subsequent use cases.

Usage command reference:

```shell
keadm reset --post-run=test.sh xxx
keadm join --pre-run=test.sh xxx
```

**Batch Node Join Config File**

```yaml
keadm:
  download:
    enable: true
    url: https://github.com/kubeedge/kubeedge/releases/download/v1.18.1 # If this parameter is not configured, the official github repository will be used by default
  keadmVersion: v1.18.1
  archGroup: # This parameter can configure one or more of amd64\arm64\arm
    - amd64
  offlinePackageDir: /tmp/kubeedge/keadm/package/amd64  # When download.enable is true, this parameter can be left unconfigured
  cmdTplArgs: # This parameter is the execution command template, which can be optionally configured and used in conjunction with nodes[x].keadmCmd
    cmd: join --pre-run=./install-containerd.sh --cgroupdriver=cgroupfs --cloudcore-ipport=192.168.1.102:10000 --hub-protocol=websocket --certport=10002 --image-repository=docker.m.daocloud.io/kubeedge --kubeedge-version=v1.18.1 --remote-runtime-endpoint=unix:///run/containerd/containerd.sock
    token: xxx
nodes:
  - nodeName: ubuntu1   # Unique name
    arch: amd64
    keadmCmd: '{{.cmd}} --edgenode-name=containerd-node1 --token={{.token}}' # Used in conjunction with keadm.cmdTplArgs
    copyFrom: /root/test-keadm-batchjoin  # The file directory that needs to be remotely accessed to the joining node
    ssh:
      ip: 192.168.1.103
      username: root
      auth:
        type: privateKey   # Log in to the node using a private key
        privateKeyAuth:
          privateKeyPath: /root/ssh/id_rsa
  - nodeName: ubuntu2
    arch: amd64
    keadmCmd: join --pre-run=./install-containerd.sh --edgenode-name=containerd-node2 --cgroupdriver=cgroupfs --cloudcore-ipport=192.168.1.102:10000 --hub-protocol=websocket --certport=10002 --image-repository=docker.m.daocloud.io/kubeedge --kubeedge-version=v1.17.0 --remote-runtime-endpoint=unix:///run/containerd/containerd.sock  # Used alone
    copyFrom: /root/test-keadm-batchjoin
    ssh:
      ip: 192.168.1.104
      username: root
      auth:
        type: privateKey
        privateKeyAuth:
          privateKeyPath: /root/ssh/id_rsa
maxRunNum: 5

```

In this configuration, `--pre-run=./install-containerd.sh` is introduced in the join command, which is used to install the containerd container runtime before the node accesses. The `install-containerd.sh` file is in the directory corresponding to `nodes[x].copyFrom` and is uploaded from the `control node` to the `remote node`.

**Usage:**

Save the above file on a `control node` that can access all edge nodes. For example, the file name is `batch-join-node.yaml`, and then execute `keadm batch -c ./batch-join-node.yaml` in the directory where the file is located.

**Batch Node Reset Config File** 

```yaml
keadm:
  download:
    enable: true
    url: https://github.com/kubeedge/kubeedge/releases/download/v1.18.1
  keadmVersion: v1.18.1
  archGroup:
    - amd64
  offlinePackageDir: /tmp/kubeedge/keadm/package/amd64
nodes:
  - nodeName: ubuntu1
    keadmCmd: reset edge --post-run=./uninstall-containerd.sh
    ssh:
      ip: 192.168.1.103
      username: root
      auth:
        type: password  # Log in to the node using a password
        passwordAuth:
          password: dangerous
  - nodeName: ubuntu2
    keadmCmd: reset edge --post-run=./uninstall-containerd.sh
    ssh:
      ip: 192.168.1.104
      username: root
      auth:
        type: password
        passwordAuth:
          password: dangerous
maxRunNum: 5
```

In this configuration, `--post-run=./uninstall-containerd.sh` is introduced in the reset command, which is used to uninstall the containerd container runtime after the node is reset. The `uninstall-containerd.sh` file is in the directory corresponding to `nodes[x].copyFrom` and is uploaded from the `control node` to the `remote node`.

**Usage:** 
Save the above file on a `control node` that can access all edge nodes. For example, the file name is `batch-reset-node.yaml`, and then execute `keadm batch -c ./batch-reset-node.yaml` in the directory where the file is located.

#### Video Demo
![demo](..%2F..%2Fstatic%2Fimg%2Fkeadm%2Fbatch-node-demo.gif)