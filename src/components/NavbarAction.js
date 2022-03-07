import React from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const NavbarAction = props => {
    const cookies = new Cookies()
    const token = cookies.get("token")
    const fullName = cookies.get("fullName")
    if (token) {
        // const title = props.navActionProps.title
        // const className = props.navActionProps.className
        // const path = props.navActionProps.path

        return (
            <h4 className="text-light">{`Welcome ${fullName}!`}</h4>
        );
    } else {
        return (
            <Link to="/login" className="btn btn-success">Login</Link>
        )
    }
}

export default NavbarAction;