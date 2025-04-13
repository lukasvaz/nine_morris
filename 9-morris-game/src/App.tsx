import "./App.css";
import React from "react";
import { Board, TurnPannel, PieceKeeper } from "./components";
import useGame from "./hooks/useGame.tsx";
import {DEFAULT_CONFIGURATION} from "./config/default_configuration.ts";
import { useEffect } from "react";
import useTheme from "./hooks/useTheme.tsx";

const App = () => {
  const colorPlayer1 = DEFAULT_CONFIGURATION.PLAYER1.COLOR;
  const colorPlayer2 = DEFAULT_CONFIGURATION.PLAYER2.COLOR;
  const { gameState,resetGame,saveGameState } = useGame();
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    window.addEventListener("beforeunload",saveGameState);
    return () => window.removeEventListener("beforeunload",saveGameState);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <button onClick={toggleTheme}>{theme}</button>
      <TurnPannel />
      <div className="flex">
        <PieceKeeper
          pieces={9 - gameState.P1.playedPieces}
          color={colorPlayer1}
        />
        <Board />
        <PieceKeeper
          pieces={9 - gameState.P2.playedPieces}
          color={colorPlayer2}
        />
      </div>
      {gameState.winner && (
        <button onClick={resetGame}>
          Reset
        </button>
      )}
    </div>
  );
};

export default App;
