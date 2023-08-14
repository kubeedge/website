import React, {useState} from "react";

import "./Form.css"
import Button from "./UI/Button";

const Form = () => {

    
    const sendMessageHandler = () => {

    }

    const previousPageHandler = () => {

    }

    return (

        <form onSubmit={sendMessageHandler}>

            <div>
                <label>Title</label>
                <input type="text"></input>
            </div>

            <div>
                <label>Description</label>
                <input type="text"></input>
            </div>

            <div>
                <label>Challenge</label>
                <input type="text"></input>
            </div>

            <div>
                <label>Solution</label>
                <input type="text"></input>
            </div>

            <div>
                <label>Impact</label>
                <input type="text"></input>
            </div>

            <div>
                <label>Message</label>
                <input type="text"></input>
            </div>

            <Button type="submit" label="Send Message" className="sendButton" ></Button>
            <Button type="button" label="Back" className="backButton" onClick={previousPageHandler} ></Button>
        </form>
    )
};

export default Form;