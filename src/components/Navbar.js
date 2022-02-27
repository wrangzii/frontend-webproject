import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Sidebar } from "./Sidebar";
import './Navbar.css';

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar (!sidebar)

    return (
        <div className="navbar">
            <Link to="#" className="menu-bars">
                <FaBars onClick={showSidebar}/>
            </Link>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle-modify">
                        <Link to="#" className="menu-bars">
                            <AiOutlineClose />
                        </Link>
                    </li>
                    {Sidebar.map((item, index) => {
                        return (
                            <li key={index} className={item.aName}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
} 

export default Navbar;