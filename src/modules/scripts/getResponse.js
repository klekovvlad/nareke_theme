export const getResponse = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        return data;
    })
}