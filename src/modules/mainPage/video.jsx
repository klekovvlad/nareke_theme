import React from "react";
import { MainPageTitle } from "../mainPageTitle";
import { popupClose } from "../scripts/closePopup";

export const Video = (props) => {

    let titles = {
        title: props.props.title,
        subtitle: props.props.subtitle
    }

    return (
        <section className="video">
            <div className="container">
                <MainPageTitle titles={titles}/>
                <button onClick={() => {videoPopup(props.props.link)}} className="video-play">Play</button>
            </div>
        </section>
    )
}

const videoPopup = (video) => {
    const popup = document.createElement('div');
    popup.className = 'popup popup-hidden video-player';
    const body = document.querySelector('body');
    const iframe = document.createElement('iframe');
    const close = document.createElement('div');
    close.innerHTML = '<span></span><span></span>'
    close.classList.add('popup-close');
    iframe.src = video;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.frameBorder = '0';
    popup.onclick = popupClose;
    close.onclick = popupClose;
    popup.append(close, iframe);
    body.append(popup)
    setTimeout(() => {
        popup.classList.remove('popup-hidden')
    }, 100)
}