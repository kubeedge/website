---
title: Build
sidebar_position: 1
---

## Prerequisites

* A recent Go distribution (>=1.16)
* ``yq`` command-line YAML processor (latest version recommended, install from [binary releases](https://github.com/mikefarah/yq/releases))

Additionally, if you are on macOS, you will need ``bash`` > v4, GNU ``sed`` (gsed), ``jq``, and ``wget``.

```bash
brew install bash gnu-sed jq wget
```

For ``yq``, it's recommended to install the latest version from binary:

```bash
# Download and install the latest yq binary (platform-specific)
# For Linux (amd64)
wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/local/bin/yq && chmod +x /usr/local/bin/yq

# Or visit https://github.com/mikefarah/yq/releases for other platforms
```

## Downloading the source

```bash
git clone https://github.com/kubeedge/kubeedge.git
cd kubeedge
```

## Compiling kubeedge

Build all KubeEdge binaries:

```bash
make
```

Build specific components using the `WHAT` parameter. Available binaries include: `cloudcore`, `admission`, `edgecore`, `edgesite-agent`, `edgesite-server`, `keadm`, `csidriver`, `iptablesmanager`, `edgemark`, `controllermanager`, and `conformance`.

```bash
# Build only cloudcore
make all WHAT=cloudcore

# Build only edgecore
make all WHAT=edgecore
```

Build without container (uses local environment):

```bash
make all BUILD_WITH_CONTAINER=false
```

Note: Currently keadm is only supported on Ubuntu and CentOS, so the binaries are built with `GOOS=linux` and placed in `_output/local/bin`.

### Cross-platform builds

Build binaries for different architectures:

```bash
# Cross-build for ARM architecture (ARMv8 by default)
make crossbuild

# Cross-build specific components
make crossbuild WHAT=edgecore

# Cross-build for ARMv7
make crossbuild ARM_VERSION=GOARM7
```

### Small builds

Create optimized small builds (useful for edge devices with limited resources):

```bash
# Small build for edgecore
make smallbuild WHAT=edgecore

# Small build without container
make smallbuild WHAT=edgecore BUILD_WITH_CONTAINER=false
```

### Clean build artifacts

Remove generated binaries and build artifacts:

```bash
make clean
```

## Running tests

### Lint

Run linting checks on the codebase:

```bash
make lint
```

You can lint specific components using the `WHAT` parameter:

```bash
# Lint only cloud components
make lint WHAT=cloud

# Lint only edge components
make lint WHAT=edge
```

### Verify code quality

Runs verification checks including golang version, vendor dependencies, code generation, vendor licenses, and CRDs:

```bash
make verify
```

This target runs the following checks:
- `verify-golang` - Verifies Go version and formatting
- `verify-vendor` - Ensures vendor dependencies are up to date
- `verify-codegen` - Validates generated code is current
- `verify-vendor-licenses` - Checks vendor license compliance
- `verify-crds` - Verifies CRD (CustomResourceDefinition) configurations

### Unit tests

Run golang test cases for KubeEdge components:

```bash
make test
```

You can specify which component to test using the `WHAT` parameter:

```bash
# Test only cloud components
make test WHAT=cloud

# Test only edge components
make test WHAT=edge
```

To generate a coverage profile:

```bash
make test PROFILE=y
```

### Integration tests

Run integration tests for edge and cloud components:

```bash
make integrationtest
```

This will:
1. Build the edgecore binary
2. Execute edge integration tests
3. Execute cloud integration tests

Note: Currently the integrationtest is only supported on Ubuntu.

### E2E tests

Run end-to-end tests:

```bash
make e2e
```

Run keadm-specific E2E tests:

```bash
# New keadm E2E tests
make keadm_e2e

# Deprecated keadm E2E tests (legacy)
make keadm_deprecated_e2e
```

## Installation

Install built binaries to the system (default: `/usr/local/bin`):

```bash
# Install all binaries
make install

# Install specific binary
make install WHAT=edgecore

# Install to custom directory
make install INSTALL_BIN_DIR=/custom/path
```

## Release

Create release packages for KubeEdge components:

```bash
# Release all components
make release

# Release specific component (kubeedge, edgesite, or keadm)
make release WHAT=kubeedge

# Release without container
make release WHAT=kubeedge BUILD_WITH_CONTAINER=false
```

## Additional targets

### Generate DMI protobuf

Generate Device Management Interface (DMI) API protobuf files:

```bash
# Generate for default version (v1alpha1)
make dmi-proto

# Generate for specific DMI version
make dmi-proto DMI_VERSION=v1alpha1
```
