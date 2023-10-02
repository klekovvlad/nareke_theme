export const scrollTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "auto",
    });
}

export const scrollTopSmooth = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}