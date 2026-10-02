---
title: Supporters
sidebar_position: 8
---

# 上传您的公司/组织logo到官网

非常感谢您对KubeEdge社区的认可与支持，欢迎您将公司或者组织的logo上传到[KubeEdge官网](https://kubeedge.io/#supporters)。

如果您需要上传公司或者组织logo，请按照以下两个步骤进行：

1. 将您的公司或者组织logo放到[kubeedge/website](https://github.com/kubeedge/website)仓库的[supporters images](https://github.com/kubeedge/website/tree/master/static/img/supporters)目录下，最好使用`.svg`格式.

2. 在[kubeedge/website](https://github.com/kubeedge/website)仓库的[supporter list](https://github.com/kubeedge/website/blob/master/src/components/supporters/index.js)里按照如下格式填写公司或组织信息:
```
{
    name: "Company Name",
    img_src: "img/supporters/{company}.svg", 
    external_link: "Your company website",
},
```

完成上述步骤后，您可以提交一个 Pull Request 到[kubeedge/website](https://github.com/kubeedge/website)仓库即可，社区将尽快完成审核。