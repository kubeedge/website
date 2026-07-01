---
title: Security
sidebar_position: 5
---

## How is the connection between CloudCore and EdgeCore secured?

KubeEdge uses mTLS (mutual TLS) for all cloud-edge communication. Both sides verify each other's identity using certificates, not just one-way TLS like normal HTTPS.

Here's the flow:

1. When CloudCore starts for the first time, it generates a self-signed CA (Certificate Authority) if one doesn't exist
2. That CA lives at `/etc/kubeedge/ca/rootCA.crt` and `/etc/kubeedge/ca/rootCA.key` on the cloud node
3. When an edge node joins, it requests a certificate from CloudCore
4. CloudCore signs the request using its CA and sends back a node certificate
5. From then on, all communication uses these certificates

You can see the certs:
```shell
# On cloud node
ls -la /etc/kubeedge/ca/
# rootCA.crt  rootCA.key

# On edge node
ls -la /etc/kubeedge/certs/
# server.crt  server.key  (these are for the edge node)
```

The certificates are valid for 1 year by default. When they expire, you'll see connection errors and need to regenerate them. Run `keadm gettoken` and rejoin the node to get fresh certs.

## How do edge nodes authenticate when joining?

When you run `keadm join` on an edge node, you provide a token. Here's what happens behind the scenes:

**1. Get a token from the cloud**
```shell
# On cloud node
keadm gettoken
```
This outputs something like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**2. Edge node sends the token to CloudCore**
EdgeCore connects to CloudCore (usually on port 10002) and presents the token.

**3. CloudCore validates and signs**
If the token is valid, CloudCore generates a certificate specifically for that edge node and sends it back.

**4. Future connections use the certificate**
The token is only used once during joining. After that, all communication uses the certificate.

You can see the token in the edgecore config:
```yaml
# /etc/kubeedge/config/edgecore.yaml
modules:
  edgeHub:
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## How is data protected on the edge node?

EdgeCore stores data locally in a few places:

**SQLite database**: `/etc/kubeedge/kubeedge/edge/edgecore.db`
- Contains pod specs, configmaps, secrets, device state
- Access is restricted to the edgecore process only
- File permissions are set to 600 (read/write by owner only)

**Certificates**: `/etc/kubeedge/certs/`
- Private keys are 600 permissions
- Only root or the edgecore process can read them

**Configuration**: `/etc/kubeedge/config/edgecore.yaml`
- Contains sensitive settings like the token (before first join)
- Should be secured with appropriate file permissions

```shell
# Check permissions
ls -la /etc/kubeedge/
ls -la /etc/kubeedge/certs/
ls -la /etc/kubeedge/kubeedge/edge/
```

The edge node doesn't have access to other nodes' data. Each edge node only syncs the resources scheduled to it. So if one edge node is compromised, it can't see what's running on other nodes.

## Can secrets be synced to the edge?

Yes, Kubernetes secrets sync to the edge just like pods and configmaps. They're encrypted in transit (over the TLS tunnel) and stored in the local SQLite database.

To sync a secret to the edge, you just need to reference it in a pod spec that runs on an edge node:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: app
      image: my-app:latest
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secrets
  volumes:
    - name: secret-volume
      secret:
        secretName: my-secret
```

Once this pod is scheduled to an edge node, the secret gets synced and the pod can mount it.

One thing to note: the secret is stored in plaintext in the SQLite database on the edge. So if someone has root access to the edge node, they can read it. This is the same as standard Kubernetes - if you need encryption at rest, you need to enable it at the API server level.

## How do I rotate certificates?

Certificates expire after 1 year. When they do, you'll see errors like:
```
x509: certificate has expired
```

To rotate:

**1. On the edge node, reset the join**
```shell
keadm reset
```

**2. Get a new token from the cloud**
```shell
# On cloud node
keadm gettoken
```

**3. Rejoin with the new token**
```shell
# On edge node
keadm join --cloudcore-ipport=<cloudcore-ip>:10000 --token=<new-token>
```

This generates fresh certificates for the edge node.

If you need to rotate the CA itself (the root CA on the cloud side), that's more involved and requires regenerating all edge node certificates. Usually you only need to do this if the CA is compromized.

## CloudCore logs show certificate errors

If you see errors like:
```
x509: cannot validate certificate for 192.168.1.100 because it doesn't contain any IP SANs
```

This means the certificate doesn't have the right IP address in it. The advertise-address you set during `keadm init` must match the IP that edge nodes use to connect.

Check your advertise-address:
```shell
kubectl get configmap cloudcore -n kubeedge -o yaml | grep advertiseAddress
```

Make sure this matches the IP in your edgecore.yaml:
```shell
# On edge node
cat /etc/kubeedge/config/edgecore.yaml | grep server
```

If they don't match, you need to reset and reinstall with the correct address:
```shell
# On cloud
keadm reset
keadm init --advertise-address=<correct-ip>

# On edge
keadm reset
keadm join --cloudcore-ipport=<correct-ip>:10000 --token=<token>
```

## Can I use my own CA instead of the self-signed one?

Yes, you can bring your own CA. During CloudCore initialization, you can provide your CA certificate and key instead of letting CloudCore generate a self-signed one.

Place your CA files before starting CloudCore:
```shell
mkdir -p /etc/kubeedge/ca
cp my-ca.crt /etc/kubeedge/ca/rootCA.crt
cp my-ca.key /etc/kubeedge/ca/rootCA.key
chmod 600 /etc/kubeedge/ca/rootCA.key
```

Then when CloudCore starts, it'll use your CA instead of generating a new one. All edge node certificates will be signed by your CA.

This is useful if you have a corporate PKI and want all your certificates (cloud, edge, devices) under the same trust chain.
