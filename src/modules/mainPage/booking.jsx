import React from "react";
import { Form } from "../form";
import { MainPageTitle } from "../mainPageTitle";

export const Booking = (props) => {

    return (
        <section className="booking">
            <div className="container">
                <MainPageTitle titles={props.titles}/>
                <Form />
            </div>
        </section>
    )
}