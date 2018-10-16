# Creating and updating the Kubeedge docs

Welcome to the GitHub repository for Kubeedge's public website. The docs are
hosted at https://kubeedge.io.

We use [Hugo](https://gohugo.io/) to format and generate our website, and
[Netlify](https://www.netlify.com/) to manage the deployment of the site. Hugo
is an open-source static site generator that provides us with templates, content
organisation in a standard directory structure, and a website generation engine.
You write the pages in Markdown, and Hugo wraps them up into a website.

## Quickstart

Here's a quick guide to updating the docs. It assumes you're familiar with the
GitHub workflow and you're happy to use the automated preview of your doc
updates:

1. Fork the [Kubeedge/website repo][kubeedge-website-repo] on GitHub.
1. Make your changes and send a pull request (PR).
1. If you're not yet ready for a review, add a comment to the PR saying it's a
  work in progress or add `[WIP]` in your PRs title. You can also add `/hold` in a comment to mark the PR as not
  ready for merge. (**Don't** add the Hugo declarative "draft = true" to the
  page front matter, because that will prevent the auto-deployment of the
  content preview described in the next point.)
1. Wait for the automated PR workflow to do some checks. When it's ready,
  you should see a comment like this: **deploy/netlify — Deploy preview ready!**
1. Click **Details** to the right of "Deploy preview ready" to see a preview
  of your updates.
1. Continue updating your doc until you're happy with it.
1. When you're ready for a review, add a comment to the PR and assign a
  reviewer/approver. See the
  [Kubeedge contributor guide][kubeedge-contributor-guide].

## Previewing your changes on a local website server

If you'd like to preview your doc updates as you work, you can install Hugo
and run a local server. This section shows you how.

### Install Hugo

See the [Hugo installation guide][hugo-install]. Here are some examples:

#### Mac OS X:

```
brew install hugo
```

#### Debian:

1. Download the latest Debian package from the [Hugo website][hugo-install].
  For example, `hugo_0.46_Linux-64bit.deb`.
1. Install the package using `dpkg`:

    ```
    sudo dpkg -i hugo_0.46_Linux-64bit.deb
    ```

1. Verify your installation:

    ```
    hugo version
    ```

### Clone the website repo and run a local website server

Follow the usual GitHub workflow to fork the repo on GitHub and clone it to your
local machine, then use your local repo as input to your Hugo web server:

1. **Fork** the [Kubeedge/website repo][kubeedge-website-repo] in the GitHub UI.
1. Clone your fork locally. This example uses SSH cloning:

    ```
    mkdir kubeedge
    cd kubeedge/
    git clone git@github.com:<your-github-username>/website.git
    cd website/
    ```

1. Start your website server. Make sure you run this command from the
   `/website/` directory, so that Hugo can find the config files it needs:

    ```
    hugo server -D
    ```

1. Your website is at [http://localhost:1313/](http://localhost:1313/).

1. Continue with the usual GitHub workflow to edit files, commit them, push the
  changes up to your fork, and create a pull request. (See below.)

1. While making the changes, you can preview them on your local version of the
  website at [http://localhost:1313/](http://localhost:1313/). Note that if you
  have more than one local git branch, when you switch between git branches the
  local website reflects the files in the current branch.

Useful Hugo docs:
- [Hugo installation guide][hugo-install]
- [Hugo basic usage](https://gohugo.io/getting-started/usage/)
- [Hugo site directory structure](https://gohugo.io/getting-started/directory-structure/)
- [hugo server reference](https://gohugo.io/commands/hugo_server/)
- [hugo new reference](https://gohugo.io/commands/hugo_new/)

## Using Hugo shortcodes

Sometimes it's useful to define a snippet of information in one place and reuse
it wherever we need it. For example, we want to be able to refer to the minimum
version of various frameworks/libraries throughout the docs, without
causing a maintenance nightmare.

For this purpose, we use Hugo's "shortcodes". Shortcodes are similar to Django
variables. You define a shortcode in a file, then use a specific markup to
invoke the shortcode in the docs. That markup is replaced by the content of the
shortcode file when the page is built.

To create a shortcode:

1. Add an HTML file in  the `/website/themes/kf/layouts/shortcodes/` directory.
   The file name must be short and meaningful, as it determines the shortcode
   you and others use in the docs.

1. For the file content, add the text and HTML markup that should replace the
   shortcode markup when the web page is built.

To use a shortcode in a document, wrap the name of the shortcode in braces and
percent signs like this:

  ```
  {{% shortcode-name %}}
  ```

The shortcode name is the file name minus the `.html` file extension.

**Example:** The following shortcode defines the minimum required version of
Kubernetes:

- File name of the shortcode:

  ```
  kubernetes-min-version.html
  ```

- Content of the shortcode:

  ```
  <a href="https://kubernetes.io/docs/imported/release/notes/">1.8</a>
  ```
- Usage in a document:

  ```
  You need Kubernetes {{% kubernetes-min-version %}} or later.
  ```

Useful Hugo docs:
- [Shortcode templates][hugo-shortcode-templates]
- [Shortcodes][hugo-shortcodes]

## Making changes to CSS

The css/sass style code is located in the `themes/theer/sass` directory.

### CSS Dev Setup
You need to install node.js. Download the binary for your platform
[here](https://nodejs.org/en/download/). This will also install npm.


### Updating theme style

If you need to make changes to the style, you can update the theme's style using:

```
cd themes/theer/sass
# Note the npm install steps are needed only the first time.
npm install
npm install gulp-cli -g
gulp
```

Note that if you didn't make any changes to style (most of the time you won't), you
don't need the above steps at all.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on how to contribute.

## Versioning

For each stable release, we should create a new branch for the relevant documentation. For
example, the documentation for the v0.2 stable release are maintained in the
[v0.2-branch](https://github.com/kubeedge/website/tree/v0.2-branch).
Each branch has a corresponding netlify website that automatically syncs each merged PR.

Going forward, the versioned sites should follow this convention:
* `www.kubeedge.io` always points to the current *master branch*
* `master.kubeedge.io` always points to Github head
* `vXXX-YYY.kubeedge.io` points to the release at vXXX.YYY-branch

Furthermore, whenever any documents reference any source code, the links should be created
using the version shortcode, like so:
```
https://github.com/kubeedge/kubeedge/blob/{{< params "githubbranch" >}}/scripts/gke/deploy.sh
```
This ensures that all the links in a versioned webpage point to the correct branch.

[hugo-install]: https://gohugo.io/getting-started/installing/
[hugo-shortcode-templates]: https://gohugo.io/templates/shortcode-templates/
[hugo-shortcodes]: https://gohugo.io/content-management/shortcodes/

[kubeedge-contributor-guide]: https://github.com/kubeedge/community/blob/master/CONTRIBUTING.md
[kubeedge-website-repo]: https://github.com/kubeedge/website
