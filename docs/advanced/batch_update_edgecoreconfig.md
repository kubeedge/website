---
title: Batch process edge node's Config
sidebar_position: 13
---

## Abstract
In large-scale edge node cluster scenarios, when we need to modify the edgecore configuration of an edge node, [KubeEdge v1.21.0](https://github.com/kubeedge/kubeedge/blob/master/CHANGELOG/CHANGELOG-1.21.md) already supports batch modification of edge node configurations from the cloud. This approach uses custom CRDs and leverages the KubeEdge cloud–edge channel to deliver configuration updates to the edge nodes, execute them, and return the results. However, in some scenarios this method may not be practical. For example, when network bandwidth is very limited and the EdgeHub needs to be shut down, this method cannot be used. Therefore, based on the existing [batch node](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/sig-cluster-lifecycle/batch-node-process.md) access to edge nodes, we have developed a feature that adds and updates edgecore configurations on edge nodes via batch SSH.

Please refer to [PR](https://github.com/kubeedge/kubeedge/pull/6651)


## Getting Started

The case study guides you on how to batch modify the configuration of edge nodes using the Keadm tool.

Prerequisite: Edge nodes are joined to the cluster and accessible via SSH from the control node.


**Batch Update Edge Node's Config File**

```yaml
keadm:
  download:
    enable: false
    url: ""
  keadmVersion: v1.22.0
  archGroup: # This parameter can configure one or more of amd64\arm64\arm
    - arm64
  offlinePackageDir: ""  # When download.enable is true, this parameter can be left unconfigured
  cmdTplArgs: # This parameter is the execution command template, which can be optionally configured and used in conjunction with nodes[x].keadmCmd
    cmd: "config-update"
    token: ""
  keadmBinDir: "/usr/local/bin"       # This parameter is used to configure the path where the existing keadm binary file is located (all nodes are the same).
nodes:
  - nodeName: edgenode1  # Unique name
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=false,modules.metaManager.metaServer.enable=false" # Used in conjunction with keadm.cmdTplArgs
    copyFrom: "" # The file directory that needs to be remotely accessed to the joining node
    keadmBinDir: ""           # This parameter is used to configure the path of existing keadm binary files on the current node.
    ssh:
      ip: 192.168.1.1
      username: root
      port: 22
      auth:
        type: password # Log in to the node using a password
        privateKeyAuth:
          password: 'xxxxxx'
  - nodeName: edgenode2  # Unique name
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=true,modules.metaManager.metaServer.enable=true" # Used in conjunction with keadm.cmdTplArgs
    copyFrom: "" # The file directory that needs to be remotely accessed to the joining node
    keadmBinDir: ""  # This parameter is used to configure the path of existing keadm binary files on the current node.
    ssh:
      ip: 192.168.1.2
      username: root
      port: 22
      auth:
        type: password # Log in to the node using a password
        privateKeyAuth:
          password: 'xxxxxx'
maxRunNum: 5
```

**Usage**

Example 1: When the keadm path is the same for most edge nodes, for example `/usr/local/bin` , and only a few edge nodes have a different path, you can set `keadm.keadmBinDir` to `/usr/local/bin` and then configure `keadm.nodes[<node>].keadmBinDir` individually for the nodes that differ.

```yaml
keadm:
  download:
    enable: false
    url: ""
  keadmVersion: v1.22.0
  archGroup: 
    - arm64
  offlinePackageDir: ""  
  cmdTplArgs: 
    cmd: "config-update"
    token: ""
  keadmBinDir: "/usr/local/bin"
nodes:
  - nodeName: edgenode1
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=false,modules.metaManager.metaServer.enable=false"
    copyFrom: ""
    keadmBinDir: ""  # The keadm deployment path for this node is `keadm.keadmBinDir`
    ssh:
      ip: 192.168.1.1
      username: root
      port: 22
      auth:
        type: password
        privateKeyAuth:
          password: 'xxxxxx'
  - nodeName: edgenode2 
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=true,modules.metaManager.metaServer.enable=true"
    copyFrom: ""
    keadmBinDir: "/{path}"  # This parameter is used to configure the path of existing keadm binary files on the current node.
    ssh:
      ip: 192.168.1.2
      username: root
      port: 22
      auth:
        type: password
        privateKeyAuth:
          password: 'xxxxxx'
maxRunNum: 5
```

Example 2: When the keadm paths differ for all edge nodes, `keadm.keadmBinDir` does not need to be configured. Instead, `keadm.nodes[<node>].keadmBinDir` must be configured individually for each node.
```yaml
keadm:
  download:
    enable: false
    url: ""
  keadmVersion: v1.22.0
  archGroup: 
    - arm64
  offlinePackageDir: ""  
  cmdTplArgs: 
    cmd: "config-update"
    token: ""
  keadmBinDir: ""
nodes:
  - nodeName: edgenode1
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=false,modules.metaManager.metaServer.enable=false"
    copyFrom: ""
    keadmBinDir: "/{path1}" # Most edge nodes have the same keadm deployment path.
    ssh:
      ip: 192.168.1.1
      username: root
      port: 22
      auth:
        type: password
        privateKeyAuth:
          password: 'xxxxxx'
  - nodeName: edgenode2 
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=true,modules.metaManager.metaServer.enable=true"
    copyFrom: ""
    keadmBinDir: "/{path2}"
    ssh:
      ip: 192.168.1.2
      username: root
      port: 22
      auth:
        type: password
        privateKeyAuth:
          password: 'xxxxxx'
maxRunNum: 5
```

Example 3: When some edge nodes do not have keadm deployed while others do, `keadm.keadmBinDir` should not be configured. For nodes that already have keadm deployed, `keadm.nodes[<node>].keadmBinDir` must be configured individually. Additionally, you need to configure parameters such as whether to download keadm offline, etc. — this is the same as the original Batch usage.
```yaml
keadm:
  download:
    enable: true
    url: "https://github.com/kubeedge/kubeedge/releases/download/v1.22.0"
  keadmVersion: v1.22.0
  archGroup: 
    - arm64
  offlinePackageDir: ""  
  cmdTplArgs: 
    cmd: "config-update"
    token: ""
  keadmBinDir: ""  #Do not configure
nodes:
  - nodeName: edgenode1
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=false,modules.metaManager.metaServer.enable=false"
    copyFrom: ""
    keadmBinDir: "/{path1}"  # This node has keadm installed; configure the keadm deployment path.
    ssh:
      ip: 192.168.1.1
      username: root
      port: 22
      auth:
        type: password
        privateKeyAuth:
          password: 'xxxxxx'
  - nodeName: edgenode2 
    keadmCmd: "{{.cmd}} --set modules.edgeHub.enable=true,modules.metaManager.metaServer.enable=true"
    copyFrom: ""
    keadmBinDir: ""  # This node does not have keadm installed; no configuration is needed.
    ssh:
      ip: 192.168.1.2
      username: root
      port: 22
      auth:
        type: password
        privateKeyAuth:
          password: 'xxxxxx'
maxRunNum: 5
```

Save the above file on a `control node` that can access all edge nodes. For example, the file name is `batch-update-config.yaml`, and then execute `keadm batch -c ./batch-update-config.yaml` in the directory where the file is located.

