---
slides:
  theme: black
title: Introducing KubeEdge
---
# Introducing [KubeEdge](https://github.com/kubeedge/kubeedge)
@  
Deep Dive: Kubernetes IoT Edge WG



---
## Controls

- Next: `Right Arrow` or `Space`
- Previous: `Left Arrow`
- Start: `Home`
- Finish: `End`
- Overview: `Esc`
- Speaker notes: `S`
- Fullscreen: `F`
- Zoom: `Alt + Click`

---

## KubeEdge

- {{% fragment %}} An opensource project contributed / started by Huawei. [https://github.com/kubeedge](https://github.com/kubeedge) {{% /fragment %}}  
- {{% fragment %}} KubeEdge allows customers (devOps, SRE etc.) to manage edge nodes, deploy / orchestrate / monitor apps etc. the same way as in the cloud.  {{% /fragment %}}  
- {{% fragment %}} KubeEdge contains components running at cloud and edge. ~~Currently the edge part is opensourced and cloud will be very soon~~ Both, edge and cloud parts are now opensourced. {{% /fragment %}}  

---

## KubeEdge Architecture

{{<figure library="1" src="kubeedge_arch.png" title="KubeEdge">}}

---

## KubeEdge supports

- {{% fragment %}} Multi-tenancy, large scale of distributed edge nodes/applications. {{% /fragment %}}
- {{% fragment %}} Lightweight agent, container native. {{% /fragment %}}
- {{% fragment %}} Duplex/multiplex cloud/edge network connection. {{% /fragment %}}
- {{% fragment %}} Device twin, mqtt/http device & edge connection. {{% /fragment %}}
- {{% fragment %}} Edge side autonomy. {{% /fragment %}}

---

## KubeEdge Roadmap

**Release 1.0**

- K8s Application deployment through kubectl from Cloud to Edge node(s)
- K8s configmap, secret deployment through kubectl from Cloud to Edge node(s) and their applications in Pod
- Bi-directional and multiplex network communication between Cloud and edge nodes
- K8s Pod and Node status querying with kubectl at Cloud with data collected/reported from Edge
- Edge node autonomy when its getting offline and recover post reconnection to Cloud
- Device twin and MQTT protocol for IOT devices talking to Edge node
 
---
## KubeEdge Roadmap

**Release 2.0 and Future**

- Build service mesh with KubeEdge and Istio 
- Enable function as a service at Edge
- Support more types of device protocols to Edge node such as AMQP, BlueTooth, ZigBee, etc.
- Evaluate and enable super large scale of Edge clusters with thousands of Edge nodes and millions of devices
- Enable intelligent scheduling of apps. to large scale of Edge nodes etc.  

---

# Questions?

- Regular Work Group Meeting: Fridays at 8:00am Pacific (bi-weekly): [Meeting notes and agenda](https://docs.google.com/document/d/1Yuwy9IO4X6XKq2wLW0pVZn5yHQxlyK7wdYBZBXRWiKI/edit)  

- Link to join the group: [kubernetes-wg-iot-edge](https://groups.google.com/forum/#!forum/kubernetes-wg-iot-edge)  

- Link to join Slack: [wg-iot-edge](https://kubernetes.slack.com/messages/wg-iot-edge)  

- White Paper
  - [http://bit.ly/iot-edge-whitepaper](http://bit.ly/iot-edge-whitepaper)
  - Workloads being considered
  - Technical challenges, Available architectural solutions
