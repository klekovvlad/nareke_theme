import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper'
import { Phone } from "../phone";
import { PopupBtn } from "../popupButtons";

export const MainHeader = (props) => {
    
    let slider = props.state.slider.map((item,index) => (
        <SwiperSlide key={index} style={{backgroundImage: `url(${item})`}} />
    ))

    const swiperBullets = () => {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        if(bullets) {
            bullets.forEach((bullet, index) => {
                bullet.textContent = index + 1;
            });
        }
    }

    return(
        <section className="main">
            <div className="container">
                <div className="subtitle">{props.state.suptitle}</div>
                <h1 className="title">{props.state.title}</h1>
                {/* <PopupBtn text={'Забронировать'} class={'button white'}/> */}
            </div>
            <Phone phone={props.phone}/>
            <Swiper onSwiper={swiperBullets} modules={[EffectFade, Navigation, Pagination, Autoplay]} autoplay={{delay: 5000}} pagination={{clickable: true}} navigation speed={1000} spaceBetween={0} slidesPerView={1} effect="fade" loop>
                {slider}
            </Swiper>
        </section>
    )
}