import DEFAULT_CONFIGURATION from "../config/default_configuration.json"
import { BOARD_COMBOS, PIECE_MOVEMENTS } from "../utils/constants"

function checkElimination(board, turn, index) {
    // combos for  position:
    const triples = BOARD_COMBOS
    var value = triples[index].some(triple => triple.every(i => board[i] === turn)) ? true : false
    return value
}

function getOppositePlayer(turn) {
    return turn === DEFAULT_CONFIGURATION.PLAYER1["ID"] ? DEFAULT_CONFIGURATION.PLAYER2["ID"] : DEFAULT_CONFIGURATION.PLAYER1["ID"]
}
function checkWinning( context,player){
    return context[player].onGamePieces.length <3 && context[player].playedPieces==9
     
}

// TODO
// chequear movimiento sea valido
// si no valido-> retoranr el mismo estado
// si es valido-> chequar  si hay eliminación y actualizar estados
class Positioning {
    isValidMove(index, board, turn) {
        return board[index] == null
    }
    update(index, context) {
        // click on an ocupped position
        if (!this.isValidMove(index, context.board, context.turn)) {
            console.log("Positioning:invalid move")
            return context
        }
        //update context
        let newContext = { ...context }
        newContext.board[index] = context.turn
        newContext[context.turn].onGamePieces.push(index)
        newContext[context.turn].playedPieces += 1

        //if theres any elimination  change state to Eliminating
        if (checkElimination(newContext.board, newContext.turn, index)) {
            console.log("to eliminate status")
            let newState = new Eliminating()
            newContext[context.turn].state = newState
            return newContext
        }
        else {
            newContext.turn = getOppositePlayer(context.turn)
            newContext[context.turn].state = context[context.turn].playedPieces == 9 ? new Playing() : new Positioning()
            return newContext
        }
    }
}

class Eliminating {
    isValidMove(index, board, turn) {
        return board[index] == getOppositePlayer(turn)
    }
    update(index, context) {
        // click on an invalid position
        if (!this.isValidMove(index, context.board, context.turn)) {
            console.log("Eliminating:invalid move")
            return context
        }
        // clicks on an opponent piece
        else {
            //eliminate that piece and update state to positioning
            let newContext = { ...context }
            newContext.board[index] = null
            newContext[context.turn].state = newContext[context.turn].onGamePieces.length <= 3 && newContext[context.turn].playedPieces==9  ? new Ending():newContext[context.turn].playedPieces==9? new Playing(): new Positioning()
            // updating oponent status
            let newTurn = getOppositePlayer(context.turn)
            newContext[newTurn].onGamePieces = newContext[newTurn].onGamePieces.filter(i => i !== index)
            // checks for winning condition
            if (checkWinning(newContext,newTurn)){
                newContext[newTurn].state = new Loser()
                newContext[context.turn].state = new Winner()
                newContext.turn = null
                newContext.winner=1
                return newContext
            }
            newContext[newTurn].state = newContext[newTurn].onGamePieces.length <= 3 && newContext[newTurn].playedPieces==9  ? new Ending():newContext[newTurn].playedPieces==9? new Playing(): new Positioning()
            newContext.turn = newTurn
            return newContext
        }
    }
    updateState(context,player){
            switch (true) {
                case context[player].onGamePieces.length <= 3 && context[player].playedPieces == 9:
                    return new Ending();
                case context[player].playedPieces == 9:
                    return new Playing();
                default:
                    return new Positioning();
            }
        }
    }

class Playing {
    selected_piece = null
    isValidMove(index, board, turn) {
        if (this.selected_piece === null) {
            return board[index] === turn
        }
        return PIECE_MOVEMENTS[this.selected_piece].includes(index) && board[index] === null
    }

    update(index, context) {
        if (!this.isValidMove(index, context.board, context.turn)) {
            console.log("Playing:invalid move")
            this.selected_piece = null
            return context
        }
        //selecting piece
        if (this.selected_piece === null) {
            this.selected_piece = index
            return context
        }
        // moving piece
        else {
            let newContext = { ...context }
            // updating board and player status
            newContext.board[this.selected_piece] = null
            newContext.board[index] = context.turn
            newContext[context.turn].onGamePieces = newContext[context.turn].onGamePieces.map(i => i === this.selected_piece ? index : i)

            this.selected_piece = null
            // check for elimination
            if (checkElimination(newContext.board, newContext.turn, index)) {
                console.log("to eliminate status")
                let newState = new Eliminating()
                newContext[context.turn].state = newState
            }
            else {
                newContext.turn = getOppositePlayer(context.turn)
            }
            console.log(newContext)
            return newContext
        }
    }
}

class Ending {
    selected_piece = null
    isValidMove(index, board, turn) {
        if (this.selected_piece === null) {
            return board[index] === turn
        }
        return board[index] === null
    }
    update(index, context) {
        if (!this.isValidMove(index, context.board, context.turn)) {
            console.log("Ending:invalid move")
            this.selected_piece = null
            return context
        }
        //selecting piece
        if (this.selected_piece === null) {
            this.selected_piece = index
            return context
        }
        // moving piece
        else {
            let newContext = { ...context }
            // updating board and player status
            newContext.board[this.selected_piece] = null
            newContext.board[index] = context.turn
            newContext[context.turn].onGamePieces = newContext[context.turn].onGamePieces.map(i => i === this.selected_piece ? index : i)

            this.selected_piece = null
            // check for elimination
            if (checkElimination(newContext.board, newContext.turn, index)) {
                console.log("to eliminate status")
                let newState = new Eliminating()
                newContext[context.turn].state = newState
            }
            else {
                newContext.turn = getOppositePlayer(context.turn)
            }
            console.log(newContext)
            return newContext
        }
    }
}

class Winner {
    isValidMove(index, board, turn) {
        return false
    }
    update(index, context) {
        return context
    }
}

class Loser {
    isValidMove(index, board, turn) {
        return false
    }
    update(index, context) {
        return context
    }
}
export { Positioning }
