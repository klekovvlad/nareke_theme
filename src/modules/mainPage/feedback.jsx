import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { MainPageTitle } from "../mainPageTitle";

export const Feedback = (props) => {

    const [feedback, setFeedback] = useState();

    useEffect(() => {
        fetch('/wp-json/wp/v2/comments/?post=164&per_page=5')
        .then(response => response.json())
        .then(data => {
            let array = [];
            data.forEach(i => {
                let obj = {}
                obj.author = i.author_name;
                obj.id = i.id;
                let commentArray = i.content.rendered.replace('\n', '').split('///')
                obj.score = commentArray[0].replace(/<\/?[a-zA-Z]+>/gi,'');
                obj.comment = `<p>${commentArray[1]}`;
                array.push(obj)
            })
            setFeedback(array)
        })
    }, [props])

    let titles = {
        subtitle: 'Рекомендации',
        title: 'Что говорят посетители'
    }

    if(feedback) {

        let feedbackItems = feedback.map(i => {
            let scoreArray = []
            for(let i = 1; i <= i.score; i++) {
                scoreArray.push(i)
            }
            let scoreStars = scoreArray.map(i => <div className="feedback-star" key={i}></div>)

            return (
                <SwiperSlide key={i.id} className="feedback-item">
                    <div className="feedback-comment" dangerouslySetInnerHTML={{__html: i.comment}}/>
                    <div className="feedback-info">
                        <div className="feedback-score">{scoreStars}</div>
                        <div className="feedback-author">{i.author}</div>
                    </div>
                </SwiperSlide>
            )
        })


        return (
            <section className="feedback">
                <div className="container">
                    <MainPageTitle titles={titles} />
                    <Swiper slidesPerView={1} spaceBetween={20} modules={[Navigation, Pagination]} navigation pagination={{clickable: true}}>
                        {feedbackItems}
                    </Swiper>
                </div>
            </section>
        )
    }else {
        return (
            <section className="feedback">
                <div className="container">

                </div>
            </section>
        )
    }
}