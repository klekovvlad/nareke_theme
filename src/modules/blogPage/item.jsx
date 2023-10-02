import React, { useEffect, useState } from "react";
import { PageHeader } from "../pageHeader";
import { Link } from "react-router-dom";

export const BlogItem = (props) => {

    const [view, setView] = useState(Number(props.news.view));

    const dateNormalize = (props) => {
        let dateArray = props.split('T')[0].split('-');
        let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
        return date
    }

    useEffect(() => {
        let view = Number(props.news.view) + 1;
        setView(view);
        let data = JSON.stringify({
            acf: {
                view: view,
            }
        })
        fetch(`/wp-json/wp/v2/posts/${props.news.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('comments:JtCN C8MO rdhF EpZz cE7G uQEc')
            },
            body: data
        })
        .then(response => {
            if(response.status !== 200) {
                console.log('Ошибка')
            }
        })
        .catch(error => {
            console.log('Ошибка')
        })
    }, [props.news.view, props.news.id])

    let renderNews = 0;
    let asideNews = props.all.map(item => {
        if(item.id !== props.news.id && renderNews < 3) {
            renderNews++;
            let img = item.img
            if(img === false) {
                img = '/wp-content/uploads/2023/05/no_photo_900_900.png'
            }

            return (
                <Link to={`/${props.category.url}/${item.slug}`} key={item.id} className="item">
                    <img src={img} alt={item.title} className="item-img" />
                    <div className="item-text">
                        <div className="item-title">{item.title}</div>
                        <div className="item-date">{dateNormalize(item.date).toLocaleDateString('ru', {day: 'numeric', month: 'short'})}</div>
                    </div>
                </Link>
            )
        }else {
            return false
        }
    })

    let asideContacts = (
        <div className="items">
            <a target="_blank" rel="nofollow noopener noreferrer" href={props.contacts.tg} className="item">TG</a>
            <a target="_blank" rel="nofollow noopener noreferrer" href={props.contacts.vk} className="item">VK</a>
            <a target="_blank" rel="nofollow noopener noreferrer" href={props.contacts.wa} className="item">WA</a>
        </div>
    )
    
    let renderApart = 0;
    let asideApart = props.apart.map(item => {
        if(item.build === false && renderApart < 3) {
            renderApart++
            return (
                <Link key={item.id} to={`/apart/${item.slug}`} className="item">
                    <img src={item.img} alt={item.name} className="item-img" />
                    <div className="item-text">
                        <div className="item-title">{item.name}</div>
                        <div className="item-price">от {item.priceHour[0].price} руб.</div>
                        <button className="item-btn">Забронировать</button>
                    </div>
                </Link>
            )
        }else {
            return false
        }
    })

    let infoNews = () => {
        let img = null;
        let author = 'Команда НА РЕКЕ'

        return (
            <div className="blogItem-info">
                <div className="blogItem-author">
                    <div className="blogItem-author__img">
                        <img src={img} alt={author} />
                    </div>
                    <div className="blogItem-author__text">
                        <div className="blogItem-author__name">{author}</div>
                        <div className="blogItem-author__desc">{props.contacts.about}</div>
                    </div>
                </div>
                <div className="view">{view}</div>
            </div>
        )
    }

    return (
        <main className="blogItem">
            <PageHeader parentCategory={props.category} 
                        title={props.news.title} 
                        image={props.news.img}
                        date={dateNormalize(props.news.date).toLocaleDateString('ru', {day: 'numeric', month: 'long'})}/>
            <div className="container">
                <div className="blogItem-wrapper">
                    <div className="blogItem-content">
                        <div dangerouslySetInnerHTML={{__html: props.news.content}}/>  
                        {infoNews()}          
                    </div>
                    <div className="blogItem-aside">
                        <div className="blogItem-aside__apart blogItem-aside__block">
                            <div className="blogItem-aside__title">Где переночевать?</div>
                            {asideApart}
                        </div>
                        <div className="blogItem-aside__news blogItem-aside__block">
                            <div className="blogItem-aside__title">Другие новости</div>
                            {asideNews}
                        </div>
                        <div className="blogItem-aside__social blogItem-aside__block">
                            <div className="blogItem-aside__title">Мы в сети</div>
                            {asideContacts}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}