import React from "react";
import Link from "@docusaurus/Link";
import { IconCompany, IconLocation } from "@site/src/components/icons";
import moment from 'moment';
import Translate from "@docusaurus/Translate";
import "./styles.scss";

export default function JobCard(props) {
    const {
        title = "",
        company = "",
        address = "",
        date = "",
        expirydate = "",
        logo = "",
        link = "",
    } = props;

    return (
        <Link className="job-card" to={link}>
            <div className="image">
                <img src={logo} alt="" />
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
            <div className="date">
                <Translate>created-at</Translate>: {moment(date).format('YYYY-MM-DD')}
                <br />
                <Translate>expired-at</Translate>: {moment(expirydate).format('YYYY-MM-DD')}
            </div>
        </Link>
    );
}
