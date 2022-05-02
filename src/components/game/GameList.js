import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()
    const [refreshState, setRefreshState] = useState(false)

    useEffect(() => {
        getGames()
        .then(data => setGames(data))
        .then(setRefreshState(false))
    }, [refreshState])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <>
                    <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><Link to={`/games/${game.id}`}>
                            {game.title}</Link></div>
                            
                        
                    </section>
                    </>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
        </article>
    )




}