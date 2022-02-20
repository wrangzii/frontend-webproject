import React from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Logo</Link>
            <button className="btn btn-danger">Register</button>
        </nav>
    );
}

export default Navbar;