import React, { useEffect, useState } from "react";
import { Loader } from "./loader";
import { PageHeader } from "./pageHeader";

export const Rules = () => {

    const [rulesContent, setRulesContent] = useState();

    useEffect(() => {
        fetch('/wp-json/wp/v2/pages/158')
        .then(response => response.json())
        .then(data => {
            let obj = {};
            obj.title = data.title.rendered;
            obj.content = data.content.rendered;
            setRulesContent(obj);
        })
    }, [])


    if(rulesContent) {
        return (
            <main className="rulesPage">
                <PageHeader title={rulesContent.title}/>
                <div className="container">
                    <div className="page-content rules">
                        <div className="content" dangerouslySetInnerHTML={{__html: rulesContent.content}} />
                    </div>
                </div>
            </main>
        )
    }else{
        return (
            <Loader />
        )
    }
}