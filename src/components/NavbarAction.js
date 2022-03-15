import React from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const NavbarAction = () => {
    const cookies = new Cookies()
    const token = cookies.get("token")
    const fullName = cookies.get("fullName")
    if (token) {
        return (
            <Link className="btn btn-outline-info text-decoration-none" to="/profile" data-toggle="tooltip" data-placement="bottom" title="Profile">{`Welcome ${fullName}!`}</Link>
        );
    } else {
        return (
            <Link to="/login" className="btn btn-success">Login</Link>
        )
    }
}

export default NavbarAction;