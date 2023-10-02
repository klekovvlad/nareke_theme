import React from "react";
import { PageHeader } from "../pageHeader";
import { Helmet } from "react-helmet-async";
import { Card } from "../card";

export const ApartPage = (props) => {

    let apartItems = props.apart.map(item => <Card key={item.id} class='card-gorizontal' item={item}/>)

    return (
        <main className="apartPage">
            <Helmet>
                <title>{props.category.seo.title}</title>
                <meta name='description' content={props.category.seo.description} />
            </Helmet>
            <PageHeader title={props.category.name}/>
            <div className="container">
                <div className="page-content apartPage-wrapper">
                    {apartItems}
                </div>
            </div>
        </main>
    )
}