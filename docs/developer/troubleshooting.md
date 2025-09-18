Troubleshooting

This page addresses common issues encountered during the setup and operation of KubeEdge.

keadm init failed to download release

If you experience connectivity issues with GitHub during keadm init, you can manually download the required KubeEdge release and CRD files before proceeding with the setup. This approach is particularly useful in environments with restricted internet access.

Example using KubeEdge v1.21.0:

Download the release package

Get it from the[KubeEdge v1.21.0 release page](https://github.com/kubeedge/kubeedge/releases/tag/v1.21.0).

Make sure to select the correct architecture for your edge node (e.g., linux-amd64, linux-arm64).

Download the CRD YAMLs

For v1.21, use the v1beta1 CRDs available under build/crds:

[devices_v1beta1_device.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/devices/devices_v1beta1_device.yaml)  

[devices_v1beta1_devicemodel.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/devices/devices_v1beta1_devicemodel.yaml)

[cluster_objectsync_v1alpha1.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/reliablesyncs/cluster_objectsync_v1alpha1.yaml)

[objectsync_v1alpha1.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/reliablesyncs/objectsync_v1alpha1.yaml)

Place the files under /etc/kubeedge:


```bash
$ tree -L 3 /etc/kubeedge
.
├── crds
│   ├── devices
│   │   ├── devices_v1beta1_device.yaml
│   │   └── devices_v1beta1_devicemodel.yaml
│   └── reliablesyncs
│       ├── cluster_objectsync_v1alpha1.yaml
│       └── objectsync_v1alpha1.yaml
└── kubeedge-v1.21.0-linux-amd64.tar.gz
```
Run keadm init with version flag

```bash
keadm init --kubeedge-version v1.21.0
```



This ensures that keadm detects the local CRDs and release files, skipping the download process.

Container keeps Pending or Terminating



If your pods remain in a Pending or Terminating state, try the following:

Check node health:

kubectl get nodes
Ensure nodes are in a Ready state.

Describe the pod:

kubectl describe pod <your-pod>
This provides details and related events.

Inspect EdgeCore logs:

If using systemd:

journalctl --unit edgecore.service -f


If started manually, check the log file or stdout.

Verify architecture compatibility:

Ensure the container image matches your edge node architecture.

Example: use arm64v8/nginx for Raspberry Pi 4 (arm64) instead of nginx.

Check podSandboxImage in edgecore.yaml:

Confirm it points to a valid, compatible image.

Manually run the container:

docker run <your-container-image>


Check disk space:

Low disk space can prevent image pulls. Free up space if needed.

Where to find CloudCore/EdgeCore logs

Using systemd:

journalctl --unit cloudcore.service -f
journalctl --unit edgecore.service -f


Using nohup or manual execution:

Logs are usually written to the file specified during startup, or to stdout if no file was given.

Where to find pod logs

To access pod logs:

Connect to the edge node.

Use one of the following methods:

Check the log files under /var/log/pods.

Use Docker to view container logs:

docker logs <container-id>
Alternatively, enable the kubectl logs feature:

See [Enable kubectl logs/exec to debug pods on the edge](https://kubeedge.io/docs/advanced/debug/).

Notes

Device CRDs are v1beta1 since v1.15. Older v1alpha1 and v1alpha2 CRDs are deprecated.

Always replace version numbers (v1.21.0 in this example) with the version you plan to install.

Official release artifacts and checksums are on the  [KubeEdge v1.21.0 release page](https://github.com/kubeedge/kubeedge/releases/tag/v1.21.0).

CRDs are located in the [build/crds folder of the KubeEdge GitHub repository](https://github.com/kubeedge/kubeedge/tree/v1.21.0/build/crds).


