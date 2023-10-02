import React from "react";
import { MainHeader } from "./mainHeader";
import { About } from "./about";
import { Apart } from "./apart";
import { Adv } from "./adv";
import { Active } from "./active";
import { Helmet } from "react-helmet-async";
import { BlogMain } from "./blog";
import { Video } from "./video";
import { Booking } from "./booking";
import { Feedback } from "./feedback";

export const MainPage = (props) => {
    
    return(
        <main className="mainPage">
            <Helmet>
                <title>{props.state.seo.title}</title>
                <meta name='description' content={props.state.seo.description} />
            </Helmet>
            <MainHeader state={props.state.main} phone={props.phone}/>
            <About state={props.state.about} phone={props.phone}/>
            <Apart titles={props.state.apart} apart={props.apart}/>
            <Video props={props.state.video}/>
            <Adv state={props.state.adv}/>
            <Booking titles={props.state.booking}/>
            <Feedback />
            <Active active={props.active}/>
            <BlogMain titles={props.state.blog} category={props.blogCategory} blog={props.blog}/>
        </main>
    )
}