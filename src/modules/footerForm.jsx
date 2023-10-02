import React from "react";
import { Form } from "./form";
import { Phone } from "./phone";

export const FooterForm = (props) => {

    return(
        <section className="footerForm">
            <div className="container">
                <div className="footerForm-wrapper">
                    <div className="footerForm-info">
                        <div className="text" dangerouslySetInnerHTML={{__html: props.text}}/>
                        <Phone phone={props.phone}/>
                    </div>
                    <Form />
                </div>
            </div>
        </section>
    )
}