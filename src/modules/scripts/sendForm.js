import { popupClose } from "./closePopup";

export const sendForm = (e) => {
    e.preventDefault();
    let form = e.target.parentElement;
    let formData = null;
    if(form.elements.email.value !== '') {
        formData =  new FormData();
    }else {
        formData = new FormData(form);
    }
    fetch(`/wp-json/contact-form-7/v1/contact-forms/182/feedback`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json()
    })
    .then(resonse => {
        console.log(resonse)
        if(resonse.status === 'mail_sent') {
            const input = form.querySelectorAll('input');
            input.forEach(inp => inp.value = '');
            popupForm(resonse.message)
        }else if(resonse.status === 'validation_failed') {
            resonse.invalid_fields.forEach(res => {
                const field = form.querySelector(`input[name=${res.field}]`)
                if(res.message === 'Обязательное поле.') {
                    field.className = 'input-error';
                    field.parentElement.classList.add('input-error__req')
                }else{
                    field.className = 'input-error';
                    field.parentElement.classList.add('input-error__message')
                    field.parentElement.dataset.formerror = res.message;
                }
                setTimeout(() => {
                    field.classList.remove('input-error');
                    field.parentElement.className = 'input-wrapper'
                }, 5000)
            });
        }
    })
}

const popupForm = (text) => {
    const body = document.querySelector('body');
    const popup = document.createElement('div');
    popup.className = 'popup popup-hidden popup-form';
    const close = document.createElement('div');
    close.classList.add('popup-close');
    close.innerHTML = '<span></span><span></span>';
    const popupBody = document.createElement('div');
    popupBody.classList.add('popup-body');
    const popupStatus = document.createElement('div');
    popupBody.textContent = text;
    popupBody.prepend(popupStatus);
    popup.append(close, popupBody);
    body.append(popup);
    setTimeout(() => {
        popup.classList.remove('popup-hidden')
    }, 100);
    popup.onclick = (e) => {
        e.stopPropagation();
        if(e.target.classList.contains('popup')) {
            popupClose()
        }
    }
    close.onclick = popupClose;
    setTimeout(() => {
        popupClose()
    }, 8000)
}

export const listenInput = (e) => {
    if(e.target.classList.contains('input-error')) {
        e.target.classList.remove('input-error');
    }
    if(e.target.parentElement.classList.contains('input-error__req') || e.target.parentElement.classList.contains('input-error__message')) {
        e.target.parentElement.className = 'input-wrapper';
    }
}