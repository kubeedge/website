---
title: Edge connection with EdgeMesh
sidebar_position: 5
---
EdgeMesh as the data plane component of the KubeEdge cluster, provides simple service discovery and traffic proxy functions for applications, thereby shielding the complex network structure in edge scenarios.

Check more details at [edgemesh website](https://edgemesh.netlify.app) to use EdgeMesh.

## Usage

Assume we have two edge nodes in ready state, we call them edge node "a" and "b":

```bash
$ kubectl get nodes
NAME          STATUS     ROLES    AGE   VERSION
edge-node-a   Ready      edge     25m   v1.15.3-kubeedge-v1.1.0-beta.0.358+0b7ac7172442b5-dirty
edge-node-b   Ready      edge     25m   v1.15.3-kubeedge-v1.1.0-beta.0.358+0b7ac7172442b5-dirty
master        NotReady   master   8d    v1.15.0
```

Deploy a sample pod from Cloud Side:

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/deployment.yaml
deployment.apps/nginx-deployment created
```

Check the pod is up and is running state, as we could see the pod is running on edge node b:

```bash
$ kubectl get pods -o wide
NAME                                READY   STATUS    RESTARTS   AGE   IP           NODE          NOMINATED NODE   READINESS GATES
nginx-deployment-54bf9847f8-sxk94   1/1     Running   0          14m   172.17.0.2   edge-node-b   <none>           <none>
```

Check if it works:

```bash
$ curl 172.17.0.2
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="https://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="https://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

`172.17.0.2` is the IP of deployment and the output may be different since the version of nginx image is different.

Then create a service for it:
```yaml
$ cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: nginx
  ports:
    - name: http-0
      port: 12345
      protocol: TCP
      targetPort: 80
EOF
```

>* For L4/L7 proxy, specify what protocol a port would use by the port's "name". First HTTP port should be named "http-0" and the second one should be called "http-1", etc.

Check the service and endpoints:

```bash
$ kubectl get service
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
nginx-svc    ClusterIP   10.96.191.183   <none>        12345/TCP   77m
$ kubectl get endpoints
NAME         ENDPOINTS            AGE
nginx-svc    172.17.0.2:80        81m
```

To request a server, use url like this: `<service_name>.<service_namespace>.svc.<cluster>.<local>:<port>`

In our case, from edge node a or b, run following command:

```bash
$ curl http://nginx-svc.default.svc.cluster.local:12345
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="https://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="https://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

>* EdgeMesh supports both Host Networking and Container Networking
>* If you ever used EdgeMesh of old version, check your iptables rules. It might affect your test result.

## Sample
![sample](/img/edgemesh/edgemesh-test-env-example.png)

## Model
![model](/img/edgemesh/model.jpg)

1. One service
2. One or more pods' labels match the service's selector
3. To request a server, use: ```<service_name>.<service_namespace>.svc.<cluster>:<port>```:
   - get the service's name and namespace from domain name
   - query all the backend pods from MetaManager by service's namespace and name
   - LoadBalance returns the real backend containers' hostIP and hostPort
