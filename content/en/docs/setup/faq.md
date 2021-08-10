---
draft: false
linktitle: FAQ
menu:
  docs:
    parent: setup
    weight: 6
title: FAQ
toc: true
type: docs
---
All FAQ will be collected and solutions will be provided here. 

## Check the Edge Node Join Status
Check edge node ```edgecore.service``` status
```shell
# journalctl -u edgecore.service -b
```

- if you got the
  ```shell
  ...
  edgecore.service: Failed to execute command: No such file or directory
  edgecore.service: Failed at step EXEC spawning /usr/local/bin/edgecore: No such file or directory
  ...
  ```
    Copy the ```edgecore``` binary for ```edgecore.service```
    ```shell
    # cp /etc/kubeedge/edgecore /usr/local/bin
    ```

Check edge node join to master node state
Example:

```shell
# kubectl get node -o wide
```

Output:

```shell
root@kubeedge-master:~# kubectl get node 
NAME              STATUS   ROLES        AGE     VERSION
kubeedge-edge     Ready    agent,edge   37s     v1.19.3-kubeedge-v1.7.1
kubeedge-master   Ready    master       3d17h   v1.15.5
```

## Edge Full Cleanup:
1. if you want change cloud side and used the edge node join command, or command the ```service edgecore status``` got ```dial websocket error(x509: certificate signed by unknown authority```

  ```shell
  # rm -r /etc/kubeedge/ca
  # rm -r /etc/kubeedge/cert
  # rm -r /etc/kubeedge/config
  # rm -r /etc/kubeedge/edgecore.service
  ```
1. if you want change the kubeEdge edgecore version, add this command
  ```shell
  # rm /usr/local/bin/edgecore
  ```