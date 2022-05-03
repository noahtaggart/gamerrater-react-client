export const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGameReviews = (gameId) => {
    return fetch(`http://localhost:8000/reviews?game=${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}


export const createReview = (review) => {
    return fetch("http://localhost:8000/reviews", {
        method: `POST`, 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(review)
    })
}
export const createRating = (rating) => {
    return fetch("http://localhost:8000/ratings", {
        method: `POST`, 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
        body: JSON.stringify(rating)
    })
}