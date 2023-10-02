import React from "react";
import { Phone } from "../phone";
import { MainPageTitle } from "../mainPageTitle";

export const About = (props) => {

    let aboutImgs = props.state.imgs.map((img, index) => (
        <img key={index} className="about-img" src={img} alt={props.state.title} />
    ))

    let titles = {
        title: props.state.title,
        subtitle: props.state.subtitle
    }

    return (
        <section className="about">
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-text">
                        <MainPageTitle titles={titles} />
                        <div className="desc" dangerouslySetInnerHTML={{__html: props.state.text}} />
                        <Phone phone={props.phone} />
                    </div>
                    <div className="about-imgs">
                        {aboutImgs}
                    </div>
                </div>
            </div>
        </section>
    )
}