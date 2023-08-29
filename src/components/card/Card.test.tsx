import { render } from '@testing-library/react'

import Card, { CardProps } from './Card'

describe('Card component', () => {
  it('renders with correct value and suit', () => {
    const { getByText } = getRenderer({ suit: 'spades', value: '5' })

    const valueElement = getByText('5')
    const suitElement = getByText('♠')

    expect(valueElement).toBeInTheDocument()
    expect(suitElement).toBeInTheDocument()
  })

  it('renders with correct styles for different suits', () => {
    const { container } = getRenderer({ suit: 'hearts', value: '10' })

    const cardElement = container.firstChild as HTMLElement

    expect(cardElement).toHaveStyle('color: rgb(255, 0, 0)')
  })
})

const getRenderer = ({ suit = 'hearts', value = '10' }: CardProps) =>
  render(<Card value={value} suit={suit} />)
