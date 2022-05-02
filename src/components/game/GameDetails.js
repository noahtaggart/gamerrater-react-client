import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleGame } from "./GameManager.js"

export const GameDetails = () => {
    const { gameId } = useParams()
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        getSingleGame(gameId)
            .then(data => setCurrentGame(data))
    }, [])


    return (
        <>
            <article className="games" key={`game--${currentGame.id}`}>
                <div className="game__title">{currentGame.title}
                </div>
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
            </article>
        </>
    )
}