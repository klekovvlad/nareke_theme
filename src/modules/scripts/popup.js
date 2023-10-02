import { popupClose } from "./closePopup";

let feedbackData = {};

export const openPopup = (texts) => {
    const body = document.querySelector('body')
    const popup = document.createElement('div');
    popup.className = ('popup popup-hidden popup-comments');
    const popupBody = document.createElement('div');
    popupBody.classList.add('popup-body');
    const popupTitle = document.createElement('div');
    const popupQuestion = document.createElement('div');
    const close = document.createElement('div');
    close.innerHTML = '<span></span><span></span>'
    close.classList.add('popup-close');
    close.onclick = popupClose;
    popupTitle.classList.add('popup-title');
    popupQuestion.classList.add('popup-question');
    popupBody.append(popupTitle, popupQuestion);
    popup.append(close, popupBody);
    body.append(popup);
    popup.onclick = (e) => {
        e.stopPropagation();
        if(e.target.classList.contains('popup')) {
            popupClose();
        }
    };
    setTimeout(() => {
        popup.classList.remove('popup-hidden')
    }, 100)
    popupQuestions(texts)
}
export const popupQuestions = (texts) => {
    const popup = document.querySelector('.popup');
    if(popup) {
        const popupTitle = popup.querySelector('.popup-title');
        const popupQuestion = popup.querySelector('.popup-question');
        popupQuestion.innerHTML = '';
        popupTitle.textContent = texts.text_1;
        const stars = document.createElement('div')
        stars.classList.add('stars');
        for(let x = 1; x < 6; x++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.dataset.score = x;
            stars.append(star);
        }
        popupQuestion.append(stars);
        stars.addEventListener('mousemove', starsChange);
        stars.addEventListener('click', (e) => {writeScore(e, texts)}, { once: true })
    }
}

const starsChange = (e) => {
    const popup = document.querySelector('.popup');
    const starItems = popup.querySelectorAll('.star');
    if(e.target.classList.contains('star')) {
        let mousePos = e.target.dataset.score;
        starItems.forEach(star => {
            star.classList.remove('star-active')
        })
        for(let x = 0; x < mousePos; x++) {
            starItems[x].classList.add('star-active');
        }
    }
}

const writeScore = (e, texts) => {
    const stars = document.querySelector('.stars');
    stars.removeEventListener('mousemove', starsChange);
    feedbackData.score = e.target.dataset.score;
    commentsRender({starsWrapper: stars, titleWrapper: document.querySelector('.popup-title'), qusetionWrapper: document.querySelector('.popup-question')},texts)
}

const commentsRender = (wrappers, texts) => {
    wrappers.titleWrapper.textContent = texts.text_2;
    wrappers.starsWrapper.classList.add('stars-small');
    if(feedbackData.score < 5) {
        setTimeout(() => {
            const changeScore = document.createElement('button');
            changeScore.className = 'stars-change stars-change__hidden'
            changeScore.textContent = 'Изменить оценку';
            changeScore.addEventListener('click', (e) => {
                changeScore.classList.add('stars-change__hidden')
                wrappers.starsWrapper.addEventListener('mousemove', starsChange);
                wrappers.starsWrapper.addEventListener('click', (e) => {
                    if(!e.target.classList.contains('stars-change')) {
                        wrappers.starsWrapper.removeEventListener('mousemove', starsChange);
                        feedbackData.score = e.target.dataset.score;
                        if(feedbackData.score >= 5) {
                            changeScore.classList.add('stars-change__hidden');
                        }else{
                            changeScore.classList.remove('stars-change__hidden')
                        }
                    }
                })
            })
            wrappers.starsWrapper.append(changeScore);
            setTimeout(() => {
                changeScore.classList.remove('stars-change__hidden')
            }, 500)
        }, 500)
    }

    const nameInput = document.createElement('input');
    nameInput.name = "firstname";
    nameInput.placeholder = 'Имя'
    nameInput.classList.add('comment-area')
    nameInput.onkeyup = checkInputs;
    const textarea = document.createElement('textarea');
    textarea.name = "comment";
    textarea.maxLength = 1000;
    textarea.placeholder = 'Комментарий'
    textarea.classList.add('comment-area')
    textarea.onkeyup = checkInputs;
    const commentWrapper = document.createElement('div');
    commentWrapper.className = 'comment-wrapper comment-wrapper__hidden';
    commentWrapper.append(nameInput,textarea)
    const formButton = document.createElement('button');
    formButton.textContent = 'Далее';
    formButton.className = 'popup-btn popup-btn__hidden';
    formButton.onclick = (() => {
        feedbackData.name = nameInput.value;
        feedbackData.comment = textarea.value;
        wrappers.titleWrapper.textContent = texts.text_3;
        wrappers.starsWrapper.parentNode.removeChild(wrappers.starsWrapper);
        commentWrapper.innerHTML = '';
        const linkInput = document.createElement('input');
        linkInput.placeholder = 'Ссылка на соц. сети';
        linkInput.name = 'social-link';
        commentWrapper.append(linkInput);
        formButton.textContent = 'Отправить'
        formButton.onclick = (() => {
            feedbackData.link = linkInput.value;
            linkInput.parentNode.removeChild(linkInput);
            sendComment(feedbackData, wrappers.titleWrapper, formButton, texts);
        })
    })
    wrappers.qusetionWrapper.append(commentWrapper, formButton)
    setTimeout(() => {
        commentWrapper.classList.remove('comment-wrapper__hidden')
    }, 300);
}

const checkInputs = () => {
    const inputs = document.querySelectorAll('.comment-area');
    const btn = document.querySelector('.popup-btn');
    inputs.forEach(input => {
        if(input.value !== '') {
            btn.classList.remove('popup-btn__hidden')
        }else {
            btn.classList.add('popup-btn__hidden')
        }
    })
}

const sendComment = (data, wrapper, button, texts) => {

    let commentData = JSON.stringify({
        author_name: data.name,
        author_url: data.link,
        content: data.score + '///' + data.comment,
    })


    fetch('/wp-json/wp/v2/comments/?post=164', {
        method: 'post',
        body: commentData,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if(response.ok) {
            successFeedback(button, wrapper, texts);
        }else if(response.status === 409){
            wrapper.innerHTML = 'Ошибка! Обнаружен дубликат комментария'
        }
        console.log(response);
        return response.json();
    })
    .then(response => {
        console.log(response)
    })
}

const successFeedback = (button, wrapper, texts) => {
    wrapper.innerHTML = texts.text_4;

    button.textContent = 'Закрыть'
    button.onclick = popupClose;
}