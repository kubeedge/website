---
title: CI/CD Workflows
sidebar_position: 13
---

# CI/CD Workflows

The KubeEdge project relies on [GitHub Actions](https://docs.github.com/en/actions) to run a comprehensive Continuous Integration and Continuous Delivery (CI/CD) pipeline.
Every pull request, push to `master`, scheduled run, and release event triggers one or more workflows that build, lint, test, fuzz, scan, and publish KubeEdge artifacts.

This page describes the workflows that live under [`.github/workflows`](https://github.com/kubeedge/kubeedge/tree/master/.github/workflows) in the [kubeedge/kubeedge](https://github.com/kubeedge/kubeedge) repository, the jobs each workflow runs, and the events that trigger them.
Use this guide as a reference when:

- contributing changes and trying to understand which checks must pass before a pull request can be merged;
- reproducing a failing CI job locally;
- adding a new workflow, job, or matrix entry.

## Overview

The workflows can be grouped by their purpose:

| Category | Workflows |
| --- | --- |
| Core CI (code changes) | `main.yaml`, `main-arm64.yaml` |
| Docs-only CI (no-op shims) | `main-doc.yaml`, `cifuzz-doc.yaml`, `fossa-doc.yaml` |
| Code quality | `codespell.yml` |
| Security & licensing | `cifuzz.yml`, `fossa.yml` |
| Optional / on-demand E2E | `cilium-e2e.yml` |
| Scheduled compatibility tests | `schedule.yml` |
| Release & publishing | `release.yml`, `build-tools.yml` |

Every workflow declares `permissions: contents: read` at the top level and elevates permissions only for the specific jobs that need to write artifacts, publish images, or generate provenance.

## Triggers and path filters

Most workflows split into two variants to avoid wasting CI capacity on documentation-only changes:

- **Code variants** (`main.yaml`, `main-arm64.yaml`, `cifuzz.yml`, `fossa.yml`) use `paths-ignore` to skip runs that only touch `**.md`, `docs/**`, `**/OWNERS`, or `**/MAINTAINERS`.
- **Docs variants** (`main-doc.yaml`, `cifuzz-doc.yaml`, `fossa-doc.yaml`) use the inverse `paths` filter and define matching job names that simply `echo "only docs modified, no need to trigger CI"`. This pattern keeps the required status checks green for docs PRs without re-running the heavy jobs.

When you add a new workflow or job, follow the same convention so that documentation-only changes do not block on long-running checks.

## Main CI workflow (`main.yaml`)

File: [`.github/workflows/main.yaml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/main.yaml)

Runs on every push to `master`, every tag, and every pull request that modifies code.
It is the primary gate for merging changes.

Shared environment:

- A pinned `GINKGO_VERSION` used to install Ginkgo for unit and E2E tests.
- A pinned Go toolchain installed via `actions/setup-go`.
- Go module cache restored via `actions/cache` keyed on `go.sum`.

Exact version numbers (Go, Ginkgo, `kind`, Helm, `kindest/node`, the `kubeedge/build-tools` tag, action revisions, etc.) live in the workflow YAML and are updated over time; consult the workflow file for the current values.

### Jobs

- **`lint` — Verify vendor, licenses, do lint.** Runs `make verify` followed by `make lint` to enforce vendor integrity, license headers, gofmt, and static checks.
- **`image-prepare` — Prepare kubeedge/build-tools image.** Pulls the `kubeedge/build-tools` image, saves it as a tarball, and uploads it as the `build-tools-docker-artifact` so downstream jobs do not each pay the cost of pulling the image.
- **`build` — Multiple build.** Downloads the cached build-tools image and runs `make`, `make smallbuild`, `make crossbuild`, plus cross-compilation variants for ARMv7/ARMv8 (`ARM_VERSION=GOARM7`/`GOARM8`) and Windows builds of `edgecore` and `keadm`.
- **`basic_test` — Unit test, integration test edge.** Runs `make test PROFILE=y`, uploads coverage to [Codecov](https://about.codecov.io/) (only for the upstream repository), configures CRI in the runner's `containerd`, then runs `make integrationtest`.
- **`e2e_test` — E2e test.** Matrix across two protocols (`WebSocket`, `QUIC`) and several recent Kubernetes minor versions. Spins up a [`kind`](https://kind.sigs.k8s.io/) cluster, frees disk space with `jlumbroso/free-disk-space`, and runs `make e2e`. `WebSocket` cases use `containerd`; `QUIC` cases use Docker as the edge container runtime, so both code paths are exercised. Logs from `/tmp/cloudcore.log` and `/tmp/edgecore.log` are uploaded on success or failure.
- **`keadm_deprecated_e2e_test` — Keadm deprecated e2e test.** Runs `make keadm_deprecated_e2e` to keep coverage for the legacy `keadm` command surface.
- **`keadm_e2e_test` — Keadm e2e test.** Installs Helm and runs `make keadm_e2e` to validate the current `keadm` install flow end to end.
- **`docker_build` — Multiple docker image build.** Runs `make image` with `DOCKER_BUILD_AND_SYSTEM_PRUNE=true` to verify the container images build cleanly from the current sources.
- **`container_runtime_test` — container runtime e2e test.** Matrix across `isulad`, `cri-o`, and `docker` container runtimes. Runs `make e2e` with the matching `CONTAINER_RUNTIME` and uploads runtime-specific logs.
- **`conformance_e2e_test` — conformance e2e test.** Matrix between `conformance` and `nodeconformance`. Runs `make conformance_e2e` against a `kindest/node` image and uploads the resulting reports from `/tmp/results/` so they can be submitted to upstream Kubernetes conformance tracking.

## ARM64 CI workflow (`main-arm64.yaml`)

File: [`.github/workflows/main-arm64.yaml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/main-arm64.yaml)

Mirrors the relevant parts of `main.yaml` but executes on `openeuler-linux-arm64` self-hosted runners to validate that KubeEdge builds natively on ARM64.
It contains two jobs:

- **`image-prepare`.** Pulls and caches the ARM64 `kubeedge/build-tools` image as `build-tools-docker-artifact-arm64`.
- **`docker_build` — Multiple build.** Clears any leftover content from the self-hosted runner workspace, restores the cached image, and runs `make` and `make smallbuild` natively on ARM64.

## Docs CI workflow (`main-doc.yaml`)

File: [`.github/workflows/main-doc.yaml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/main-doc.yaml)

Triggers on changes that match `**.md`, `docs/**`, `**/OWNERS`, or `**/MAINTAINERS`.
The `lint` job runs `make lint` to catch trailing whitespace and similar issues in documentation.
All other jobs (`build`, `basic_test`, `e2e_test`, `keadm_deprecated_e2e_test`, `keadm_e2e_test`, `docker_build`, `image-prepare`) are intentional no-ops that print `only docs modified, no need to trigger CI`.
They exist so the workflow exposes the same required status checks as `main.yaml`.

## Spell checking (`codespell.yml`)

File: [`.github/workflows/codespell.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/codespell.yml)

Runs on every pull request.
Installs `codespell` via `pip` and executes `make spellcheck`.
Project-specific dictionaries and ignored words live in `codespell.cfg`, `codespell_dictionary.txt`, and `codespell_whitelist.txt` at the root of the repository.

## Fuzz testing (`cifuzz.yml` / `cifuzz-doc.yaml`)

Files:

- [`.github/workflows/cifuzz.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/cifuzz.yml)
- [`.github/workflows/cifuzz-doc.yaml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/cifuzz-doc.yaml)

Integrates with [OSS-Fuzz](https://github.com/google/oss-fuzz) using the official `google/oss-fuzz/infra/cifuzz` actions.
The `Fuzzing` job builds KubeEdge fuzz targets (`language: go`, `oss-fuzz-project-name: kubeedge`), then runs them for a bounded duration configured in the workflow.
Any reproducer artifacts are uploaded under `./out/artifacts` when fuzzing finds a crash.
The `-doc` variant is the doc-only no-op described above.

## License compliance (`fossa.yml` / `fossa-doc.yaml`)

Files:

- [`.github/workflows/fossa.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/fossa.yml)
- [`.github/workflows/fossa-doc.yaml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/fossa-doc.yaml)

Runs the [FOSSA](https://fossa.com/) analysis action on every push and pull request that modifies code.
It checks out the repository, installs Go, and invokes the FOSSA action with the project's push-only API token to track third-party dependencies and license obligations.
The `-doc` variant short-circuits docs-only changes.

## Cilium E2E (`cilium-e2e.yml`)

File: [`.github/workflows/cilium-e2e.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/cilium-e2e.yml)

An opt-in E2E suite triggered when a pull request is labeled `cilium-e2e-test`.
It runs the same `image-prepare` pattern and then a dedicated `cilium_e2e_test` job that installs the [`cilium-cli`](https://github.com/cilium/cilium-cli), provisions a `kind` cluster, and executes `hack/cilium_e2e_test.sh` to verify KubeEdge's integration with Cilium-managed networking.
Apply the label only when a change is expected to affect the data plane or networking.

## Scheduled compatibility tests (`schedule.yml`)

File: [`.github/workflows/schedule.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/schedule.yml)

Triggered manually (`workflow_dispatch`) or automatically by a weekly cron schedule.
This workflow verifies KubeEdge against a wider matrix of Kubernetes versions than the per-PR pipeline:

- **`lint`** and **`image-prepare`** repeat the setup steps from `main.yaml`.
- **`build` — Multiple build.** Re-runs `make`, `make smallbuild`, `make crossbuild`, and the ARMv7/ARMv8 cross builds.
- **`k8s_compatibility_schedule_test` — E2e k8s compatibility test.** Matrix combining `WebSocket`/`QUIC` protocols with a broader range of supported Kubernetes minor versions. Each cell runs `make e2e` with `CONTAINER_RUNTIME=containerd` against the corresponding `kindest/node` image.
- **`keadm_compatibility_e2e_test` — Keadm compatibility e2e test.** Matrix across past KubeEdge releases exported as `CLOUD_EDGE_VERSION` to validate that the current `keadm` can still install older cloud/edge versions.

Failures in this workflow generally indicate a regression against an older but still-supported Kubernetes or KubeEdge version.

## Release workflow (`release.yml`)

File: [`.github/workflows/release.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/release.yml)

Triggered when a GitHub Release is `published`.
It builds and uploads release artifacts and pushes container images to Docker Hub with [SLSA](https://slsa.dev/) provenance.

- **`release-assets` — release kubeedge components.** Matrix over the release targets (`kubeedge`, `edgesite`, `keadm`), OSes (`linux`, with `windows` includes for `kubeedge` and `keadm`), and ARM variants (`GOARM7`, `GOARM8`, empty for amd64). Runs `make release` inside the `kubeedge/build-tools` container when targeting Linux, generates SHA-256 hashes for each tarball, and uploads the archives plus `checksum_*.txt` files to the GitHub Release.
- **`combine_hashes`.** Concatenates per-asset hashes (passed through job outputs) into a single base64-encoded blob.
- **`provenance`.** Calls the SLSA generic generator reusable workflow with the combined hashes to generate SLSA Level 3 provenance for the binary assets and uploads it to the release.
- **`publish-image-to-dockerhub` — publish to DockerHub.** Matrix across every container image KubeEdge ships (`cloudcore`, `admission`, `edgesite-agent`, `edgesite-server`, `csidriver`, `iptables-manager`, `iptables-manager-nft`, `edgemark`, `installation-package`, `controller-manager`, `conformance`, `nodeconformance`). Sets up QEMU and Buildx, logs into Docker Hub with the `DOCKERHUB_USER_NAME` / `DOCKERHUB_TOKEN` secrets, then builds and pushes multi-arch images (`linux/amd64,linux/arm64,linux/arm/v7`) tagged with the release tag.
- **`image-provenance`.** Calls the SLSA container generator reusable workflow for every image to produce and publish container SLSA attestations.

## Build-tools image (`build-tools.yml`)

File: [`.github/workflows/build-tools.yml`](https://github.com/kubeedge/kubeedge/blob/master/.github/workflows/build-tools.yml)

Builds and publishes the `kubeedge/build-tools` Docker image that other workflows depend on.
It triggers only on pushes to `master` that touch `build/docker/build-tools/build-tools.dockerfile`, so the image is rebuilt exactly when its Dockerfile changes.
The single `publish-image-to-dockerhub` job sets up QEMU and Buildx, authenticates to Docker Hub, and runs `build/docker/build-tools/make-build-tools.sh push`.
