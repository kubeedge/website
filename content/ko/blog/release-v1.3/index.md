---
authors:
- Yin Ding
- Kevin Wang
categories:
- General
- Announcements
date: 2020-05-30
draft: false
lastmod: 2020-05-30
summary: KubeEdge v1.3 발표!
tags:
- KubeEdge
- kubeedge
- edge computing
- kubernetes edge computing
- K8S edge orchestration
- edge computing platform
- cloud native
- iot
- iiot
- release v1.3
- v1.3
title: KubeEdge v1.3 발표!
---
**KubeEdge** 는 컨테이너화 된 어플리케이션의 오케스트레이션과 장비에 대한 관리를 엣지에 있는 호스트로 확장하기 위한 오픈소스 시스템입니다. Kubernetes를 기반으로 하며 네트워킹, 어플리케이션 배포 및 클라우드와 엣지 간의 메타 데이터 동기화를 지원하기 위한 핵심 인프라를 제공합니다. 또한 MQTT 프로토콜을 지원하며 개발자가 사용자 정의 로직을 작성하고, 엣지에서 자원이 제한된 장비와의 통신을 가능하게 합니다.

## **KubeEdge v1.3: 유지보수를 위한 주요 업그레이드**

5월 15일, KubeEdge 커뮤니티는 KubeEdge 1.3 버전 출시를 발표했습니다. 이번 발표에는 유지보수를 위하여 다음과 같은 주요 업그레이드를 포함하고 있습니다.

- 클라우드에서 엣지에 있는 파드의 로그 수집

- 엣지 노드 및 컨테이너 모니터링

- KubeEdge 클라우드 요소의 고가용성

- 엣지 노드의 자동화된 TLS 연결(부트스트랩)

- CRI-O 및 Kata 컨테이너 런타임 지원

- 25개 이상의 버그 수정 및 개선

이번 발표의 전체 기능 리스트에 대해서는 https://github.com/kubeedge/kubeedge/blob/master/CHANGELOG-1.3.md 를 참조 해주세요.

