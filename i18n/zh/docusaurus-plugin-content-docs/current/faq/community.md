---
title: 社区参与
sidebar_position: 6
---

## 我该如何开始为 KubeEdge 做出贡献？

最简单的方法是在 [KubeEdge GitHub 仓库](https://github.com/kubeedge/kubeedge/issues) 中挑选标有 `good first issue` 的工单。这些工单专为新手标记，通常有明确的要求。

开始之前：
1. 阅读 [贡献指南](../community/contribute.md)
2. 搭建开发环境（这里的 [构建文档](../developer/build.md) 对此有帮助）
3. 加入 Slack 频道（详见下文）

提交 PR 时：
- 确保通过 CI 检查
- 编写清晰的提交信息（commit messages）
- 若增加了新功能，请添加相应的测试
- 保持耐心 —— 维护人员非常繁忙，可能需要几天时间来评审

## 获取帮助的最佳方式是什么？

**Slack** 是最快的方式。加入 [kubeedge.slack.com](https://kubeedge.slack.com) 并关注以下频道：
- `#general` - 通用提问与讨论
- `#development` - 开发相关问题
- `#device-iot` - 设备管理专区
- `#edge-mesh` - 网络相关问题

**GitHub Issues** 更适合提交 Bug 报告和功能请求。提交问题时：
- 包含您的 KubeEdge 版本（`cloudcore --version` 和 `edgecore --version`）
- 描述您的期望行为与实际行为
- 提供相关日志（cloudcore 和 edgecore）
- 说明您的环境（操作系统、Kubernetes 版本、网络配置）

**GitHub Discussions**（若已启用）适合问答以及不适合作为 Issue 的一般性问题。

## KubeEdge 多久发布一次新版本？

KubeEdge 遵循大约每季度一次的发布周期。因此，您每 3-4 个月就会看到一个新的次要版本（例如 v1.14.0，v1.15.0）。

补丁版本（v1.14.1，v1.14.2 等）会根据需要发布，用于修复 Bug 和安全更新。关键的安全补丁可能会发布得更快。

您可以在 [发布页面](https://github.com/kubeedge/kubeedge/releases) 上查看发布历史，当有新版本发布时，通常会在 Slack 的 `#general` 频道中发布公告。

## 社区会议在什么时候举行？

KubeEdge 定期举行公开的社区会议，供贡献者讨论路线图、当前工作和提案。时间表会发布在 [KubeEdge 社区仓库](https://github.com/kubeedge/community) 以及 CNCF 公开日历上。

如果您无法参加实时会议，会议通常会进行录音/录像并上传到 YouTube/Bilibili。会议记录保存在共享的 Google 文档中，该文档在社区仓库中有对应链接。

## SIG 和工作组（Working Groups）之间有什么区别？

**SIG (特别兴趣小组)** 是专注于特定领域的长期小组：
- SIG Device IoT - 设备管理、mapper、DMI
- SIG Networking - EdgeMesh、云边通信
- SIG Security - 安全特性与加固
- SIG Testing - 测试基础设施和端到端（E2E）测试

**工作组 (Working Groups)** 则是临时的 —— 它们为特定的功能或倡议而成立，并在工作完成后解散。

您可以通过订阅邮件列表或加入其 Slack 频道来加入任何 SIG。大多数 SIG 会定期举行会议（通常是双周或每月一次）来讨论进展和计划。

## 我如何成为 KubeEdge 成员？

KubeEdge 遵循 CNCF 的成员模型：

**贡献者 (Contributor)** - 任何有 PR 被合并的人。在您的第一个 PR 合并后，您将自动成为贡献者。

**成员 (Member)** - 在持续贡献一段时间后，您可以申请成为成员。要求包括：
- 向主仓库合并了 3 个 PR
- 获得 2 名现有成员的支持/赞助
- 活跃至少 3 个月

**评审者 (Reviewer)** - 可以评审 PR。通常需要对特定领域有深入的了解。

**核准者 (Approver)** - 可以批准 PR 合并。需要持续的贡献和社区的信任。

申请流程详见 [成员文档](../community/membership.md)。

## 在哪里可以找到 KubeEdge 案例研究和生产用户？

[Adopters 页面](https://github.com/kubeedge/kubeedge/blob/master/ADOPTERS.md) 列出了在生产环境中使用 KubeEdge 的公司。您也可以查看 [案例研究](../community/casestudies.md) 了解更详细的介绍。

如果您的公司也使用了 KubeEdge，请考虑将自己添加到 Adopters 列表中。这有助于项目成长，并向外界展示真实的使用场景。

## 我该如何报告安全漏洞？

对于安全问题，请不要开启公开的 GitHub Issue。而是：

1. 发送电子邮件给安全团队：cncf-kubeedge-security@lists.cncf.io
2. 包含漏洞的详细描述
3. 尽可能提供重现步骤
4. 在修复方案发布之前，请勿公开披露

安全团队将在 2 个工作日内回复，并与您一起了解和修复该问题。在补丁发布后，您可以公开披露该漏洞。

## 是否有行为准则？

是的，KubeEdge 遵循 [CNCF 行为准则](https://github.com/cncf/foundation/blob/main/code-of-conduct.md)。简而言之：尊重他人、包容开放，并专注于建设性的反馈。

如果您经历或目睹了不可接受的行为，可以将其报告至 cncf-kubeedge-leads@lists.cncf.io。
