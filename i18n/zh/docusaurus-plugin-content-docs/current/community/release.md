---
title: 版本管理
sidebar_position: 5
---

## KubeEdge 版本周期

KubeEdge 目前大约每三个月会发布一个版本。

![release cycle](/img/community/release-cycle.png)

发布过程可被认为有四个阶段：

- **特性定义 (第1~2周)**

  根据全年RoadMap，确定当前版本的需求列表。在这两周中，SIG Release 会联合社区用户与开发者共同制定版本需求，规划新版本特性列表。同时Milestone也会被创建并运用起来，来保证SIG Release团队可以跟踪特性与问题修复工作。

- **特性开发 (第3~10周)**

  特性开发阶段从版本周期的第三周延续至第十周。社区开发人员按照计划进行特性开发与问题修复。每周的社区会议和各个SIG会议沟通讨论，确保有效的工作协调和跟踪进度。

- **代码冻结与问题修复 (第11周)**

  第11周开始进行代码冻结。创建版本分支，版本发布周期进入最后的测试阶段。在此阶段只接受bugfix的PR合并到版本分支中。为确保版本分支的稳定性，不再合并特性代码。

- **版本发布 (第12周)**

  完成前三个阶段后，版本进入最后的发布准备阶段。社区通过进行测试、文档和版本Changelog来准备正式发布。随后，最终版本正式发布并可供公众使用。

当代码库足够稳定时，主分支将开放进行开发，并从开始下一个版本的工作。 

## 补丁版本

补丁版本通常是每月发布一次，如果出现严重问题需要修复，社区也会缩短发布周期，尽快发布补丁版本。

### Cherry Picks

当前版本的任何修改都是从 master 分支cherry-pick回版本分支。Cherry-Pick的PR必须在 GitHub 中准备好合并，带有approved和lgtm标签， 并在补丁版本发布截止日期之前通过 CI 测试。

### 支持的版本

通常社区会维护最新三个版本的补丁发布，这意味着问题修复可以合入最新三个版本来保证版本的稳定性与可靠性。如果出现严重问题，社区会根据具体情况考虑对更早的版本发布补丁。

![release lifecycle](/img/community/release-lifecycle.png)
