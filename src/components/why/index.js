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
        and applications that depend on Kubernetes APIs on edge nodes.
      </Translate>
    ),
  },
  {
    title: <Translate>Seamless Cloud-Edge Coordination</Translate>,
    content: (
      <>
        <Translate>
          Bidirectional communication, able to talk to edge nodes located in
          private subnet.
        </Translate>
        <br />
        <Translate>Supports both metadata and data.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Edge Autonomy</Translate>,
    content: (
      <>
        <Translate>
          Metadata persists per node, no list-watch needed during node recovery,
          enabling faster readiness.
        </Translate>
        <br />
        <Translate>
          Ensures autonomous operation even during cloud disconnection.
        </Translate>
      </>
    ),
  },
  {
    title: <Translate>Low Resource Ready</Translate>,
    content: (
      <>
        <Translate>Optimized resource usage at the edge.</Translate>
        <br />
        <Translate>Memory footprint down to ~70MB.</Translate>
      </>
    ),
  },
  {
    title: <Translate>Simplified Device Communication</Translate>,
    content: (
      <Translate>
        Enables seamless communication between applications and IoT or
        Industrial Internet devices.
      </Translate>
    ),
  },
  {
    title: <Translate>Heterogeneous Support</Translate>,
    content: <Translate>Native support for x86, ARMv7, ARMv8.</Translate>,
  },
];

export default function Why() {
  return (
    <SectionContainer className={styles.whyContainer}>
      <h1 className={styles.sectionTitle}>
        <Translate>Why KubeEdge</Translate>
      </h1>
      <div className={styles.reasonBoxContainer}>
        {reasons.map((item, index) => (
          <div key={index} className={styles.reasonBox}>
            <p className={styles.reasonTitle}>{item.title}</p>
            <div className={styles.reasonContent}>{item.content}</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
