import React from "react"
import "./Header.css"
import Button from "./UI/Button"

import CaseStudies from "./CaseStudies"
import Form from "./form"

const Header = () => {

    const readHandler = (reader) => {}

    const messageHandler = (message) => {}

    return(
        <div className="header">
            <h2 className="mainHeading">Learn how Companies and End Users implement KubeEdge in their workflow</h2>

            <div className="searchWrapper">
                <input id="search" tyep="text" className="searchInput" placeholder="search case study"></input>
                <label htmlFor="search" className="searchLabel"><button className="searchButton" type="submit">Search</button></label>
            </div>

            <div className="tags">
                <h4 className="tagsHeading">Tags:</h4>

                <div className="tagsItems">
                    <div className="item item1">one</div>
                    <div className="item item2">two</div>
                    <div className="item item3">three</div>
                    <div className="item item4">four</div>
                    <div className="item item5">five</div>
                    <div className="item item6">six</div>
                    <div className="item item7">seven</div>
                    <div className="item item8">eight</div>
                </div>
            </div>
            
            <div className="actionButtons">
                <Button type="button" label="Read Case Studies" onClick={readHandler}></Button>
                <Button type="button" label="Tell your Story" onClick={messageHandler}></Button>
            </div>

            <CaseStudies></CaseStudies>
            <Form></Form>
        
    </div>
    )
};

export default Header;