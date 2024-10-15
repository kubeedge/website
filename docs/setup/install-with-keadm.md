---
title: Installing KubeEdge with Keadm
sidebar_position: 3
---

Keadm is used to install the cloud and edge components of KubeEdge. It does not handle the installation of Kubernetes and its [runtime environment](https://kubeedge.io/docs/setup/prerequisites/runtime).

Please refer to [Kubernetes compatibility](https://github.com/kubeedge/kubeedge#kubernetes-compatibility) documentation to check **Kubernetes compatibility** and ascertain the Kubernetes version to be installed.

## Prerequisite

- It Requires super user rights (or root rights) to run.

## Install Keadm

There're three ways to download the `keadm` binary:

1. Download from [GitHub release](https://github.com/kubeedge/kubeedge/releases).
  
    KubeEdge GitHub officially holds three architecture releases: amd64, arm, and arm64. Please download the correct package according to your platform and desired version.

    ```shell
    wget https://github.com/kubeedge/kubeedge/releases/download/v1.17.0/keadm-v1.17.0-linux-amd64.tar.gz
    tar -zxvf keadm-v1.17.0-linux-amd64.tar.gz
    cp keadm-v1.17.0-linux-amd64/keadm/keadm /usr/local/bin/keadm
    ```

2. Download from the official KubeEdge release image on Docker Hub.

  ```shell
  docker run --rm kubeedge/installation-package:v1.17.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm && chmod +x /usr/local/bin/keadm
  ```

3. Build from Source
  
-   Refer to [build from source](./install-with-binary#build-from-source) for instructions.

## Setup Cloud Side (KubeEdge Master Node)

By default, ports `10000` and `10002` on your CloudCore needs to be accessible for your edge nodes.

**IMPORTANT NOTES:**  

1. At least one of `kubeconfig` or `master` must be configured correctly to verify the version and other information of the Kubernetes cluster.

2. Ensure the edge node can connect to the cloud node using the local IP of cloud node, or specify the public IP of the cloud node with the `--advertise-address` flag.

3. `--advertise-address` is the address exposed by the cloud side (it will be added to the SANs of the CloudCore certificate). The default value is the local IP.

### keadm init

`keadm init` provides a solution for integrating the CloudCore Helm chart. CloudCore will be deployed to cloud nodes in container mode.

Example:

```shell
keadm init --advertise-address="THE-EXPOSED-IP" --kubeedge-version=v1.17.0 --kube-config=/root/.kube/config
```

Output:

```shell
Kubernetes version verification passed, KubeEdge installation will start...
CLOUDCORE started
=========CHART DETAILS=======
NAME: cloudcore
LAST DEPLOYED: Wed Oct 26 11:10:04 2022
NAMESPACE: kubeedge
STATUS: deployed
REVISION: 1
```

You can run `kubectl get all -n kubeedge` to ensure that CloudCore start successfully, as shown below.

```shell
# kubectl get all -n kubeedge
NAME                             READY   STATUS    RESTARTS   AGE
pod/cloudcore-56b8454784-ngmm8   1/1     Running   0          46s

NAME                TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)                                             AGE
service/cloudcore   ClusterIP   10.96.96.56   <none>        10000/TCP,10001/TCP,10002/TCP,10003/TCP,10004/TCP   46s

NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/cloudcore   1/1     1            1           46s

NAME                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/cloudcore-56b8454784   1         1         1       46s
```

**IMPORTANT NOTES:**  

1. Set flags `--set key=value` for CloudCore helm chart could refer to [KubeEdge CloudCore Helm Charts README.md](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/README.md).

2. You can start with one of Keadm’s built-in configuration profiles and then further customize the configuration for your specific needs. Currently, the built-in configuration profile keyword is `version`. Refer to [version.yaml](https://github.com/kubeedge/kubeedge/blob/master/manifests/profiles/version.yaml) as `values.yaml`, you can make your custom values file here, and add flags like `--kubeedge-version=v1.17.0 --set key=value` to use this profile. `--external-helm-root` flag provides a feature function to install the external helm charts like edgemesh.

3. `keadm init` by default, deploys CloudCore in container mode. If you want to deploy CloudCore as a binary, please refer to [`keadm deprecated init`](#keadm-deprecated-init).

Example:

```shell
keadm init --set server.advertiseAddress="THE-EXPOSED-IP" --set server.nodeName=allinone  --kube-config=/root/.kube/config --force --external-helm-root=/root/go/src/github.com/edgemesh/build/helm --profile=edgemesh
```

If you are familiar with the Helm chart installation, please refer to [KubeEdge Helm Charts](https://github.com/kubeedge/kubeedge/tree/master/manifests/charts).


### keadm manifest generate

You can generate the manifests using `keadm manifest generate`.

Example:

```shell
keadm manifest generate --advertise-address="THE-EXPOSED-IP" --kube-config=/root/.kube/config > kubeedge-cloudcore.yaml
```

> Add `--skip-crds` flag to skip outputting the CRDs.

### keadm deprecated init 

`keadm deprecated init` installs CloudCore in binary process, generates certificates, and installs the CRDs. It also provides a flag to set a specific version.

**IMPORTANT NOTES:**

1. At least one of `kubeconfig` or `master` must be configured correctly to verify the version and other information of the Kubernetes cluster.

2. Ensure the edge node can connect to the cloud node using the local IP of cloud node, or specify the public IP of the cloud node with the `--advertise-address` flag.

3. `--advertise-address` is the address exposed by the cloud side (it will be added to the SANs of the CloudCore certificate). The default value is the local IP.

    Example:
    ```shell
    keadm deprecated init --advertise-address="THE-EXPOSED-IP"
    ```

    Output:
    ```
    Kubernetes version verification passed, KubeEdge installation will start...
    ...
    KubeEdge cloudcore is running, For logs visit:  /var/log/kubeedge/cloudcore.log
    CloudCore started
    ```

    You can run the `ps -elf | grep cloudcore` command to ensure that Cloudcore  is running successfully.

    ```shell
    # ps -elf | grep cloudcore
    0 S root     2736434       1  1  80   0 - 336281 futex_ 11:02 pts/2   00:00:00 /usr/local/bin/cloudcore
    ```


## Setup Edge Side (KubeEdge Worker Node)

### Get Token From Cloud Side

Run `keadm gettoken` on the **cloud side** to retrieve the token, which will be used when joining edge nodes.

```shell
# keadm gettoken
27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE
```

### Join Edge Node

#### keadm join

`keadm join` installs EdgeCore. It also provides a flag  to set a specific version. It pulls the image [kubeedge/installation-package](https://hub.docker.com/r/kubeedge/installation-package) from Docker Hub, copies the `edgecore` binary from container to the hostpath, and then starts `edgecore` as a system service.

Example:

```shell
keadm join --cloudcore-ipport="THE-EXPOSED-IP":10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE --kubeedge-version=v1.12.1
```

**IMPORTANT NOTES:**

1. The `--cloudcore-ipport` flag is mandatory.

2. If you want to apply certificate for the edge node automatically, the `--token` is needed.

3. The KubeEdge version used on the cloud and edge sides should be the same.

Output:

```shell
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```

You can run the `systemctl status edgecore` command to ensure EdgeCore is running successfully:

```shell
# systemctl status edgecore
● edgecore.service
   Loaded: loaded (/etc/systemd/system/edgecore.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2022-10-26 11:26:59 CST; 6s ago
 Main PID: 2745865 (edgecore)
    Tasks: 13 (limit: 4915)
   CGroup: /system.slice/edgecore.service
           └─2745865 /usr/local/bin/edgecore
```

#### keadm deprecated join

You can also use `keadm deprecated join` to start EdgeCore from the release pacakge. It will download release packages from [KubeEdge release website](https://github.com/kubeedge/kubeedge/releases), and then start `edgecore` in binary progress.

Example:

```shell
keadm deprecated join --cloudcore-ipport="THE-EXPOSED-IP":10000 --token=27a37ef16159f7d3be8fae95d588b79b3adaaf92727b72659eb89758c66ffda2.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAyMTYwNzd9.JBj8LLYWXwbbvHKffJBpPd5CyxqapRQYDIXtFZErgYE --kubeedge-version=1.12.0
```

Output:

```shell
MQTT is installed in this host
...
KubeEdge edgecore is running, For logs visit: journalctl -u edgecore.service -xe
```

### Deploy demo on edge nodes

Refer to the [Deploy demo on edge nodes](./install-with-binary#deploy-demo-on-edge-nodes) documentation.


### Enable `kubectl logs` Feature

Before deploying the metrics-server, the `kubectl logs` feature must be activated:

> Note for Helm deployments:
> - Stream certificates are generated automatically and the CloudStream feature is enabled by default. Therefore, Steps 1-3 can be skipped unless customization is needed. 
> - Step 4 could be finished by iptablesmanager component by default, so manual operations are not needed. Refer to the [cloudcore helm values](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/values.yaml#L67).
> - Operations in Steps 5-6 related to CloudCore can also be skipped.

1. Ensure you can locate the Kubernetes `ca.crt` and `ca.key` files. If you set up your Kubernetes cluster with `kubeadm`, these files will be in the `/etc/kubernetes/pki/` directory.

    ``` shell
    ls /etc/kubernetes/pki/
    ```

2. Set the `CLOUDCOREIPS` environment variable to specify the IP address of CloudCore, or a VIP if you have a highly available cluster. Set `CLOUDCORE_DOMAINS` instead if Kubernetes uses domain names to communicate with CloudCore.

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```

    (Warning: the same **terminal** is essential to continue the work, or it is necessary to type this command again). You can check the environment variable with the following command:

    ``` shell
    echo $CLOUDCOREIPS
    ```

3. Generate the certificates for **CloudStream** on the cloud node. The generation file is not in `/etc/kubeedge/`, so it needs to be copied from the repository cloned from GitHub. Switch to the root user:

    ```shell
    sudo su
    ```

    Copy the certificate generation file from the original cloned repository:

    ```shell
    cp $GOPATH/src/github.com/kubeedge/kubeedge/build/tools/certgen.sh /etc/kubeedge/
    ```

    Change directory to the kubeedge directory:

    ```shell
    cd /etc/kubeedge/
    ```
    
    Generate certificates from **certgen.sh**
    ```bash
    /etc/kubeedge/certgen.sh stream
    ```

4. It is needed to set iptables on the host. (This command should be executed on every apiserver deployed node.)(In this case, this the master node, and execute this command by root.) Run the following command on the host where each apiserver runs:

    **Note:** First, get the configmap containing all the CloudCore IPs and tunnel ports:
    
    ```bash
    kubectl get cm tunnelport -nkubeedge -oyaml
   
    apiVersion: v1
    kind: ConfigMap
    metadata:
      annotations:
        tunnelportrecord.kubeedge.io: '{"ipTunnelPort":{"192.168.1.16":10350, "192.168.1.17":10351},"port":{"10350":true, "10351":true}}'
      creationTimestamp: "2021-06-01T04:10:20Z"
    ...
    ```
    
    Then set all the iptables for multi CloudCore instances to every node that apiserver runs. The cloudcore ips and tunnel ports should be obtained from the configmap above.

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport $YOUR-TUNNEL-PORT -j DNAT --to $YOUR-CLOUDCORE-IP:10003
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to 192.168.1.16:10003
    iptables -t nat -A OUTPUT -p tcp --dport 10351 -j DNAT --to 192.168.1.17:10003
    ```

    If you are unsure about the current iptables settings and want to clean all of them. (If you set up iptables wrongly, it will block you out of your `kubectl logs` feature)

    The following command can be used to clean up iptables:

    ``` shell
    iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
    ```

5. Modify **both** `/etc/kubeedge/config/cloudcore.yaml` and `/etc/kubeedge/config/edgecore.yaml` on cloudcore and edgecore. Set up **cloudStream** and **edgeStream** to `enable: true`. Change the server IP to the cloudcore IP (the same as $CLOUDCOREIPS).

    Open the YAML file in CloudCore:

    ```shell
    sudo nano /etc/kubeedge/config/cloudcore.yaml
    ```

    Modify the file in the following part (`enable: true`):

    ```yaml
    cloudStream:
      enable: true
      streamPort: 10003
      tlsStreamCAFile: /etc/kubeedge/ca/streamCA.crt
      tlsStreamCertFile: /etc/kubeedge/certs/stream.crt
      tlsStreamPrivateKeyFile: /etc/kubeedge/certs/stream.key
      tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt
      tlsTunnelCertFile: /etc/kubeedge/certs/server.crt
      tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key
      tunnelPort: 10004
    ```

    Open the YAML file in EdgeCore:

    ``` shell
    sudo nano /etc/kubeedge/config/edgecore.yaml
    ```

    Modify the file in the following part (`enable: true`), (`server: 192.168.0.193:10004`):

    ``` yaml
    edgeStream:
      enable: true
      handshakeTimeout: 30
      readDeadline: 15
      server: 192.168.0.139:10004
      tlsTunnelCAFile: /etc/kubeedge/ca/rootCA.crt
      tlsTunnelCertFile: /etc/kubeedge/certs/server.crt
      tlsTunnelPrivateKeyFile: /etc/kubeedge/certs/server.key
      writeDeadline: 15
    ```

6. Restart all the CloudCore and EdgeCore.

    ``` shell
    sudo su
    ```

    If CloudCore is running in process mode:

    ``` shell
    pkill cloudcore
    nohup cloudcore > cloudcore.log 2>&1 &
    ```

    If CloudCore is running in Kubernetes deployment mode:

    ``` shell
    kubectl -n kubeedge rollout restart deployment cloudcore
    ```

    EdgeCore:

    ``` shell
    systemctl restart edgecore.service
    ```

    If restarting EdgeCore fails, check if that is due to `kube-proxy` and kill it. **kubeedge** rejects it by default, we use a succedaneum called [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md)

    **Note:** It is important to avoid `kube-proxy` being deployed on edgenode and there are two methods to achieve this:

    - **Method 1:** Add the following settings by calling `kubectl edit daemonsets.apps -n kube-system kube-proxy`:
  
    ``` yaml
    spec:
      template:
        spec:
          affinity:
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                  - key: node-role.kubernetes.io/edge
                    operator: DoesNotExist
    ```

   or just run the following command directly in the shell window:

   ```shell
   kubectl patch daemonset kube-proxy -n kube-system -p '{"spec": {"template": {"spec": {"affinity": {"nodeAffinity": {"requiredDuringSchedulingIgnoredDuringExecution": {"nodeSelectorTerms": [{"matchExpressions": [{"key": "node-role.kubernetes.io/edge", "operator": "DoesNotExist"}]}]}}}}}}}'
   ```

    - **Method 2:** If you still want to run `kube-proxy`, instruct **edgecore** not to check the environment by adding the environment variable in `edgecore.service` :

        ``` shell
        sudo vi /etc/kubeedge/edgecore.service
        ```

        Add the following line into the **edgecore.service** file:

        ``` shell
        Environment="CHECK_EDGECORE_ENVIRONMENT=false"
        ```

        The final file should look like this:

        ```
        Description=edgecore.service

        [Service]
        Type=simple
        ExecStart=/root/cmd/ke/edgecore --logtostderr=false --log-file=/root/cmd/ke/edgecore.log
        Environment="CHECK_EDGECORE_ENVIRONMENT=false"

        [Install]
        WantedBy=multi-user.target
        ```

### Support Metrics-server in Cloud

1. The realization of this function point reuses cloudstream and edgestream modules. So you also need to perform all steps of *Enable `kubectl logs` Feature*.

2. Since the kubelet ports of edge nodes and cloud nodes are not the same, the current release version of metrics-server(0.3.x) does not support automatic port identification (It is the 0.4.0 feature), so you need to manually compile the image from master branch yourself now.

    Git clone latest metrics server repository:

    ```bash
    git clone https://github.com/kubernetes-sigs/metrics-server.git
    ```

    Go to the metrics server directory:

    ```bash
    cd metrics-server
    ```

    Make the docker image:

    ```bash
    make container
    ```

    Check if you have this docker image:

    ```bash
    docker images
    ```

    |                  REPOSITORY                           |                    TAG                   |   IMAGE ID   |     CREATE     |  SIZE  |
    |-------------------------------------------------------|------------------------------------------|--------------|----------------|--------|
    | gcr.io/k8s-staging-metrics-serer/ metrics-serer-amd64 | 6d92704c5a68cd29a7a81bce68e6c2230c7a6912 | a24f71249d69 | 19 seconds ago | 57.2MB |
    | metrics-server-kubeedge                               |                 latest                   | aef0fa7a834c | 28 seconds ago | 57.2MB |

    Make sure you change the tag of image by using its IMAGE ID to be compactable with image name in yaml file.

    ```bash
    docker tag a24f71249d69 metrics-server-kubeedge:latest
    ```

3. Apply the deployment yaml. For specific deployment documents, you can refer to https://github.com/kubernetes-sigs/metrics-server/tree/master/manifests.

    **Note:** those iptables below must be applyed on the machine (to be exactly network namespace, so metrics-server needs to run in hostnetwork mode also) metric-server runs on.
    ```
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
    ```
    (To direct the request for metric-data from edgecore:10250 through tunnel between CloudCore and EdgeCore, the iptables is vitally important.)

    Before you deploy metrics-server, you have to make sure that you deploy it on the node which has apiserver deployed on. In this case, that is the master node. As a consequence, it is needed to make master node schedulable by the following command:

    ``` shell
    kubectl taint nodes --all node-role.kubernetes.io/master-
    ```

    Then, in the deployment.yaml file, it must be specified that metrics-server is deployed on master node.
    (The hostname is chosen as the marked label.)
    In **metrics-server-deployment.yaml**
    ``` yaml
        spec:
          affinity:
            nodeAffinity:
              requiredDuringSchedulingIgnoredDuringExecution:
                nodeSelectorTerms:
                - matchExpressions:
                  #Specify which label in [kubectl get nodes --show-labels] you want to match
                  - key: kubernetes.io/hostname
                    operator: In
                    values:
                    #Specify the value in key
                    - charlie-latest
    ```

**IMPORTANT NOTES:**

1. Metrics-server needs to use hostnetwork network mode.

2. Use the image compiled by yourself and set imagePullPolicy to Never.

3. Enable the feature of --kubelet-use-node-status-port for Metrics-server

    Those settings need to be written in deployment yaml (metrics-server-deployment.yaml) file like this:

    ``` yaml
          volumes:
          # mount in tmp so we can safely use from-scratch images and/or read-only containers
          - name: tmp-dir
            emptyDir: {}
          hostNetwork: true                          #Add this line to enable hostnetwork mode
          containers:
          - name: metrics-server
            image: metrics-server-kubeedge:latest    #Make sure that the REPOSITORY and TAG are correct
            # Modified args to include --kubelet-insecure-tls for Docker Desktop (don't use this flag with a real k8s cluster!!)
            imagePullPolicy: Never                   #Make sure that the deployment uses the image you built up
            args:
              - --cert-dir=/tmp
              - --secure-port=4443
              - --v=2
              - --kubelet-insecure-tls
              - --kubelet-preferred-address-types=InternalDNS,InternalIP,ExternalIP,Hostname
              - --kubelet-use-node-status-port       #Enable the feature of --kubelet-use-node-status-port for Metrics-server
            ports:
            - name: main-port
              containerPort: 4443
              protocol: TCP
    ```

## Reset KubeEdge Master and Worker nodes

### Master
`keadm reset` or `keadm deprecated reset` will stop `cloudcore` and delete KubeEdge related resources from Kubernetes master like `kubeedge` namespace. It doesn't uninstall/remove any of the pre-requisites.

It provides a flag for users to specify kubeconfig path, the default path is `/root/.kube/config`.

 Example:

```shell
 # keadm reset --kube-config=$HOME/.kube/config
 # or
 # keadm deprecated reset
```

### Node

`keadm reset` or `keadm deprecated reset` will stop `edgecore` and it doesn't uninstall/remove any of the pre-requisites.
