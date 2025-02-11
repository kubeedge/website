import React from "react";
import SectionContainer from "../sectionContainer";
import Translate from "@docusaurus/Translate";
import "./styles.scss";

export default function About() {
  return (
    <SectionContainer className="aboutContainer">
      <div className="about-content">
        {/* Left Side - Logo with Title & Tagline */}
        <div className="logo-container">
          <img
            className="kubeedge-logo"
            src="img/avatar.png"
            alt="KubeEdge Logo"
          />
          <h1 className="profile-name">KubeEdge</h1>
          <h3 className="profile-title">
            <Translate>Kubernetes Native Edge Computing Framework</Translate>
          </h3>
        </div>

        {/* Right Side - Single Paragraph with Wider Layout */}
        <div className="about-description">
          <div className="text-box">
            <p>
              <Translate>
                KubeEdge is an open-source system that extends Kubernetes'
                native container orchestration capabilities to edge hosts. It
                provides fundamental infrastructure for networking, application
                deployment, and metadata synchronization between cloud and edge.
                Our goal is to create an open platform for Edge computing,
                extending containerized orchestration capabilities to edge hosts
                while ensuring seamless synchronization between cloud and edge.
              </Translate>
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
