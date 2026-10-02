import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import PartnersData from "@site/src/pages/partners/partners.mdx"; // Ensure correct path
import "./index.scss";

export default function Partners() {
  return (
    <Layout title="KubeEdge Partners">
      <div className="partners-pages">
        <div className="partners-header">
          <h1 className="partners">
            KubeEdge Distributions, Hosted Platforms, and Installers
          </h1>
        </div>
        <div className="partners-content">
          <div className="partners-md">
            <PartnersData /> {/* Ensure this is used correctly */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
