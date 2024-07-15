import { useState,createContext } from 'react'
import './App.css'
import  {Board, TurnPannel}  from './components'
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
    <div className="App" style={{display :'flex',flexDirection:'column', alignItems:'center',justifyContent:"center",width:"100%", height:"100%"}}>
    <GameContext.Provider value ={{gameState,setGameState}} >    
    <TurnPannel/>
    <Board color={"skyblue"}  ></Board>
    </GameContext.Provider>
    </div>
  )
})

export  default App
