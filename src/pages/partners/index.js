import React from "react";
import { Row, Col } from "antd";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PartnersData from "./partners.mdx";
import "./index.scss";

export default function Partners() {

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
                    </div>
                </div>
            </div>
        </Layout>
    );
}
