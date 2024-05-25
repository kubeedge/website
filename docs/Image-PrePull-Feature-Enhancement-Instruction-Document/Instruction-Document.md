# KubeEdge Image PrePull Feature Guide Document

KubeEdge version 1.16 introduces a new feature called Image Pre-Pull, which allows users to load images ahead of time on edge nodes through the Kubernetes API of ImagePrePullJob. This feature supports pre-pull multiple images in batches across multiple edge nodes or node groups, helping to reduce the failure rates and inefficiencies associated with loading images during application deployment or updates, especially in large-scale scenarios.

API example for pre-pull mirror image：

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


## 1. Preparation

**Example：Nginx Demo**

Nginx is a lightweight image that allows users to demonstrate it without any prerequisite environment. Nginx image will be uploaded to a private image repository in advance. Users can call the pre-pull function API from the cloud to pre-pull the Nginx image to edge nodes from the private image repository.

**1）This example requires KubeEdge version to be v1.16.0 or above, and Kubernetes version to be v1.27.0 or above. The selected version is KubeEdge v1.16.0 and Kubernetes version is v1.27.3.**

```
[root@ke-cloud ~]# kubectl get node
NAME            STATUS    ROLES                  AGE   VERSION
cloud.kubeedge   Ready    control-plane,master   3d   v1.27.3
edge.kubeedge    Ready    agent,edge             2d   v1.27.7-kubeedge-v1.16.0

Note: The following verification will use the edge node edge.kubeedge. If you refer to this article for related verification, the configuration of the edge node name in subsequent steps needs to be changed according to your actual situation.
```

**2）Ensure that the K8s apiserver has the following configuration enabled**


```
      taskManager:
        enable: true  // 由false修改为true
```
changes can be made by editing the file kubectl edit configmap cloudcore -n kubeedge with commands, and restarting the cloudcore component of the K8s apiserver.

**3）Preparing Sample Code **

yaml file example code
```
apiVersion: operations.kubeedge.io/v1alpha1
kind: ImagePrePullJob
metadata:
  name: imageprepull-example
spec:
  imagePrePullTemplate:
    concurrency: 1
    failureTolerate: '0.1'
    images:
      - test:nginx
    nodeNames:
      - edge.kubeedge
    imageSecrets: default/secret
    retryTimes: 1
    timeoutSeconds: 120

```

## 2. Prepare the image and Secret for the private image repository
Here is a private image repository prepared for demonstration purposes using Alibaba Cloud's registry URL: registry.cn-hangzhou.aliyuncs.com. The demo space used is jilimoxing, and modifications may be necessary based on actual circumstances during the actual operation.

**1）Pushing nginx into the private image repository**

```
[root@cloud ~]# docker tag nginx registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx
[root@cloud crds~]# docker push registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx
```

**2）Create a Secret on the cloud**

Using Kubectl create secret docker-registry to generate a secret for a private image repository, modify it according to your actual situation.

```
[root@cloud ~]# kubectl create secret docker-registry my-secret \
  --docker-server=registry.cn-hangzhou.aliyuncs.com \
  --docker-username=23021*****@qq.com \
  --docker-password=Xy***** \
  --docker-email=23021*****@qq.com

[root@cloud ~]# kubectl get secret -A
NAMESPACE   NAME             TYPE                             DATA   AGE
default     my-secret         kubernetes.io/dockerconfigjson   1      31s

```

## 3. Create Yaml File

**1）Modify Code**

To create a yaml file on a cloud node, you need to modify the corresponding images information and imageSecrets information to keep them consistent with the pre-pull image repository secret. The information should be as follows:
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

**2）executable file**


```
[root@ke-cloud ~]# kubectl apply -f imageprepull.yaml
```


## 4. Check if the edge node image has been pre-pull successfully

Enter the edge terminal and use the command ctr -n k8s.io i ls to view.
```
[root@edge ~]# ctr -n k8s.io i ls
```
The corresponding image has been successfully pre-pull.
```
REF                                                        TYPE                                                      DIGEST                                                                  SIZE      PLATFORMS                                                                    LABELS                                                          
registry.cn-hangzhou.aliyuncs.com/jilimoxing/test:nginx    application/vnd.docker.distribution.manifest.v2+json      sha256:73e957703f1266530db0aeac1fd6a3f87c1e59943f4c13eb340bb8521c6041d7 67.3 MiB  linux/amd64 
```

## 5. Other

**1）For more official KubeEdge examples, please refer to https://github.com/kubeedge/examples**

