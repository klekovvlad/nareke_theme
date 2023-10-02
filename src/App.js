import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MainPage } from "./modules/mainPage/mainPage";
import { Header } from "./modules/header";
import { Active } from "./modules/activePage";
import { ApartPage } from "./modules/apartPage";
import { ActiveItem } from "./modules/activePage/item";
import { Footer } from "./modules/footer";
import { ApartItem } from "./modules/apartPage/item";
import { Page404 } from "./modules/404page";
import { Rules } from "./modules/rulesPage";
import { Loader } from "./modules/loader";
import { FooterForm } from "./modules/footerForm";
import { scrollTop } from "./modules/scripts/scrollTop";
import { Feedback } from "./modules/feedbackPage";
import { Contacts } from "./modules/contactPage";
import { HelmetProvider } from "react-helmet-async";
import { Blog } from "./modules/blogPage";
import { BlogItem } from "./modules/blogPage/item";
import { headerFixed } from "./modules/scripts/headerFixed";
import { ProgressCircle } from "./modules/progress";
import { progress } from "./modules/scripts/progress";

const App = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Content />
            </BrowserRouter>
        </HelmetProvider>
    );
}

window.onscroll = () => {
    headerFixed();
    progress();
}

function Content() {
    const [main, setMain] = useState();
    const [apart, setApart] = useState();
    const [active, setActive] = useState();
    const [menu, setMenu] = useState();
    const [footerMenu, setFooterMenu] = useState();
    const [apartCategory, setApartCategory] = useState();
    const [activeCategory, setActiveCategory] = useState();
    const [contactsState, setContactsState] = useState();
    const [blogState, setBlogState] = useState();
    const [blogCategory, setBlogCategory] = useState();
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");
  
    useEffect(() => {
      if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    useEffect(() => {
        fetch('/wp-json/wp/v2/pages/13')
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            let array = [];
            let main = {};
            main.title = data.acf.mainTitle;
            main.suptitle = data.acf.mainSuptitle;
            main.slider = data.acf.mainslider;
            array.main = main;

            let about = {};
            about.title = data.acf.aboutTitle;
            about.subtitle = data.acf.aboutSuptitle;
            about.text = data.acf.aboutText;
            about.imgs = data.acf.aboutImgs;
            array.about = about;

            let adv = {};
            adv.title = data.acf.advTitle;
            adv.subtitle = data.acf.advSuptitle;
            adv.list = data.acf.advList;
            array.adv = adv;

            let apart = {};
            apart.title = data.acf.apartTitle;
            apart.subtitle = data.acf.apartSuptitle;
            array.apart = apart;

            let blog = {};
            blog.title = data.acf.blogTitle;
            blog.subtitle = data.acf.blogSubtitle;
            array.blog = blog;

            let other = {};
            other.formText = data.acf.formText;
            array.other = other

            let video = {};
            video.title = data.acf.videoTitle;
            video.subtitle = data.acf.videoSubtitle;
            video.link = data.acf.videoLink;
            array.video = video;

            let booking = {};
            booking.title = data.acf.bookingTitle;
            booking.subtitle = data.acf.bookingSubtitle;
            array.booking = booking;

            let seo = {};
            seo.title = data.yoast_head_json.title;
            seo.description = data.yoast_head_json.description;
            array.seo = seo;

            setMain(array)
        });
    },[])

    useEffect(() => {
        fetch('/wp-json/wp/v2/posts/?categories=1')
        .then(response => response.json())
        .then(data => {
            let array = [];
            data.forEach(item => {
                let obj = {};
                obj.title = item.title.rendered;
                obj.link = item.link;
                obj.id = item.id;
                obj.img = item.acf.apartPhoto;;
                obj.build = item.acf.apartBuild;
                if(Array.isArray(item.acf.priceNight)) {
                    obj.priceNight = item.acf.priceNight;
                }
                if(Array.isArray(item.acf.priceHour)) {
                    obj.priceHour = item.acf.priceHour;
                }
                obj.comfort = item.acf.comfort;
                obj.info = item.acf.info
                obj.slug = item.slug;
                obj.shortDesc = item.acf.shortdesc
                if(item.acf.apartBuild === true) {
                    obj.class = 'apart-item apart-item__build';
                }else{
                    obj.class = 'apart-item';
                }
                obj.priority = item.acf.priority;
                array.push(obj)
            });
            array.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));
            setApart(array)
        })
    }, [])

    useEffect(() => {
        fetch('/wp-json/wp/v2/posts/?categories=4')
        .then(response => response.json())
        .then(data => {
            let array = [];
            data.forEach(item => {
                let obj = {};
                obj.title = item.title.rendered;
                obj.link = item.link;
                let desc = {};
                desc.short = item.acf.activeShortDesc;
                desc.full = item.content.rendered;
                obj.desc = desc;
                obj.priority = item.acf.priority;
                obj.id = item.id;
                obj.slug = item.slug;
                obj.categories = item.categories[0];
                obj.img = item.acf.activePhoto;
                obj.gallery = item.acf.activeGallery;
                obj.info = item.acf.activeInfo;
                array.push(obj)
            });
            array.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));
            setActive(array)
        })
    }, [])

    useEffect(() => {
        fetch('/wp-json/menu/menu')
        .then(response => response.json())
        .then(data => {
            setMenu(data);
        })
    }, [])

    useEffect(() => {
        fetch('/wp-json/footer/footer')
        .then(response => response.json())
        .then(data => {
            setFooterMenu(data);
        })
    }, [])

    useEffect(() => {
        fetch('/wp-json/wp/v2/categories/1')
        .then(response => response.json())
        .then(data => {
            let obj = {}
            obj.name = data.name;
            obj.url = data.slug;
            let seo = {};
            seo.title = data.yoast_head_json.title;
            seo.description = data.yoast_head_json.description;
            obj.seo = seo;
            setApartCategory(obj);
        })
    }, [])

    useEffect(() => {
        fetch(`/wp-json/wp/v2/categories/4`)
        .then(response => response.json())
        .then(data => {
            let category = {};
            category.name = data.name;
            category.url = data.slug;
            let seo = {};
            seo.title = data.yoast_head_json.title;
            seo.description = data.yoast_head_json.description;
            category.seo = seo
            setActiveCategory(category)
        })
    }, []);

    useEffect(() => {
        fetch('/wp-json/wp/v2/pages/190')
        .then(response => response.json())
        .then(data => {
            let obj = {};
            obj.title = data.title.rendered;
            obj.phone = data.acf.phone;
            obj.adress = data.acf.adress;
            obj.email = data.acf.email;
            obj.tg = data.acf.telegram;
            obj.wa = data.acf.whatsapp;
            obj.vk = data.acf.vk;
            obj.road = data.acf.road
            obj.subtitle = data.acf.subtitle;
            obj.desc = data.acf.desc;
            obj.about = data.acf.about;
            setContactsState(obj)
        })
    }, [])

    useEffect(() => {
        fetch('/wp-json/wp/v2/posts/?categories=7')
        .then(response => response.json())
        .then(data => {
            let array = [];
            data.forEach(el => {
                let obj = {};
                obj.title = el.title.rendered;
                obj.content = el.content.rendered;
                obj.suptitle = el.acf.suptitle;
                obj.view = el.acf.view;
                obj.date = el.date;
                obj.img = el.acf.img;
                obj.slug = el.slug
                obj.id = el.id;
                obj.author = el.author;
                array.push(obj)
            });
            setBlogState(array)
        })
    }, [])

    useEffect(() => {
        fetch(`/wp-json/wp/v2/categories/7`)
        .then(response => response.json())
        .then(data => {
            let category = {};
            category.name = data.name;
            category.url = data.slug;
            let seo = {};
            seo.title = data.yoast_head_json.title;
            seo.description = data.yoast_head_json.description;
            category.seo = seo
            setBlogCategory(category)
        })
    }, []);

    if(main && apart && active && menu && footerMenu && apartCategory && activeCategory && contactsState && blogState && blogCategory) {

        let activeRoutes = active.map((item,index) => (
            <Route key={index} path={item.slug} element={<ActiveItem current={item} all={active} category={activeCategory}/>}/>
        ))

        let apartRoutes = apart.map((item,index) => (
            <Route key={index} path={item.slug} element={<ApartItem apart={item} category={apartCategory}/>} />
        ))

        let blogRoutes = blogState.map((item, index) => (
            <Route key={index} path={item.slug} element={<BlogItem news={item} category={blogCategory} all={blogState} contacts={contactsState} apart={apart}/>}></Route>
        ))

        return (
            <div
              className={`${transitionStage}`}
              onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                  setTransistionStage("fadeIn");
                  setDisplayLocation(location);
                }
                scrollTop();
              }}
            >
                
                  <Header links={menu}/>
                  <Routes location={displayLocation}>
                      <Route index element={<MainPage state={main} apart={apart} active={active} blog={blogState} blogCategory={blogCategory} phone={contactsState.phone}/>}/>
                      <Route path="/active">
                          <Route index element={<Active active={active} category={activeCategory}/>} />
                          {activeRoutes}
                      </Route>
                      <Route path="/apart">
                          <Route index element={<ApartPage apart={apart} category={apartCategory}/>} />
                          {apartRoutes}
                      </Route>
                      <Route path="/blog">
                        <Route index element={<Blog news={blogState} category={blogCategory}/>} />
                        {blogRoutes}
                      </Route>
                      <Route path="/contacts" element={<Contacts state={contactsState}/>}/>
                      <Route path="/feedback" element={<Feedback />}/>
                      <Route path="/privacy" element={<Rules />} />
                      <Route path="*" element={<Page404 />}/>
                  </Routes>
                  <FooterForm text={main.other.formText} phone={contactsState.phone}/>
                  <Footer links={footerMenu} contacts={contactsState}/>
                  <ProgressCircle />
            </div>
          );
    }else{
        return (
            <Loader />
        )
    }
  

  }

export default App;