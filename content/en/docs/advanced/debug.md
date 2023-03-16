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

## Prepare certs

  >**IMPORTANT NOTE:**
  if you run cloucore in container mode (keadm >= 1.12 init will do that default).Those Step will done when `init`, just skip `Prepare certs` step and to next step.

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

## Set Iptables Rule

1. Set iptables on the host. This command should be executed on every node which deployed apiserver.(In this case, it is the master node, and execute this command by root.)

    Run the following command on the host on which each apiserver runs:

    **Note:** 
    1. You need to set the cloudcoreips variable first
    2. if you run cloudcore in container mode(keadm >= 1.12 init will do that default) , you can use ``kubectl get cm tunnelport -nkubeedge -oyaml``to find ``ipTunnelPort`` wich is the edgecore port.

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
    #iptables -t nat -A OUTPUT -p tcp --dport 1035 -j DNAT --to $CLOUDCOREIPS:10003
    # cloudcore in container mode would be like above
    ```
    > Port 10003 and 10350 are the default ports for the CloudStream and edgecore,
    use your own ports if you have changed them.

    If you are not sure whether you have a setting of iptables, and you want to clean all of them.
    (If you set up iptables wrongly, it will block you out of this feature)

    The following command can be used to clean up iptables:
    ``` shell
    iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
    ```

## Update Configurations

1. Modify **both** `/etc/kubeedge/config/cloudcore.yaml` and `/etc/kubeedge/config/edgecore.yaml` on cloudcore and edgecore. Set up **cloudStream** and **edgeStream** to `enable: true`. Change the server IP to the cloudcore IP (the same as $CLOUDCOREIPS).
    >**IMPORTANT NOTE:**
    if you run cloucore in container mode (keadm >= 1.12 init with do that default).You can use ``kubectl edit configmap cloudcore -nkubeedge -oyaml`` to modify ``cloucore.yaml``.

    Modify `/etc/kubeedge/config/cloudcore.yaml`:
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


    Modify `/etc/kubeedge/config/edgecore.yaml`:
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

## Restart

1. Restart all the cloudcore and edgecore.
  

    At the cloud side:
    >**IMPORTANT NOTE:**
    >if you run cloucore in container mode (keadm >= 1.12 init will do that default).You can use `kubectl delete pod -n kubeedge $(kubectl get pods -n kubeedge |grep cloudcore|awk '{print $1}')` to restart it.

    ``` shell
    sudo systemctl restart cloudcore.service
    ```

    At the edge side:
    ``` shell
    sudo systemctl restart edgecore.service
    ```
