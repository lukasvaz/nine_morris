import useGame from "../../hooks/useGame";
import Piece from "../Board/Piece";
import {DEFAULT_CONFIGURATION} from "../../config/default_configuration";
import React from "react";
import { PlayerType } from "../../types/types";

const TurnPannel = () => {
  const { ID: player1, COLOR: colorPlayer1 } = DEFAULT_CONFIGURATION.PLAYER1;
  const { ID: player2, COLOR: colorPlayer2 } = DEFAULT_CONFIGURATION.PLAYER2;

  const { gameState } = useGame();
  
  function handlePlayerIlumination(player:PlayerType) {
    if (gameState.winner === player) return "var(--filter-winner)";
    return gameState.turn === player
      ? "var(--filter-selected)"
      : "var(--filter-default)";
  }

  return (
    <div className="flex flex-column items-center border-solid border-1 rounded-xl border-primary ">
      <svg className="w-[350px] h-[100px]">
        <Piece
          style={{ filter: handlePlayerIlumination(player1) }}
          cx={80}
          cy={50}
          color={colorPlayer1} handleClick={()=>{}}        ></Piece>
        <Piece
          style={{ filter: handlePlayerIlumination(player2) }}
          cx={270}
          cy={50}
          color={colorPlayer2} handleClick={()=>{}}        ></Piece>
      </svg>
    </div>
  );
};
export default TurnPannel;
