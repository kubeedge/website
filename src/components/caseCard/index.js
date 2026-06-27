import React from "react";
import Link from "@docusaurus/Link";
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

    return (
        <div
            className="case-card"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${imgUrl})`,
            }}
        >
            <h2 className="title">
                <Link className="title-link" to={link}>
                    {title}
                </Link>
            </h2>
            <hr />
            <h3 className="sub">{subTitle}</h3>
            <p className="desc">{desc}</p>
            <div className="date">{date}</div>
            <Link className="button" to={link}>
                <Translate>READ CASE STUDY</Translate>
            </Link>
        </div>
    );
}
