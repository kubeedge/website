import React from "react";
import SectionContainer from "../sectionContainer";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";

const reasons = [
  {
    title: <Translate>Kubernetes Native API at Edge</Translate>,
    content: (
      <Translate>
        Autonomic Kube-API Endpoint at Edge, support to run third-party plugins
        and applications that depends on Kubernetes APIs on edge nodes.
      </Translate>
    ),
  },
  {
    title: <Translate>Seamless Cloud-Edge Coordination</Translate>,
    content: (
      <Translate>
        Bidirectional communication, able to talk to edge nodes located in
        private subnet.\nSupport both metadata and data
      </Translate>
    ),
  },
  {
    title: <Translate>Edge Autonomy</Translate>,
    content: (
      <Translate>
        Metadata persistent per node, no list-watch needed during node recovery,
        get ready faster.\nAutonomous operation of edge even during
        disconnection from cloud.
      </Translate>
    ),
  },
  {
    title: <Translate>Low Resource Ready</Translate>,
    content: (
      <Translate>
        Optimized usage of resource at the edge.\nMemory footprint down to
        ~70MB.
      </Translate>
    ),
  },
  {
    title: <Translate>Simplified Device Communication</Translate>,
    content: (
      <Translate>
        Easy communication between application and devices for IOT and
        Industrial Internet.
      </Translate>
    ),
  },
  {
    title: <Translate>Heterogenous</Translate>,
    content: <Translate>Native support of x86, ARMv7, ARMv8</Translate>,
  },
];

export default function Why() {
  return (
    <SectionContainer className={styles.whyContainer}>
      <h1>
        <Translate>Why KubeEdge</Translate>
      </h1>
      <div className={styles.reasonBoxContainer}>
        {reasons.map((item, index) => (
          <div key={index} className={styles.reasonBox}>
            <h3 className={styles.reasonTitle}>{item.title}</h3>
            <div className={styles.reasonContent}>{item.content}</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