{{% alert note %}}
발표 세부 사항 - [Release v1.3](https://github.com/kubeedge/kubeedge/releases/tag/v1.3.0)
{{% /alert %}}

{{% alert note %}}
KubeEdge 설정하기 - [https://github.com/kubeedge/kubeedge - usage](https://github.com/kubeedge/kubeedge#usage)
{{% /alert %}}

## **발표 주요 내용**

### 클라우드에서 엣지에 있는 파드의 로그 수집

대부분의 엣지 컴퓨팅 시나리오에서, 엣지 노드들은 사설 네트워크에 위치하며, 엣지 노드에서 실행되는 파드의 로그가 클라우드로 바로 전달되지 못하여 유지 관리 및 디버깅에 대한 이슈로 이어졌습니다.

KubeEdge v1.3 은 클라우드가 사설 네트워크에 대한 문제를 해결하기 위해, 별도의 VPN 서버를 구축하지 않고도, *kubectl* *logs* 명령을 통해 엣지 어플리케이션의 컨테이너 로그를 쉽게 가져올 수 있도록 해주는 내장 스트리밍 채널을 포함하고 있습니다.  

추가적으로 KubeEdge 커뮤니티는, 사용자가 디버깅을 위하여 클라우드에서 엣지 어플리케이션에 쉽게 연결할 수 있도록, 엣지 컨테이너에 대한 *kubectl exec* 명령어 지원을 후속 버전에서 제공할 예정입니다.

세부 기능에 대하여 더 보기: https://docs.kubeedge.io/en/latest/setup/kubeedge_install_source.html

### 엣지 노드 및 컨테이너 모니터링

KubeEdge v1.3 은 엣지 노드에 대한 모니터링 인터페이스를 제공합니다. 사용자는 엣지 노드와 노드의 컨테이너 정보를 획득할 수 있으며, 이를 다른 모니터링 시스템과 통합할 수 있습니다. 이 기능은 기본적으로 활성화 되어 있습니다. 사용자는 구성 중에 EnableMetric 항목을 통해 이러한 내장 모니터링 모듈을 비활성화 할 수 있습니다. 

다음 버전에서, KubeEdge는 클라우드에서 엣지 노드 및 노드의 어플리케이션 컨테이너의 모니터링 정보에 대한 집계 기능을 지원할 예정입니다.

세부 기능에 대하여 더 보기: https://github.com/kubeedge/kubeedge/pull/1573

### KubeEdge 클라우드 요소의 고가용성

이전 버전까지는, KubeEdge 클라우드 구성 요소의 가용성은 Kubernetes 배포의 자동 복구 매커니즘에 의존했습니다. 극단적인 경우, 이러한 복구는 오랜 시간이 걸릴 수도 있습니다.

KubeEdge v1.3 버전에서, KubeEdge의 클라우드 구성요소인 CloudCore는 기본적으로 고가용성을 갖고 있습니다. CloudCore 인스턴스에 문제가 발생할 경우, 대기중인 CloudCore 인스턴스가 자동으로 구동되어, 클라우드 구성 요소 실패의 영향을 최소화합니다.

이후 버전에서 KubeEdge 커뮤니티는, 클라우드 구성요소의 고가용성을 더욱 최적화하여 대규모 엣지 노드 시나리오에서의 처리량을 개선할 계획입니다.

### 엣지 노드의 자동화된 TLS 연결(부트스트랩)

KubeEdge v1.3 은 사용자가 클라우드-엣지 보안 채널을 구성하는 작업을 단순화하고, 사용 편의성을 향상시키는, 엣지노드에 대한 자동화된 TLS 부트스트랩을 도입했습니다.

기본적으로 KubeEdge는 클라우드 구성요소와 엣지 노드 간의 암호화된 통신에 사용되는, 사용자를 위한 자체 서명된 인증서를 생성합니다. 통합된 인증서 관리가 필요한 시나리오의 경우, 사용자는 지정된 신뢰 기관에서 발급한 인증서를 사용할 수도 있습니다.

향후 발표에서, KubeEdge 커뮤니티는 노드의 인증서가 만료된 이후의 자동 갱신을 지원할 예정입니다.

세부 기능에 대해 더 보기: https://github.com/kubeedge/kubeedge/blob/master/docs/setup/kubeedge_configure.md

### 더 많은 컨테이너 런타임 지원

KubeEdge v1.3 버전은 컨테이너 런타임으로 CRI-O 및 Kata 컨테이너를 추가로 지원합니다.

- CNCF 인큐베이션 프로젝트인, CRI-O는 최대 30MB 메모리를 차지하는 경량 컨테이너이며 OCI 표준을 준수

- Kata 컨테이너는 경량 가상 머신을 기반으로 하는 오픈 소스 컨테이너 런타임. 가상 머신(VMs)의 보안적인 이점과 컨테이너의 속도 및 관리 용이성을 결합하도록 설계

v1.3 버전에서, KubeEdge는 Docker, containerd, CRI-O 및 Kata 컨테이너를 포함한 모든 주류 컨테이너 런타임을 공식적으로 지원합니다.

세부 기능에 대해 더 보기: https://github.com/kubeedge/kubeedge/blob/master/docs/setup/kubeedge_cri_configure.md

### 25개 이상의 버그 수정 및 개선

위의 새로운 기능 외에도, KubeEdge v1.3 에는 다음과 같은 향상된 기능들이 포함되어 있습니다.

- CentOS 시스템에 KubeEdge를 설치하기 위한 keadm 지원 추가

- EdgeMesh가 더이상 initContainer 에 의존하지 않으며, 구동되면서 호스트의 트래픽을 인수

- "종료 상태(terminating state)"의 일부 파드를 삭제할 수 없는 문제 수정

## **향후 전망**

v1.3 버전이 출시됨에 따라 KubeEdge는 보다 완벽한 엣지 어플리케이션 모니터링 및 관리 기능, 더욱 안정적이고 신뢰할 수 있는 클라우드 측 협업 전송 매커니즘, 더 친숙한 사용자 경험, 보다 친근한 커뮤니티 기여자 경험을 제공합니다. Huawei, China Unicom, Zhejiang University SEL Lab, ARM 및 다른 기관의 기여, 그들의 지원에 대한 모든 커뮤니티 기여자분들께 감사드립니다!

커뮤니티는 이후 버전에서, KubeEdge의 사용자 경험과 안정성을 더욱 개선하고 누구나 자유롭게 사용할 수 있는 최고의 "오픈 소스" 지능형 엣지 컴퓨팅 플랫폼을 만들 계획입니다. 향후 발표 계획은 로드맵 문서를 참조해주세요.

https://github.com/kubeedge/kubeedge/blob/master/docs/getting-started/roadmap.md

KubeEdge에 대한 더욱 자세한 내용은 여기에서 우리와 함께 해주세요.

https://kubeedge.io
