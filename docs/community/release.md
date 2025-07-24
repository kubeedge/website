---
title: Release Management
sidebar_position: 5
---

## KubeEdge Release Cycle

KubeEdge releases currently happen approximately every three months. 

![release cycle](/img/community/release-cycle.png)

The release process can be thought of as having four main phases:

- **Feature Definition (Week 1~2)**

    With ongoing feature definition through the year, some set of items will bubble up as targeting a given release. During the initial two weeks, feature work for the given release is defined in suitable planning artifacts in conjunction with SIG Release Team. Milestone is created and applied correctly so that SIG Release Team can track enhancements and bugs.

- **Feature Work (Week 3~10)**
   
    Features Development phase spans form the third week to the tenth week of the release cycle. Community developers actively engage in implementing the planned features and enhancements. Weekly community meetings and each SIG meeting are held to ensure effective coordination and progress tracking.

- **Code Freeze and Bug Fixing (Week 11)**

    Code Freeze starts in week 11. A release branch are created and release cycle enters into the final testing stage. Only bug fixes are accepted into the release codebase during this time. Feature code cannot be merged anymore to ensure stability of the release branch.

- **Release (Week 12)**

  Once the first three phases are completed, the release branch enters the final stage. The community prepares for the official release by conducting thorough testing and ensuring documentation and release notes are up-to-date. Following this, the final version is officially released and made available for public use.

When the code base is sufficiently stable, the master branch opens for general development and work begins there for the next release milestone. 

## Patch Release

Our typical patch release cadence is monthly. If there are critical issues present in the current version, an expedited release may be necessary.

### Cherry Picks

Any remaining modifications for the current release are cherry picked from master back to the release branch. Cherry picks must be merge-ready in GitHub with proper labels (e.g., approved, lgtm, release-note) and passing CI tests ahead of the patch release deadline.

### Support Versions

We provide maintenance for the latest three releases. This means that bug fixes will be applied to these releases to ensure their stability and reliability. However, in exceptional cases where severe issues arise, we may consider releasing patches for earlier versions as well, based on the specific circumstances.

![release lifecycle](/img/community/release-lifecycle.png)
