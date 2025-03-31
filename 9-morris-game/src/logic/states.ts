import { BOARD_COMBOS, PIECE_MOVEMENTS } from "../utils/constants"
import { getOppositePlayer } from "../utils/utils"
import { GameState, PlayerState, PlayerType } from "../types/types"

function checkElimination(board: GameState['board'], turn: GameState["turn"], index:number) {
    const triples = BOARD_COMBOS
    var value = triples[index].some(triple => triple.every(i => board[i] === turn)) ? true : false
    return value
}

function checkTrappedPosition(context:GameState, player:PlayerType) {
    if (context[player].playedPieces == 9) {
        return context[player].onGamePieces.every(piece => PIECE_MOVEMENTS[piece].every(i => context.board[i] !== null))
    }

}
function checkTwoPiecesRemaining(context:GameState , player:PlayerType) {
    return context[player].onGamePieces.length < 3 && context[player].playedPieces == 9 || checkTrappedPosition(context, player)
}

function setWinner(context:GameState, player: PlayerType) {
    context.winner = player
    return context
}

class Positioning {
    isValidMove(index:number, board:GameState['board']) {
        return board[index] == null
    }
    update(index:number, context:GameState) {
        // click on an ocupped position
        if (!this.isValidMove(index, context.board)) {
            return context
        }
        //update context
        let newContext = { ...context }
        this.setPiece(index, newContext)
        //if theres any elimination  change state to Eliminating
            if (checkElimination(newContext.board, newContext.turn, index)) {
                let newState = "Eliminating" as PlayerState
                newContext[context.turn].state = newState
                return newContext
            }
            newContext.turn = getOppositePlayer(context.turn)
            // checks for trapped state
            if (context[context.turn].playedPieces == 9) {
                if (checkTrappedPosition(newContext, getOppositePlayer(context.turn))) {
                    return setWinner(newContext, context.turn)
                }
                newContext[context.turn].state = "Playing";
                return newContext
            }
            newContext[context.turn].state ="Positioning"
        return newContext
    }
    setPiece(index:number, context:GameState) {
        context.board[index] = context.turn
        if (context.turn !== null) {
        context[context.turn].onGamePieces.push(index)
        context[context.turn].playedPieces += 1
    }
}
}

class Eliminating {
    isValidMove(index:number, board:GameState['board'],turn:PlayerType) {
        return board[index] == getOppositePlayer(turn)
    }
    update(index:number, context:GameState) {
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
            if (checkTwoPiecesRemaining(newContext, newTurn) || checkTrappedPosition(newContext, newTurn)) {
                return setWinner(newContext, context.turn)
            }
            // updates states and turn
            newContext[context.turn].state = this.updateState(context, context.turn)
            newContext[newTurn].state = this.updateState(newContext, newTurn)
            newContext.turn = newTurn
            return newContext
        }

    }
    updateState(context:GameState, player:PlayerType) {
        switch (true) {
            case context[player].onGamePieces.length <= 3 && context[player].playedPieces == 9:
                return "Ending";
            case context[player].playedPieces == 9:
                return "Playing";
            default:
                return "Positioning";
        }
    }
    eliminatePiece(index:number, context:GameState, player:PlayerType) {
        context.board[index] = null
        context[player].onGamePieces = context[player].onGamePieces.filter(i => i !== index)
    }
}

class Playing {
    isValidMove(index:number, board:GameState['board'], turn:PlayerType,selectedPiece:GameState['selectedPiece']) {
        if (selectedPiece === null) {
            return board[index] === turn
        }
        return PIECE_MOVEMENTS[selectedPiece].includes(index) && board[index] === null
    }

    update(index:number, context:GameState) {
        if (!this.isValidMove(index, context.board, context.turn,context.selectedPiece)) {
            context.selectedPiece = null
            return context
        }
        //selecting piece
        if (context.selectedPiece === null) {
            context.selectedPiece = index
            return context
        }
        // moving piece
        let newContext = { ...context }
        this.movePiece(index, newContext)

        // checks  for trapped condition
        if (checkTrappedPosition(newContext, getOppositePlayer(context.turn))) {
            return setWinner(newContext, context.turn)
        }
        // check for elimination
        if (checkElimination(newContext.board, newContext.turn, index)) {
            let newState = "Eliminating" as PlayerState
            newContext[context.turn].state = newState
            return newContext
        }
        // setting next turn 
        newContext.turn = getOppositePlayer(context.turn)
        return newContext
    }
    movePiece(index:number, context:GameState) {
        if (context.selectedPiece !== null) {
            context.board[context.selectedPiece] = null
        }
        context.board[index] = context.turn
        context[context.turn].onGamePieces = context[context.turn].onGamePieces.map(i => i === context.selectedPiece ? index : i)
        context.selectedPiece = null
    }
}

class Ending {
    
    isValidMove(index:number, board:GameState['board'], turn:PlayerType,selectedPiece:GameState['selectedPiece']) {
        if (selectedPiece === null) {
            return board[index] === turn
        }
        return board[index] === null
    }
    update(index:number, context:GameState) {
        if (!this.isValidMove(index, context.board, context.turn,context.selectedPiece)) {
            context.selectedPiece = null
            return context
        }
        //selecting piece
        if (context.selectedPiece === null) {
            context.selectedPiece = index
            return context
        }
        // moving piece
        let newContext = { ...context }
        this.movePiece(index, newContext)
        // check for elimination
        if (checkElimination(newContext.board, newContext.turn, index)) {
            let newState = "Eliminating" as PlayerState
            newContext[context.turn].state = newState
            return newContext
        }
        // setting next turn
        newContext.turn = getOppositePlayer(context.turn)
        return newContext
    }

    movePiece(index:number, context:GameState) {
        if (context.selectedPiece !== null) {
        context.board[context.selectedPiece] = null
        }
        context.board[index] = context.turn
        context[context.turn].onGamePieces = context[context.turn].onGamePieces.map(i => i === context.selectedPiece ? index : i)
        context.selectedPiece = null
    }
}

// class Winner {
//     isValidMove(index, board, turn) {
//         return false
//     }
//     update(index, context) {
//         return context
//     }
// }

// class Loser {
//     isValidMove(index, board, turn) {
//         return false
//     }
//     update(index, context) {
//         return context
//     }
// }
export { Positioning, Eliminating, Playing, Ending, getOppositePlayer }
