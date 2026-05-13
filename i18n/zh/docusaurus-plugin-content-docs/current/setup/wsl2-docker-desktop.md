---
title: 在 Windows 上运行 KubeEdge（WSL2 + Docker Desktop）
sidebar_position: 9
---

> **适用版本：** KubeEdge v1.13+
> **相关 Issue：** [kubeedge/website#797](https://github.com/kubeedge/website/issues/797)

本文档说明如何在 Windows 环境下通过 **WSL2**（Windows Subsystem for Linux 2）和 **Docker Desktop** 运行 KubeEdge 边缘节点。

:::note 中文翻译说明
本页面为英文原文的占位镜像，完整内容请参阅英文版本（English documentation）。
:::

---

## WSL2 环境特殊要求概览

WSL2 不是标准的 Linux 环境，在运行 EdgeCore 之前，必须满足以下六个要求：

| # | 要求 | 跳过时的现象 |
|---|---|---|
| 1 | 启用 systemd | `keadm join` 后 EdgeCore 静默失败 |
| 2 | 在 WSL2 内安装原生 containerd | `dial unix /run/containerd/containerd.sock: no such file` |
| 3 | 设置 `cgroupDriver: systemd` | ContainerManager 启动失败 |
| 4 | 设置 `failSwapOn: false` | EdgeCore 因 swap 校验拒绝启动 |
| 5 | 手动安装 CNI 插件 | 边缘节点持续处于 `NotReady` 状态 |
| 6 | 安装 iptables | Pod 创建失败，卡在 `ContainerCreating` |

---

## 完整步骤

请参考英文完整文档以获取所有步骤的详细命令和说明。

### 步骤 1：在 WSL2 中启用 systemd

```bash
sudo tee /etc/wsl.conf << 'EOF'
[boot]
systemd=true
EOF
```

然后在 **Windows PowerShell** 中执行：

```powershell
wsl --shutdown
```

验证：

```bash
ps -p 1 -o comm=
# 输出必须为：systemd
```

### 步骤 2：在 WSL2 内安装原生 containerd

```bash
sudo apt-get update
sudo apt-get install -y containerd
sudo systemctl enable --now containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
```

### 步骤 3：修正 cgroupDriver

编辑 `/etc/kubeedge/config/edgecore.yaml`：

```yaml
edged:
  cgroupDriver: systemd
```

### 步骤 4：禁用 Swap 校验

编辑 `/etc/kubeedge/config/edgecore.yaml`：

```yaml
edged:
  failSwapOn: false
```

### 步骤 5：安装 CNI 插件

```bash
# 可在 https://github.com/containernetworking/plugins/releases 查看最新版本
CNI_PLUGINS_VERSION="v1.5.0"
sudo mkdir -p /opt/cni/bin
wget "https://github.com/containernetworking/plugins/releases/download/${CNI_PLUGINS_VERSION}/cni-plugins-linux-amd64-${CNI_PLUGINS_VERSION}.tgz" \
  -O /tmp/cni.tgz
sudo tar -xzf /tmp/cni.tgz -C /opt/cni/bin
```

### 步骤 6：安装 iptables

```bash
sudo apt-get install -y iptables
```

### 最终：重启并验证

```bash
sudo systemctl restart edgecore
sudo systemctl status edgecore
kubectl get nodes
```
