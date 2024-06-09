import React, { useContext } from 'react';
import { GameContext } from '../../App'
import DEFAULT_CONFIGURATION from '../../config/default_configuration.json'

const Piece = ({ cx, cy,index }) => {
  const { gameState, setGameState } = useContext(GameContext)
  const color = gameState.board[index] === DEFAULT_CONFIGURATION.PLAYER1.ID ? DEFAULT_CONFIGURATION.PLAYER1.COLOR 
  : gameState.board[index]  === DEFAULT_CONFIGURATION.PLAYER2.ID ? DEFAULT_CONFIGURATION.PLAYER2.COLOR : "transparent"
  
  const updateContext = () => {
    const [newBoard, newTurn, newstate] = gameState[gameState.turn].state.update(index, gameState)
    setGameState({
      ...gameState,
      "board": newBoard,
      "turn": newTurn,
      "P1": { "state": newstate, "onGamePieces": gameState.P1.onGamePieces },
      "P2": { "state": newstate, "onGamePieces": gameState.P2.onGamePieces }
    })

  }
  const radius = 40
  return <circle cx={cx} cy={cy} r={radius} fill={color} onClick={updateContext} />
}

export default Piece;