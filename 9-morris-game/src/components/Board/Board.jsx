import Piece from "./Piece"
import { useContext } from "react"
import useGame from "../../hooks/useGame"
import { BOARD_GEOMETRY, PIECES_CORDINATES } from "../../utils/constants"
import styled, { ThemeContext } from "styled-components"
import {  getPieceColor ,getOppositePlayer } from "../../utils/utils"

const Board = () => {
  const { gameState, updateContext } = useGame()
  const theme = useContext(ThemeContext)  
  
  function handleIlumination(index) {
    if (gameState.winner !== 0) {
      return theme.FILTERS.DEFAULT
    }
    if (gameState[gameState.turn].state ==="Eliminating") {
      return gameState[getOppositePlayer(gameState.turn)].onGamePieces.includes(index) ? theme.FILTERS.ELIMINATE : theme.FILTERS.DEFAULT
    }
    if (gameState.selectedPiece === index) {
      return theme.FILTERS.SELECTED
    }
  }

  return <svg style={{ width: "700", height: "700" }} >
      {BOARD_GEOMETRY.map((line, index) => {
        return <CustomLine key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} ></CustomLine>
      })}

      {gameState.board.map((_, index) => {
        const [cx, cy] = PIECES_CORDINATES[index]
        return <Piece key={index} cx={cx} cy={cy} color={getPieceColor(gameState,index)} handleClick={() => updateContext(index)} style={{ filter: handleIlumination(index) }} />
      })}
    </svg>

}

const CustomLine = styled.line`
stroke: ${props => props.theme.COLORS.PRIMARY};
`
export default Board;