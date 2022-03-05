import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "./Sidebar";
import './styles/Navbar.css';

const Navbar = () => {
    window.onload = () => {
        const sidebar = document.querySelector("ul.nav-menu");
        const sidebar_items = document.querySelectorAll("ul.nav-menu a");
        const barBtn = document.querySelector(".fa-bars");

        barBtn.onclick = toggleSidebar;

        function toggleSidebar() {
            sidebar.classList.toggle("active")
            if (sidebar.classList.contains("active")) {
                Array.from(sidebar_items).map(item => {
                    item.onclick = closeSidebar;
                })
            }
        }

        function closeSidebar() {
            sidebar.classList.remove("active")
        }

    }
    return (
        <div className="navbar">
            <div className="wrapper">
                <Link to="#" className="menu-bars">
                    <i className="fa-solid fa-bars"></i>
                </Link>
                <ul className='nav-menu'>
                    {Sidebar.map((item, index) => {
                        return (
                            <Link to={item.path} key={index} className={`${item.className} d-flex align-items-center px-3`}>
                                <i className={item.icon}></i>
                                <li className="px-3 py-2">
                                    {item.title}
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <Link to="/" className="navbar-brand text-white">Collecting Idea System</Link>
        </div>
    )
}

export default Navbar;