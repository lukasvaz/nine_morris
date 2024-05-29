import Piece from "./Piece"
import DEFAULT_CONFIGURATION from '../../../config/default_configuration.json'
import { useContext } from "react"
import { GameContext } from "../Game"

const Board = ({ color, updateBoard }) => {
  
  const gameContext=useContext(GameContext)  
  const pieces_cordinates = [[50, 50], [350, 50], [650, 50], [150, 150], [350, 150],
    [550, 150], [250, 250], [350, 250], [450, 250], [50, 350], [150, 350], [250, 350],
    [450, 350], [550, 350], [650, 350], [250, 450], [350, 450], [450, 450], [150, 550],
    [350, 550], [550, 550], [50, 650], [350, 650], [650, 650]]
  
    return <>
    <svg width="700" height="700">
      {/*Geometry of the board*/}
      <line x1={50} y1={50} x2={650} y2={50} stroke={color}></line>
      <line x1={650} y1={50} x2={650} y2={650} stroke={color}></line>
      <line x1={650} y1={650} x2={50} y2={650} stroke={color}></line>
      <line x1={50} y1={650} x2={50} y2={50} stroke={color}></line>
  
      <line x1={350} y1={50} x2={350} y2={250} stroke={color}></line>
      <line x1={50} y1={350} x2={250} y2={350} stroke={color}></line>
      <line x1={350} y1={650} x2={350} y2={450} stroke={color}></line>
      <line x1={650} y1={350} x2={450} y2={350} stroke={color}></line>
  
      <line x1={150} y1={150} x2={550} y2={150} stroke={color}></line>
      <line x1={550} y1={150} x2={550} y2={550} stroke={color}></line>
      <line x1={550} y1={550} x2={150} y2={550} stroke={color}></line>
      <line x1={150} y1={550} x2={150} y2={150} stroke={color}></line>
  
      <line x1={250} y1={250} x2={450} y2={250} stroke={color}></line>
      <line x1={450} y1={250} x2={450} y2={450} stroke={color}></line>
      <line x1={450} y1={450} x2={250} y2={450} stroke={color}></line>
      <line x1={250} y1={450} x2={250} y2={250} stroke={color}></line>
  
      {gameContext.board.map((player, index) => {
          const color = player === DEFAULT_CONFIGURATION.PLAYER1["ID"] ? DEFAULT_CONFIGURATION.PLAYER1["COLOR"]
          : player === DEFAULT_CONFIGURATION.PLAYER2["ID"] ? DEFAULT_CONFIGURATION.PLAYER2["COLOR"]
          : "transparent"
          const [cx, cy] = pieces_cordinates[index]
          return <Piece key={index} cx={cx} cy={cy} color={color} handleClick={() => updateBoard(index)}>
        </Piece>
      })}
      </svg>
    </>
  }
  export default Board;