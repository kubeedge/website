---
title: Security
sidebar_position: 5
---

## How is cloud-edge communication secured?

CloudCore and EdgeCore use TLS certificates for cloud-edge communication. During an edge join, EdgeCore obtains the CA certificate and requests an edge certificate from CloudCore. The HTTPS service is enabled by default on port 10002 and is used for certificate setup; WebSocket or QUIC then carries the cloud-edge connection. See the [CloudCore and EdgeCore configuration guide](../setup/config.md) for the certificate paths and address settings used by your installation.

The default EdgeCore configuration enables certificate rotation and CloudCore's default edge-certificate signing duration is 365 days. These settings can be changed, so check the generated configuration for your release. Do not reset or rejoin a node as a routine rotation step; follow the procedure supported by the version you run.

## How do edge nodes authenticate when joining?

`keadm join` uses a token to authorize the initial certificate request. Treat the token as a secret. Do not paste it into public issues, logs, or documentation. The installation guide explains the join process and required CloudCore addresses.

## Where does EdgeCore store local metadata?

EdgeCore uses a local SQLite database for metadata. The default database path is `/var/lib/kubeedge/edgecore.db`; it can be changed in the `database.dataSource` configuration field. File ownership and permissions depend on how the service is installed and configured, so inspect your host rather than assuming fixed permissions.

## Can Kubernetes Secrets reach an edge node?

EdgeCore can retrieve Secrets needed by workloads running on the edge, and MetaManager caches metadata locally. Access to a secret on an edge node is therefore sensitive: anyone with sufficient access to that node or its local data may be able to read it. Use Kubernetes access controls and host security appropriate to your deployment, and avoid sending secret values in logs or support requests.

## What should I do about certificate errors?

First check that CloudCore's `advertiseAddress` contains the address EdgeCore uses to connect, and that the edge node can reach the configured CloudCore WebSocket or QUIC endpoint and HTTPS port 10002. The [installation guide](../setup/install-with-keadm.md) covers common certificate and join errors. Do not run `keadm reset` or reinitialize CloudCore solely to troubleshoot a certificate error without checking the version-specific recovery guidance, since reset can disrupt the node or cluster.

## Can I use my own CA?

CloudCore can be configured with certificate and CA file paths. The exact setup depends on the KubeEdge version and deployment mode. Use the [CloudCore and EdgeCore configuration guide](../setup/config.md) and the [installation guide](../setup/install-with-keadm.md) to configure certificates for your release; do not overwrite active CA files without a tested rotation plan.
