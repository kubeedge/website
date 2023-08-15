import React from "react";

import "./Card.css"
import { Children } from "react";

const Card = (props) => {

    const {children, className} = props;

    const classes = `card + ${className}`

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Card;