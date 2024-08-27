---
title: KubeEdge 镜像预加载功能指导文档
sidebar_position: 6
---

# KubeEdge 镜像预加载功能指导文档

KubeEdge 1.16版本引入了镜像预下载新特性，用户可以通过ImagePrePullJob的Kubernetes API提前在边缘节点上加载镜像，该特性支持在批量边缘节点或节点组中预下载多个镜像，帮助减少加载镜像在应用部署或更新过程，尤其是大规模场景中，带来的失败率高、效率低下等问题。

镜像预下载API示例：

```
apiVersion: operations.kubeedge.io/v1alpha1
kind: ImagePrePullJob
metadata:
  name: imageprepull-example
  labels:
    description:ImagePrePullLabel
spec:
  imagePrePullTemplate：
    images:
      - image1
      - image2
    nodes：
      - edgenode1
      - edgenode2
    checkItems:
      - "disk"
    failureTolerate: "0.3"
    concurrency: 2
    timeoutSeconds: 180
    retryTimes: 1
    
```

    
## 1. 准备工作

**选用示例：Nginx Demo**

nginx是一个轻量级镜像，用户无需任何环境即可进行此演示。nginx镜像将会提前上传到一个私有镜像仓库中。用户可以从云端调用预加载功能API，将私有镜像仓库中的nginx镜像，提前下发到边缘节点中。


**1）本示例要求KubeEdge版本必须是v1.16.0+，kubernetes版本是v1.27.0+,此次选择的版本是KubeEdge v1.16.0,Kubernetes版本是v1.27.3**

```
[root@ke-cloud ~]# kubectl get node
NAME            STATUS    ROLES                  AGE   VERSION
cloud.kubeedge   Ready    control-plane,master   3d   v1.27.3
edge.kubeedge    Ready    agent,edge             2d   v1.27.7-kubeedge-v1.16.0

说明：本文接下来的操作将使用边缘节点edge.kubeedge进行，如果你参考本文进行相关操作，后续边缘节点名称的配置需要根据你的实际情况进行更改。
```

**2）确保CloudCore开启了以下配置：**


```
      taskManager:
        enable: true  // 由false修改为true
```
可以通过命令修改kubectl edit configmap cloudcore -n kubeedge文件，并重启k8s-apiserver组件的cloudcore来进行更改。






## 2. 为私有镜像准备密钥 (可选)
在这里准备了一个阿里云的私有镜像仓用作演示:registry.cn-hangzhou.aliyuncs.com/,使用的演示空间为jilimoxing。实际操作过程中可以依据真实情况进行修改

**1）推送nginx进入私有镜像仓**
```
[root@cloud ~]# docker tag nginx registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx
[root@cloud crds~]# docker push registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx
```

**2）在云端创建Secret**
Secret 不是 ImagePrePullJob 中的必填字段。如果你需要预拉私有镜像，你可以为它生成一个密钥。
您还可以使用kubectl创建一个用于访问docker registry的Secret，例如在没有Docker配置文件的情况下：

```
[root@cloud ~]# kubectl create secret docker-registry my-secret \
  --docker-server=tiger@acme.example \
  --docker-username=tiger \
  --docker-password=pass1234 \
  --docker-email=my-registry.example:5000

[root@cloud ~]# kubectl get secret -A
NAMESPACE   NAME             TYPE                             DATA   AGE
default     my-secret         kubernetes.io/dockerconfigjson   1      31s

```

## 3. 创建Yaml文件

**1）修改代码**

在云端节点上创建yaml文件，需要修改对应的images信息以及imageSecrets信息，保持和所需要预加载的镜像仓库secret一致，如下所示：
```

[root@ke-cloud ~]# vim imageprepull.yaml

apiVersion: operations.kubeedge.io/v1alpha1
kind: ImagePrePullJob
metadata:
  name: imageprepull-example
spec:
  imagePrePullTemplate:
    concurrency: 1
    failureTolerate: '0.1'
    images:
      - registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx
    nodeNames:
      - edge.kubeedge
    imageSecrets: default/my-secret
    retryTimes: 1
    timeoutSeconds: 120

```

**2）执行文件**


```
[root@ke-cloud ~]# kubectl apply -f imageprepull.yaml
```

**3) 获取 ImagePrepulljob 的状态**

使用命令：kubectl get imageprepulljobs.operations.kubeedge.io imageprepull-example -o jsonpath='{.status}'进行查看

```
[root@ke-cloud ~]# kubectl get imageprepulljobs.operations.kubeedge.io imageprepull-example -o jsonpath='{.status}'
[root@ke-cloud ~]# {"action":"Success","event":"Pull","state":"Successful","status":[{"imageStatus":[{"image":"registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx","state":"Successful"}],"nodeStatus":{"action":"Success","event":"Pull","nodeName":"edge.kubeedge","state":"Successful","time":"2024-04-26T18:51:41Z"}}],"time":"2024-04-26T18:51:41Z"}
```


## 4. 检查边缘节点镜像是否预加载成功

进入边缘端，使用命令ctr -n k8s.io i ls进行查看
```
[root@edge ~]# ctr -n k8s.io i ls
```
找到对应的镜像已被预加载成功
```
REF                                                        TYPE                                                      DIGEST                                                                  SIZE      PLATFORMS                                                                    LABELS                                                          
registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx    application/vnd.docker.distribution.manifest.v2+json      sha256:73e957703f1266530db0aeac1fd6a3f87c1e59943f4c13eb340bb8521c6041d7 67.3 MiB  linux/amd64 
```
