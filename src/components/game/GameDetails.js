import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getUser } from "../auth/AuthManager.js"
import { createRating, getSingleGameReviews } from "../review/ReviewManager.js"
import { createPhoto, getSingleGame } from "./GameManager.js"
import ReactStars from "react-rating-stars-component"


export const GameDetails = () => {
    const { gameId } = useParams()
    const [currentGame, setCurrentGame] = useState({ average_rating: 10 })
    const [reviews, setReviews] = useState([])
    const [currentUser, setUser] = useState({})
    const [leaveRating, setLeaveRating] = useState(false)
    const [newRating, setNewRating] = useState()
    const [refreshState, setRefreshState] = useState(false)
    const [base64ImageState, setBase64ImageState] = useState()
    const history = useHistory()

    useEffect(() => {
        getSingleGame(gameId)
            .then(data => setCurrentGame(data)).then(() => setRefreshState(false))
        getSingleGameReviews(gameId)
            .then(data => setReviews(data))
        getUser()
            .then(data => setUser(data))

    }, [refreshState])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64ImageState(base64ImageString)
    
            // Update a component state variable to the value of base64ImageString
        });
    }


    return (
        <>

            <article className="games" key={`game--${currentGame.id}`}>
                <div className="game__title">{currentGame.title}</div>
                {leaveRating === false ? //leave rating is not pressed
                    <>
                        {currentGame.average_rating > 0 ?
                            <>
                                <ReactStars count={10} edit={false} value={currentGame.average_rating} isHalf={true} size={25} />
                            </>
                            : //no ratings
                            <><p>Be the first to leave a rating!</p>

                            </>}


                        <button onClick={(e) => setLeaveRating(true)}>Leave a Rating?</button></>
                    : //after leave a rating button is pressed
                    <>
                        <ReactStars count={10} isHalf={true} onChange={newValue => setNewRating(newValue)} size={25} />
                        <button onClick={(e) => {
                            const ratingObject = {}
                            ratingObject.rating = newRating
                            ratingObject.game_id = gameId
                            createRating(ratingObject)
                                .then(() => setLeaveRating(false))
                                .then(() => setRefreshState(true))
                        }}>Save Rating</button>
                    </>
                }
                <div className="game__maker">
                    from {currentGame.designer}
                </div>
                <div className="game__year">
                    Released: {currentGame.year_released}
                </div>
                <div className="game__players">
                    Recommended number of Players: {currentGame.number_of_players}
                </div>
                <div className="game__time">
                    Estimated play time: {currentGame.estimated_time_to_play}
                </div>
                <div className="game__age">
                    Suggested age: {currentGame.age_recommendation}+
                </div><br></br>
                <div className="game__categories">
                    Categories:
                    <ul className="game__categories">
                        {currentGame.category?.map(category => {
                            return (
                                <li key={`category--${category.id}`}>{category.label}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="game__reviews">
                    Reviews:
                    {reviews.length === 0 ? <p>Be the first to leave a review!</p> :
                        <ul className="game__reviews">
                            {reviews?.map(review => {
                                return (
                                    <li key={`review--${review.id}`}>{review.content} - {review.player.user.username}</li>
                                )
                            })}
                        </ul>}
                </div>
                <button onClick={() => history.push(`/games/${gameId}/review`)}>Leave a Review</button>
                {currentUser.user_id === currentGame.creator?.user ? <button onClick={() => history.push(`/games/${gameId}/edit`)}>Edit Game</button> : ""}

                <input type="file" id="game_image" onChange={createGameImageString} />
                <input type="hidden" name="game_id" value={gameId} />
                <button onClick={() => {
                    const photoObject = {}
                    photoObject.game_id = gameId
                    photoObject.game_image = base64ImageState
                    createPhoto(photoObject).then(() => setBase64ImageState(undefined))
                }}>Upload</button>

            </article>

        </>
    )
}