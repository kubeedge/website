import React from "react";
import "./styles.scss";

const CncfCard = () => {
  return (
    <div className="cncf-card">
      <p className="cncf-card__text">
        KubeEdge is a{" "}
        <a href="https://cncf.io/">Cloud Native Computing Foundation</a>{" "}
        graduated project.
      </p>
      <img
        src="https://github.com/cncf/artwork/blob/main/other/cncf/horizontal/color/cncf-color.png?raw=true"
        className="cncf-card__logo"
        alt="CNCF Logo"
      />
    </div>
  );
};

export default CncfCard;
