import React from "react";
import { Link } from "react-router-dom";

export const Logo = (props) => {

    let img = props.img
    if(img === false || img === undefined) {
        img = "/wp-content/uploads/2023/05/logo.svg"
    }

    return (
        <Link className="logo" to={'/'}>
            <img src={img} alt="Лого НА РЕКЕ" />
        </Link>
    )
}