import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./logo";

export const Footer = (props) => {

    let footerNav = props.links.map((link, index) => (
        <Link className="footer-link" key={index} to={link.url}>{link.post_title}</Link>
    ))

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer-about">
                        <Logo />
                    </div>
                    <nav className="footer-nav">
                        <h3 className="subtitle">Исследуйте</h3>
                        {footerNav}
                    </nav>
                    <div className="footer-contacts">
                        <h3 className="subtitle">{props.contacts.title}</h3>
                        <div className="adress">{props.contacts.adress}</div>
                        <a href={`tel:${props.contacts.phone}`} className="phone">
                            <div className="icon"></div>
                            {props.contacts.phone}
                        </a>
                        <a href={`mailto:${props.contacts.email}`} className="mail">
                            {props.contacts.email}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}