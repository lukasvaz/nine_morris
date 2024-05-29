import React, { createContext, useState } from 'react'
import {Board} from './components'
import { Positioning } from '../../logic/states'
import DEFAULT_CONFIGURATION from '../../config/default_configuration.json'

const GameContext = createContext(null)

const Game = (() => {
  const [gameState, setGameState] = useState({
    "winner": 0,
    "P1": { "state": new Positioning(), "onGamePieces": [] },
    "P2": { "state": new Positioning(), "onGamePieces": [] },
    "board": Array(24).fill(null),
    "turn": DEFAULT_CONFIGURATION.PLAYER1["ID"]
  })

  function updateBoard(index) {
    const [newBoard, newTurn, newstate] = gameState[gameState.turn].state.update(index, gameState.board, gameState.turn)
    setGameState({
      ...gameState,
      "board": newBoard,
      "turn": newTurn,
      "P1": { "state": newstate, "onGamePieces": gameState.P1.onGamePieces },
      "P2": { "state": newstate, "onGamePieces": gameState.P2.onGamePieces }
    })

  }

  return (
    <GameContext.Provider value={gameState}>
      <Board color={"skyblue"} updateBoard={updateBoard}></Board>
    </GameContext.Provider>
  )
}
)

export  {Game, GameContext}