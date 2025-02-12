import React from "react";
import { useHistory } from "@docusaurus/router";
import Translate from "@docusaurus/Translate";
import "./styles.scss";

export default function CaseCard(props) {
  const {
    title = "",
    subTitle = "",
    date = "",
    desc = "",
    imgUrl = "",
    link = "",
  } = props;
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(link);
  };

  return (
    <div className="case-card" onClick={handleClick}>
      {imgUrl && (
        <div className="image-wrapper">
          <img src={imgUrl} alt={title} className="cover-image" />
        </div>
      )}
      <div className="content">
        <h2 className="title">{title}</h2>
        <h3 className="subtitle">{subTitle}</h3>
        <p className="description">{desc}</p>
        <div className="card-footer">
          <span className="date">{date}</span>
          <button className="read-more" onClick={handleClick}>
            <Translate>READ CASE STUDY</Translate>
          </button>
        </div>
      </div>
    </div>
  );
}
