import React from "react";
import { PageHeader } from "../pageHeader";
import { Helmet } from "react-helmet-async";
import { Card } from "../card";

export const Active = (props) => {

    let activeItems = props.active.map(item => <Card key={item.id} item={item} class='card-gorizontal' />)

    return (
        <main>
            <Helmet>
                <title>{props.category.seo.title}</title>
                <meta name='description' content={props.category.seo.description} />
            </Helmet>
            <PageHeader title={props.category.name}/>
            <div className="page-content activePage">
                <div className="container">
                    <div className="activePage-wrapper">
                        {activeItems}
                    </div>
                </div>
            </div>
        </main>
    )
}