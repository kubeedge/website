---
title: Device Management
sidebar_position: 3
---

## How does KubeEdge handle IoT devices?

KubeEdge takes a Kubernetes-native approach to device management. Instead of building separate platforms for your IoT devices, you define them as Kubernetes Custom Resources (CRDs) and manage them with `kubectl` just like pods and deployments.

There are two main CRDs you'll work with:

**DeviceModel** - This defines what a type of device looks like. Think of it as a template:
```yaml
apiVersion: devices.kubeedge.io/v1alpha2
kind: DeviceModel
metadata:
  name: temperature-model
spec:
  properties:
    - name: temperature
      description: temperature in degree celsius
      type: float
      accessMode: ReadOnly
      defaultValue: 0.0
```

**Device** - This is an actual instance of a device. It references a DeviceModel and adds the real-world stuff like which node it's connected to and what its current state is:
```yaml
apiVersion: devices.kubeedge.io/v1alpha2
kind: Device
metadata:
  name: temperature-sensor-01
  labels:
    description: Temperature sensor on factory floor
spec:
  deviceModelRef:
    name: temperature-model
  nodeSelector:
    nodeSelectorTerms:
      - matchExpressions:
          - key: ''
            operator: In
            values:
              - edge-node-01
  properties:
    - name: temperature
      collectCycle: 5000
      desired:
        value: "0"
        metadata:
          timestamp: ""
          type: integer
      reportCycle: 5000
      reported:
        metadata:
          timestamp: ""
          type: integer
        value: "25"
```

The cloud-side `DeviceController` watches these CRDs and syncs the state to the edge. The edge node then uses a "Mapper" to translate this into actual device commands.

## What's a Mapper and how do I use it?

A Mapper is basically a translator between KubeEdge and your physical devices. It runs on the edge node and handles the actual communication with your sensors, actuators, etc.

Here's the flow:
1. You define your device as a CRD
2. EdgeCore syncs that definition to the edge
3. The Mapper connects to the physical device using whatever protocol it speaks (Modbus, OPC-UA, Bluetooth, etc.)
4. The Mapper pushes telemetry data to EdgeCore
5. EdgeCore syncs it back to the cloud

KubeEdge has some built-in mappers for common protocols, and there's a Mapper Framework if you need to build your own. The framework generates boilerplate code so you just need to implement the actual device communication part.

Check out the [mapper-framework docs](../developer/mapper-framework.md) if you want to build a custom mapper.

## What's DMI?

DMI stands for Device Mapper Interface. It's basically the contract between EdgeCore and Mappers - kind of like how CRI is the contract between kubelet and container runtimes.

The main things DMI handles:
- **Device CRUD**: Adding, updating, deleting devices
- **Data flow**: Getting telemetry from devices to the cloud
- **Control**: Sending commands from the cloud to devices

If you're just using the built-in mappers, you don't really need to think about DMI. It's more relevent if you're building a custom mapper.

## My device isn't showing up in the cluster

This is a pretty common issue. Here's a troubleshooting checklist:

**1. Is the Mapper running?**

```shell
# Check mapper pod status
kubectl get pods -n kubeedge | grep mapper

# Check mapper logs
kubectl logs -n kubeedge <mapper-pod-name>
```

**2. Is the device CRD applied correctly?**

```shell
kubectl get device -n kubeedge
kubectl describe device <device-name> -n kubeedge
```

Look for any errors in the status section. Common issues:
- `nodeSelector` doesn't match any edge nodes
- `deviceModelRef` points to a non-existent model

**3. Is the Mapper actually talking to the device?**

This depends on your protocol, but for Modbus/TCP for example:
```shell
# Can you reach the device from the edge node?
telnet <device-ip> <port>

# Check if the mapper logs show connection errors
kubectl logs -n kubeedge <mapper-pod> | grep -i error
```

**4. Check EdgeCore device sync**

```shell
# On the edge node
edgecore logs | grep -i device
```

You should see lines about device sync if everything is working. If you see errors about DMI or device not found, there's a sync issue.

## How do I update device properties from the cloud?

You can use `kubectl patch` or just edit the device directly:

```shell
kubectl patch device <device-name> -n kubeedge --type merge -p '{"spec":{"properties":[{"name":"switch","desired":{"value":"1"}}]}}'
```

Or edit interactively:
```shell
kubectl edit device <device-name> -n kubeedge
```

Then change the `desired.value` for the property you want to update. The Mapper on the edge should pick up the change and send it to the physical device.

If the property isn't updating on the physical device, check:
- Mapper logs for errors
- That the property name matches exactly what the Mapper expects
- That the value type is correct (string "1" vs integer 1)

## Can I use KubeEdge devices without a Mapper?

Nope. The Mapper is what actually talks to the physical hardware. Without it, KubeEdge just has the metadata definition but no way to actually communicate with the device.

That said, you could write a "fake" Mapper that just simulates device data for testing purposes. It would follow the same DMI interface but instead of talking to real hardware, it just generates random values. Useful for testing device management workflows without physical devices.

## Multiple devices on the same edge node

You can absolutly have multiple devices on the same edge node. Just create multiple Device CRDs all pointing to the same node in the `nodeSelector`:

```yaml
apiVersion: devices.kubeedge.io/v1alpha2
kind: Device
metadata:
  name: sensor-01
spec:
  deviceModelRef:
    name: temperature-model
  nodeSelector:
    nodeSelectorTerms:
      - matchExpressions:
          - key: ''
            operator: In
            values:
              - factory-floor-node
```

```yaml
apiVersion: devices.kubeedge.io/v1alpha2
kind: Device
metadata:
  name: sensor-02
spec:
  deviceModelRef:
    name: temperature-model
  nodeSelector:
    nodeSelectorTerms:
      - matchExpressions:
          - key: ''
            operator: In
            values:
              - factory-floor-node
```

The Mapper will handle all of them. How it handles multiple devices depends on the protocol - for Modbus it usually polls each device in sequence, for MQTT it subscribes to multiple topics, etc.
