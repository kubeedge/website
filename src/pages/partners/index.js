import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import PartnersData, { frontMatter } from "./partners.mdx"; // Import frontmatter from MDX
import PartnerCard from "../../components/partnerCard";
import "./index.scss";

export default function Partners() {
  const partners = frontMatter.partners || []; // Get partners from MDX

  return (
    <Layout>
      <div className="partners-pages">
        <div className="partners-header">
          <h1 className="partners">
            <Translate>KubeEdge Distributions, Hosted Platforms, and Installers</Translate>
          </h1>
        </div>
        <div className="partners-content">
          <div className="partners-md">
            <PartnersData />
            <div className="partner-list">
            {partners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
