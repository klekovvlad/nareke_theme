import React from "react";
import { PageHeader } from "../pageHeader";
import { Phone } from "../phone";

export const Contacts = (props) => {

    return(
        <main>
            <PageHeader title={props.state.title}/>
            <div className="container">
                <div className="page-content contacts-wrapper">
                    <div className="contacts-text">
                        <h2 className="title">{props.state.subtitle}</h2>
                        <p className="desc" dangerouslySetInnerHTML={{__html: props.state.desc}}/>
                        <Phone phone={props.state.phone}/>
                        <div className="contacts-item contacts-mail">
                            <div className="icon"></div>
                            <div className="mail">
                                <span>Напишите нам</span>
                                <a rel="nofollow" href={`mailto:${props.state.email}`}>{props.state.email}</a>
                            </div>
                        </div>
                        <div className="contacts-item contacts-adress">
                            <div className="icon"></div>
                            <div className="mail">
                                <span>Адрес</span>
                                <span className="adress">{props.state.adress}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}