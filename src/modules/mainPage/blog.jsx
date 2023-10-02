import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import {Swiper, SwiperSlide } from "swiper/react";
import { MainPageTitle } from "../mainPageTitle";
import { BlogCard } from "../blogCard";

export const BlogMain = (props) => {

    let render = 0;
    let blogItems = props.blog.map(item => {
        if(render < 6) {
            render++
            if(render === 5 && item.date.length >= 6) {
                return (
                    <SwiperSlide key={item.id}>
                        <Link to={`/${props.category.url}`} className="blog-item blog-item__last">
                            <div className="text">Все новости</div>
                        </Link>
                    </SwiperSlide>
                )
            }else {
                return(
                    <SwiperSlide key={item.id}>
                        <BlogCard categoryUrl={props.category.url} item={item}/>
                    </SwiperSlide>
                )
            }
        }else{
            return false
        }
    })

    return(
        <section className="blog">
            <div className="container">
                <MainPageTitle titles={props.titles} />
                <Swiper 
                    slidesPerView={3} 
                    spaceBetween={30}
                    modules={[Navigation]}
                    navigation>
                    {blogItems}
                </Swiper>
            </div>
        </section>
    )
}