import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "./logo";

export const Header = (props) => {

    let navLinks = props.links.map((link, index) => (
        <NavLink className={({ isActive }) =>
                isActive ? "nav-link__active" : "nav-link"} 
                 key={index} to={link.url}>{link.post_title} </NavLink>
    ))

    return(
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <Logo />
                    <nav className="nav">
                        {navLinks}
                    </nav>
                </div>
            </div>
        </header>
    )
}