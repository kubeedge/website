import React from "react";
import CaseStudyItem from "./CaseStudyItem"

import "./CaseStudies.css"

import UserCaseStudyData from "./Data";

const CaseStudies = () => {

    const userCaseStudyList = UserCaseStudyData.map ( (item) => {
        return (
            <CaseStudyItem key={item.id} title={item.title} description={item.description} link={item.link} />
        )     
    })

    return(
        <div>
            <div className="caseItems">
                {userCaseStudyList}
            </div>
        </div>
    )
}

export default CaseStudies;