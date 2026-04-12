---
title: Contributing
sidebar_position: 1
---
## Code of Conduct

Please make sure to read and observe our [Code of Conduct](https://github.com/kubeedge/community/blob/master/CODE_OF_CONDUCT.md).

## Community Membership

KubeEdge is a community project driven by its community which strives to promote a healthy, friendly and productive environment.
The goal of the community is to develop a cloud native edge computing platform built on top of Kubernetes to manage edge nodes and devices at scale and demonstrate resiliency, reliability in offline scenarios. To build a platform at such scale requires the support of a community with similar aspirations.

- See [Community Membership](./membership) for a list of various community roles. With gradual contributions, one can move up in the chain.

## Contribute to KubeEdge

We're always excited to welcome new contributors! Here's how to get started:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/kubeedge.git
   cd kubeedge
   ```
3. Read the [Developer Guide](../developer/build.md) to learn how to build and test KubeEdge

### Find Something to Work On

There are several ways to find issues to work on:

- **Good First Issues**: Look for issues labeled [`good first issue`](https://github.com/kubeedge/kubeedge/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) - these are beginner-friendly and don't require deep system knowledge
- **Help Wanted**: Check issues labeled [`help wanted`](https://github.com/kubeedge/kubeedge/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) for areas where the community needs assistance
- **Documentation improvements**: Fix broken links, clarify confusing sections, or add missing documentation
- **Bug reports**: File issues when you encounter problems - even reporting bugs is a valuable contribution!

When you find an issue you'd like to work on, comment with `/assign` or `/assign @yourself` to assign it to yourself.

### Contributor Workflow

Here's the typical workflow for contributing code:

1. **Create a topic branch** from `master`:
   ```bash
   git checkout -b my-feature-branch
   ```

2. **Make your changes** with clear, logical commits

3. **Write good commit messages** following this format:
   ```
   <subsystem>: <what changed>

   <why this change was made>

   Fixes #issue-number
   ```

4. **Test your changes** locally before submitting:
   ```bash
   make verify          # Run verification checks
   make lint            # Run linting
   make test            # Run unit tests
   make integrationtest # Run integration tests
   ```

5. **Push to your fork** and create a pull request to `kubeedge/kubeedge`

6. **Address review feedback** - PRs require approval from two maintainers

## Contribute to Documentation

Documentation is a critical part of KubeEdge, and we welcome contributions to improve it! The KubeEdge documentation website is built using [Docusaurus](https://docusaurus.io/) and hosted in a separate repository.

The documentation source files are maintained in the [kubeedge/website](https://github.com/kubeedge/website) repository.

### How to Contribute to Docs

1. **Fork the website repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/website.git
   cd website
   ```

2. **Set up the local environment**:
   Using npm (requires Node.js):
   ```bash
   npm install
   npm start
   ```

   This will start a local development server at `http://localhost:3000` where you can preview your changes.
   Or you can use [Docker/Devcontainer](https://github.com/kubeedge/website?tab=readme-ov-file#using-container) if you want.

3. **Make your documentation changes**:

4. **Preview your changes** locally to ensure formatting and links work correctly

5. **Submit a pull request** to [kubeedge/website](https://github.com/kubeedge/website) following the same workflow as code contributions

For more information about contributing to the documentation, visit the [website repository](https://github.com/kubeedge/website).
