import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { Positioning, Eliminating, Playing, Ending } from "../logic/states";
import { GameState } from "../types/types";
import { INITIAL_STATE } from "../utils/constants";
import { useRef,useEffect } from "react";

const useGame = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const currentGameStateRef = useRef(gameState);
  
  useEffect(() => {
    currentGameStateRef.current = gameState;
  }, [gameState]);

  const positioning = new Positioning();
  const eliminating = new Eliminating();
  const playing = new Playing();
  const ending = new Ending();

  const availableStates = {
    Positioning: positioning,
    Eliminating: eliminating,
    Playing: playing,
    Ending: ending,
  };

  function getInitialState(): GameState {
    const savedState = localStorage.getItem("gameState");

    return savedState ? JSON.parse(savedState) : INITIAL_STATE;
  }

  function updateContext(index:number) {
    const newContext = !gameState.winner
      ? availableStates[gameState[gameState.turn].state].update(
          index,
          gameState
        )
      : gameState;
    setGameState({ ...newContext });
  }
  function saveGameState() {
    localStorage.setItem("gameState", JSON.stringify(currentGameStateRef.current));
  }
  function resetGame() {
    setGameState(INITIAL_STATE);
  }
  return { gameState, getInitialState, updateContext, saveGameState,resetGame};
};

export default useGame;
