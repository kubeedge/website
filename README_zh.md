# 创建和更新 KubeEdge 文档库

欢迎使用 KubeEdge 的 GitHub 存储库。这些文档被放在https://kubeedge.io上。

我们使用 [Docusaurus](https://docusaurus.io/) 规范化我们的网站，并使用 [Netlify](https://www.netlify.com/) 管理网站的部署。Docusaurus 是一个开源静态站点生成器，它为我们提供模板，标准目录结构中的内容组织以及网站生成引擎。您在 Markdown 中编写页面，然后 Docusaurus 会将它们包装到网站中。

- 如果您不熟悉 GitHub 工作流程，请参阅 [如何贡献](CONTRIBUTING.md) 以获取有关贡献的说明。
- [开始贡献](https://kubeedge.netlify.com/docs/about/contributing/)

## 快速开始

下面是更新文档的快速指南。假定您熟悉 GitHub 工作流程，您会很乐意使用文档的自动预览更新功能：

1. 在 GitHub 上 Fork 仓库 [KubeEdge/website repo][kubeEdge-website-repo]。
1. 改进现有内容然后发送 pull request（PR）。
1. 如果您还没有准备好进行审查（review）, 请在 PR 中添加评论，表明它正在进行中，或者在 PR 中添加标题 `[WIP]` 。您同样还可以添加`/hold` 注释来将 PR 标记为未准备好合并的状态。
1. 等待自动化的 PR 工作流进行一些检查工作。检查工作全部通过后，您应该会看到以下类似注释：**deploy/netlify — Deploy preview ready!** （部署预览已准备就绪！）
1. 找到 "Deploy preview ready" 右侧的 **Details** 按钮，点击查看本次更新的预览展示。
1. 继续更新您的文档，直到您改到满意为止。
1. 当您准备好进行审核（review）时，请在 PR 中添加评论，并指定审核人/批准人。请参阅
   [Kubeedge 贡献者指南][kubeedge-contributor-guide]。

## 在本地网站服务器上预览您的更改

如果您想在工作时预览文档更新，则可以安装 Node.js 并运行本地服务器。本节向您展示如何进行操作。

### 安装 Node.js

[Node.js](https://nodejs.org/en/download) 的版本需要在 16.14 以上， (可以使用`node -v`命令查看当前版本). 也可也使用 [nvm](https://github.com/nvm-sh/nvm) 管理 Node.js 版本.

### 安装 yarn

```
npm install -g yarn
```

### 安装依赖

```
cd website

yarn
```

### 启动本地调试

```
$ yarn start
```

此命令启动本地开发服务器并打开浏览器窗口。 大多数更改浏览器会自动刷新，无需重新启动服务器

启动后的本地调试页面地址 [http://localhost:3000/](http://localhost:3000/)

### Build

```
$ yarn build
```

此命令将静态内容生成到`build`目录中，并且可以使用任何静态内容托管服务提供服务

## 版本控制

对于每个稳定版本，我们应该为相关文档创建一个新分支。例如，v0.1 稳定发行版的文档保留在 [v0.1-branch](https://github.com/kubeedge/website/tree/v0.1-branch) 中。每个分支都有一个相应的 netlify 网站，该网站会自动同步每个合并的 PR。

另外, 版本控制站点应遵循以下约定:

- `https://kubeedge.netlify.com/` 总是指向当前的*master 分支*
- `https://master.kubeedge.netlify.com/` 总是指向 Github
- `https://vXXX-YYY.kubeedge.netlify.com/` 指向 vXXX.YYY 分支处的 release 版本
