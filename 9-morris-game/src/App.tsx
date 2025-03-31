import "./App.css";
import { Board, TurnPannel, PieceKeeper } from "./components/index.js";
import useGame from "./hooks/useGame.tsx";
import {DEFAULT_CONFIGURATION} from "./config/default_configuration.ts";
import { useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext.tsx";
import { useContext } from "react";
const App = () => {
  const colorPlayer1 = DEFAULT_CONFIGURATION.PLAYER1.COLOR;
  const colorPlayer2 = DEFAULT_CONFIGURATION.PLAYER2.COLOR;
  const { gameState, saveGameState } = useGame();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleRightClick = () => {
      saveGameState();
    };
    window.addEventListener("beforeunload", handleRightClick);
    return () => window.removeEventListener("contextmenu", handleRightClick);
  }, [saveGameState]);

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
    </div>
  );
};

export default App;
