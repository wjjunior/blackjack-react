import { Typography, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useGameContext } from '../../hooks/useGameContext'

import { StyledDiv, StyledContainer, StyledTextField } from './StartPage.styles'

const StartPage: React.FC = () => {
  const { name, setName, delay, setDelay } = useGameContext()
  const navigate = useNavigate()

  const startGame = () => {
    navigate('/game')
  }

  const isFormValid = name.trim() !== '' && delay.trim() !== ''

  return (
    <StyledDiv>
      <StyledContainer>
        <Typography variant="h4" gutterBottom>
          Blackjack
        </Typography>
        <StyledTextField
          label="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="filled"
        />
        <StyledTextField
          type="number"
          label="Enter the delay value"
          value={delay}
          onChange={e => setDelay(e.target.value)}
          variant="filled"
        />
        <Button variant="contained" onClick={startGame} disabled={!isFormValid}>
          Start Game
        </Button>
      </StyledContainer>
    </StyledDiv>
  )
}

export default StartPage
