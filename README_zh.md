# 创建和更新KubeEdge文档库

欢迎使用KubeEdge的GitHub存储库。这些文档被放在https://kubeedge.io上。

我们使用 [Hugo](https://gohugo.io/) 规范化我们的网站，并使用 [Netlify](https://www.netlify.com/) 管理网站的部署。Hugo是一个开源静态站点生成器，它为我们提供模板，标准目录结构中的内容组织以及网站生成引擎。您在Markdown中编写页面，然后Hugo会将它们包装到网站中。

* 如果您不熟悉GitHub工作流程，请参阅 [如何贡献](CONTRIBUTING.md) 以获取有关贡献的说明。
* [开始贡献](https://kubeedge.netlify.com/docs/about/contributing/)

## 快速开始

下面是更新文档的快速指南。假定您熟悉GitHub工作流程，您会很乐意使用文档的自动预览更新功能：

1. 在 GitHub 上 Fork 仓库 [KubeEdge/website repo][kubeEdge-website-repo]。
1. 改进现有内容然后发送 pull request（PR）。
1. 如果您还没有准备好进行审查（review）, 请在PR中添加评论，表明它正在进行中，或者在PR中添加标题 `[WIP]` 。您同样还可以添加`/hold` 注释来将PR标记为未准备好合并的状态。（**请不要**在页面的开头添加 Hugo 声明性的语句“ draft = true”，因为这将阻止后续内容的自动部署。）
1. 等待自动化的PR工作流进行一些检查工作。检查工作全部通过后，您应该会看到以下类似注释：**deploy/netlify — Deploy preview ready!** （部署预览已准备就绪！）
1. 找到 "Deploy preview ready" 右侧的 **Details** 按钮，点击查看本次更新的预览展示。
1. 继续更新您的文档，直到您改到满意为止。
1. 当您准备好进行审核（review）时，请在PR中添加评论，并指定审核人/批准人。请参阅 
  [Kubeedge贡献者指南][kubeedge-contributor-guide]。


## 在本地网站服务器上预览您的更改

如果您想在工作时预览文档更新，则可以安装Hugo并运行本地服务器。本节向您展示如何进行操作。

### 安装Hugo

请参阅 [《Hugo安装指南》][hugo-install]。这里有些例子：

#### Mac OS X:

```
brew install hugo
```

#### Debian:

1. 从 [Hugo网站][hugo-install].下载Debian软件包。
   确保安装由 [`netlify.toml`](netlify.toml#L7) 文件中的 `HUGO_VERSION` 环境变量指定的 Hugo 版本。
   例如，[hugo_0.54_Linux-64bit.deb][hugo_0.54_Linux-64bit.deb]。
1. 使用 `dpkg` 命令安装软件包：

    ```
    sudo dpkg -i hugo_0.46_Linux-64bit.deb
    ```

1. 验证您的安装：

    ```
    hugo version
    ```

### 在本地运行该网站服务器

遵循GitHub工作流程 fork GitHub上的代码库并将其克隆到本地，然后将本地库用作Hugo Web服务器的输入：

1. 确保您在目标分支中：

    ```
    git branch
    ```

1. 确保从`/website/` 目录运行此命令 ，以便Hugo可以找到所需的配置文件。启动您的网站服务器：

    ```
    hugo server -D
    ```

1. 您的网站位于 [http://localhost:1313/](http://localhost:1313/) 。

1. 继续按GitHub工作流程 来编辑文件，提交文件，将更改推送到您的fork并创建
    PR。（请参阅GitHub工作流程）

1. 当您进行文档编辑工作时，您可以在本地网站 [http://localhost:1313/](http://localhost:1313/) 上预览它们。请注意，如果您有多个本地git分支，则在git分支之间切换时，本地网站会展示当前分支中的文件。

Hugo 参考文档：
- [Hugo安装指南][hugo-install]
- [Hugo基本用法](https://gohugo.io/getting-started/usage/)
- [Hugo网站目录结构](https://gohugo.io/getting-started/directory-structure/)
- [Hugo服务器指南](https://gohugo.io/commands/hugo_server/)
- [Hugo最新更新指南](https://gohugo.io/commands/hugo_new/)

## 版本控制

对于每个稳定版本，我们应该为相关文档创建一个新分支。例如，v0.1稳定发行版的文档保留在 [v0.1-branch](https://github.com/kubeedge/website/tree/v0.1-branch) 中。每个分支都有一个相应的netlify网站，该网站会自动同步每个合并的PR。

另外, 版本控制站点应遵循以下约定:
* `https://kubeedge.netlify.com/` 总是指向当前的*master分支*
* `https://master.kubeedge.netlify.com/` 总是指向 Github 
* `https://vXXX-YYY.kubeedge.netlify.com/` 指向vXXX.YYY分支处的release版本

[hugo-install]: https://gohugo.io/getting-started/installing/
[hugo-shortcode-templates]: https://gohugo.io/templates/shortcode-templates/
[hugo-shortcodes]: https://gohugo.io/content-management/shortcodes/

[kubeedge-contributor-guide]: CONTRIBUTING.md
[kubeEdge-website-repo]: https://github.com/kubeedge/website
[hugo_0.54_Linux-64bit.deb]: https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-64bit.deb