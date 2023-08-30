import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import jsonData from '../../assets/deck.json'
import Controls from '../../components/Controls/Controls'
import Hand from '../../components/Hand/Hand'
import Status from '../../components/Status/Status'
import { GameStatus } from '../../components/Status/Status.constants'
import { useGameContext } from '../../hooks/useGameContext'

import { StyledGrid } from './GamePage.styles'

type DeckCard = {
  value: string
  suit: string
}

type GameCards = {
  userCards: DeckCard[]
  dealerCards: DeckCard[]
}

const GamePage: React.FC = () => {
  const { name, delay } = useGameContext()
  const data = JSON.parse(JSON.stringify(jsonData.cards))
  const [deck, setDeck] = useState<DeckCard[]>(data)
  const navigate = useNavigate()

  const drawCards = (amount = 1): DeckCard[] => {
    const cards: DeckCard[] = []
    const selectedIndices: number[] = []
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length)
      cards.push(deck[randomIndex])
      selectedIndices.push(randomIndex)
    }
    setDeck(prevDeck => {
      const updatedDeck = prevDeck.filter((_, index) => !selectedIndices.includes(index))
      return updatedDeck
    })
    return cards
  }

  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.New)

  const [gameCards, setGameCards] = useState<GameCards>(() => {
    return {
      userCards: drawCards(2),
      dealerCards: drawCards(1),
    }
  })

  const [gameScore, setGameScore] = useState({
    userScore: 0,
    dealerScore: 0,
  })

  const [showHiddenCard, setShowHiddenCard] = useState(true)

  const getCardValue = (cardValue: string, total: number, acesCount: number): number => {
    if (cardValue === 'A') {
      return total + 11 > 21 || acesCount === 1 ? 1 : 11
    }
    return ['K', 'Q', 'J'].includes(cardValue) ? 10 : Number(cardValue)
  }

  const calculate = useCallback((cards: DeckCard[], acesCount: number): number => {
    return cards.reduce(
      (total, card) => total + getCardValue(card.value, total, acesCount),
      0,
    )
  }, [])

  const updateGameStatus = useCallback(
    ({
      userScore,
      dealerScore,
      dealerCards,
    }: {
      userScore: number
      dealerScore: number
      dealerCards: number
    }) => {
      if (userScore === 21) {
        setGameStatus(GameStatus.Win)
      } else if (userScore > 21) {
        setGameStatus(GameStatus.Bust)
      } else if (dealerCards >= 2) {
        if (userScore > dealerScore || dealerScore > 21) {
          setGameStatus(GameStatus.Win)
        } else if (dealerScore > userScore) {
          setGameStatus(GameStatus.Lose)
        } else {
          setGameStatus(GameStatus.Tie)
        }
      }
    },
    [setGameStatus],
  )

  useEffect(() => {
    const userAcesCount = gameCards.userCards.filter(card => card.value === 'A').length
    const dealerAcesCount = gameCards.dealerCards.filter(
      card => card.value === 'A',
    ).length

    const newUserScore = calculate(gameCards.userCards, userAcesCount)
    const newDealerScore = calculate(gameCards.dealerCards, dealerAcesCount)

    updateGameStatus({
      userScore: newUserScore,
      dealerScore: newDealerScore,
      dealerCards: gameCards.dealerCards.length,
    })

    setGameScore({
      userScore: newUserScore,
      dealerScore: newDealerScore,
    })
  }, [calculate, gameCards, updateGameStatus])

  useEffect(() => {
    if (!name || !delay) {
      navigate('/')
    }
  }, [name, delay, navigate])

  const resetGame = () => {
    setDeck(data)
    setGameCards({
      userCards: drawCards(2),
      dealerCards: drawCards(1),
    })

    setGameStatus(GameStatus.New)
    setShowHiddenCard(true)
  }

  const hit = () => {
    const card = drawCards()
    setGameCards(prevGameCards => ({
      ...prevGameCards,
      userCards: [...prevGameCards.userCards, ...card],
    }))
  }

  const stay = () => {
    const newDealerCards = [...gameCards.dealerCards]
    let dealerTotal = gameScore.dealerScore

    while (dealerTotal < 17) {
      const card = drawCards()[0]
      dealerTotal += getCardValue(card.value, dealerTotal, 0)
      newDealerCards.push(card)
    }

    setGameCards(prevGameCards => ({
      ...prevGameCards,
      dealerCards: newDealerCards,
    }))

    setShowHiddenCard(false)
  }

  return (
    <StyledGrid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Status status={gameStatus} />
        <Controls
          hitEvent={hit}
          stayEvent={stay}
          status={gameStatus}
          resetEvent={resetGame}
        />
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs="auto">
            <Hand
              title={`Dealer's Hand (${gameScore.dealerScore})`}
              cards={gameCards.dealerCards}
              showHiddenCard={showHiddenCard}
            />
          </Grid>
          <Grid item xs="auto">
            <Hand
              title={`${name} (${gameScore.userScore})`}
              cards={gameCards.userCards}
            />
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}

export default GamePage
