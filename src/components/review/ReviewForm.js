import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { createReview } from "./ReviewManager"



export const ReviewForm = () => {
    const { gameId } = useParams()
    const [review, setReview] = useState({})
    const history = useHistory()


    return (
        <>
        <form className="reviews">
            <h2 className="review__form">Leave a Review</h2>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="review">Review:</label>
                    <textarea name="review" required autoFocus className="form__control" onChange={(e) => {
                        const copy = {...review}
                        copy.content = e.target.value
                        setReview(copy)
                    }}/>
                </div>
            </fieldset>
            <button onClick={(e) => {
                e.preventDefault()

                const newReview = {}
                newReview.content = review.content
                newReview.game_id = gameId

                createReview(newReview)
                .then(() => history.push(`/games/${gameId}`))
                
            }}>Submit Review</button>

        </form>
        </>
    )

}