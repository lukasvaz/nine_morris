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
function checkWinning(context, player) {
    return context[player].onGamePieces.length < 3 && context[player].playedPieces == 9

}

class Positioning {
    isValidMove(index, board, turn) {
        return board[index] == null
    }
    update(index, context) {
        // click on an ocupped position
        if (!this.isValidMove(index, context.board, context.turn)) {
            return context
        }
        //update context
        let newContext = { ...context }
        newContext.board[index] = context.turn
        newContext[context.turn].onGamePieces.push(index)
        newContext[context.turn].playedPieces += 1

        //if theres any elimination  change state to Eliminating
        if (checkElimination(newContext.board, newContext.turn, index)) {
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
            return context
        }
        // clicks on an opponent piece
        else {
            //eliminate  piece and update state
            let newContext = { ...context }
            let newTurn = getOppositePlayer(context.turn)
            this.eliminatePiece(index, newContext, newTurn)
            // checks for winning condition
            if (checkWinning(newContext, newTurn)) {
                newContext[newTurn].state = new Loser()
                newContext[context.turn].state = new Winner()
                newContext.turn = null
                newContext.winner = 1
                return newContext
            }
            // updates states and turn
            newContext[context.turn].state = this.updateState(context, context.turn)
            newContext[newTurn].state = this.updateState(newContext, newTurn)
            newContext.turn = newTurn
            return newContext
        }

    }
    updateState(context, player) {
        switch (true) {
            case context[player].onGamePieces.length <= 3 && context[player].playedPieces == 9:
                return new Ending();
            case context[player].playedPieces == 9:
                return new Playing();
            default:
                return new Positioning();
        }
    }
    eliminatePiece(index, context, player) {
        context.board[index] = null
        context[player].onGamePieces = context[player].onGamePieces.filter(i => i !== index)
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
            this.selected_piece = null
            return context
        }
        //selecting piece
        if (this.selected_piece === null) {
            this.selected_piece = index
            return context
        }
        // moving piece
        let newContext = { ...context }
        this.movePiece(index, newContext)
        
        // check for elimination
        if (checkElimination(newContext.board, newContext.turn, index)) {
            let newState = new Eliminating()
            newContext[context.turn].state = newState
            return newContext
        }
        // setting next turn 
        newContext.turn = getOppositePlayer(context.turn)
        return newContext
    }
    movePiece(index, context) {
        context.board[this.selected_piece] = null
        context.board[index] = context.turn
        context[context.turn].onGamePieces = context[context.turn].onGamePieces.map(i => i === this.selected_piece ? index : i)
        this.selected_piece = null
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
            this.selected_piece = null
            return context
        }
        //selecting piece
        if (this.selected_piece === null) {
            this.selected_piece = index
            return context
        }
        // moving piece
        let newContext = { ...context }
        this.movePiece(index, newContext)
        // check for elimination
        if (checkElimination(newContext.board, newContext.turn, index)) {
            let newState = new Eliminating()
            newContext[context.turn].state = newState
            return newContext
        }
        // setting next turn
        newContext.turn = getOppositePlayer(context.turn)
        return newContext
    }

    movePiece(index, context) {
        context.board[this.selected_piece] = null
        context.board[index] = context.turn
        context[context.turn].onGamePieces = context[context.turn].onGamePieces.map(i => i === this.selected_piece ? index : i)
        this.selected_piece = null
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
