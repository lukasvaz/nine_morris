import { useState, useRef,useContext,createContext } from 'react'
import './App.css'
import  {Board}  from './components'
import { Positioning } from './logic/states'
import DEFAULT_CONFIGURATION from './config/default_configuration.json'

export const GameContext=createContext(null)

const App = (() => {
  const [gameState,setGameState]=useState({"winner": 0,
  "P1": { "state": new Positioning(), "onGamePieces": [],"playedPieces":0 },
  "P2": { "state": new Positioning(), "onGamePieces": [],"playedPieces":0 },
  "board": Array(24).fill(null),
  "turn": DEFAULT_CONFIGURATION.PLAYER1["ID"]
})
  return (
    <div className="App">
    <GameContext.Provider value ={{gameState,setGameState}} >
    <Board color={"skyblue"}  ></Board>
    </GameContext.Provider>

    </div>
  )
})

export  default App
