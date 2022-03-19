import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const NavbarAction = () => {
    const cookies = new Cookies()
    const token = cookies.get("token")
    const [isToken, setIsToken] = useState(false)
    const [fullname, setFullname] = useState("")
    
    useEffect(() => {
        if (token) {
            setFullname(cookies.get("fullName"))
            setIsToken(true)
            
        }
    }, [])
    
    if (isToken) {
        return (
            <Link className="btn btn-outline-info text-decoration-none" to="/profile" data-toggle="tooltip" data-placement="bottom" title="Profile">{`Welcome ${fullname}!`}</Link>
        );
    } else {
        return (
            <Link to="/login" className="btn btn-success">Login</Link>
        )
    }
}

export default NavbarAction;