---
title: Enable Kubectl logs/exec to debug pods on the edge
sidebar_position: 3
---

> Note for Helm deployments:
> - Stream certificates are generated automatically and the CloudStream feature is enabled by default. Therefore, Steps 1-3 can be skipped unless customization is needed.
> - Step 4 could be finished by iptablesmanager component by default, so manual operations are not needed. Refer to the [cloudcore helm values](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/values.yaml#L67).
> - Operations in Steps 5-6 related to CloudCore can also be skipped.

1. Make sure you can find the kubernetes `ca.crt` and `ca.key` files. If you set up your kubernetes cluster by `kubeadm` , those files will be in `/etc/kubernetes/pki/` directory.

    ```shell
    ls /etc/kubernetes/pki/
    ```

2. Set the `CLOUDCOREIPS` environment variable to specify the IP address of CloudCore, or a VIP if you have a highly available cluster. Set `CLOUDCORE_DOMAINS` instead if Kubernetes uses domain names to communicate with CloudCore.

    ```bash
    export CLOUDCOREIPS="192.168.0.139"
    ```

    (Warning: the same **terminal** is essential to continue the work, or it is necessary to type this command again.) Checking the environment variable with the following command:

    ```shell
    echo $CLOUDCOREIPS
    ```

3. Generate the certificates for **CloudStream** on the cloud node. The generation file is not in `/etc/kubeedge/`, so it needs to be copied from the repository cloned from GitHub.

    Switch to the root user:

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

4. It is needed to set iptables on the host. (This command should be executed on every apiserver deployed node.)(In this case, this the master node, and execute this command by root.) Run the following command on the host where each apiserver runs:

    **Note:** First, get the configmap containing all the CloudCore IPs and tunnel ports:

    ```bash
    kubectl get cm tunnelport -n kubeedge -o yaml

    apiVersion: v1
    kind: ConfigMap
    metadata:
      annotations:
        tunnelportrecord.kubeedge.io: '{"ipTunnelPort":{"192.168.1.16":10350, "192.168.1.17":10351},"port":{"10350":true, "10351":true}}'
      creationTimestamp: "2021-06-01T04:10:20Z"
    ...
    ```

    Then set all the iptables for multiple CloudCore instances to every node where apiserver runs. The cloudcore ips and tunnel ports should be obtained from the configmap above.

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

5. Update `cloudcore` configuration to enable **cloudStream**. （The new version has this feature enabled by default in the cloud, so this configuration can be skipped.）

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

   Update `edgecore` configuration to enable **edgeStream**.

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

6. Restart all the cloudcore and edgecore to apply the **Stream** configuration.

    ```shell
    sudo su
    ```

    If CloudCore is running in process mode:

    ```shell
    pkill cloudcore
    nohup cloudcore > cloudcore.log 2>&1 &
    ```

    If CloudCore is running in Kubernetes deployment mode:

    ```shell
    kubectl -n kubeedge rollout restart deployment cloudcore
    ```

    EdgeCore:

    ```shell
    systemctl restart edgecore.service
    ```

    If restarting EdgeCore fails, check if that is due to `kube-proxy` and kill it. **kubeedge** rejects it by default, we use a succedaneum called [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md)

    **Note:** It is important to avoid `kube-proxy` being deployed on edgenode and there are two methods to achieve this:

    - **Method 1:** Add the following settings by calling `kubectl edit daemonsets.apps -n kube-system kube-proxy`:

    ```yaml
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

    ```shell
    sudo vi /etc/kubeedge/edgecore.service
    ```

    Add the following line into the **edgecore.service** file:

    ```shell
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
