import React from "react";

export const Phone = (props) => {

    return(
        <a href={`tel:${props.phone}`} className="phone">
            <div className="phone-icon"></div>
            <div className="phone-text">
                <div className="phone-subtext">Забронировать</div>
                <div className="phone-number">{props.phone}</div>
            </div>
        </a>
    )
}