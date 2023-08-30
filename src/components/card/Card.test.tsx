import { render } from '@testing-library/react'
import { ComponentProps } from 'react'

import Card from './Card'

describe('Card component', () => {
  it('should render with correct value and suit', () => {
    const { getByText } = getRenderer({ suit: 'spades', value: '5' })

    const valueElement = getByText('5')
    const suitElement = getByText('♠')

    expect(valueElement).toBeInTheDocument()
    expect(suitElement).toBeInTheDocument()
  })

  it('should render with correct styles for different suits', () => {
    const { container } = getRenderer({ suit: 'hearts', value: '10' })

    const cardElement = container.firstChild as HTMLElement

    expect(cardElement).toHaveStyle('color: rgb(255, 0, 0)')
  })

  it('should render hidden card when showHiddenCard prop is true', () => {
    const { getByTestId } = getRenderer({ showHiddenCard: true })

    const hiddenCard = getByTestId('hidden-card')

    expect(hiddenCard).toBeInTheDocument()
  })
})

const getRenderer = ({
  suit = 'hearts',
  value = '10',
  showHiddenCard = false,
}: Partial<ComponentProps<typeof Card>>) =>
  render(<Card value={value} suit={suit} showHiddenCard={showHiddenCard} />)
