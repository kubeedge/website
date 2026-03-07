---
title: Troubleshooting
sidebar_position: 7
---

# Troubleshooting

This page addresses common issues encountered during the setup and operation of KubeEdge.

---

## keadm init failed to download release

If you experience connectivity issues with GitHub during `keadm init`, you can manually download the required KubeEdge release and CRD files before proceeding with the setup. This approach is particularly useful in environments with restricted internet access.

### Example using KubeEdge v1.21.0

#### Download the release package

Get it from the [KubeEdge v1.21.0 release page](https://github.com/kubeedge/kubeedge/releases/tag/v1.21.0).

Make sure to select the correct architecture for your edge node (e.g., `linux-amd64`, `linux-arm64`).

#### Download the CRD YAMLs

For v1.21, use the **v1beta1 CRDs** available under `build/crds`:

- [devices_v1beta1_device.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/devices/devices_v1beta1_device.yaml)
- [devices_v1beta1_devicemodel.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/devices/devices_v1beta1_devicemodel.yaml)
- [cluster_objectsync_v1alpha1.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/reliablesyncs/cluster_objectsync_v1alpha1.yaml)
- [objectsync_v1alpha1.yaml](https://raw.githubusercontent.com/kubeedge/kubeedge/v1.21.0/build/crds/reliablesyncs/objectsync_v1alpha1.yaml)

#### Place the files under `/etc/kubeedge`

```bash
tree -L 3 /etc/kubeedge

.
├── crds
│   ├── devices
│   │   ├── devices_v1beta1_device.yaml
│   │   └── devices_v1beta1_devicemodel.yaml
│   └── reliablesyncs
│       ├── cluster_objectsync_v1alpha1.yaml
│       └── objectsync_v1alpha1.yaml
└── kubeedge-v1.21.0-linux-amd64.tar.gz
````

#### Run keadm init with version flag

```bash
keadm init --kubeedge-version v1.21.0
```

This ensures that `keadm` detects the local CRDs and release files, skipping the download process.

---

## Container keeps Pending or Terminating

If your pods remain in a **Pending** or **Terminating** state, try the following troubleshooting steps:

1.  **Check node health**
    Run `kubectl get nodes` and ensure all nodes are in a `Ready` state.

2.  **Describe the pod**
    Run `kubectl describe pod <your-pod>` to get details about scheduling and other events.

3.  **Inspect EdgeCore logs**

      - **If using systemd**:
        ```bash
        journalctl --unit edgecore.service -f
        ```
      - **If started manually**:
        Check the log file specified at startup or stdout.

4.  **Verify architecture compatibility**
    Ensure the container image architecture matches your edge node's architecture. For example, use `arm64v8/nginx` for a Raspberry Pi 4 (arm64) instead of the default `nginx` image.

5.  **Check `podSandboxImage` in `edgecore.yaml`**
    Confirm that `podSandboxImage` points to a valid and compatible image for your node's architecture.

6.  **Manually run the container**
    Attempt to run the container image manually on the edge node to isolate potential runtime issues:

    ```bash
    docker run <your-container-image>
    ```

7.  **Check disk space**
    Insufficient disk space can prevent new images from being pulled. Free up space if necessary.

---

## Viewing logs

### CloudCore / EdgeCore logs

  - **Using systemd**:
    ```bash
    journalctl --unit cloudcore.service -f
    journalctl --unit edgecore.service -f
    ```
  - **Using nohup or manual execution:**
    Logs are usually written to the file specified during startup, or to stdout if no file was given.

### Pod logs

To access pod logs, first **connect to the edge node**, then use one of the following methods:

1.  **Check log files directly**:
    The logs are located in the `/var/log/pods` directory.
2.  **Use Docker to view container logs**:
    ```bash
    docker logs <container-id>
    ```

Alternatively, you can enable the `kubectl logs` feature to access logs from the cloud side. See [Enable kubectl logs/exec to debug pods on the edge](https://kubeedge.io/docs/advanced/debug/).

---

## Important Considerations

  - Device CRDs are **v1beta1** since v1.15. Older `v1alpha1` and `v1alpha2` CRDs are deprecated.
  - Always replace version numbers (`v1.21.0` in this example) with the version you plan to install.
  - Official release artifacts and checksums are on the [KubeEdge v1.21.0 release page](https://github.com/kubeedge/kubeedge/releases/tag/v1.21.0).
  - CRDs are located in the [build/crds folder of the KubeEdge GitHub repository](https://github.com/kubeedge/kubeedge/tree/v1.21.0/build/crds).

<!-- end list -->

```
```
