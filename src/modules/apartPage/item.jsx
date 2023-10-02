import React from "react";
import { PageHeader } from "../pageHeader";

export const ApartItem = (props) => {

    console.log(props)
    return(
        <main>
            <PageHeader parentCategory={props.category} title={props.apart.title}/>
            
        </main>
    )
}