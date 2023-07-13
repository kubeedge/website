import React from "react";
import SectionContainer from "../sectionContainer";
import Translate from "@docusaurus/Translate";
import "./styles.scss";

export default function About() {
  return (
    <SectionContainer className="aboutContainer">
      <div className={"row"}>
        <div className={"profile"}>
          <img className={"portrait"} src="img/avatar.png"></img>
          <div className={"portraitTitle"}>
            <h3 className={"name"}>KubeEdge</h3>
            <h3 className={"jobTitle"}>
              <Translate>
                Kubernetes Native Edge Computing Framework
              </Translate>
            </h3>
          </div>
        </div>
        <div className={"description"}>
          <p>
            <Translate>
              KubeEdge is an open source system for extending native
              containerized application orchestration capabilities to hosts at
              Edge. It is built upon kubernetes and provides fundamental
              infrastructure support for network, application deployment and
              metadata synchronization between cloud and edge. KubeEdge is
              licensed under Apache 2.0. and free for personal or commercial use
              absolutely. We welcome contributors!
            </Translate>
          </p>
          <p>
            <Translate>
              Our goal is to make an open platform to enable Edge computing,
              extending native containerized application orchestration
              capabilities to hosts at Edge, which is built upon kubernetes and
              provides fundamental infrastructure support for network, app
              deployment and metadata synchronization between cloud and edge.
            </Translate>
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
