export const progress = () => {
    const body = document.querySelector('body')
    const progressCircle = document.querySelector('.progress-circle > path');
    let result = (window.scrollY + window.innerHeight) * 100 / body.offsetHeight;
    let circle = result / 100 * 360
    let stroke = 360 - circle;
    progressCircle.style.strokeDashoffset = stroke;
    if(window.scrollY > window.innerHeight / 2) {
        progressCircle.parentElement.parentElement.classList.remove('progress-wrapper__hidden');
    }else{
        progressCircle.parentElement.parentElement.classList.add('progress-wrapper__hidden');
    }
}