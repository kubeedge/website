import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import HardwareContent from "@site/src/pages/hardware-list/hardware-list.mdx";
import "./index.scss";

export default function HardwareList() {
  return (
    <Layout
      title="Hardware Compatibility"
      description="Reference edge hardware and compatibility information for KubeEdge"
    >
      <main className="hardware-list-page">
        <section className="hardware-header">
          <h1 className="hardware-title">
            <Translate>Hardware Compatibility</Translate>
          </h1>
          <p className="hardware-subtitle">
            <Translate>
              Reference edge devices and platforms for building KubeEdge
              deployments
            </Translate>
          </p>
        </section>

        <section className="hardware-content">
          <div className="hardware-md">
            <HardwareContent />
          </div>
        </section>
      </main>
    </Layout>
  );
}
