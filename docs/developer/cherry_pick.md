---
title: Cherry Pick 
sidebar_position: 9 
---

This page explains how to use shell script `hack/cherry_pick_pull.sh` in kubeedge/kubeedge repo to cherry pick the patch to release branch.


## Cherry Pick Settings

Before the cherry pick script is executed, need to make sure below setting is correctly set:

1. Set environment variable `GITHUB_USER`

This variable is used to designated GitHub username or Orginazation name. This is the necessary for Pull Request.

```shell
## set GITHUB_USER
export GITHUB_USER=<your-github-user>
```

2. Install `hub` 

As this script reply on `hub` to execute GitHub operations, developer must make sure it is installed.

```shell
## examine whether the hub is installed successfully
which hub
```

If `hub` is not installed, please install it by referring [hub installation](https://github.com/github/hub)

3. Other environment variables setting

- The variable `DRY_RUN` is used to skip `git push` and create PR steps, This is useful for creating patches to a release branch without making a PR. When DRY_RUN is set the script will leave you in a branch containing the commits you cherry-picked.

- The variable `REGENERATE_DOCS` is used to regenerate documentation for the target branch after picking the specified commits, This is useful when picking commits containing changes to API documentation. **Note**: Set variable `REGENERATE_DOCS` may affect the cherry pick performance.

- The variables `UPSTREAM_REMOTE` (default: upstream) and `FORK_REMOTE` (default: origin) are used to override the default remote names to what you have locally.
 
4. Make sure the working repo is clean, there is no uncommitted or untracking files.

```shell
## check whether the current repo is clean
git status
```

## Execution steps

1. Execute cherry_pick_pull.sh with parameters, at least include `remote branch` and `pr number` (could be multiple pr numbers)

```shell
## Usage of cherry_pick_pull.sh 
./cherry_pick_pull.sh <remote branch> <pr-number> ...
```

for example:

```shell
## examples to run cherry_pick_pull.sh
./cherry_pick_pull.sh upstream/release-3.14 12345
./cherry_pick_pull.sh upstream/release-3.14 12345 56789
```

If the number of arguments is less than 2, this script will exit with help information.

2. Remote branch will be **automatically** updated to ensure it is the latest version.

3. Script will generate new local branch and PR for cherry-pick **automatically**

4. Script will start cherry-pick, if it detects **conflicts or unmerged files**, it will remind developer to fix the issues, and only execute until the issues fixed.

5. After cherry-pick executed, it will remind to confirm to git push to remote branch.

6. If developer does not want to keep the created local branches, they could be deleted manually.

```shell
## delete the created local branch
git checkout ${STARTING_BRANCH}    		#replace variable with developer's branch
git branch -D ${NEWLY_CREATED_BRANCH}	#replace variable with newly created branch
```

