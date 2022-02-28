import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "./Sidebar";
import './styles/Navbar.css';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <div className="navbar">
            <div className="wrapper">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={showSidebar} />
                </Link>
                <ul className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    {Sidebar.map((item, index) => {
                        return (
                            <Link to={item.path} key={index} className={item.className}>
                                <li className="px-3 py-2">
                                    {item.title}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <Link exact to="/" className="navbar-brand text-white">Collecting Idea System</Link>
        </div>
    )
}

export default Navbar;