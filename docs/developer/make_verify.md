---
title: Make Verify
sidebar_position: 11
---

## Description

The **make verify** command is designed to run a series of verification scripts to ensure the integrity 
and correctness of the codebase. It includes checks for Go code, vendor dependencies, code generation, 
vendor licenses, and Customm Resource Definitions(CRDs).

### When to Use

You should use the **make verify** command in the following scenarios. <br />
  **Before Submitting a Pull Request**: To ensure that the new changes do not introduce any issues and comply with the project's standards.<br />
  **After Making Significant Changes**: To verify that modifications are correct and do not break any existing functionality.<br />
  **As Part of Continuous Integration(CI)**: To automatically verify the codebase in a CI pipeline.<br />

### Capture the result
  **Capture the Output**: The output of the **make verify** command will be displayed in your terminal. You can redirect the output to a file if needed:
```shell
make verify > verify_output.txt
```
  **Review the Output**: Check the verify_output.txt file for any errors and warnings.
  

## How to Run
  **Navigate to the Root Directory**: Ensure in the root directory of the kubeedge repository.<br />
  **Run the command**: Execute the following command in the terminal.<br />
```shell
make verify
```
  This command will sequentially execute the following verification scripts:
  * verify-golang
  * verify-vendor
  * verify-codegen
  * verify-vendor-licenses
  * verify-crds


A detailed explanation of the execution process and actions described as below:

### 1.Checking the **HELP** Variable

```shell
ifeq ($(HELP),y)
verify:
        @echo "$$VERIFY_HELP_INFO"
else
verify:verify-golang verify-vendor verify-codegen verify-vendor-licenses verify-crds
endif
```

If the **HELP** variable is set to **y**, **`make verify HELP=y`** will print out the content of the **`VERIFY_HELP_INFO`**,
which is a message to help user to understand what the verify target does.

If the **HELP** variable is not set (the usual case), **`make verify`** will sequentially run the **`verify-golang`**,**`verify-vendor`**,
**`verify-codegen`**,**`verify-vendor-licenses`**, and **`verify-crds`** targets, which will be detailed below.

### 2.Verify golang
The sub-target **`verify-golang`** will run its corrsponding shell script

```shell
verify-golang:
    hack\verify-golang.sh
```

This script will execute the golang.sh script from the **`hack/lib/golang.sh`** in current shell, 
and verify whether Go environment is correctly set up for the kubeEdge project.

```shell
kubeedge::golang::verify_golang_version
```

### 3.Verify vendor
The sub-target **`verify-vendor`** will run its corrsponding shell script

```shell
verify-vendor:
    hack\verify-vendor.sh
```

It is designed to verify the state of the vendor directory and related files (go.mod and go.sum)
in kubeedge project.  
It runs a script to update the vendor dependencies and then checks if there are 
any uncommmited changes. 

#### Verify vendor and update vendor steps
**3.1**. Setting shell options and Defining the Root Directory

```shell
set -o errexit
set -o nounset
set -o pipefail
KUBEEDGE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
```
This set the **KUBEEDGE_ROOT** to the absolute path of the root directory of the project.

**3.2**. Exectueing `hack/update-vendor.sh` to update the vendor dependencies.

```shell
${KUBEEDGE_ROOT}/hack/update-vendor.sh
```
and

```shell
for repo in $(kubeedge::util::list_staging_repos); do
    go mod tidy    #clean up  the go.mode file
    go mod vendor  #create a vendor directory with all dependencies.
done
```

It will update go.mod and go.sum for each repository in the staging repos.  
And then it will re-create a symlink in the vendor directory pointing to the corresponding staging respository

```shell
for repo in $(kubeedge::util::list_staging_repos); do
  rm -fr "${KUBEEDGE_ROOT}/vendor/github.com/kubeedge/${repo}"
  ln -s "../../../staging/src/github.com/kubeedge/${repo}/" "${KUBEEDGE_ROOT}/vendor/github.com/kubeedge/${repo}"
done
```

From the above operations, the **`verify-vendor.sh`** and **`update-vendor.sh`** will help other packages and tools updated,
and maintain the consistency and correctness in the project's dependencies.

**3.3**. Check Status

After the **`update-vendor.sh`** executed, **`check_status`** will check git status.  
    &emsp;If result is 0, it means there are no uncommitted changes, and vendor updated successfully.  
    &emsp;If result is not 0, it means there are still uncommitted changes, vendor verify failed, and it will prompt "Vendor Verify failed. Please run the command to check your directories: git status". User needs to submit the modification again to complete the make verify test.

