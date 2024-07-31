import { styled, ThemeProvider } from 'styled-components'
import theme from './config/styles'
import './App.css'
import { Board, TurnPannel, PieceKeeper } from './components'
import useGame from './hooks/useGame'
import DEFAULT_CONFIGURATION from './config/default_configuration.json'

const App = (() => {
  const colorPlayer1 = DEFAULT_CONFIGURATION.PLAYER1.COLOR
  const colorPlayer2 = DEFAULT_CONFIGURATION.PLAYER2.COLOR

  const {gameState, _} =useGame()
  return (
    <ThemeProvider theme={theme}>
      <StyledApp className="App" >
          <TurnPannel />
          <CustomContainer>
            <PieceKeeper pieces={9 - gameState.P1.playedPieces} color={colorPlayer1} />
            <Board />
            <PieceKeeper pieces={9 - gameState.P2.playedPieces} color={colorPlayer2} />
          </CustomContainer>
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
