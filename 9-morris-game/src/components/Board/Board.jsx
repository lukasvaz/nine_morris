import Piece from "./Piece"
import { useContext } from "react"
import { GameContext } from "../../App"
import { BOARD_GEOMETRY, PIECES_CORDINATES } from "../../utils/constants"
import DEFAULT_CONFIGURATION from "../../config/default_configuration.json"
import styled, { ThemeContext } from "styled-components"
import { Eliminating, Playing, Ending, getOppositePlayer } from "../../logic/states"

const Board = () => {
  const { gameState, setGameState } = useContext(GameContext)
  const theme = useContext(ThemeContext)

  function updateContext(index) {
    const newContext = gameState[gameState.turn] ? gameState[gameState.turn].state.update(index, gameState) : gameState
    setGameState({ ...newContext })
  }
  function handleIlumination(index) {
    if (gameState.winner !== 0) {
      return theme.FILTERS.DEFAULT
    }
    if (gameState[gameState.turn].state instanceof Eliminating) {
      return gameState[getOppositePlayer(gameState.turn)].onGamePieces.includes(index) ? theme.FILTERS.ELIMINATE : theme.FILTERS.DEFAULT
    }
    if (gameState[gameState.turn].state.selected_piece === index) {
      return theme.FILTERS.SELECTED
    }
  }

  return <>
    <svg style={{ width: "700", height: "700" }} >
      {BOARD_GEOMETRY.map((line, index) => {
        return <CustomLine key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} ></CustomLine>
      })}

      {gameState.board.map((_, index) => {
        const [cx, cy] = PIECES_CORDINATES[index]
        const color = gameState.board[index] === DEFAULT_CONFIGURATION.PLAYER1.ID ? DEFAULT_CONFIGURATION.PLAYER1.COLOR
          : gameState.board[index] === DEFAULT_CONFIGURATION.PLAYER2.ID ? DEFAULT_CONFIGURATION.PLAYER2.COLOR : "transparent"
        return <Piece key={index} cx={cx} cy={cy} color={color} handleClick={() => updateContext(index)} style={{ filter: handleIlumination(index) }} />
      })}
    </svg>
  </>
}

const CustomLine = styled.line`
stroke: ${props => props.theme.COLORS.PRIMARY};
`


export default Board;