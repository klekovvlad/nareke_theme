import React from "react";

export const PopupBtn = (props) => {
    return (
        <button className={props.class}>
            {props.text}
        </button>
    )
}