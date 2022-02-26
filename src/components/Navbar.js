import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="position-relative wrapper-nav">
            <nav className="navbar py-3 position-fixed bg-dark shadow">
                <button className="btn btn-outline-light px-3 py-2 sidebarBtn">
                    <i className="fa-solid fa-bars"></i>
                </button>
                <Link to="/" className="navbar-brand text-white">Management system</Link>
            </nav>
        </div>
    );
}

export default Navbar;