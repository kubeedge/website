---
authors:
- Vincent Lin
categories:
- Security
- Announcements
date: 2022-07-11
draft: false
lastmod: 2022-07-11
summary: KubeEdge Holistic Security Audit Engagement
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- threat model
title: KubeEdge Holistic Security Audit Engagement
---
# KubeEdge Holistic Security Audit Engagement

As the first cloud-native edge computing community, KubeEdge provides solutions for cloud-edge synergy and has been widely adopted in industries including Transportation, Energy, Internet, CDN, Manufacturing, Smart campus, etc. With the accelerated deployment of KubeEdge in this area based on cloud-edge synergy, the community will improve the security of KubeEdge continuously in cloud-native edge computing scenarios.

The KubeEdge community attaches great importance to security and has set up [Sig Security](https://github.com/kubeedge/community/tree/master/sig-security) and [Security Team](https://github.com/kubeedge/community/tree/master/security-team) to design KubeEdge system security and quickly respond to and handle security vulnerabilities. To conduct a more comprehensive security assessment of the KubeEdge project, the KubeEdge community cooperates with Ada Logics Ltd. and The Open Source Technology Improvement Fund performed a holistic security audit of KubeEdge and output a security auditing report, including the security threat model and security issues related to the KubeEdge project. Thank you to experts Adam Korczynski and David Korczynski of [Ada Logics](https://adalogics.com/) for their professional and comprehensive evaluation of the KubeEdge project, which has important guiding significance for the security protection of the KubeEdge project. Thank you Amir Montazery and Derek Zimmer of OSTIF and Cloud Native Computing Foundation (CNCF) who helped with this engagement.

The discovered security issues have been fixed and patched to the latest three minor release versions (v1.11.1, v1.10.2, v1.9.4) by KubeEdge maintainers according to the [kubeedge security policy](https://github.com/kubeedge/kubeedge/security/policy). Security advisories have been published [here](https://github.com/kubeedge/kubeedge/security/advisories).

For more details of the threat model and the mitigations, Please check KubeEdge Threat Model And Security Protection Analysis: https://github.com/kubeedge/community/tree/master/sig-security/sig-security-audit/KubeEdge-threat-model-and-security-protection-analysis.md.

<!--truncate-->

## References:
Audit report: https://github.com/kubeedge/community/tree/master/sig-security/sig-security-audit/KubeEdge-security-audit-2022.pdf

OSTIF Blogpost: https://ostif.org/our-audit-of-kubeedge-is-complete-multiple-security-issues-found-and-fixed

CNCF Blogpost:

KubeEdge Threat Model And Security Protection Analysis: https://github.com/kubeedge/community/tree/master/sig-security/sig-security-audit/KubeEdge-threat-model-and-security-protection-analysis.md