export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: `POST`, 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}

export const createPhoto = (photo) => {
    return fetch("http://localhost:8000/photos", {
        method: `POST`, 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(photo)
    })
        .then(response => response.json())
}




export const editGame = (game, gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        method: `PUT`, 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(game)
    })
}
