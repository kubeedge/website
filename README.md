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
- [Start contributing](https://kubeedge.io/docs/community/contribute)

## Quick start

Here's a quick guide to updating the docs. It assumes you're familiar with the
GitHub workflow and you're happy to use the automated preview of your doc
updates:

1. Fork the [KubeEdge/website repo][kubeEdge-website-repo] on GitHub.
2. Make your changes and send a pull request (PR).
3. If you're not yet ready for a review, add a comment to the PR saying it's a
   work in progress or add `[WIP]` in your PRs title. You can also add `/hold` in a comment to mark the PR as not
   ready for merge. 
4. Wait for the automated PR workflow to do some checks. When it's ready,
   you should see a comment like this: **deploy/netlify — Deploy preview ready!**
5. Click **Details** to the right of "Deploy preview ready" to see a preview
   of your updates.
6. Continue updating your doc until you're happy with it.
7. When you're ready for a review, add a comment to the PR and assign a
   reviewer/approver. See the
   [Kubeedge contributor guide][kubeedge-contributor-guide].

## Previewing your changes on a local website server

If you'd like to preview your doc updates as you work, you can install Node.js
and run a local server. This section shows you how.

### Install Node.js

[Node.js](https://nodejs.org/en/download) version 16.14 or above required, please see more details for [Node.js official supported version](https://endoflife.date/nodejs).

> [!NOTE]
> Aligned with [official download](https://nodejs.org/en/download), using `nvm` and `npm` installation is recommended.

- using `nvm` with `npm`

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 22
node -v
```

If you want to install `apt` package on Ubuntu.

- `apt`

```shell
curl -sL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

### Install yarn

- `npm`

```shell
npm install -g yarn
```

- `apt`

```shell
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y yarn
```

### Install dependencies

```shell
cd website
yarn
```

### Local Development

```shell
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Your website is at [http://localhost:3000/](http://localhost:3000/). (You can also use `--host` option to bind the IP address instead of `localhost`.)

### Build

```shell
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Using Container

### Docker

```shell
docker build -t kubeedge:website -f Dockerfile .
docker run -it --network host --rm -v $(pwd):/tmp/doc_repository kubeedge:website /bin/bash
yarn start
```

### Devcontainer

Once you open the vscode with `devcontainer`, you can see the following terminal.

```shell
Running the postCreateCommand from devcontainer.json...

[12035 ms] Start: Run in container: /bin/sh -c yarn install
yarn install v1.22.22
[1/5] Validating package.json...
[2/5] Resolving packages...
success Already up-to-date.
Done in 0.24s.
Running the postStartCommand from devcontainer.json...

[14333 ms] Start: Run in container: /bin/sh -c /bin/bash
kubeedge@be52334d349c:/tmp/doc_repository$
```

## Spell Check

We use [codespell](https://github.com/codespell-project/codespell) to check for common spelling mistakes in the documentation.

**Note:** Spell checking is automatically enforced in the [GitHub workflow](./.github/workflows/codespell.yml). All pull requests will be checked for spelling errors, and the CI will fail if any issues are found. You can run the spell check locally before submitting your PR to catch issues early.

First, create a Python virtual environment and install codespell:

```shell
python3 -m venv venv
source venv/bin/activate
pip install codespell
```

### Run spell check

```shell
codespell --config codespell.cfg
```

This will check specified files according to the configuration in [codespell.cfg](./codespell.cfg) and report any spelling errors found.

- [codespell_dictionary](./codespell_dictionary.txt) is a custom dictionary file containing project-specific terms and words that should be recognized as correctly spelled.
- [codespell_whitelist](./codespell_whitelist.txt) is a whitelist file containing words that should be ignored by the spell checker, typically containing technical terms, acronyms, or intentional spellings.

### Usage

The tools are configured to work together as part of the development workflow to ensure code quality and consistency across the project.

## Versioning

For each stable release, we should create a new branch for the relevant documentation. For
example, the documentation for the v0.1 stable release are maintained in the
[v0.1-branch](https://github.com/kubeedge/website/tree/v0.1-branch).
Each branch has a corresponding netlify website that automatically syncs each merged PR.

Going forward, the versioned sites should follow this convention:

- `https://kubeedge.netlify.com/` always points to the current _master branch_
- `https://master.kubeedge.netlify.com/` always points to Github head
- `https://vXXX-YYY.kubeedge.netlify.com/` points to the release at vXXX.YYY-branch
