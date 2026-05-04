---
title: 启用 Kubectl logs/exec/attach 操作边缘 pods
sidebar_position: 3
---

`kubectl logs` 必须在使用 metrics-server 之前部署，通过以下操作激活功能：
> 基于 Helm 部署的重要提示:
> - 因为Stream证书会自动生成并且CloudStream功能也是默认启动的。 所以, 除非有特别的用户定制，第1-3步可以跳过。
> - iptablesmanager会默认完成第4步而不需要手动执行. 具体可以参考 [cloudcore helm values](https://github.com/kubeedge/kubeedge/blob/master/manifests/charts/cloudcore/values.yaml#L67).
> - 第5-6步关于CloudCore的操作也可以跳过。

1. 请确保可以找到 `ca.crt` 和 `ca.key` 两个 Kubernetes 证书文件。 如果您使用 `kubeadm`进行 Kubernetes 集群安装，这两个文件将位于 `/etc/kubernetes/pki/` 路径下。

   ```shell
   ls /etc/kubernetes/pki/
   ```

2. 设置 `CLOUDCOREIPS` 变量。 这个环境变量设置为指定 cloudcore 的 IP 地址，如果您的集群是以高可用方式部署，请设置为分配给负载均衡器的虚拟 IP 地址。

   ```bash
   export CLOUDCOREIPS="192.168.0.139"
   ```

   (注: 必须使用同一 **终端** 才能使设置生效， 如果更换了终端，必须再次执行该指令。)可以通过使用以下命令检查该环境变量：

   ``` shell
   echo $CLOUDCOREIPS
   ```

3. 接下来，需要给云节点上为 **CloudStream** 生成证书，然而，相关生成脚本不在 `/etc/kubeedge/` 中， 我们需要从 GitHub 的 git 仓库中获取。
   改变权限至 root 权限：

   ```shell
   sudo su
   ```

   从 git 仓库中 clone 证书生成文件：

   ```shell
   cp $GOPATH/src/github.com/kubeedge/kubeedge/build/tools/certgen.sh /etc/kubeedge/
   ```

   切换到 kubeedge 路径下：

   ```shell
   cd /etc/kubeedge/
   ```

   使用 **certgen.sh** 生成证书：

   ```bash
   /etc/kubeedge/certgen.sh stream
   ```

4. 需要在主机上设置 iptables。（此命令应该在每个 apiserver 部署的节点上执行。）（在这种情况下，须在 master 节点上执行，并由 root 用户执行此命令。） 在运行每个 apiserver 的主机上运行以下命令：

   **注意:** 您需要从configmap来获取所有的cloudcore ips和 tunnel端口

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

   接着在apiserver运行的所有节点为multi CloudCore实例来设置iptables, 这里的cloudcore ips 和 tunnel端口都是从上面的configmap获得的。

   ```bash
   iptables -t nat -A OUTPUT -p tcp --dport $YOUR-TUNNEL-PORT -j DNAT --to $YOUR-CLOUDCORE-IP:10003
   iptables -t nat -A OUTPUT -p tcp --dport 10350 -j DNAT --to 192.168.1.16:10003
   iptables -t nat -A OUTPUT -p tcp --dport 10351 -j DNAT --to 192.168.1.17:10003
   ```

   如果您不确定是否设置了 iptables，并且希望清除所有这些表。（如果您错误地设置了 iptables，它将阻止您使用 `kubectl logs` 功能） 可以使用以下命令清理 iptables 规则：

   ```shell
   iptables -F && iptables -t nat -F && iptables -t mangle -F && iptables -X
   ```

5. 更新 cloudcore 的配置使 CloudStream 生效 （新版本云端已默认开启，可跳过本配置）
如果 cloudcore 是以二进制方式安装的，您可以直接使用编辑器修改 /etc/kubeedge/config/cloudcore.yaml。如果 cloudcore是以容器方式运行，您可以直接使用 kubectl edit cm -n kubeedge cloudcore 来更新 cloudcore 的 ConfigMap。

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

   更新 edgecore 的配置使 EdgeStream 生效。
   此修改需要在 edgecore 运行所在的边缘节点上进行，更新 /etc/kubeedge/config/edgecore.yaml，确保 server IP 地址为 cloudcore IP （与 $CLOUDCOREIPS 相同）。

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

6. 重启 cloudcore 和 edgecore 让配置生效。

   ```shell
   sudo su
   ```

   cloudCore in process mode:

   ```shell
   pkill cloudcore
   nohup cloudcore > cloudcore.log 2>&1 &
   ```

   or cloudCore in kubernetes deployment mode:

   ```shell
   kubectl -n kubeedge rollout restart deployment cloudcore
   ```

   edgeCore:

   ```shell
   systemctl restart edgecore.service
   ```

   如果您无法重启 edgecore，请检查是否是由于 `kube-proxy` 的缘故，同时杀死这个进程。 **kubeedge**
   默认不纳入该进程，我们使用 [edgemesh](https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/edgemesh-design.md) 来进行替代

   **注意：** 可以考虑避免 `kube-proxy` 部署在 edgenode 上。有两种解决方法：

   - 通过调用 `kubectl edit daemonsets.apps -n kube-system kube-proxy` 添加以下设置：

   ```yaml
   affinity:
     nodeAffinity:
       requiredDuringSchedulingIgnoredDuringExecution:
         nodeSelectorTerms:
           - matchExpressions:
               - key: node-role.kubernetes.io/edge
                 operator: DoesNotExist
   ```

   或者您也可以在shell界面直接运行下面的命令

   ```shell
   kubectl patch daemonset kube-proxy -n kube-system -p '{"spec": {"template": {"spec": {"affinity": {"nodeAffinity": {"requiredDuringSchedulingIgnoredDuringExecution": {"nodeSelectorTerms": [{"matchExpressions": [{"key": "node-role.kubernetes.io/edge", "operator": "DoesNotExist"}]}]}}}}}}}'
   ```

   - 如果您仍然要运行 `kube-proxy` ，请通过在以下位置添加 `edgecore.service` 中的 env 变量来要求 **edgecore** 不进行检查 edgecore.service：

    ```shell
    sudo vi /etc/kubeedge/edgecore.service
    ```

    将以下行添加到 **edgecore.service** 文件：

    ```shell
    Environment="CHECK_EDGECORE_ENVIRONMENT=false"
    ```

    最终文件应如下所示：

    ```
    Description=edgecore.service

    [Service]
    Type=simple
    ExecStart=/root/cmd/ke/edgecore --logtostderr=false --log-file=/root/cmd/ke/edgecore.log
    Environment="CHECK_EDGECORE_ENVIRONMENT=false"

    [Install]
    WantedBy=multi-user.target
    ```
