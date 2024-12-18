import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components'
import useGame from '../../hooks/useGame'
import Piece from '../Board/Piece'
import DEFAULT_CONFIGURATION from '../../config/default_configuration.json'

const TurnPannel = () => {
  const { ID: player1, COLOR: colorPlayer1 } = DEFAULT_CONFIGURATION.PLAYER1
  const { ID: player2, COLOR: colorPlayer2 } = DEFAULT_CONFIGURATION.PLAYER2

  const { gameState} = useGame()
  const theme = useContext(ThemeContext)

  function handlePlayerIlumination(player) {
    if (gameState.winner===player) return theme.FILTERS.WINNER
    return gameState.turn === player ? theme.FILTERS.SELECTED : theme.FILTERS.DEFAULT
  }

  return <Pannel>
    <CustomSVG >
      <Piece style={{ filter: handlePlayerIlumination(player1) }} cx={80} cy={50} color={colorPlayer1}>
      </Piece>
      <Piece style={{ filter: handlePlayerIlumination(player2) }} cx={270} cy={50} color={colorPlayer2}></Piece>
    </CustomSVG>
  </Pannel>
}

const Pannel = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid ${props => props.theme.COLORS.PRIMARY};  
border-radius: 20px; 
width: 400px;
`;

const CustomSVG = styled.svg`
width: 350px;
height: 100px;
`

export default TurnPannel;