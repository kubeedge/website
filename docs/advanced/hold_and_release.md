---
title: Resource Upgrade Control at Edge
sidebar_position: 4
---

## Abstract

In edge computing scenarios such as drones, robotics, and autonomous vehicles, uncontrolled resource upgrades can cause serious safety and operational issues.
The `hold-and-release` mechanism allows edge administrators to control when upgrades to edge resources occur, ensuring that resources cannot be upgraded without explicit confirmation from the edge.

![Resource Upgrade Control at Edge](/img/edged/resource_upgrade_control_at_edge.gif)

This feature enables you to:

- Hold resource upgrades at the edge using annotations `edge.kubeedge.io/hold-upgrade: "true"`
- Release the hold only when the edge system is in a safe state
- Maintain operational safety for critical edge applications

![Hold and Release Mechanism](/img/edged/edge-resource-upgrade-control.png)

1. **Hold Upgrades**: When a Pod with `edge.kubeedge.io/hold-upgrade: "true"` annotation is created (during an upgrade), the edge node's `edged` component intercepts it and stores it in an internal queue instead of starting the Pod.

2. **Status Reporting**: A `HeldUpgrade` condition is added to the Pod status and reported to the cloud, indicating that the upgrade is intentionally held.

3. **Persistence**: If the edge node restarts, held Pod upgrades are automatically recovered from MetaManager and remain in the held state.

4. **Release**: When an unhold command is issued (via `keadm ctl` or API), the cached Pod upgrade is released to the container runtime, and the Pod starts normally.

See more details at [Design  Proposal for Resource Upgrade Control at Edge](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/sig-node/edge-resource-upgrade-control.md).

## Use cases

- **Robotics / Robots**

  An automatic resource update in the middle of the operation or actuation could interrupt motion, possibly causing actuator lock-up or crash, production halt, safety hazard to nearby human operators.
  Robot system signals when the actuators are idle and in safe pose, only then does edged apply the updated container to ensure updates occur during defined maintenance windows or pause states.

- **Autonomous Car / AMR / AGV**

  If a resource update restarts the perception or control module mid-navigation, vehicle may stop unexpectedly, possibly causing risk of collision or failure to navigate, loss of customer trust and service reliability.
  The local system inside the vehicle controls when it is parked or charging, it toggles the flag or sends a signal to enable the resource update only when the car system is ready to do so.
  This ensures zero disruption to the driving session.

- **Drone / Aerospace**

  If the update hits mid-flight, the pod restart disconnects the telemetry stream or flight control interface.
  This could possibly trigger emergency landing or flyaway condition, the worst case is crash down on the ground.
  Edge device onboard drone (e.g. PX4 companion computer) knows flight state always, then signals when landed or in safe altitude hold mode.
  Resource updates only can be applied to post-flight or during downtime.

- **Edge AI / Machine Learning**

  Controls when model upgrades are applied to prevent inference disruption.
  Allows model validation before deployment.
  Ensures smooth transition between model versions.

## Getting Started

### Prerequisites

Before using annotations `edge.kubeedge.io/hold-upgrade: "true"`, ensure you have:

- KubeEdge `v1.22.0` or later installed
- MetaServer component running on edge nodes (required for unhold operations)
- `kubectl` configured to access your Kubernetes cluster
- (recommended) `keadm` CLI tool available on edge nodes
- Edge nodes running and connected to the cloud

### Deploy Resource

First, create a `Deployment` without the `hold-upgrade` annotation.

Create a file named `busybox-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: busybox-deployment
  labels:
    app: busybox
spec:
  replicas: 1
  selector:
    matchLabels:
      app: busybox
  template:
    metadata:
      labels:
        app: busybox
    spec:
      hostNetwork: true
      containers:
      - name: busybox
        image: busybox:1.36
        command: ["sh", "-c", "echo Running && sleep 3600"]
        imagePullPolicy: IfNotPresent
```

Apply the deployment:

```bash
kubectl apply -f busybox-deployment.yaml
```

