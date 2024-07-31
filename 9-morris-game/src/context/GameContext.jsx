import { createContext,useState } from "react";
import { Positioning } from "../logic/states";
import DEFAULT_CONFIGURATION from "../config/default_configuration.json"

const GameContext = createContext()

const   GameProvider= ({children}) => {
const [gameState, setGameState] = useState({
        "winner": 0,
        "P1": { "state": new Positioning(), "onGamePieces": [], "playedPieces": 0 },
        "P2": { "state": new Positioning(), "onGamePieces": [], "playedPieces": 0 },
        "board": Array(24).fill(null),
        "turn": DEFAULT_CONFIGURATION.PLAYER1["ID"]
      })
return (
        <GameContext.Provider value={{ gameState, setGameState }} >
            {children}
        </GameContext.Provider>
    )  
} 
export { GameProvider,GameContext}