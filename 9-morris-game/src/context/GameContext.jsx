import { createContext,useState } from "react";
import DEFAULT_CONFIGURATION from "../config/default_configuration.json"
import PropTypes from 'prop-types'
const GameContext = createContext()

const  GameProvider= ({children}) => {
const initialState={
    "winner": 0,
    "P1": { "state": "Positioning", "onGamePieces": [], "playedPieces": 0 },
    "P2": { "state": "Positioning", "onGamePieces": [], "playedPieces": 0 },
    "board": Array(24).fill(null),
    "turn": DEFAULT_CONFIGURATION.PLAYER1["ID"],
    "selectedPiece": null
  }
function getInitialState(){
    const savedState = localStorage.getItem("gameState")
    localStorage.removeItem("gameState")
    console.log(savedState)
    return savedState ? JSON.parse(savedState) : initialState
}

const [gameState, setGameState] = useState(getInitialState)
return (
        <GameContext.Provider value={{ gameState, setGameState}} >
            {children}
        </GameContext.Provider>
    )  
} 
GameProvider.propTypes = {
    children: PropTypes.node.isRequired
  }   
export { GameProvider,GameContext}