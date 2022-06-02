---
draft: false
linktitle: ServiceBus
menu:
  docs:
    parent: Edge Components
    weight: 5
title: ServiceBus
toc: true
type: docs
---
## Overview
ServiceBus is a HTTP client to interact with HTTP servers (REST), offering HTTP client capabilities to components of the cloud to reach HTTP servers running at edge.

The design is exactly similar to that of EventBus. 

EventBus is used to communicate with applications running on edge via MQTT. Similarly, ServiceBus is used to communicate with applications running on edge via HTTP. 

## Working
- Cloud sends a beehive message to Edge via CloudHub.
- EdgeHub receives the messages and gives it to ServiceBus.
- ServiceBus just makes the http call and sends the response to the cloud via EdgeHub.

![ServiceBus flowchart](/img/servicebus/servicebus-flowchart.png)