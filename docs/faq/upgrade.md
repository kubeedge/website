---
title: Keadm upgrade
sidebar_position: 1
---

If the keadm upgrade fails, refer to the following documents


## Keadm upgrade related issues
### Keadm upgrade If edgecore is stopped, the keadm upgrade failed

When the edge node upgrade function is used, keadm upgrade will stop the keadm process if edgecore is stopped.
You can add KillMode=process to edgecore.service on the side node to upgrade keadm：

```shell
 vi  /etc/systemd/system/edgecore.service

 [Unit]
 Description=edgecore.service

 [Service]
 Type=simple
 ExecStart=/usr/local/bin/edgecore
 Restart=always
 RestartSec=10
 Environment=DEPLOY_MQTT_CONTAINER=true
 KillMode=process    # ----- Add KillMode

 [Install]
 WantedBy=multi-user.target
 ```
After the modification is successful, run the following command for the modification to take effect
```shell
systemctl reload-daemon

systemctl restart edgecore
```

