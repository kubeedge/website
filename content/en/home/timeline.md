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
  title = "v0.3"
  company = "Third Release"
  company_url = "https://github.com/kubeedge/kubeedge/releases/tag/v0.3.0"
  location = "May, 2019"
  date_start = ""
  date_end = ""
  description = """
**Features added**  

- Device Management using CRDs feature mainly provides APIs for managing devices from cloud and synchronize the device updates between cloud and edge <a href='https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/device-crd.md' target="_blank">&hellip; Read more</a>
- Bluetooth Mapper application support which is used to connect and control devices that use bluetooth as a communication protocol.
- Performance Test Framework to measure the performance against the Service Level Objectives like Latency, Throughput, Scalability, CPU Usage, Memory Usage etc <a href='https://github.com/kubeedge/kubeedge/blob/master/docs/proposals/perf.md' target="_blank">&hellip; Read more</a>
- KubeEdge Installer support for basic commands like "kubeedge init", "kubeedge join" and "kubeedge reset" to bootstrap and teardown both KubeEdge cloud and edge components. 

  """

[[experience]]
  title = "v0.2"
  company = "Second Release"
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
  company = "First Release"
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
