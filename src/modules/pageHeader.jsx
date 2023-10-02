import React from "react";
import { Breadcrumbs } from "./breadcrumbs";

export const PageHeader = (props) => {

    let img = props.image
    if(img === false || img === undefined ) {
        img = '/wp-content/uploads/2023/04/4.webp'
    }
    
    let date = null;
    if(props.date) {
        date = <div className="page-date">{props.date}</div>
    }


    
    

    return(
        <div className="pageHeader" style={{backgroundImage: `url(${img})`}}> 
            <div className="container">
                <Breadcrumbs parentCategory={props.parentCategory} title={props.title} />
                <h1 className="page-title">{props.title}</h1>
                {date}
            </div>
        </div>
    )

}