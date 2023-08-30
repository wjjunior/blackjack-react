import { render } from '@testing-library/react'
import { ComponentProps } from 'react'

import Status from './Status'
import { GameStatus, statusMessage } from './Status.constants'

describe('Status component', () => {
  it('should render the correct status message for Bust status', () => {
    const { getByText } = getRenderer({ status: GameStatus.Bust })

    const bustMessage = getByText(statusMessage[GameStatus.Bust])

    expect(bustMessage).toBeInTheDocument()
  })

  it('should render the correct status message for New status', () => {
    const { getByText } = getRenderer({ status: GameStatus.New })

    const newMessage = getByText(statusMessage[GameStatus.New])

    expect(newMessage).toBeInTheDocument()
  })

  it('should render the correct status message for Win status', () => {
    const { getByText } = getRenderer({ status: GameStatus.Win })

    const winMessage = getByText(statusMessage[GameStatus.Win])

    expect(winMessage).toBeInTheDocument()
  })

  it('should render the correct status message for Lose status', () => {
    const { getByText } = getRenderer({ status: GameStatus.Lose })

    const loseMessage = getByText(statusMessage[GameStatus.Lose])

    expect(loseMessage).toBeInTheDocument()
  })

  it('should render the correct status message for Tie status', () => {
    const { getByText } = getRenderer({ status: GameStatus.Tie })

    const tieMessage = getByText(statusMessage[GameStatus.Tie])

    expect(tieMessage).toBeInTheDocument()
  })
})

const getRenderer = ({
  status = GameStatus.New,
}: Partial<ComponentProps<typeof Status>>) => {
  return render(<Status status={status} />)
}
