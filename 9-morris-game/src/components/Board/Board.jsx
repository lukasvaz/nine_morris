import Piece from "./Piece"
import { useContext } from "react"
import { GameContext } from "../../App"
import { BOARD_GEOMETRY, PIECES_CORDINATES } from "../../utils/constants"

const Board = ({ color }) => {
  const { gameState, } = useContext(GameContext)
  return <>
    <svg style={{width:"700" ,height:"700"}} >
      {BOARD_GEOMETRY.map((line, index) => {
        return <line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={color}></line>
      })}

      {gameState.board.map((_, index) => {
        const [cx, cy] = PIECES_CORDINATES[index]
        return <Piece key={index} cx={cx} cy={cy} index={index} >
        </Piece>
      })}
    </svg>
  </>
}
export default Board;