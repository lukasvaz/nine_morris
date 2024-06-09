import DEFAULT_CONFIGURATION from "../config/default_configuration.json"
import { BOARD_COMBOS } from "../utils/constants"

function checkElimination(board, turn, index) {
    // combos for  position:
    const triples = BOARD_COMBOS
    var value = triples[index].some(triple => triple.every(i => board[i] === turn)) ? true : false
    return value
}

function getOppositePlayer(turn) {
    return turn === DEFAULT_CONFIGURATION.PLAYER1["ID"] ? DEFAULT_CONFIGURATION.PLAYER2["ID"] : DEFAULT_CONFIGURATION.PLAYER1["ID"]
}

// TODO
// chequear movimiento sea valido
// si no valido-> retoranr el mismo estado
// si es valido-> chequar  si hay eliminación y actualizar estados


class Positioning {
    isValidMove(index, board, turn) {
        return board[index] == null
    }
    update(index, board, turn) {

        // click on an ocupped position
        if (!this.isValidMove(index, board, turn)) {
            console.log("invalid move")
            return [board, turn, this]
        }

        // click on a free position
        else {
            //update board
            let newBoard = [...board]
            newBoard[index] = turn
            //if theres any elination  change state to Eliminating
            if (checkElimination(newBoard, turn, index)) {
                console.log("to eliminate status")
                let newTurn = turn
                let newState = new Eliminating()
                return [newBoard, newTurn, newState]
            }
            else {
                let newTurn = getOppositePlayer(turn)
                return [newBoard, newTurn, this]
            }
        }
    }
}

class Eliminating {
    isValidMove(index, board, turn) {
        console.log(board[index] == getOppositePlayer(turn))
        return board[index] == getOppositePlayer(turn)

    }
    update(index, board, turn) {
        // click on an invalid position
        if (!this.isValidMove(index, board, turn)) {
            console.log("invalid move")
            return [board, turn, this]

        }

        // clicks on an opponent piece
        else {
            //eliminate that piece and update state to positioning
            let newBoard = [...board]
            newBoard[index] = null
            let newTurn = getOppositePlayer(turn)
            let newState = new Positioning()
            console.log("to positioning status")
            return [newBoard, newTurn, newState]
        }

    }
}

export { Positioning }
