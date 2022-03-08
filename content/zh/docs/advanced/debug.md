---
draft: false
linktitle: Enable Kubectl logs/exec to debug pods on the edge
menu:
  docs:
    parent: advanced configuration 
    weight: 30
title: Enable Kubectl logs/exec to debug pods on the edge
toc: true
type: docs
---
### Enable `kubectl logs` Feature

Before metrics-server deployed, `kubectl logs` feature must be activated:

1. Make sure you can find the kubernetes `ca.crt` and `ca.key` files. If you set up your kubernetes cluster by `kubeadm` , those files will be in `/etc/kubernetes/pki/` dir.

    ``` shell
    ls /etc/kubernetes/pki/
    ```

2. Set `CLOUDCOREIPS` env. The environment variable is set to specify the IP address of cloudcore, or a VIP if you have a highly available cluster.

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```
   (Warning: the same **terminal** is essential to continue the work, or it is necessary to type this command again.) Checking the environment variable with the following command:
    ``` shell
    echo $CLOUDCOREIPS
    ```

3. Generate the certificates for **CloudStream** on cloud node, however, the generation file is not in the `/etc/kubeedge/`, we need to copy it from the repository which was git cloned from GitHub.
   Change user to root:
    ```shell
    sudo su
    ```
   Copy certificates generation file from original cloned repository:
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

4. It is needed to set iptables on the host. (This command should be executed on every apiserver deployed node.)(In this case, this the master node, and execute this command by root.)
   Run the following command on the host on which each apiserver runs:

   **Note:** You need to set the cloudcoreips variable first

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
    ```
   > Port 10003 and 10350 are the default ports for the CloudStream and edgecore,
   use your own ports if you have changed them.

   If you are not sure if you have setting of iptables, and you want to clean all of them.
   (If you set up iptables wrongly, it will block you out of your `kubectl logs` feature)
   The following command can be used to clean up iptables:
    ``` shell
    iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
    ```

5. Modify **both** `/etc/kubeedge/config/cloudcore.yaml` and `/etc/kubeedge/config/edgecore.yaml` on cloudcore and edgecore. Set up **cloudStream** and **edgeStream** to `enable: true`. Change the server IP to the cloudcore IP (the same as $CLOUDCOREIPS).

   Open the YAML file in cloudcore:
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

   Open the YAML file in edgecore:
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

6. Restart all the cloudcore and edgecore.

    ``` shell
    sudo su
    ```
   cloudCore:
    ``` shell
    pkill cloudcore
    nohup cloudcore > cloudcore.log 2>&1 &
    ```
   edgeCore:
    ``` shell
    systemctl restart edgecore.service
    ```
   If you fail to restart edgecore, check if that is because of `kube-proxy` and kill it.  **kubeedge** reject it by default, we use a succedaneum called [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md)

   **Note:** the importance is to avoid `kube-proxy` being deployed on edgenode. There are two methods to solve it:

  1. Add the following settings by calling `kubectl edit daemonsets.apps -n kube-system kube-proxy`:
    ``` yaml
    affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node-role.kubernetes.io/edge
                    operator: DoesNotExist
    ```

  2. If you still want to run `kube-proxy`, ask **edgecore** not to check the environment by adding the env variable in `edgecore.service` :

      ``` shell
      sudo vi /etc/kubeedge/edgecore.service
      ```

    - Add the following line into the **edgecore.service** file:

      ``` shell
      Environment="CHECK_EDGECORE_ENVIRONMENT=false"
      ```

    - The final file should look like this:

      ```
      Description=edgecore.service

      [Service]
      Type=simple
      ExecStart=/root/cmd/ke/edgecore --logtostderr=false --log-file=/root/cmd/ke/edgecore.log
      Environment="CHECK_EDGECORE_ENVIRONMENT=false"

      [Install]
      WantedBy=multi-user.target
      ```