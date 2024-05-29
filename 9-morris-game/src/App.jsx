import { useState, useRef, useContext, createContext } from 'react'
import './App.css'
import { Board } from './components'
import { Positioning } from './logic/states'
import DEFAULT_CONFIGURATION from './config/default_configuration.json'

const Game = (() => {
  const [gameState, setGameState] = useState({
    "winner": 0,
    "P1": { "state": new Positioning(), "onGamePieces": [] },
    "P2": { "state": new Positioning(), "onGamePieces": [] },
    "board": Array(24).fill(null),
    "turn": DEFAULT_CONFIGURATION.PLAYER1["ID"]
  })

  const gameContext = createContext(gameState)

  function updateBoard(index) {
    //updates the game context according to the state
    const [newBoard, newTurn, newstate] = gameContext["turn"]["state"].update(index, gameState["board"], gameContext["turn"])
    setGameState({
      ...gameState,
      "board": newBoard,
      "turn": newTurn,
      "P1": { "state": newstate, "onGamePieces": gameState.P1["onGamePieces"] },
      "P2": { "state": newstate, "onGamePieces": gameState.P2["onGamePieces"] }
    })

  }

  return (
    <gameContext.Provider>
      <Board color={"skyblue"} updateBoard={updateBoard}></Board>
    </gameContext.Provider>
  )
}
)

const App = (() => {
  return (
    <div className="App">
      <Game />
    </div>
  )
})

export default App
