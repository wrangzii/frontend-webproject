import React from "react";

const Button = (props) => {
    return (
        <button type="button" className={`btn btn-${props.color} mb-2`} onClick={props.action}>{props.value}</button>
    );
}

export default Button;