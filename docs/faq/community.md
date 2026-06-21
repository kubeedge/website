---
title: Community
sidebar_position: 6
---

## How do I get started contributing to KubeEdge?

The easiest way is to pick up an issue labeled `good first issue` on the [KubeEdge GitHub repo](https://github.com/kubeedge/kubeedge/issues). These are specifically tagged for newcomers and usually have clear requirements.

Before you start:
1. Read the [contributing guide](../community/contribute.md)
2. Set up your development environment (the [build docs](../developer/build.md) help here)
3. Join the Slack channel (details below)

When you submit a PR:
- Make sure it passes the CI checks
- Write clear commit messages
- Add tests if you're adding new functionality
- Be patient - maintainers are busy people and might take a few days to review

## What's the best way to get help?

**Slack** is the fastest way. Join [kubeedge.slack.com](https://kubeedge.slack.com) and look for:
- `#general` - General questions and discussion
- `#development` - Development related questions
- `#device-iot` - Device management specific
- `#edge-mesh` - Networking questions

**GitHub Issues** are better for bug reports and feature requests. When filing an issue:
- Include your KubeEdge version (`cloudcore --version` and `edgecore --version`)
- Describe what you expected vs what actually happened
- Include relevant logs (cloudcore and edgecore)
- Mention your environment (OS, Kubernetes version, network setup)

**GitHub Discussions** (if enabled) are good for Q&A and general questions that don't fit as issues.

## How often does KubeEdge release new versions?

KubeEdge follows a roughly quarterly release cycle. So you'll see new minor versions (like v1.14.0, v1.15.0) every 3-4 months.

Patch releases (v1.14.1, v1.14.2, etc.) happen as needed for bug fixes and security updates. Critical security patches can come out faster.

You can see the release history on the [releases page](https://github.com/kubeedge/kubeedge/releases) and there's usually an announcement on the Slack `#general` channel when a new version drops.

## When are the community meetings?

KubeEdge has regular community meetings where contributors discuss roadmap, ongoing work, and proposals. The schedule is posted in the [KubeEdge community repo](https://github.com/kubeedge/community) and on the CNCF public calendar.

The meetings are usually recorded and uploaded to YouTube/Bilibili if you can't make it live. Meeting notes are kept in shared Google Docs that are linked from the community repo.

## What's the difference between SIGs and working groups?

**SIGs (Special Interest Groups)** are long-term groups focused on specific areas:
- SIG Device IoT - Device management, mappers, DMI
- SIG Networking - EdgeMesh, cloud-edge communication
- SIG Security - Security features and hardening
- SIG Testing - Testing infrastructure and E2E tests

**Working groups** are more temporary - they form for specific features or initiatives and disband once the work is done.

You can join any SIG by subscribing to their mailing list or joining their Slack channel. Most SIGs have regular meetings (usually bi-weekly or monthly) where they discuss progress and plans.

## How do I become a KubeEdge member?

KubeEdge follows the CNCF membership model:

**Contributor** - Anyone who has had a PR merged. You're automatically a contributor once your first PR lands.

**Member** - After contributing for a while, you can apply for membership. The requirements are:
- 3 merged PRs to the main repo
- Sponsored by 2 existing members
- Active for at least 3 months

**Reviewer** - Can review PRs. Usually requires deep knowledge of a specific area.

**Approver** - Can approve PRs. Requires sustained contributions and trust from the community.

The application process is described in the [membership docs](../community/membership.md).

## Where can I find KubeEdge case studies and production users?

The [adopters page](https://github.com/kubeedge/kubeedge/blob/master/ADOPTERS.md) lists companies using KubeEdge in production. You can also check the [case studies](../community/casestudies.md) section for more detailed write-ups.

If your company uses KubeEdge, consider adding yourself to the adopters list. It helps the project grow and shows real-world usage patterns.

## How do I report security vulnerabilities?

For security issues, please don't open a public GitHub issue. Instead:

1. Email the security team at cncf-kubeedge-security@lists.cncf.io
2. Include a description of the vulnerability
3. Include steps to reproduce if possible
4. Don't disclose publicly until a fix is available

The security team will respond within 2 business days and work with you to understand and fix the issue. Once a patch is released, you can disclose the vulnerability.

## Is there a code of conduct?

Yes, KubeEdge follows the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/main/code-of-conduct.md). The short version: be respectful, be inclusive, and focus on constructive feedback.

If you experience or witness unacceptable behavior, you can report it to cncf-kubeedge-leads@lists.cncf.io.
