import React from "react";

const Button = (props) => {
    return (
        <button type="submit" className={`btn btn-${props.color} mb-2`}>{props.value}</button>
    );
}

export default Button;