```shell
ret=$(kubeedge::git::check_status)
```

 
### 4.Verify codegen

The sub-target **`verify-codegen`** will run its corrsponding shell script

```shell
verify-codegen:
    hack\verify-codegen.sh
```

#### Verify codegen steps

**4.1**. Defining Variables and clean up environment

```shell
KUBEEDGE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
DIFFROOT="${KUBEEDGE_ROOT}/staging/src/github.com/kubeedge/api"
TMP_DIFFROOT="${KUBEEDGE_ROOT}/_tmp/api"
_tmp="${KUBEEDGE_ROOT}/_tmp"
cleanup
```

**4.2**. Run code generation script and comparing directory

```shell
"${KUBEEDGE_ROOT}/hack/update-codegen.sh"
diff -Naupr "${DIFFROOT}" "${TMP_DIFFROOT}" || ret=$?
```

**4.3**. Updating original directory and checking difference

```shell
cp -a "${TMP_DIFFROOT}"/* "${DIFFROOT}"
```

This verification ensures that the code in the pkg directory is up-to-date with the latest code generation.  
It does this by:      
    &emsp;1.copying the current code to a temporary directory,  
    &emsp;2.running the code generation script, and  
    &emsp;3.then comparing the original code with the freshly generated code.   
If there are differences, it prompts the user to update the code generation by running **`hack/update-codegen.sh`**. This helps maintain the codebase consistency and correctness.

### 5.Verify vendor licenses 

The sub-target **`verify-vendor-licenses`** will run its corrsponding shell script

```shell
verify-vendor-licenses:
    hack\verify-vendor-licenses.sh
```

#### Verify licenses steps

**5.1**. Defining Variables and clean up environment

```shell
KUBE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
source "${KUBE_ROOT}/hack/lib/init.sh"
kube::util::trap_add cleanup EXIT
```

**5.2**. Run **`update-vendor-licenses.sh`** script 

```shell
LICENSE_ROOT="${_tmpdir}" "${KUBE_ROOT}/hack/update-vendor-licenses.sh"
```

**5.3**. Comparing licenses directory

```shell
  if ! _out="$(diff -Naupr -x OWNERS "${KUBE_ROOT}/LICENSES" "${_tmpdir}/LICENSES")"; then
      echo "Your LICENSES tree is out of date. Run hack/update-vendor-licenses.sh and commit the results." >&2
  fi
```

This script ensure that the licenses in kubeEdge are up-to-date by generating new licenses and comparing them with
the current ones.  
It creates a temporary workspace, symlinks, necessary directoires and files, and then compares.  
If there are differences, it prompts the user to update the licenses by running **`hack/update-vendor-licenses.sh`**

### 6.Verify crds

The sub-target **`verify-crds`** will run its corrsponding shell script

```shell
verify-crds:
    hack\verify-crds.sh
```

#### Verify CRDs steps

**6.1**. Defining Variables and clean up environment

```shell
SCRIPT_ROOT=$(dirname "${BASH_SOURCE}")/..
DIFFROOT="${SCRIPT_ROOT}/build/crds"
TMP_DIFFROOT="${SCRIPT_ROOT}/_tmp/build/crds"
_tmp="${SCRIPT_ROOT}/_tmp"
cleanup
```

**6.2**. Run **`generate-crds.sh`**

```shell
"${SCRIPT_ROOT}/hack/generate-crds.sh"
```

**6.3**. Comparing crds directory and update original directory

```shell
diff -Naupr "${DIFFROOT}" "${TMP_DIFFROOT}" || ret=$?
cp -a "${TMP_DIFFROOT}"/* "${DIFFROOT}"
```

**6.4**. Check differences.


This script ensure that the Custom Resource Difinitions (CRDs) in the build/crds directory are up-to-date by comparying
them with freshly generated CRDs.  
If there are differences, it prompts the user to update the CRDs by running
**`hack/generate-crds.sh`**

## Summary 

When user run **`make verify`**, all the verification scripts will be executed in sequence. These scripts usually include various
checks on the project's code, dependencies, generated code, and more, to ensure code quality and consistency.  
If the **HELP** variable is set to **y**, these verification tasks won't be executed, and instead, a help message will be printed to display