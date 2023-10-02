import React from "react";
import { Link } from "react-router-dom";

export const BlogCard = (props) => {

    let dateArray = props.item.date.split('T')[0].split('-');
    let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).toLocaleDateString('ru', {day: 'numeric', month: 'short'}).split(' ')

    let categoryUrl = ''
    if(props.categoryUrl) {
        categoryUrl = '/' + props.categoryUrl + '/'
    }

    let img = props.item.img
    if(img === false) {
        img = '/wp-content/uploads/2023/05/no_photo_900_900.png'
    }

    return (
        <Link to={`${categoryUrl}${props.item.slug}`} className="blog-item">
            <div className="blog-item__date">{date[0]}<span>{date[1]}</span></div>
            <div className="blog-item__view">{props.item.view}</div>
            <div className="blog-item__bg">
                <img className="blog-item__bgimg" src={img} alt={props.item.title} />
            </div>
            <div className="blog-item__text">
                <div className="blog-item__suptitle">{props.item.suptitle}</div>
                <div className="blog-item__title">{props.item.title}</div>
            </div>
        </Link>
    )
}