export const headerFixed = () => {
    const header = document.querySelector('.header');
    if(header) {
        if(window.scrollY > header.offsetHeight) {
            header.classList.add('header-fixed')
        }else{
            header.classList.remove('header-fixed');
        }
    }
}