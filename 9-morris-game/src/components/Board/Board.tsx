import Piece from "./Piece";
import useGame from "../../hooks/useGame";
import { BOARD_GEOMETRY, PIECES_CORDINATES } from "../../utils/constants";
import { getPieceColor, getOppositePlayer } from "../../utils/utils";
import React from 'react';

const Board = () => {
  const { gameState, updateContext } = useGame();
  function handleIlumination(index) {
    if (gameState.winner !== 0) {
      return "var(--filter-default)";
    }
    if (gameState[gameState.turn].state === "Eliminating") {
      return gameState[getOppositePlayer(gameState.turn)].onGamePieces.includes(
        index
      )
        ? "var(--filter-eliminate)"
        : "var(--filter-default)";
    }
    if (gameState.selectedPiece === index) {
      return "var(--filter-selected)";
    }
  }

  return (
    <svg style={{ width: "700", height: "700" }}>
      {BOARD_GEOMETRY.map((line, index) => {
        return (
          <line
            style={{ stroke: "var(--primary-color)" }}
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
          ></line>
        );
      })}

      {gameState.board.map((_, index) => {
        const [cx, cy] = PIECES_CORDINATES[index];
        return (
          <Piece
            key={index}
            cx={cx}
            cy={cy}
            color={getPieceColor(gameState, index)}
            handleClick={() => updateContext(index)}
            style={{ filter: handleIlumination(index) }}
          />
        );
      })}
    </svg>
  );
};

export default Board;