Verify the deployment is running:

```bash
kubectl get pod -A -o wide
```

You should see the pod running on your edge node:

```console
$ kubectl get pod -A -o wide
NAMESPACE            NAME                                         READY   STATUS    RESTARTS   AGE   IP              NODE                 NOMINATED NODE   READINESS GATES
default              busybox-deployment-74f696fddd-5mjxp          1/1     Running   0          10s   192.168.0.138   edge-node            <none>           <none>
```

### Upgrade Resource and Hold

Now let's update the `Deployment` to use `hold-upgrade` annotation.
The upgrade will be held at the edge due to the `edge.kubeedge.io/hold-upgrade: "true"` annotation.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: busybox-deployment
  labels:
    app: busybox
spec:
  replicas: 1
  selector:
    matchLabels:
      app: busybox
  template:
    metadata:
      labels:
        app: busybox
      annotations:
        edge.kubeedge.io/hold-upgrade: "true"  # Added hold-upgrade annotations
    spec:
      hostNetwork: true
      containers:
      - name: busybox
        image: busybox:1.37 # upgrade to new version
        command: ["sh", "-c", "echo Running && sleep 3600"]
        imagePullPolicy: IfNotPresent
```

### Unhold Resource to Upgrade

When the edge system is ready to accept the upgrade (e.g., drone has landed, robot is idle, vehicle is parked), you can release the hold using one of the following methods:

Be advised that the following commands need to be issued on the edge node system.

#### `keadm ctl unhold-upgrade` (recommended)

This unholds all the upgrades in the specified node.

```bash
keadm ctl unhold-upgrade node edge-node
```

#### `curl` command

If you want to unhold the upgrade on a specific pod:

```bash
curl -X POST \
  --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  -H "Content-Type: text/plain" \
  --data "default/busybox-deployment-74f696fddd-5mjxp" \
  https://127.0.0.1:10550/api/v1/pods/unhold-upgrade
```

Or if you want to unhold all the upgrades in the node:

```bash
curl -X POST \
  --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt \
  -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
  -H "Content-Type: text/plain" \
  --data "edge-node" \
  https://127.0.0.1:10550/api/v1/nodes/unhold-upgrade
```

After releasing the hold, the new Pod will start running and the old Pod will be terminated:

```console
$ kubectl get pod -A -o wide
NAMESPACE            NAME                                         READY   STATUS        RESTARTS   AGE     IP              NODE                 NOMINATED NODE   READINESS GATES
default              busybox-deployment-6dfb445476-5gpdv          1/1     Running       0          6m4s    192.168.0.138   edge-node            <none>           <none>
default              busybox-deployment-74f696fddd-5mjxp          1/1     Terminating   0          8m52s   192.168.0.138   edge-node            <none>           <none>
```

## Supported Resource Types

The hold and release mechanism supports the following Kubernetes resources:

| Resource           | Supported | Description / Use Case                                                               |
| ------------------ | --------- | ------------------------------------------------------------------------------------ |
| **Pods**           | ✅ Yes    | Primary unit of runtime workload. Direct Pod upgrades can be held.                  |
| **Deployments**    | ✅ Yes    | Pod upgrades triggered by Deployment changes are held at the edge.                  |
| **StatefulSets**   | ✅ Yes    | Stateful services upgrades are held to prevent data loss or service interruption.   |
| **DaemonSets**     | ✅ Yes    | Upgrades to edge agents and system daemons can be controlled.                       |

## Appendix

### Unpredictable Upgrade Order

In hybrid environments with both cloud and edge nodes, the order in which Kubernetes selects Pods (and thus nodes) for upgrade is not predictable.
The default rolling update strategy might lead to unexpected behavior if certain edge nodes hold upgrades while cloud nodes proceed normally.
Therefore, it's essential for users to tune the `rollingUpdate` parameters appropriately to avoid upgrade bottlenecks and better align with custom upgrade control mechanisms like the hold-and-release feature.
