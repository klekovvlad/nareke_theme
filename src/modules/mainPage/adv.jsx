import React from "react";
import { MainPageTitle } from "../mainPageTitle";

export const Adv = (props) => {

    let icon = <div className="adv-noicon"></div>

    let advItems = props.state.list.map((item, index) => {
        if(item.icon) {
            icon = <img src={item.icon} alt={item.title} className="icon" />
        }
        return (
            <div key={index} className="adv-item">
                {icon}
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
            </div>
        )
    })

    let titles = {
        title: props.state.title,
        subtitle: props.state.subtitle
    }

    return (
        <section className="adv">
            <div className="container">
                <MainPageTitle titles={titles}/>
                <div className="adv-wrapper">
                    {advItems}
                </div>
            </div>
        </section>
    )
}