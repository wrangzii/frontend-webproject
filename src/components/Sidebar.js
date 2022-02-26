import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar d-flex flex-column justify-content-between shadow bg-dark">
            <div className="header d-flex flex-column m-3">
                <Link to="/departments" className="nav-item text-white border-bottom text-left pl-0 my-2">
                    <i className="fa-solid fa-building mr-2"></i>
                    Department
                </Link>
                <Link to="/users" className="nav-item text-white border-bottom text-left pl-0 my-2">
                    <i className="fa-solid fa-users mr-2"></i>
                    Users
                </Link>
                <Link to="/categories" className="nav-item text-white border-bottom text-left pl-0 my-2">
                    <i className="fa-solid fa-folder-tree mr-2"></i>
                    Categories
                </Link>
                <Link to="/academic-year" className="nav-item text-white border-bottom text-left pl-0 my-2">
                    <i className="fa-solid fa-calendar-days mr-2"></i>
                    Academic year
                </Link>
            </div>
            <div className="footer d-flex m-3">
                <button to="/" className="nav-item btn btn-danger w-100 py-2">
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;