---
title: Partners
sidebar_position: 9
---

# KubeEdge 合作伙伴

KubeEdge致力于与合作伙伴共同打造一个强大且充满活力的云原生边缘计算生态，我们在官网[Partners页面](http://kubeedge.io/partners)组织了一个`KubeEdge发行版本、托管平台以及安装工具`列表，这些合作伙伴在帮助企业或者用户成功采用KubeEdge方面拥有丰富的经验。如果你的产品属于其中一种，并且希望加入我们社区，欢迎你在列表中添加你的产品介绍，帮助KubeEdge用户快速发现并了解你们。

请参考以下步骤添加你的产品信息：

1. Fork [kubeedge/website](https://github.com/kubeedge/website)仓库。
2. 使用`git clone https://github.com/<YOUR-GH-USERNAME>/website.git`命令clone它到本地。
3. 在[src/pages/partners/partners.mdx](https://github.com/kubeedge/website/blob/master/src/pages/partners/partners.mdx)文件中编辑partners列表，请按照组织或公司名的字母排序，在列表中写入产品信息。你可以参考如下格式：

   | Organization/Company   | Product  | Description | Website |
   |:-:|:-:|-------------|---------|
   | 产品所属的组织或公司名    |   产品名称           | (可选) 产品描述        | 产品官网  |

4. 保存修改, 执行 `git add -A` 以及 `git commit -s -m "Add <MY Product> to partners"`。
5. 执行`git push origin master`将你的修改push到远程仓库。
6. 在[kubeedge/website](https://github.com/kubeedge/website)仓库创建一个Pull Request。

完成上述步骤后，社区将尽快完成审核。一切就绪后，你的产品信息将会添加到官网[Partners列表](http://kubeedge.io/partners)。