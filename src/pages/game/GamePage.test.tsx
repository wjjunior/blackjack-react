import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { GameContext } from '../../context/GameContext'

import GamePage from './GamePage'

describe('GamePage component', () => {
  it('should calculate user scores after a hit correctly', () => {
    const { getByText, getByRole } = getRenderer()

    const userScoreBefore = getByText(/John \((\d+)\)/)
    const userScoreBeforeValue = Number(userScoreBefore.textContent?.match(/(\d+)/)?.[0])

    const hitButton = getByRole('button', { name: 'Hit' })
    fireEvent.click(hitButton)

    const userScoreAfter = getByText(/John \((\d+)\)/)

    const userScoreAfterValue = Number(userScoreAfter.textContent?.match(/(\d+)/)?.[0])
    expect(userScoreAfterValue).toBeGreaterThan(userScoreBeforeValue)
  })

  it('should calculate dealer scores after a stay correctly', () => {
    const { getByText, getByRole } = getRenderer()

    const dealerScoreBefore = getByText(/Dealer's Hand \((\d+)\)/)
    const dealerScoreBeforeValue = Number(
      dealerScoreBefore.textContent?.match(/(\d+)/)?.[0],
    )

    const stayButton = getByRole('button', { name: 'Stay' })
    fireEvent.click(stayButton)

    const dealerScoreAfter = getByText(/Dealer's Hand \((\d+)\)/)
    const dealerScoreAfterValue = Number(
      dealerScoreAfter.textContent?.match(/(\d+)/)?.[0],
    )
    expect(dealerScoreAfterValue).toBeGreaterThan(dealerScoreBeforeValue)
  })
})

const getRenderer = (
  contextValues = { name: 'John', delay: '120', setName: vi.fn(), setDelay: vi.fn() },
) =>
  render(
    <MemoryRouter>
      <GameContext.Provider value={contextValues}>
        <GamePage />
      </GameContext.Provider>
    </MemoryRouter>,
  )
