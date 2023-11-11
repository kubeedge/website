---
title: 如何发布工作岗位
sidebar_position: 7
---

# 招聘中心

KubeEdge[招聘中心](https://kubeedge.io/zh/job-center/)旨在为社区合作伙伴与社区开发者提供一个岗位交流的平台。合作伙伴可以在这里发布工作机会，并提供详细的岗位信息与要求，社区用户也可以根据自己的经验与兴趣选择工作岗位。我们由衷地希望您在这里能找到合适的工作或者优秀的人才。

本篇指南旨在帮助您了解如何在社区招聘中心发布您的工作岗位，并提供编写岗位信息文档的规范。

# 发布要求

- 您必须是KubeEdge社区的贡献组织或者采用者，包括但不限于在您的公司公开产品或者解决方案中使用过KubeEdge，在社区做过贡献或者提交过您的使用案例。
- 您所在的公司或者组织的logo已经添加到社区[KubeEdge Supporters](https://kubeedge.io/#supporters)列表。


# 编写岗位信息规范

我们希望您使用`Markdown`格式编写一份岗位介绍文档，并尽可能详细地描述有关工作岗位的详细信息。完成之后可以按照[提交指南](#提交岗位信息)将文档提交到[官网招聘中心](https://github.com/kubeedge/website/tree/master/src/pages/job-center)模块。

1.  请在文档头部补充如下信息，以下信息会在KubeEdge官网招聘中心的首页以卡片形式展现，能够帮助社区用户快速了解岗位的关键信息。

```
title: 岗位名称
company：公司名称
address： 工作地点
date： 时间。（参考格式：2023-01-01）
logo： 公司logo（logo图片存放路径）
```

2.  文档正文。请在文档正文里详细描述岗位信息，团队介绍，岗位要求以及联系方式等。

# 提交岗位信息

工作岗位信息完成编写之后，请将您的文档提交到KubeEdge的[website](https://github.com/kubeedge/website)仓库，通过社区审核之后即可在官网的招聘中心展示。
如果您的文档材料只有公司logo图片以及一篇文档，您可以将图片放入`static/img/job-center`目录下，将英文和中文`Markdown`文档分别放入`src/pages/job-center/`和`i18n/zh/docusaurus-plugin-content-page/job-center/`目录下，并以pr的形式提交材料到website仓库即可。

如果您的材料比较多，您可以按照以下步骤操作：

1.  在website仓库`src/pages/job-center/`和`i18n/zh/docusaurus-plugin-content-page/job-center/`下分别创建新的目录，目录以您要提交的岗位名称命名。
2.  将您的英文材料放入`src/pages/job-center/`您新建的目录之下，将中文材料放入`i18n/zh/docusaurus-plugin-content-page/job-center/`对应的新建目录下，并将公司logo图片放入`static/img/job-center`目录下。
3.  请将您编写的Markdown文档以index.md或index.mdx命名。
4.  请在website仓库以PR的形式提交你的岗位信息。