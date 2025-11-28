import React from "react";
import SectionContainer from "../sectionContainer";
import Translate from "@docusaurus/Translate";
import "./styles.scss";

export default function About() {
  return (
    <SectionContainer className="aboutContainer">
      <div className="about-grid">
        {/* 左边部分：标题 + 描述 */}
        <div className="about-left">
          <div className="about-title">
            <h3 className="name">KubeEdge</h3>
            <h3 className="jobTitle">
              <Translate>Kubernetes Native Edge Computing Framework</Translate>
            </h3>
          </div>
          <div className="description">
            <p>
              <Translate>
                KubeEdge is an open source system for extending native
                containerized application orchestration capabilities to hosts at
                Edge. It is built upon kubernetes and provides fundamental
                infrastructure support for network, application deployment and
                metadata synchronization between cloud and edge. KubeEdge is
                licensed under Apache 2.0 and free for personal or commercial use.
              </Translate>
            </p>
            <p>
              <Translate>
                Our goal is to make an open platform to enable Edge computing,
                extending native containerized application orchestration
                capabilities to hosts at Edge, which is built upon Kubernetes.
              </Translate>
            </p>
          </div>
        </div>

        {/* 右边部分：头像图片 */}
        <div className="about-right">
          <img className="portrait" src="img/avatar.png" alt="KubeEdge Logo" />
        </div>
      </div>
    </SectionContainer>
  );
}
