import React from "react";
import Layout from "@theme/Layout";
import HardwareContent from "@site/src/pages/hardware-list/hardware-list.mdx";
import "./index.scss";

export default function HardwareList() {
  return (
    <Layout title="Hardware List">
      <div className="hardware-list-page">
        <div className="hardware-header">
          <h1 className="hardware-title">
            Recommended Edge Hardware for KubeEdge
          </h1>
        </div>
        <div className="hardware-content">
          <div className="hardware-md">
            <HardwareContent />
          </div>
        </div>
      </div>
    </Layout>
  );
}
