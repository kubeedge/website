# Creating and updating the KubeEdge docs

Welcome to the GitHub repository for KubeEdge's public website. The docs are
hosted at https://kubeedge.io.

We use [Docusaurus](https://docusaurus.io/) to format and generate our website, and
[Netlify](https://www.netlify.com/) to manage the deployment of the site. Docusaurus
is an open-source static site generator that provides us with templates, content
organisation in a standard directory structure, and a website generation engine.
You write the pages in Markdown, and Docusaurus wraps them up into a website.

- Please see [How to contributing](CONTRIBUTING.md) for instructions on how to contribute, if you are not familiar with the
  GitHub workflow
- [Start contributing](https://kubeedge.netlify.com/docs/about/contributing/)

## Quick start

Here's a quick guide to updating the docs. It assumes you're familiar with the
GitHub workflow and you're happy to use the automated preview of your doc
updates:

1. Fork the [KubeEdge/website repo][kubeEdge-website-repo] on GitHub.
1. Make your changes and send a pull request (PR).
1. If you're not yet ready for a review, add a comment to the PR saying it's a
   work in progress or add `[WIP]` in your PRs title. You can also add `/hold` in a comment to mark the PR as not
   ready for merge. 
1. Wait for the automated PR workflow to do some checks. When it's ready,
   you should see a comment like this: **deploy/netlify — Deploy preview ready!**
1. Click **Details** to the right of "Deploy preview ready" to see a preview
   of your updates.
1. Continue updating your doc until you're happy with it.
1. When you're ready for a review, add a comment to the PR and assign a
   reviewer/approver. See the
   [Kubeedge contributor guide][kubeedge-contributor-guide].

## Previewing your changes on a local website server

If you'd like to preview your doc updates as you work, you can install Node.js
and run a local server. This section shows you how.

### Install Node.js

[Node.js](https://nodejs.org/en/download) version 16.14 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed.

### Install yarn

```
npm install -g yarn
```

### Install dependencies

```
cd website

yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Your website is at [http://localhost:3000/](http://localhost:3000/)

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Versioning

For each stable release, we should create a new branch for the relevant documentation. For
example, the documentation for the v0.1 stable release are maintained in the
[v0.1-branch](https://github.com/kubeedge/website/tree/v0.1-branch).
Each branch has a corresponding netlify website that automatically syncs each merged PR.

Going forward, the versioned sites should follow this convention:

- `https://kubeedge.netlify.com/` always points to the current _master branch_
- `https://master.kubeedge.netlify.com/` always points to Github head
- `https://vXXX-YYY.kubeedge.netlify.com/` points to the release at vXXX.YYY-branch
