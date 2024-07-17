import { useState, createContext } from 'react'
import { styled, ThemeProvider } from 'styled-components'
import theme from './config/styles'
import './App.css'
import { Board, TurnPannel, PieceKeeper } from './components'
import { Positioning } from './logic/states'
import DEFAULT_CONFIGURATION from './config/default_configuration.json'


export const GameContext = createContext(null)
const App = (() => {
  const colorPlayer1 = DEFAULT_CONFIGURATION.PLAYER1.COLOR
  const colorPlayer2 = DEFAULT_CONFIGURATION.PLAYER2.COLOR

  const [gameState, setGameState] = useState({
    "winner": 0,
    "P1": { "state": new Positioning(), "onGamePieces": [], "playedPieces": 0 },
    "P2": { "state": new Positioning(), "onGamePieces": [], "playedPieces": 0 },
    "board": Array(24).fill(null),
    "turn": DEFAULT_CONFIGURATION.PLAYER1["ID"]
  })


  return (
    <ThemeProvider theme={theme}>
      <StyledApp className="App" >
        <GameContext.Provider value={{ gameState, setGameState }} >
          <TurnPannel />
          <CustomContainer>
            <PieceKeeper pieces={9 - gameState.P1.playedPieces} color={colorPlayer1} />
            <Board />
            <PieceKeeper pieces={9 - gameState.P2.playedPieces} color={colorPlayer2} />
          </CustomContainer>
        </GameContext.Provider>
      </StyledApp>
    </ThemeProvider>
  )
})

const StyledApp = styled.div` 
display: flex;  
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
`;
const CustomContainer = styled.div`
display: flex;
flex-direction: row;
`

export default App
