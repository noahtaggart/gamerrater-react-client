export const getUser = () => {
    return fetch("http://localhost:8000/players", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}