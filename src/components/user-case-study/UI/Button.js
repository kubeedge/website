import "./Button.css"
import React from "react"

const Button = (props) => {

    const {label, onClick, className, type} = props

    const classes = `button + ${className}`
    return(
        <>
            <button type={type} onClick={onClick} className={classes}>{label}</button>
        </>
    )
}

export default Button;