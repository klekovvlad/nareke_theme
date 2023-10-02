import React from "react";
import { MainPageTitle } from "../mainPageTitle";
import { Card } from "../card";

export const Apart = (props) => {

    let cardClass = 'card-gorizontal'
    let columns = 2;
    if(props.apart.length >= 3) {
        columns = 3;
        cardClass = 'card-vertical'
    }

    let apart = props.apart.map(item => <Card key={item.id} class={cardClass} item={item}/>)

    return (
        <section className="apart">
            <div className="container">
                <MainPageTitle titles={props.titles}/>
                <div style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`
                }} className="apart-wrapper">
                    {apart}
                </div>
            </div>
        </section>
    )
}