---
title: Device CRDs
sidebar_position: 3
---

# **Device CRDs**

KubeEdge supports device management using **Kubernetes Custom Resource Definitions (CRDs)** and a **Device Mapper** corresponding to the physical devices.  

We define devices using two primary resources: **Device Model** and **Device Instance**.

---

## Notice

Device CRDs were updated from **v1alpha2** to **v1beta1** in release **v1.15**.

**Compatibility Warning:** The `v1beta1` CRDs are **not compatible** with `v1alpha1` and `v1alpha2`. Older device CRDs must be **migrated** to the new specification.

For detailed migration information, please refer to the [device-crd-v1beta1 proposal](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/sig-device-iot/device-crd-v1beta1.md).

---

## Device Model

A **Device Model** defines constraints on the properties and parameters of a **type** of physical device. It essentially describes the properties exposed by a specific kind of device.

### Device Model Sample

A sample `DeviceModel` is shown below. For the complete definition, refer to the [device-model YAML](https://github.com/kubeedge/kubeedge/blob/master/build/crds/devices/devices_v1beta1_devicemodel.yaml).

```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: DeviceModel
metadata:
  name: beta1-model
spec:
  properties:
    - name: temp
      description: Temperature attribute
      type: INT
      accessMode: ReadWrite
      maximum: "100"
      minimum: "1"
      unit: "Celsius"
  protocol: modbus
```

This example defines a `DeviceModel` named `beta1-model` which utilizes the **Modbus** protocol. It defines a property called `temp` with a data type of **INT**, specifies its access mode (`ReadWrite`), value range (`1` to `100`), and unit (`Celsius`).

---

## Device Instance

A **Device Instance** (represented by the `Device` CRD) represents an **actual physical device** object.

It includes a list of device properties and describes concrete details such as the device's name, type, access method, and how it reports data.

### Device Instance Sample

A sample `Device` (Device Instance) is shown below. For the complete definition, refer to the [device-instance YAML](https://github.com/kubeedge/kubeedge/blob/master/build/crds/devices/devices_v1beta1_device.yaml).

```yaml
apiVersion: devices.kubeedge.io/v1beta1
kind: Device
metadata:
  name: beta1-device
spec:
  deviceModelRef:
    name: beta1-model
  nodeName: worker-node1 # Must match an existing node in the cluster
  properties:
    - name: temp
      collectCycle: 10000000000 # Report data to cloud every 10 seconds (in nanoseconds)
      reportCycle: 10000000000  # Push data to apps or DB every 10 seconds (in nanoseconds)
      reportToCloud: true
      desired:
        value: "30"
      pushMethod:
        mqtt:
          address: tcp://127.0.0.1:1883
          topic: temp
          qos: 0
          retained: false
        dbMethod:
          influxdb2:
            influxdb2ClientConfig:
              url: http://127.0.0.1:8086
              org: test-org
              bucket: test-bucket
            influxdb2DataConfig:
              measurement: stat
              tag:
                unit: temperature
              fieldKey: beta1test
      visitors:
        protocolName: modbus
        configData:
          register: "HoldingRegister"
          offset: 2
          limit: 1
          scale: 1
          isSwap: true
          isRegisterSwap: true
  protocol:
    protocolName: modbus
    configData:
      ip: 172.17.0.3
      port: 1502
```

This example defines a device named `beta1-device` that is:

1.  Associated with the `DeviceModel` named **`beta1-model`**.
2.  Scheduled to run on the cluster node **`worker-node1`**.

It specifies:

  * **Message reporting frequency** (`collectCycle` and `reportCycle`).
  * **Message push methods** (e.g., via **MQTT** and **InfluxDB2**).
  * **Access parameters** (`spec.properties.visitors`) for interacting with the physical device's property (e.g., the Modbus register details).
  * **Protocol configuration** (`spec.protocol`) for the device's main connection (e.g., the Modbus IP and Port).

---

## Usage of Device CRD

The following steps outline the process for deploying and verifying KubeEdge Device CRDs on the cloud node.

1.  ### Create a Device Model

    Apply the Device Model YAML file to the cluster:

    ```bash
    kubectl apply -f <path-to-device-model-yaml>
    ```

    Verify the Device Model creation:

    ```bash
    kubectl get devicemodels
    ```

2.  ### Create a Device Instance

    Apply the Device Instance YAML file to the cluster:

    ```bash
    kubectl apply -f <path-to-device-instance-yaml>
    ```

    Verify the Device Instance creation:

    ```bash
    kubectl get devices
    ```
