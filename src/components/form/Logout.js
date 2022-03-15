import React from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

    const HandleLogout = () => {
        const cookies = new Cookies()
        const token = cookies.get('token')
        if (token) {
            cookies.remove('token')
            cookies.remove('fullName')
            cookies.remove('email')
            cookies.remove('username')
            cookies.remove('id')
            cookies.remove('phoneNumber')
            cookies.remove('dateOfBirth')
            cookies.remove('roles')
            navigate('/goodbye')
            window.location.reload()
        }
    }

    return (
        <Link to="/goodbye" className="nav-text text-white text-decoration-none d-flex align-items-center px-3" onClick={HandleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <p className="px-3 py-2">Logout</p>
        </Link>
    )
}

export default Logout;