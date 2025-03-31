export type PlayerState = "Positioning" | "Playing" | "Eliminating"|"Ending";
export type PlayerType = "P1" | "P2";

export interface Player {
    state: PlayerState;
    onGamePieces: number[];
    playedPieces: number;
}

export interface GameState {
    winner: PlayerType | null;
    P1: Player;
    P2: Player;
    board: (PlayerType | null)[];
    turn: PlayerType;
    selectedPiece: number | null;
}

export interface Configuration {
    PLAYER1: { ID: PlayerType, COLOR: string };
    PLAYER2: { ID: PlayerType, COLOR: string };
}


// theme 
export type ThemeType = "light"|"dark";

// constants types
