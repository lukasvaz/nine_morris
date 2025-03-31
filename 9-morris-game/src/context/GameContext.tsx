import React, { createContext, useState, ReactNode  } from "react";
import {DEFAULT_CONFIGURATION} from "../config/default_configuration";
import { GameState } from "../types/types";

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextProps {
gameState: GameState;
setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameContext = createContext<GameContextProps>({} as GameContextProps);
const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const initialState:GameState = {
    winner: null,
    P1: { state: "Positioning", onGamePieces: [], playedPieces: 0 },
    P2: { state: "Positioning", onGamePieces: [], playedPieces: 0 },
    board: Array(24).fill(null),
    turn: DEFAULT_CONFIGURATION.PLAYER1["ID"],
    selectedPiece: null,
  };
  function getInitialState(): GameState {
    const savedState = localStorage.getItem("gameState");
    localStorage.removeItem("gameState");
    console.log(savedState);
    return savedState ? JSON.parse(savedState) : initialState;
  }
  
  const [gameState, setGameState] = useState(getInitialState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
