import React from "react";
import { PageHeader } from "../pageHeader";
import { Link } from "react-router-dom";

export const ActiveItem = (props) => {

    let otherArray = [];
    props.all.forEach(item => {
        if(item.id !== props.current.id) {
            otherArray.push(item)
        }
    })

    let allItems = otherArray.map((item, index) => (
        <Link key={index} to={`/${props.category.url}/${item.slug}`}>{item.title}</Link>
    ))

    let info = props.current.info.map((item, index) => (
        <div key={index} className="item">
            <div className="title">{item.title}</div>
            <div className="desc">{item.info}</div>
        </div>
    ))

    let gallery = props.current.gallery.map((item, index) => (
        <img key={index} className="active-img" src={item} alt={props.current.title} />
    ))

    return(
        <main>
            <PageHeader parentCategory={props.category} title={props.current.title} image={props.current.img}/>
            <div className="container">
                <div className="active-desc" dangerouslySetInnerHTML={{__html: props.current.desc.full}}/>
                <div className="info">{info}</div>
                <div className="gallery">{gallery}</div>
                <div className="links">
                    {allItems}
                </div>
            </div>
        </main>
    )
}