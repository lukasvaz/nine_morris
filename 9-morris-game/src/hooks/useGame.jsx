import { useContext } from 'react';
import {GameContext} from '../context/GameContext';

const useGame = () => { 
const {gameState, setGameState} = useContext(GameContext)

function updateContext(index) {
    const newContext = gameState[gameState.turn] ? gameState[gameState.turn].state.update(index, gameState) : gameState
    setGameState({ ...newContext })
  }
return {gameState, updateContext}
} 

export default useGame;