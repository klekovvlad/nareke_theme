import React from "react";
import { Link } from "react-router-dom";

export const Card = (props) => {

    let comfortWrapper = null;
    let statusWrapper = null
    let prices = null
        if(props.item.priceNight) {
        prices = <div className="card-subtitle">от {props.item.priceNight[0].price} / ночь</div>
    }
    if(props.item.info) {
        props.item.info.forEach(i => {
            if(i.title === 'Стоимость') {
                prices = <div className="card-subtitle">от {i.info}</div>
            }
        })
    }
    if(props.item.comfort) {
        let comfort = props.item.comfort.map((comfortItem, index) => {
            if(index <= 3) {
                let icon = comfortItem.icon;
                if(icon === false) {
                    icon = '/wp-content/uploads/2023/05/baseicon.svg'
                }
                return (
                    <img className="card-icon" title={comfortItem.title} key={index} src={icon} alt={comfortItem.title}/>
                )
            }else{
                return null
            }
        })
        comfortWrapper = <div className="card-list">{comfort}</div>
    }

    if(props.item.build || props.item.build === false) {
        let statusText = null;
        let statusTitleText = null
        if(props.item.build === true) {
            statusText = 'Скоро'
            statusTitleText = 'Бронирование на эти апартаменты пока недоступно'
        }else if(props.item.build === false){
            statusText = 'Забронировать'
            statusTitleText = 'Забронируйте сейчас незабываемый отдых'
        }
        statusWrapper = <div title={statusTitleText} className="card-status">{statusText}</div>
    }

    return (
        <Link key={props.item.id} to={props.item.link} className={`card ${props.class} ${props.item.class}`}>
            <img className='card-img' src={props.item.img} alt={props.item.title} />
            {statusWrapper}
            <div className="card-content">
                {prices}
                <div className="card-title">{props.item.title}</div>
                <div className="card-hidden">
                    {comfortWrapper}
                    <button className="button-text">Подробнее</button>
                </div>
            </div>
        </Link>
    )
}