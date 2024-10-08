---
title: Enable Kubectl logs/exec to debug pods on the edge
sidebar_position: 3
---

## Prepare certs

1. Make sure you can find the kubernetes `ca.crt` and `ca.key` files. If you set up your kubernetes cluster by `kubeadm` , those files will be in `/etc/kubernetes/pki/` dir.

    ```shell
    ls /etc/kubernetes/pki/
    ```

2. Set `CLOUDCOREIPS` env. The environment variable is set to specify the IP address of cloudcore, or a VIP if you have a highly available cluster.

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```
    (Warning: the same **terminal** is essential to continue the work, or it is necessary to type this command again.) Checking the environment variable with the following command:
    ```shell
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

    **Note:** Make sure `CLOUDCOREIPS` environment variable is set

    ```bash
    iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to $CLOUDCOREIPS:10003
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

1. Update `cloudcore` configuration to enable **cloudStream**. （The new version has this feature enabled by default in the cloud, so this configuration can be skipped.）

    If `cloudcore` is installed as binary, you can directly modify `/etc/kubeedge/config/cloudcore.yaml` with using editor.
    If `cloudcore` is running as kubernetes deployment, you can use `kubectl edit cm -n kubeedge cloudcore` to update `cloudcore`'s ConfigurationMap.

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

2. Update `edgecore` configuration to enable **edgeStream**.

    This modification needs to be done all edge system where `edgecore` runs to update `/etc/kubeedge/config/edgecore.yaml`.
    Make sure the `server` IP address to the cloudcore IP (the same as $CLOUDCOREIPS).

    ```yaml
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

1. Restart all the cloudcore and edgecore to apply the **Stream** configuration.

    If `cloudcore` is installed as binary (If the `cloudcore.yaml` has not been updated, there is no need to restart.)
:
    ```shell
    sudo systemctl restart cloudcore.service
    ```

    or `cloudcore` is running in kubernetes deployment:
    ```shell
    kubectl rollout restart deployment -n kubeedge cloudcore
    ```

    At the all edge side where `edgecore` runs:
    ```shell
    sudo systemctl restart edgecore.service
    ```
