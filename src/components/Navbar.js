import React from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar py-3">
            <Link to="/list-user">Logo</Link>
        </nav>
    );
}

export default Navbar;