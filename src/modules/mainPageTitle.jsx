import React from "react";

export const MainPageTitle = (props) => {
    return (
        <div className="titles">
            <div className="subtitle">{props.titles.subtitle}</div>
            <h2 className="title">{props.titles.title}</h2>
        </div>
    )
}