---
title: Network & Communication
sidebar_position: 4
---

## Which protocols connect EdgeCore to CloudCore?

EdgeHub supports WebSocket over TCP and QUIC over UDP. WebSocket is enabled by default. The CloudCore defaults enable WebSocket on port 10000 and use port 10002 for the HTTPS service used during edge certificate setup. QUIC is configurable on port 10001, but it is not enabled by default. See the [CloudCore and EdgeCore configuration guide](../setup/config.md) and [installation guide](../setup/install-with-keadm.md) before changing firewall rules.

CloudCore's server settings are under `modules.cloudHub.websocket` and `modules.cloudHub.quic`. EdgeCore's client addresses are configured separately under `modules.edgeHub.websocket.server` and `modules.edgeHub.quic.server`. Use the generated configuration file as a starting point, since available fields can vary by release.

## What is EdgeMesh?

EdgeMesh is an optional networking component for service discovery and traffic proxying in edge scenarios. It is separate from EdgeCore. Read the [EdgeMesh guide](../advanced/edgemesh.md) for its supported features and installation steps; do not assume every EdgeMesh feature is enabled by default in a KubeEdge cluster.

## What keeps running when the cloud connection is down?

EdgeCore continues managing workloads it already knows about on the edge node. It reconnects to CloudCore when the link returns. New changes from the cloud cannot reach the edge while disconnected, and reconciliation depends on the current KubeEdge version and resource. See [MetaManager](../architecture/edge/metamanager.md) and [EdgeHub](../architecture/edge/edgehub.md).

## Can EdgeCore connect from behind a NAT or firewall?

Yes. EdgeCore initiates its connection to CloudCore, so the CloudCore service must be reachable from the edge nodes. For the standard installation, the [KubeEdge installation guide](../setup/install-with-keadm.md) says ports 10000 and 10002 must be accessible from edge nodes. If you enable QUIC, allow its configured UDP port as well. Ensure the CloudCore `advertiseAddress` values match addresses the edge nodes use to reach CloudCore, because those addresses are used for certificate validation.

## Edge nodes cannot reach CloudCore

Check the edge node can resolve the CloudCore hostname and reach the configured WebSocket or QUIC endpoint. Check the CloudCore service and firewall rules on the cloud side. For a Kubernetes-deployed CloudCore, inspect its pod and logs with:

```shell
kubectl get pods -n kubeedge
kubectl logs -n kubeedge <cloudcore-pod-name>
```

For EdgeCore running as a systemd service, use:

```shell
systemctl status edgecore
journalctl -u edgecore.service -xe
```

See the [installation troubleshooting guide](../setup/install-with-keadm.md) for certificate and connectivity errors.

## How can I check whether the edge node is connected?

From the Kubernetes control plane, check the node status:

```shell
kubectl get nodes
```

A `Ready` condition is useful context, but it does not by itself diagnose the CloudCore connection. Check EdgeCore and CloudCore logs for connection or certificate errors. EdgeCore's log location and command depend on how it was installed; for a systemd installation, use `journalctl -u edgecore.service -xe`.

## EdgeMesh is not providing connectivity

First check the EdgeMesh installation and configuration using the [EdgeMesh guide](../advanced/edgemesh.md). Confirm its pods are healthy, then check DNS and network reachability from the affected workloads. EdgeMesh ports and deployment details depend on its version and configuration, so use that guide rather than opening guessed ports.
