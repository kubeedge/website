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

    return (
        <div
            className="case-card"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${imgUrl})`,
            }}
        >
            <h2 className="title" onClick={() => history.push(link)}>
                {title}
            </h2>
            <hr />
            <h3 className="sub">{subTitle}</h3>
            <p className="desc">{desc}</p>
            <div className="date">{date}</div>
            <a className="button" type="button" onClick={() => history.push(link)}>
                <Translate>READ CASE STUDY</Translate>
            </a>
        </div>
    );
}