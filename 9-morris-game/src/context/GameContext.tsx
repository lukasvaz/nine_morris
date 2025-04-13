import React, { createContext, useState, ReactNode  } from "react";
import { GameState } from "../types/types";
import useGame from "../hooks/useGame";

interface GameProviderProps {
  children: ReactNode;
}

interface GameContextProps {
gameState: GameState;
setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameContext = createContext<GameContextProps>({} as GameContextProps);
const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
const {getInitialState} = useGame();
  
  const [gameState, setGameState] = useState(getInitialState);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
