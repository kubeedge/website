import React from "react";
import { useHistory } from "@docusaurus/router";
import { IconCompany, IconLocation } from "@site/src/components/icons";
import "./styles.scss";

export default function JobCard(props) {
  const {
    title = "",
    company = "",
    address = "",
    date = "",
    logo = "",
    link = "",
  } = props;
  const history = useHistory();

  return (
    <div className="job-card" onClick={() => history.push(link)}>
      <div className="image">
        <img src={logo} />
      </div>
      <div className="content">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="info">
          <div className="company">
            <IconCompany className="company-icon" />
            {company}
          </div>

          <div className="location">
            <IconLocation className="location-icon" />
            {address}
          </div>
        </div>
      </div>
      <div className="date">{date}</div>
    </div>
  );
}
