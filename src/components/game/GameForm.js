import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCategories } from "../category/CategoryManager.js"
import { createGame } from "./GameManager.js"


export const GameForm = () => {
    const history = useHistory()
    const currentYear = new Date().getFullYear()
    const [categories, setCategories] = useState([])
    const [categoryArray, setNewCategories] = useState([])

    const [currentGame, setCurrentGame] = useState({
        title:"",
        designer:"",
        description:"",
        yearReleased:currentYear,
        numberOfPlayers:4,
        ageRecommendation:6,
        estimatedTimeToPlay:"60 minutes"
    })

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data))
    }, [])

    const changeGameState = (domEvent) => {
        const copy = {...currentGame}
        if (domEvent.target.name === "title") {
            copy.title = domEvent.target.value
        } else if (domEvent.target.name === "designer") {
            copy.designer = domEvent.target.value
        } else if (domEvent.target.name === "description") {
            copy.description = domEvent.target.value
        } else if (domEvent.target.name === "yearReleased") {
            copy.yearReleased = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "numberOfPlayers") {
            copy.numberOfPlayers = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "ageRecommendation") {
            copy.ageRecommendation = domEvent.target.value
        } else if (domEvent.target.name === "estimatedTimeToPlay") {
            copy.estimatedTimeToPlay = domEvent.target.value
        } else if (domEvent.target.name === "category") {
            copy.category = parseInt(domEvent.target.value)
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
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="number" name="yearReleased" min="1000" max={currentYear} required autoFocus className="form__control"
                    value={currentGame.yearReleased}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="numberOfPlayers">Recommended number of Players: </label>
                    <input type="number" name="numberOfPlayers" min="0" max="99" required autoFocus className="form__control"
                    value={currentGame.numberOfPlayers}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="ageRecommendation">Recommended minimum age of Players: </label>
                    <input type="number" name="ageRecommendation" 
                    min="1" max="99" required autoFocus className="form__control"
                    value={currentGame.ageRecommendation}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="estimatedTimeToPlay">Estimated time to play game: </label>
                    <input type="text" name="estimatedTimeToPlay" required autoFocus className="form__control"
                    value={currentGame.estimatedTimeToPlay}
                    onChange={changeGameState}
                    />
                </div>
                <div className="form__group">
                    <label htmlFor="category">Categories: </label>
                    {categoryArray.length === 0 ? 
                    //No Categories
                    <>
                    <select name="category" required autoFocus className="form-control" onChange={changeGameState}><option value="0" hidden>Select a category</option>
                    {categories.map(category => {
                        return <option key={`category--${category.id}`} value={category.id}>{category.label}</option>
                    })}
                </select>
                    <button onClick={e => {
                        e.preventDefault()
                        const currentCategoryObject = categories.find(category => category.id === currentGame.category)
                        const copy = [...categoryArray]
                        copy.push(currentCategoryObject)
                        setNewCategories(copy)
                    }} >Add Category</button>
                    </>
                    :
                    //Pre-existing Categories
                    <>
                    <ul className="category--list">
                    {categoryArray.map(category => {
                        return (
                            <li className="current--categories" key={`category--${category.id}`}>{category.label} 
                            </li>
                            )})}
                        </ul>
                        <select name="category" required autoFocus className="form-control" onChange={changeGameState}><option value="0" hidden>Select a category</option>
                    {categories.map(category => {
                        return <option key={`category--${category.id}`} value={category.id}>{category.label}</option>
                    })}
                </select>
                    <button onClick={e => {
                        e.preventDefault()
                        const currentCategoryObject = categories.find(category => category.id === currentGame.category)
                        const copy = [...categoryArray]
                        copy.push(currentCategoryObject)
                        setNewCategories(copy)
                    }} >Add Category</button>


                    </>
                }
                    
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
                        year_released: currentGame.yearReleased,
                        number_of_players: currentGame.numberOfPlayers,
                        age_recommendation: currentGame.ageRecommendation,
                        estimated_time_to_play: currentGame.estimatedTimeToPlay,
                        category: categoryArray.map(category => category.id)

                    }
                    createGame(game)
                        .then(() => history.push("/games"))


                }}
                className="btn btn-primary">Create
            </button>
        </form>

    )
}