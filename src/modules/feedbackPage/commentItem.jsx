import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const CommentItem = (props) => {

    let gallery = null
    if(props.gallery.length === 1) {
        gallery = props.gallery.map((img, index) => <img className="comment-img" key={index} src={img} alt="Отзыв о глемпинге НА РЕКЕ"/>)
    }else if(props.gallery.length > 1) {
        let galleryItems = props.gallery.map((img, index) => <SwiperSlide key={index}><img className="comment-img" src={img} alt="Отзыв о глемпинге НА РЕКЕ"/></SwiperSlide>)
        gallery = <div className="comment-gallery"><Swiper modules={[Navigation, Pagination]} pagination={{clickable: true}} navigation>{galleryItems}</Swiper></div>
    }

    let scoreArray = []
    for(let i = 1; i <= props.score; i++) {
        scoreArray.push(i)
    }
    let scoreStars = scoreArray.map(i => <div className="comment-star" key={i}></div>)

    return (
        <div key={props.id} className="comment-item">
            <div className="comment-item__text">
                <div className="comment-text" dangerouslySetInnerHTML={{__html: props.comment}}/>
                <div className="comment-info">
                    <div className="comment-score">{scoreStars}</div>
                    <div className="comment-author">{props.author}</div>
                    <div className="comment-date">{props.date}</div>
                </div>
            </div>
            {gallery}
        </div>
    )
}