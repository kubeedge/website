+++
# Experience widget.
widget = "timeline"  # Do not modify this line!
active = true  # Activate this widget? true/false

title = "Release Timeline"
subtitle = "[Click Here](https://github.com/kubeedge/kubeedge/releases) to go to the release page."

# Order that this section will appear in.
weight = 6

# Date format for experience
#   Refer to https://sourcethemes.com/academic/docs/customization/#date-format
date_format = "January 2006"

# Experiences.
#   Add/remove as many `[[experience]]` blocks below as you like.
#   Required fields are `title`, `company`, and `date_start`.
#   Leave `date_end` empty if it's your current employer.
#   Begin/end multi-line descriptions with 3 quotes `"""`.

[[experience]]
  title = "v1.2.0"
  company = "KubeEdge v1.2.0 release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v1.2.0"
  location = "February, 2020"
  date_start = ""
  date_end = ""
  description = """
**Features added**

- **Reliable message delivery from cloud to edge**: This feature improved the reliable message delivery
mechanism from cloud to edge. If cloudcore or edgecore being restarted or offline for a while, it can
ensure that the messages sent to the edge are not lost, and avoid inconsistency between cloud and edge.
([#1343](https://github.com/kubeedge/kubeedge/pull/1343), [@kevin-wangzefeng](https://github.com/kevin-wangzefeng),
[@fisherxu](https://github.com/fisherxu), [@SpaghettiAndSalmon](https://github.com/SpaghettiAndSalmon))

- **KubeEdge Component Config**: The configuration information of all KubeEdge components is integrated
into the unified API, and users can view all configuration information and their default values through
the API. ([#1172](https://github.com/kubeedge/kubeedge/pull/1172), [@kadisi](https://github.com/kadisi))

- **Kubernetes dependencies Upgrade**: Upgrade the venderod kubernetes version to v1.17.1, so users can
use the feature of new version on the cloud and on the edge side.
([#1349](https://github.com/kubeedge/kubeedge/pull/1349), [@fisherxu](https://github.com/fisherxu))

- **Auto registration of edge node**: Users can set the `register-node` option to `true` in EdgeCore
so that edge nodes will automatically register node info to K8s master in the cloud.
([#1401](https://github.com/kubeedge/kubeedge/pull/1401), [@kuramal](https://github.com/kuramal))
  """

[[experience]]
  title = "v1.1.0"
  company = "KubeEdge v1.1.0 release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v1.1.0"
  location = "September, 2019"
  date_start = ""
  date_end = ""
  description = """
**Features added**
- **Container Storage Interface (CSI) support**: This feature enables running applications with
persistant data store at edge and KubeEdge to support
[basic CSI Volume Lifecycle](https://github.com/container-storage-interface/spec/blob/master/spec.md#volume-lifecycle)
and is compatible with Kubernetes and CSI.

- **Dynamic Admission Control Webhook**: Admission control webhook is an effective way of
validating/mutating the object configuration for KubeEdge API objects like devicemodels, devices.

- **Kubernetes Upgrade**: Upgrade the venderod kubernetes version to v1.15.3, so users can use the
feature of new version on the cloud and on the edge side.

- **KubeEdge local setup scripts**: A bash script that can start a KubeEdge cluster in a VM with
cloudcore, edgecore binaries and kind. It uses kind to start K8s cluster and runs cloudcore, edgecore
binaries as processes in a single VM.
  """

[[experience]]
  title = "v1.0.0"
  company = "KubeEdge v1.0.0 release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v1.0.0"
  location = "June, 2019"
  date_start = ""
  date_end = ""
  description = """
**Features added**

- Edge mesh provides service mesh capabilities on the edge. Pod-to-pod communication on the same edge node or across edge nodes in the same subnet is supported. <a href='https://docs.kubeedge.io/en/latest/guides/edgemesh_test_env_guide.html' target="_blank">&hellip; Read more</a>
- CRI-compliant runtimes like containerd are supported at the edge. This enables edged to communicate with the runtime to manage containers running on resource constrained edge nodes.
- Enhanced cloud and edge communication efficiency via QUIC, a UDP-based protocol. CloudHub supports both Websocket and QUIC protocol access at the same time. The edgehub can choose one of the protocols to access the cloudhub.
- Modbus Mapper to connect and control devices that use Modbus(RTU/TCP) as a communication protocol.<a href='https://docs.kubeedge.io/en/latest/mappers/modbus_mapper.html' target="_blank">&hellip; Read more</a>
- Edge Site enables to run a standalone Kubernetes cluster at the edge along with KubeEdge to get full control and improve the offline scheduling capability. <a href='https://docs.kubeedge.io/en/latest/modules/edgesite.html' target="_blank">&hellip; Read more</a>
  """

[[experience]]
  title = "v0.3"
  company = "KubeEdge v0.3.0 release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v0.3.0"
  location = "May, 2019"
  date_start = ""
  date_end = ""
  description = """
**Features added**  

- Device Management using CRDs feature mainly provides APIs for managing devices from cloud and synchronize the device updates between cloud and edge <a href='https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd.md' target="_blank">&hellip; Read more</a>
- Bluetooth Mapper application support which is used to connect and control devices that use bluetooth as a communication protocol.
- Performance Test Framework to measure the performance against the Service Level Objectives like Latency, Throughput, Scalability, CPU Usage, Memory Usage etc <a href='https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/perf.md' target="_blank">&hellip; Read more</a>
- KubeEdge Installer support for basic commands like "kubeedge init", "kubeedge join" and "kubeedge reset" to bootstrap and teardown both KubeEdge cloud and edge components <a href='https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/keadm-scope.md' target="_blank">&hellip; Read more</a>

  """

[[experience]]
  title = "v0.2"
  company = "KubeEdge v0.2 release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v0.2"
  location = "March, 2019"
  date_start = ""
  date_end = ""
  description = """
**Features added**  

- Edge-controller which connects to Kubernetes api-server and sync node/pod status between edge and kubernetes api-server.
- Cloudhub which is a websocket server in cloud part of kubeedge.
- Internal MQTT mode in which MQTT broker is started with edge_core and removes dependency on external MQTT broker.

  """

[[experience]]
  title = "v0.1"
  company = "KubeEdge v0.1 release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v0.1"
  location = "December, 2018"
  date_start = ""
  date_end = ""
  description = """
**Features supported**  

- A lightweight application engine running on edge node for managing user's application and monitoring node health.
- Supports Kubernetes API primitives, e.g. Node, Pod, Configmap, Secrets etc.
- Device twin and MQTT protocol for IoT devices talking to Edge node
- Local self-government via HTTP restful interfaces.
- Integrated with Huawei Cloud IEF service for node, device and application status updates.
- Edge node autonomy when its getting offline and recover post reconnection to Cloud.  

"""

+++
