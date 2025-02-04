import React from "react";
import { useHistory } from "@docusaurus/router";
import Translate from "@docusaurus/Translate";
import "./styles.scss";

export default function StudyCard(props) {
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
        <div className="image-container">
          <img src={imgUrl} alt={title} className="thumbnail" />
        </div>
      )}
      <div className="text-content">
        <h2 className="main-title">{title}</h2>
        <h3 className="sub-heading">{subTitle}</h3>
        <p className="details">{desc}</p>
        <div className="card-bottom">
          <span className="published-date">{date}</span>
          <button className="more-info" onClick={handleClick}>
            <Translate>READ CASE STUDY</Translate>
          </button>
        </div>
      </div>
    </div>
  );
}
