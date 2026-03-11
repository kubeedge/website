---
title: Keadm CTL Commands
sidebar_position: 8
---

# Keadm CTL Commands

`keadm ctl` provides a set of commands for operating on the data plane at edge nodes. These commands help you manage edge pods, troubleshoot issues, and control edge node operations effectively.

## Overview

The `keadm ctl` command includes 8 subcommands for edge node management:

- `get` - Get information about edge resources
- `describe` - Describe edge resources in detail  
- `logs` - View logs from edge pods
- `exec` - Execute commands in edge pods
- `restart` - Restart edge pods
- `confirm` - Confirm edge operations
- `unhold-upgrade` - Release held pod upgrades
- `edit` - Edit edge resources

## Prerequisites

Before using `keadm ctl` commands, ensure:

1. KubeEdge is properly installed and running
2. Edge nodes are connected to the cloud
3. You have appropriate permissions to manage edge resources
4. The `kubectl logs/exec` feature is enabled (see [Enable Kubectl logs/exec](/docs/advanced/debug/))

## Command Reference

### get

Get information about edge resources.

```bash
# Get all edge pods
keadm ctl get pods

# Get edge nodes
keadm ctl get nodes

# Get specific edge pod
keadm ctl get pod <pod-name> --node <edge-node>
```

**Examples:**

```bash
# List all pods running on edge nodes
keadm ctl get pods --all-edge-nodes

# Get pods on specific edge node
keadm ctl get pods --node edge-node-1

# Get edge node status
keadm ctl get nodes edge-node-1
```

### describe

Describe edge resources in detail.

```bash
# Describe an edge pod
keadm ctl describe pod <pod-name> --node <edge-node>

# Describe an edge node
keadm ctl describe node <edge-node>
```

**Examples:**

```bash
# Get detailed information about a pod
keadm ctl describe pod nginx-deployment-123 --node edge-node-1

# Describe edge node with detailed status
keadm ctl describe node edge-node-1 --detailed
```

### logs

View logs from edge pods.

```bash
# Get logs from an edge pod
keadm ctl logs <pod-name> --node <edge-node>

# Follow logs in real-time
keadm ctl logs <pod-name> --node <edge-node> --follow

# Get logs with specific number of lines
keadm ctl logs <pod-name> --node <edge-node> --tail=100
```

**Examples:**

```bash
# View recent logs
keadm ctl logs my-app --node edge-node-1 --tail=50

# Follow logs in real-time
keadm ctl logs my-app --node edge-node-1 --follow

# Get logs from previous container instance
keadm ctl logs my-app --node edge-node-1 --previous
```

### exec

Execute commands in edge pods.

```bash
# Execute command in edge pod
keadm ctl exec <pod-name> --node <edge-node> -- <command>

# Get interactive shell
keadm ctl exec <pod-name> --node <edge-node> -it -- /bin/bash

# Execute command in specific container
keadm ctl exec <pod-name> --node <edge-node> -c <container-name> -- <command>
```

**Examples:**

```bash
# Get interactive shell
keadm ctl exec my-app --node edge-node-1 -it -- /bin/sh

# Check environment variables
keadm ctl exec my-app --node edge-node-1 -- env

# List files in a directory
keadm ctl exec my-app --node edge-node-1 -- ls -la /app
```

### restart

Restart edge pods.

```bash
# Restart an edge pod
keadm ctl restart <pod-name> --node <edge-node>

# Restart multiple pods
keadm ctl restart <pod1> <pod2> --node <edge-node>

# Force restart
keadm ctl restart <pod-name> --node <edge-node> --force
```

**Examples:**

```bash
# Restart a specific pod
keadm ctl restart nginx-deployment-123 --node edge-node-1

# Restart all pods in a deployment
keadm ctl restart --deployment nginx --node edge-node-1

# Force restart stuck pod
keadm ctl restart problematic-pod --node edge-node-1 --force
```

### confirm

Confirm edge operations.

```bash
# Confirm pod status
keadm ctl confirm pod <pod-name> --node <edge-node>

# Confirm node readiness
keadm ctl confirm node <edge-node>

# Confirm all edge operations
keadm ctl confirm all --node <edge-node>
```

**Examples:**

```bash
# Confirm pod is running properly
keadm ctl confirm pod my-app --node edge-node-1

# Confirm edge node is ready
keadm ctl confirm node edge-node-1

# Confirm all resources on edge node
keadm ctl confirm all --node edge-node-1
```

### unhold-upgrade

