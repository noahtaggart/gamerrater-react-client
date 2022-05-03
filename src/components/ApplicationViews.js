import React from "react"
import { Route } from "react-router-dom"
import { EditGame } from "./game/EditGame"
import { GameDetails } from "./game/GameDetails"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { ReviewForm } from "./review/ReviewForm"



export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow",
            lineHeight: "1.75rem"
        }}>
            <Route exact path='/games'>
                <GameList />
            </Route>
            <Route exact path='/games/:gameId(\d+)'>
                <GameDetails />
            </Route>
            <Route exact path='/games/:gameId(\d+)/review'>
                <ReviewForm />
            </Route>
            <Route exact path='/games/:gameId(\d+)/edit'>
                <EditGame />
            </Route>
            <Route exact path='/games/new'>
                <GameForm />
            </Route>
            


        </main>
    </>
}
