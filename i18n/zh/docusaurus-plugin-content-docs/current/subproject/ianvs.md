---
title: Ianvs
sidebar_position: 2
---

# Ianvs

Ianvs is a distributed synergy AI benchmarking project incubated in KubeEdge SIG AI. Ianvs aims to test the performance of distributed synergy AI solutions following recognized standards, in order to facilitate more efficient and effective development. More detailedly, Ianvs prepares not only test cases with datasets and corresponding algorithms, but also benchmarking tools including simulation and hyper-parameter searching. Ianvs also revealing best practices for developers and end users with presentation tools including leaderboards and test reports.

## Scope
The distributed synergy AI benchmarking Ianvs aims to test the performance of distributed synergy AI solutions following recognized standards, in order to facilitate more efficient and effective development.

The scope of Ianvs includes
- Providing end-to-end benchmark toolkits across devices, edge nodes and cloud nodes based on typical distributed-synergy AI paradigms and applications.
  - Tools to manage test environment. For example, it would be necessary to support the CRUD (Create, Read, Update and Delete) actions in test environments. Elements of such test environments include algorithm-wise and system-wise configuration.
  - Tools to control test cases. Typical examples include paradigm templates, simulation tools, and hyper-parameter-based assistant tools.
  - Tools to manage benchmark presentation, e.g., leaderboard and test report generation.
- Cooperation with other organizations or communities, e.g., in KubeEdge SIG AI, to establish comprehensive benchmarks and developed related applications, which can include but are not limited to
  - Dataset collection, re-organization, and publication
  - Formalized specifications, e.g., standards
  - Holding competitions or coding events, e.g., open source promotion plan
  - Maintaining solution leaderboards or certifications for commercial usage


## Architecture
The architectures and related concepts are shown in the below figure. The ianvs is designed to run within a single node. Critical components include
- **Test Environment Manager**: The CRUD of test environments serving for global usage
- **Test Case Controller**: Control the runtime behavior of test cases like instance generation and vanish
  - **Generation Assistant**: Assist users to generate test cases based on certain rules or constraints, e.g., the range of parameters
  - **Simulation Controller**: Control the simulation process of edge-cloud synergy AI, including the instance generation and vanishment of simulation containers
- **Story Manager**: The output management and presentation of the test case, e.g., leaderboards


![](/img/subproject/ianvs_arch.png)

More details on Ianvs components:
1. Test-Environment Manager supports the CRUD of Test environments, which basically includes
  - Algorithm-wise configuration
    - Public datasets
    - Pre-processing algorithms
    - Feature engineering algorithms
    - Post-processing algorithms like metric computation
  - System-wise configuration
    - Overall architecture
    - System constraints or budgets
      - End-to-end cross-node
      - Per node
2. Test-case Controller, which includes but is not limited to the following components
  - Templates of common distributed-synergy-AI paradigms, which can help the developer to prepare their test case without too much effort. Such paradigms include edge-cloud synergy joint inference, incremental learning, federated learning, and lifelong learning.
  - Simulation tools. Develop simulated test environments for test cases
  - Other tools to assist test-case generation. For instance, prepare test cases based on a given range of hyper-parameters.
3. Story Manager, which includes but is not limited to the following components
  - Leaderboard generation
  - Test report generation


## Guides

### Documents

Documentation is located on [readthedoc.io](https://ianvs.readthedocs.io/). These documents can help you understand Ianvs better.


