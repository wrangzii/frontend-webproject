import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import NavbarAction from "./NavbarAction";
import Logout from "./form/Logout";
import './styles/Navbar.css';
import { Cookies } from "react-cookie";

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const cookies = new Cookies()

    let authen = false
    if (cookies.get('token'))
        authen = true

    const toggleSidebar = () => {
        setIsOpen(true)
        isOpen && setIsOpen(false)
    }

    return (
        <div className="navbar position-sticky" style={{ top: 0 }}>
            <div className="wrapper">
                <Link to="#" className="menu-bars" onClick={toggleSidebar}>
                    <i className="fa-solid fa-bars"></i>
                </Link>
                {authen && <ul className={"nav-menu " + (isOpen ? "active" : null)}>
                    {Sidebar.map((item, index) => {
                        return (
                            <Link to={item.path} key={index} className={`${item.className} d-flex align-items-center px-3`} onClick={item.action}>
                                <i className={item.icon}></i>
                                <li className="px-3 py-2">
                                    {item.title}
                                </li>
                            </Link>
                        )
                    })}
                    <Logout />
                </ul>}
                <p>{props.loginName}</p>
            </div>
            <NavbarAction />
        </div>
    )
}

export default Navbar;