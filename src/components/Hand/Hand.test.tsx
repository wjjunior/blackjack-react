import { render } from '@testing-library/react'
import { ComponentProps } from 'react'

import Hand from './Hand'

describe('Hand component', () => {
  it('should render the title correctly', () => {
    const title = "Dealer's Hand"
    const { getByText } = getRenderer({ title })

    const titleElement = getByText(title)

    expect(titleElement).toBeInTheDocument()
  })

  it('should render cards with correct values and suits', () => {
    const { getAllByText } = getRenderer({})

    const cardValueElements = getAllByText(/A|10|K/)
    const cardSuitElements = getAllByText(/♥|♦|♠/)

    expect(cardValueElements.length).toBe(3)
    expect(cardSuitElements.length).toBe(3)
  })

  it('should render hidden card when showHiddenCard prop is true', () => {
    const { getByTestId } = getRenderer({ showHiddenCard: true })

    const hiddenCard = getByTestId('hidden-card')

    expect(hiddenCard).toBeInTheDocument()
  })
})

const getRenderer = ({
  title = "Player's Hand",
  cards = [
    { value: 'A', suit: 'hearts' },
    { value: '10', suit: 'diamonds' },
    { value: 'K', suit: 'spades' },
  ],
  showHiddenCard = false,
}: Partial<ComponentProps<typeof Hand>>) => {
  return render(<Hand title={title} cards={cards} showHiddenCard={showHiddenCard} />)
}
