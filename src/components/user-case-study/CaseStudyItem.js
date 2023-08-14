import React from "react"
import Button from "./UI/Button";
import Card from "./UI/Card";
import "./CaseStudyItem.css"


const CaseStudyItem = (props) => {

    const {title, description, link} = props;

    const extendStoryHandler = () => {}

    return (
        <Card className="caseStudyContainer">
            <h3 className="heading">{title}</h3>
            <p className="description">{description}</p>
            <span className="tag"><p>tag</p></span>
            <Button type="button" className="readButton" label="Read More" onClick={extendStoryHandler}><a href={link}></a></Button>
        </Card>
    )
}

export default CaseStudyItem;