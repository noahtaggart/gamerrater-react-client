export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const addCategory = (gameId, categoryId) => {
    return fetch(`http://localhost:8000/games/${gameId}/add_category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }, body: JSON.stringify(categoryId)
    })
        .then(res => res.json())
}