Release held pod upgrades.

```bash
# Release held upgrades on specific node
keadm ctl unhold-upgrade node <edge-node>

# Release specific pod upgrade
keadm ctl unhold-upgrade pod <pod-name> --node <edge-node>

# Release all held upgrades
keadm ctl unhold-upgrade all
```

**Examples:**

```bash
# Release all held upgrades on edge node
keadm ctl unhold-upgrade node edge-node-1

# Release specific pod from held state
keadm ctl unhold-upgrade pod my-app --node edge-node-1

# Release all held upgrades cluster-wide
keadm ctl unhold-upgrade all
```

### edit

Edit edge resources.

```bash
# Edit a pod configuration
keadm ctl edit pod <pod-name> --node <edge-node>

# Edit node configuration
keadm ctl edit node <edge-node>

# Edit with specific editor
keadm ctl edit pod <pod-name> --node <edge-node> --editor=vim
```

**Examples:**

```bash
# Edit pod configuration
keadm ctl edit pod my-app --node edge-node-1

# Edit edge node settings
keadm ctl edit node edge-node-1

# Use nano as editor
keadm ctl edit pod my-app --node edge-node-1 --editor=nano
```

## Common Workflows

### Troubleshooting Edge Pods

```bash
# 1. Check pod status
keadm ctl get pods --node edge-node-1

# 2. Get detailed pod information
keadm ctl describe pod problematic-pod --node edge-node-1

# 3. View recent logs
keadm ctl logs problematic-pod --node edge-node-1 --tail=100

# 4. Execute diagnostic commands
keadm ctl exec problematic-pod --node edge-node-1 -- ps aux

# 5. Restart if needed
keadm ctl restart problematic-pod --node edge-node-1
```

### Managing Edge Node Upgrades

```bash
# 1. Hold pod upgrades (if needed)
# This is typically done through the hold mechanism

# 2. Check held upgrades
keadm ctl get pods --node edge-node-1

# 3. Release held upgrades when ready
keadm ctl unhold-upgrade node edge-node-1

# 4. Confirm operations
keadm ctl confirm all --node edge-node-1
```

### Monitoring Edge Resources

```bash
# 1. Get overview of all edge resources
keadm ctl get pods --all-edge-nodes
keadm ctl get nodes

# 2. Monitor specific node
keadm ctl describe node edge-node-1
keadm ctl get pods --node edge-node-1

# 3. Check pod health
keadm ctl confirm all --node edge-node-1
```

## Troubleshooting

### Common Issues

1. **Command not found**
   - Ensure keadm is installed and in PATH
   - Check KubeEdge installation

2. **Permission denied**
   - Verify you have appropriate permissions
   - Check RBAC settings

3. **Edge node not reachable**
   - Verify edge node connectivity
   - Check cloudcore and edgecore status

4. **Pod operations failing**
   - Check pod status with `keadm ctl describe`
   - Verify edge node resources
   - Check network connectivity

### Debug Commands

```bash
# Check edge node connectivity
keadm ctl get nodes

# Verify cloudcore status
kubectl get pods -n kubeedge

# Check edgecore logs
keadm ctl logs edgecore --node edge-node-1

# Test basic operations
keadm ctl get pods --node <edge-node>
```

## Best Practices

1. **Use specific node targeting** - Always specify the edge node when possible
2. **Check status before operations** - Use `describe` to understand current state
3. **Monitor logs** - Use `logs --follow` for real-time monitoring
4. **Test in non-production** - Validate commands in test environment first
5. **Document changes** - Keep track of configuration changes made with `edit`

## Integration with kubectl

`keadm ctl` commands complement standard `kubectl` operations:

- Use `kubectl` for cluster-wide operations
- Use `keadm ctl` for edge-specific operations
- Combine both for comprehensive edge management

```bash
# Get cluster overview with kubectl
kubectl get nodes --show-labels

# Get edge-specific details with keadm ctl
keadm ctl get pods --all-edge-nodes

# Use kubectl for configuration
kubectl edit deployment my-app

# Use keadm ctl for edge pod management
keadm ctl restart my-app-pod-123 --node edge-node-1
```

## Additional Resources

- [KubeEdge Setup Guide](/docs/setup/install-with-keadm/)
- [Enable Kubectl logs/exec](/docs/advanced/debug/)
- [Hold and Release Edge Upgrades](/docs/advanced/hold_and_release/)
- [KubeEdge Troubleshooting](/docs/developer/troubleshooting/)
