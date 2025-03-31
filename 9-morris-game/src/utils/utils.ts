import {DEFAULT_CONFIGURATION} from '../config/default_configuration'
import {GameState,Configuration, PlayerType} from '../types/types'

const config: Configuration = DEFAULT_CONFIGURATION;

function getPieceColor(gameState: GameState, index: number) {
     return gameState.board[index] === config.PLAYER1.ID ? config.PLAYER1.COLOR
          : gameState.board[index] === config.PLAYER2.ID ? config.PLAYER2.COLOR : "transparent"
}

function getOppositePlayer(turn:PlayerType) {
     return turn === config.PLAYER1["ID"] ? config.PLAYER2["ID"] : config.PLAYER1["ID"]
 }
export {getPieceColor,getOppositePlayer}