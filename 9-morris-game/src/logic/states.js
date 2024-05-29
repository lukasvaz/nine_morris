import DEFAULT_CONFIGURATION from "../config/default_configuration.json"

function checkElimination(board, turn, index) {
    // combos for  position:
    const triples = [[[0, 1, 2], [0, 9, 21]],      // 0
    [[0, 1, 2], [1, 4, 7]],      // 1
    [[0, 1, 2], [2, 14, 23]],    // 2
    [[3, 4, 5], [3, 10, 18]],    // 3
    [[3, 4, 5], [1, 4, 7]],      // 4
    [[3, 4, 5], [5, 13, 20]],    // 5
    [[6, 7, 8], [6, 11, 15]],    // 6
    [[6, 7, 8], [1, 4, 7]],      // 7 
    [[6, 7, 8], [8, 12, 17]],    // 8
    [[9, 10, 11], [0, 9, 21]],   // 9
    [[9, 10, 11], [3, 10, 18]],  // 10
    [[9, 10, 11], [11, 15, 6]],  // 11
    [[12, 13, 14], [8, 12, 17]], // 12
    [[12, 13, 14], [5, 13, 20]], // 13
    [[12, 13, 14], [2, 14, 23]], // 14
    [[15, 16, 17], [6, 11, 15]], // 15
    [[15, 16, 17], [16, 19, 22]],// 16
    [[15, 16, 17], [2, 14, 23]], // 17
    [[18, 19, 20], [3, 10, 18]], // 18
    [[18, 19, 20], [16, 19, 22]],// 19
    [[18, 19, 20], [5, 13, 20]], // 20
    [[21, 22, 23], [0, 9, 21]],  // 21
    [[21, 22, 23], [16, 19, 22]],// 22
    [[21, 22, 23], [2, 14, 23]]  // 23
    ]
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
