import { useContext } from 'react';
import {GameContext} from '../context/GameContext';
import { Positioning,Eliminating,Playing,Ending} from '../logic/states'; 

const useGame = () => { 
const {gameState, setGameState} = useContext(GameContext)

const positioning= new Positioning()
const eliminating= new Eliminating()
const playing= new Playing()
const ending= new Ending()

const availableStates={
  "Positioning": positioning,
  "Eliminating": eliminating,
  "Playing": playing,
  "Ending": ending,
}
function updateContext(index) {
    const newContext = !gameState.winner ?availableStates[gameState[gameState.turn].state].update(index, gameState):gameState
    setGameState({ ...newContext })
  }
function saveGameState(){
    localStorage.setItem("gameState", JSON.stringify(gameState))  
  }
return {gameState, updateContext,saveGameState}
} 

export default useGame;