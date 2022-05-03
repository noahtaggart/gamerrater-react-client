import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getCategories } from "../category/CategoryManager.js"
import { createGame, editGame, getSingleGame } from "./GameManager.js"


export const EditGame = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const currentYear = new Date().getFullYear()
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        getSingleGame(gameId)
            .then(data => setCurrentGame(data))
    }, [])

    const changeGameState = (domEvent) => {
        const copy = {...currentGame}
        if (domEvent.target.name === "title") {
            copy.title = domEvent.target.value
        } else if (domEvent.target.name === "designer") {
            copy.designer = domEvent.target.value
        } else if (domEvent.target.name === "description") {
            copy.description = domEvent.target.value
        } else if (domEvent.target.name === "year_released") {
            copy.year_released = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "number_of_players") {
            copy.number_of_players = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "age_recommendation") {
            copy.age_recommendation = domEvent.target.value
        } else if (domEvent.target.name === "estimated_time_to_play") {
            copy.estimated_time_to_play = domEvent.target.value
        } 

        setCurrentGame(copy)
    }

    return (
        <form className="game__form">
            <h2 className="game__form__title">Register New Game</h2>
            <fieldset>
                <div className="form__group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form__control"
                    value={currentGame.title}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="designer">Game Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form__control"
                    value={currentGame.designer}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="description">Game Description: </label>
                    <input type="text" name="description" required autoFocus className="form__control"
                    value={currentGame.description}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="number" name="year_released" min="1000" max={currentYear} required autoFocus className="form__control"
                    value={currentGame.year_released}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="number_of_players">Recommended number of Players: </label>
                    <input type="number" name="number_of_players" min="0" max="99" required autoFocus className="form__control"
                    value={currentGame.number_of_players}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="age_recommendation">Recommended minimum age of Players: </label>
                    <input type="number" name="age_recommendation" 
                    min="1" max="99" required autoFocus className="form__control"
                    value={currentGame.age_recommendation}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="estimated_time_to_play">Estimated time to play game: </label>
                    <input type="text" name="estimated_time_to_play" required autoFocus className="form__control"
                    value={currentGame.estimated_time_to_play}
                    onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const game = {
                        title: currentGame.title,
                        designer: currentGame.designer,
                        description: currentGame.description,
                        year_released: currentGame.year_released,
                        number_of_players: currentGame.number_of_players,
                        age_recommendation: currentGame.age_recommendation,
                        estimated_time_to_play: currentGame.estimated_time_to_play

                    }
                    editGame(game, gameId)
                        .then(() => history.push(`/games/${gameId}`))


                }}
                className="btn btn-primary">Save Edit
            </button>
        </form>

    )
}