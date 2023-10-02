import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../pageHeader";
import { BlogCard } from "../blogCard";

export const Blog = (props) => {

    let news = props.news.map(item => <BlogCard key={item.id} item={item}/>)

    return (
        <main>
            <Helmet>
                <title>{props.category.seo.title}</title>
                <meta name='description' content={props.category.seo.description} />
            </Helmet>
            <PageHeader title={props.category.name}/>
            <div className="container">
                <div className="page-content blog-wrapper">
                    {news}
                </div>
            </div>
        </main>
    )
}