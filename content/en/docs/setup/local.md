---
draft: false
linktitle: Deploying with binary
menu:
  docs:
    parent: setup
    weight: 2
title: Deploying with binary
toc: true
type: docs
---
Deploying KubeEdge with binary is used to test, never use this way in production environment.

## Limitation

- Need super user rights (or root rights) to run.

## Setup Cloud Side (KubeEdge Master Node)

### Create CRDs

```shell
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/devices/devices_v1alpha2_device.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/devices/devices_v1alpha2_devicemodel.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/reliablesyncs/cluster_objectsync_v1alpha1.yaml
kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/crds/reliablesyncs/objectsync_v1alpha1.yaml
```


### Prepare config file

```shell
# cloudcore --minconfig > cloudcore.yaml
```

please refer to [configuration for cloud](../config#configuration-cloud-side-kubeedge-master) for details.

### Run

```shell
# cloudcore --config cloudcore.yaml
```

Run `cloudcore -h` to get help info and add options if needed.


## Setup Edge Side (KubeEdge Worker Node)

### Prepare config file

- generate config file

```shell
# edgecore --minconfig > edgecore.yaml
```

- get token value at cloud side:

```shell
# kubectl get secret -nkubeedge tokensecret -o=jsonpath='{.data.tokendata}' | base64 -d
```

- update token value in edgecore config file:

```shell
# sed -i -e "s|token: .*|token: ${token}|g" edgecore.yaml
```

The `token` is what above step get.

please refer to [configuration for edge](../config#configuration-edge-side-kubeedge-worker-node) for details.

### Run

If you want to run cloudcore and edgecore at the same host, run following command first:

```shell
# export CHECK_EDGECORE_ENVIRONMENT="false"
```

Start edgecore:

```shell
# edgecore --config edgecore.yaml
```

If you want to run cloudcore and edgecore in the background, run the following commands:
```shell
# cloudcore > /var/log/kubeedge/cloudcore.log 2>&1 &
# edgecore > /var/log/kubeedge/edgecore.log 2>&1 &
```
Then the two progresses will run in the background, and all the log will be written into `/var/log/kubeedge/xxx.log`

And if you want to run cloudcore and edgecore in systemd, you can run the below commands:
```shell
# ln /etc/kubeedge/cloudcore.service /etc/systemd/system/cloudcore.service && sudo systemctl daemon-reload && sudo systemctl enable cloudcore && sudo systemctl start cloudcore
# ln /etc/kubeedge/edgecore.service /etc/systemd/system/edgecore.service && sudo systemctl daemon-reload && sudo systemctl enable edgecore && sudo systemctl start edgecore
```
Then you can run `journalctl -u cloudcore.service -xe` or `journalctl -u edgecore.service -xe` to watch logs.

Run `edgecore -h` to get help info and add options if needed.

If all the above steps are executed very correctly, then you can find both cloudcore and edgecore are running very successfully.
And if you run command `kubectl get node` in the shell, you can find the edge node joins the cloudcore successfully and the edge node is in ready state.