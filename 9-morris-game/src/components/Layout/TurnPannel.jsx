import React, { useContext } from 'react';
import { GameContext } from '../../App'

const TurnPannel = () => {
  const { gameState, _ } = useContext(GameContext)
  return <>
  {gameState.turn}
  <svg style={{width:"200px",height:"100px"}}></svg>
  </>
}

export default TurnPannel;