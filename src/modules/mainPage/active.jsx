import React from "react";
import { Link } from "react-router-dom";

export const Active = (props) => {

    let array = Object.values(props.active)
    let active = array.map((item, index) => (
        <div key={index} className="active-item">
             <img className="active-img" src={item.img} alt={item.title} />
             <div className="active-info">
                <div className="title">{item.title}</div>
                <div className="desc" dangerouslySetInnerHTML={{__html: item.desc.short}}/>
                <Link to={item.link}>Подробнее</Link>
             </div>
        </div>
    ))


    return (
        <section className="active">
            <div className="container">
                {active}
            </div>
        </section>
    )
}