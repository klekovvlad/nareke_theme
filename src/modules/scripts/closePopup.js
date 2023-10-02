export const popupClose = () => {
    const popup = document.querySelector('.popup');
    if(!popup.classList.contains('popup-hidden')) {
        popup.classList.add('popup-hidden');
        setTimeout(() => {
            popup.parentNode.removeChild(popup);
        }, 500)
    }
}