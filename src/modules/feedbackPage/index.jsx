import React, { useEffect, useState } from "react";
import { PageHeader } from "../pageHeader";
import { Loader } from "../loader";
import { openPopup } from "../scripts/popup";
import { CommentItem } from "./commentItem";

export const Feedback = () => {

    const [feedback, setFeedback] = useState();
    const [stateFeedback, setStateFeedback] = useState();
    
    useEffect(() => {
        fetch('/wp-json/wp/v2/pages/164')
        .then(response => response.json())
        .then(data => {
            let obj = {};
            obj.title = data.title.rendered;
            
            let popup = {};
            popup.text_1 = data.acf['popuptext-1'];
            popup.text_2 = data.acf['popuptext-2'];
            popup.text_3 = data.acf['popuptext-3'];
            popup.text_4 = data.acf['popuptext-4'];
            obj.popup = popup;

            setStateFeedback(obj)
         })
    }, [])

    useEffect(() => {
        fetch('/wp-json/wp/v2/comments/?post=164')
        .then(response => {
            if(response.ok === false) {
                let errorArray = [];
                let errorObj = {};
                errorObj.author = 'Ошибка в получении данных';
                errorObj.data = 'дд-мм-гггг';
                errorObj.comment = 'Ошибка в получении данных с сервера. Попробуйте перезагрузить страницу';
                errorObj.gallery = false;
                errorArray.push(errorObj);
                setFeedback(errorArray);
            }else {
                return response.json()
            }
        })
        .then(data => {
            let array = [];
            data.map(i => {
                let obj = {};
                obj.author = i.author_name;
                let commentArray = i.content.rendered.replace('\n', '').split('///')
                obj.score = commentArray[0].replace(/<\/?[a-zA-Z]+>/gi,'');
                obj.comment = `<p>${commentArray[1]}`;
                obj.gallery = i.acf.img;
                obj.id = i.id;
                let dateArray = i.date.split('T');
                let dateArrayNext = dateArray[0].split('-');
                let date = new Date(dateArrayNext[0], dateArrayNext[1] - 1, dateArrayNext[2]);
                obj.date = date.toLocaleDateString("ru", {day: 'numeric', month: 'long', year: 'numeric'});
                array.push(obj);
                
                return array;
            })
            setFeedback(array)
        })
        .catch(() => {
            let errorArray = [];
            let errorObj = {};
            errorObj.author = 'Ошибка в получении данных';
            errorObj.data = 'дд-мм-гггг';
            errorObj.comment = 'Ошибка в получении данных с сервера. Попробуйте перезагрузить страницу';
            errorObj.gallery = false;
            errorArray.push(errorObj);
            setFeedback(errorArray);
        })
    }, [])
    
    if(stateFeedback && feedback) {

        const scoreResult = (length, summ) => {
            let result = summ / length;
            return result.toFixed(2)
        }
        let scoreSumm = 0;
        let feedbackItems = feedback.map(i => {
            scoreSumm = scoreSumm + Number(i.score)
            return (
                <CommentItem    key={i.id} 
                                score={i.score}
                                id={i.id}
                                comment={i.comment}
                                author={i.author} 
                                date={i.date}
                                gallery={i.gallery}/>
            )
        });

        return (
            <main>
                <PageHeader title={stateFeedback.title}/>
                <div className="container">
                    <div className="feedback-rating">Наш рейтинг на основании {feedback.length} отзывов: {scoreResult(feedback.length, scoreSumm)}</div>
                    <div className="page-content feedback-wrapper">
                        {feedbackItems}
                    </div>
                    <button onClick={() => {openPopup(stateFeedback.popup)}}>Открыть</button>                    
                </div>
            </main>
        )
    }else {
        return (
            <Loader />
        )
    }
}