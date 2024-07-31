import DEFAULT_CONFIGURATION from '../config/default_configuration.json'

function getPieceColor(gameState,index){
     return gameState.board[index] === DEFAULT_CONFIGURATION.PLAYER1.ID ? DEFAULT_CONFIGURATION.PLAYER1.COLOR
          : gameState.board[index] === DEFAULT_CONFIGURATION.PLAYER2.ID ? DEFAULT_CONFIGURATION.PLAYER2.COLOR : "transparent"
}

function getOppositePlayer(turn) {
     return turn === DEFAULT_CONFIGURATION.PLAYER1["ID"] ? DEFAULT_CONFIGURATION.PLAYER2["ID"] : DEFAULT_CONFIGURATION.PLAYER1["ID"]
 }
export {getPieceColor,getOppositePlayer}