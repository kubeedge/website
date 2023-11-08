---
title: 如何上传案例
sidebar_position: 6
---
# 案例中心

KubeEdge案例中心用于展示用户在自身业务场景中使用KubeEdge实现的成功案例介绍。在这里，您可以将您的成功案例分享给其他用户，以便让其他人了解如何在真实的行业场景中使用我们的项目。同时希望您在浏览其他成功案例时也可以从中获得启发，并应用到您的项目中。

本篇指南旨在帮助您了解如何将您的成功案例提交到社区案例中心，并为您提供编写案例的规范。

# 编写案例规范

我们希望您尽可能详细地描述所使用的业务场景、技术架构以及最后效果等信息，请使用`Markdown`格式编写文档：

1.  请在文档头部补充如下信息，以下信息会在KubeEdge官网案例中心的首页以卡片形式展现，能够帮助用户快速了解案例的大概内容。

```
title: 公司名称
subtitle： (选填)请用关键词描述案例带来的显著效果。（示例：100% Performance improvement）
description： 请用一句话对案例做一个简要的概括。
date： 时间。（参考格式：2023-01-01）
tags： 案例标签。请根据案例类型填写Solution或End User(中文文档请对应填写解决方案或最终用户)
```

2.  文档正文。请在文档正文里详细描述案例内容，可参考以下几点详细展开介绍。

- 案例标题
- 案例背景
- 应用场景
- 面临的挑战
- 为什么选择KubeEdge
- 解决方案以及技术架构
- 最终成果，实现价值
- 未来规划

# 提交案例

案例完成编写之后，请将您的案例文档提交到KubeEdge的[website](https://github.com/kubeedge/website)仓库，您可以提交中文或英文的案例，通过社区审核之后即可在官网的案例中心展示。

1.  在Website仓库`src/pages/case-studies`和`i18n/zh/docusaurus-plugin-content-page/case-studies`下创建您的案例目录（分别对应英文和中文），目录以您的案例名称命名。
2.  将您的英文案例文档放入`src/pages/case-studies/`您新建的目录之下，或将中文案例文档放入`i18n/zh/docusaurus-plugin-content-page/case-studies`对应的新建目录下。
3.  请将您编写的Markdown文档以index.md或index.mdx命名。
4.  请在website仓库以PR的形式提交你的文档。
