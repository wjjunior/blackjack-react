import { fireEvent, render } from '@testing-library/react'

import GamePage from './GamePage'

describe('GamePage component', () => {
  it('should calculate user scores after a hit correctly', () => {
    const { getByText, getByRole } = getRenderer()

    const userScoreBefore = getByText(/Your Hand \((\d+)\)/)
    const userScoreBeforeValue = Number(userScoreBefore.textContent?.match(/(\d+)/)?.[0])

    const hitButton = getByRole('button', { name: 'Hit' })
    fireEvent.click(hitButton)

    const userScoreAfter = getByText(/Your Hand \((\d+)\)/)

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

  it('should handle a reset event correctly', () => {
    const { getByText } = getRenderer()

    const statusMessage = getByText('Hit or Stay?')

    const stayButton = getByText('Stay')
    fireEvent.click(stayButton)

    expect(statusMessage.textContent).toMatch(/(Bust!|You Win!|You lose!|Tie!)/)

    const resetButton = getByText('Reset')
    fireEvent.click(resetButton)

    expect(statusMessage.textContent).toMatch(/Hit or Stay?/)
  })
})

const getRenderer = () => render(<GamePage />)
