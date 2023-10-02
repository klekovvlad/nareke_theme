import React from "react";
import { Link } from "react-router-dom";

export const Breadcrumbs = (props) => {

    let parentCategory = null;
    if(props.parentCategory) {
        parentCategory = <Link to={`/${props.parentCategory.url}`}>{props.parentCategory.name}</Link>
    }

    return (
        <div className="breadcrumbs">
            <Link to='/'>Главная страница</Link>
            {parentCategory}
            <span>{props.title}</span>
        </div>
    )
}