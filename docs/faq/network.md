---
title: Network & Communication
sidebar_position: 4
---

## What protocols does KubeEdge use for cloud-edge communication?

KubeEdge supports two main protocols: WebSocket and QUIC. By default it uses WebSocket, but you can switch to QUIC if your network conditions call for it.

**WebSocket** is what most people use. It's TCP-based, works well with firewalls and proxies, and is generally more compatible with enterprise network setups. It's the default for a reason.

**QUIC** is built on UDP and handles packet loss way better than TCP. If you're running on sketchy networks (cellular, satellite, congested WiFi), QUIC is worth considering. The handshake is also faster which helps with reconnection times.

You configure this in the cloudcore config:
```yaml
modules:
  cloudHub:
    websocket:
      enable: true
      handshakeTimeout: 30
      readDeadline: 15
      writeDeadline: 15
      server: 10000
    quic:
      enable: false
      handshakeTimeout: 30
      readDeadline: 15
      writeDeadline: 15
      server: 10001
```

The ports here matter - 10000 is the default WebSocket port, 10001 is QUIC. Make sure these ports are open between your cloud and edge networks.

## What is EdgeMesh?

EdgeMesh is KubeEdge's networking layer for edge-to-edge and edge-to-cloud communication. Think of it as the edge equivalent of kube-proxy but with some extra edge-specific features.

The main things it does:

**Service discovery**: Edge apps can discover and connect to other services using standard Kubernetes DNS. So if you have a sensor app and a processing app on the same edge node, they can talk to each other by service name just like in the cloud.

**Cross-subnet communication**: This is the cool part. If you have edge nodes on different local networks (like different factory floors or branch offices), EdgeMesh can route traffic between them without needing VPNs or complex network setups. It does this using a mesh proxy that runs on each edge node.

**Offline service proxy**: When the cloud connection drops, EdgeMesh keeps local services communicating. Your apps can still talk to each other on the same edge node even without the cloud.

You can install EdgeMesh using helm:
```shell
helm repo add edge-mesh https://kubeedge.github.io/edge-mesh
helm install edge-mesh edge-mesh/edge-mesh -n kubeedge
```

Check if it's running:
```shell
kubectl get pods -n kubeedge | grep edge-mesh
```

## How does KubeEdge handle network outages?

This is one of KubeEdge's strong points. Here's what happens step by step:

1. **Connection drops**: EdgeHub (the networking component inside EdgeCore) notices the connection to CloudHub is gone
2. **Heartbeat stops**: EdgeHub stops sending heartbeats since there's no one to send them to
3. **Local mode kicks in**: The edge node switches to offline autonomous mode. Pods keep running, services keep working.
4. **Reconnection**: EdgeHub starts trying to reconnect. It has exponential backoff so it doesn't hammer the cloud.
5. **Sync**: Once connected, EdgeCore does a full sync to reconcile any differences between cloud and edge state.

The sync is pretty robust - it handles cases where both sides might have made changes during the outage. Generally the cloud wins for conflicts, but it's smart about it.

You can see the reconnection happening in the logs:
```shell
# On edge node
edgecore logs | grep -i reconnect
```

## Can I run KubeEdge behind a NAT or firewall?

Yes, and this is actually how most people deploy it. KubeEdge is designed for this:

- **CloudCore** needs to be reachable from the edge nodes. It should have a public IP, domain name, or load balancer in front of it.
- **EdgeCore** initiates the connection from behind the NAT/firewall to CloudCore. Once that connection is established, all traffic flows over it.

So you only need to open one port (default 10000 for WebSocket) in your cloud-side firewall. The edge side doesn't need any incoming ports opened.

If you're using QUIC instead of WebSocket, you'd open port 10001 instead. And if you're running the certificate server seperately, that's another port (default 10002).

One gotcha: if your NAT changes the source IP of outgoing connections, make sure CloudCore's advertise-address matches what the edge nodes see. Otherwise you'll get certificate errors.

## Edge nodes can't reach CloudCore

This is one of the most common issues people hit. Here's a systematic way to debug it:

**1. Basic connectivity**
```shell
# On edge node
ping <cloudcore-ip>
telnet <cloudcore-ip> 10000
```

If ping works but telnet doesn't, it's a firewall issue. Check security groups, network ACLs, etc.

**2. DNS resolution**
```shell
# If using a hostname
nslookup <cloudcore-hostname>
```

**3. CloudCore is actually listening**
```shell
# On cloud node
ss -tlnp | grep 10000
# or
netstat -tlnp | grep 10000
```

**4. Check CloudCore logs**
```shell
kubectl logs -n kubeedge -l app=cloudcore --tail=100
```

Look for connection attempts from the edge node IP. If you see nothing, the traffic isn't reaching CloudCore.

**5. Network policy**
If you have Kubernetes NetworkPolicy or Istio, make sure they're not blocking traffic on port 10000.

## How do I check the cloud-edge connection status?

From the cloud side:
```shell
kubectl get nodes
```

Edge nodes that are connected will show `Ready` status. If they show `NotReady`, something's wrong with the connection.

From the edge node:
```shell
edgecore logs | grep -i websocket
```

You should see regular connection activity. If you see lots of "dial error" or "reconnect" messages, there's a network issue.

You can also check the connection metrics if you have Prometheus set up:
```shell
# CloudCore metrics endpoint
curl http://localhost:10002/metrics | grep edge_connection
```

## Multiple network interfaces on edge node

If your edge node has multiple network interfaces (like ethernet + WiFi, or multiple NICs), you need to make sure EdgeCore uses the right one to connect to CloudCore.

By default EdgeCore will use whatever interface has a default route. If you need to specify a different interface, you can set the `--advertise-address` flag or configure it in edgecore.yaml:

```yaml
modules:
  edgeHub:
    heartbeat: 15
    # This is the address EdgeCore uses to connect to CloudCore
    server: <cloudcore-ip>:10000
```

The key thing is that the IP address in `server` must be reachable from the edge node. You can test this with curl:
```shell
curl -k https://<cloudcore-ip>:10000
```

If you get a response (even an error), the connection works. If it times out, you have a network connectivity issue to solve first.

## EdgeMesh isn't working between nodes

If EdgeMesh service discovery isn't working across edge nodes, check these:

**1. Is EdgeMesh running on all nodes?**
```shell
kubectl get pods -n kubeedge -o wide | grep edge-mesh
```

You should see an edge-mesh pod on every edge node.

**2. DNS resolution**
```shell
# On edge node
nslookup <service-name>.<namespace>.svc.cluster.local
```

**3. EdgeMesh logs**
```shell
edgecore logs | grep -i mesh
```

**4. Network connectivity between nodes**
```shell
# Test direct communication between edge nodes
# Get pod IPs first
kubectl get pods -n <namespace> -o wide
# Then ping from one edge node to another's pod IP
```

Common issues:
- Firewall blocking EdgeMesh ports (check what ports your version uses)
- Edge nodes in different subnets without proper routing
- EdgeMesh DaemonSet not scheduling to all nodes (check taints/tolerations)
