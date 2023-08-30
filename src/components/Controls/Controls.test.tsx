import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'

import { GameStatus } from '../Status/Status.constants'

import Controls, { ControlsProps } from './Controls'

describe('Controls component', () => {
  it('should render buttons with correct labels', () => {
    const { getByText } = getRenderer({})

    const hitButton = getByText('Hit')
    const stayButton = getByText('Stay')
    const resetButton = getByText('Reset')

    expect(hitButton).toBeDefined()
    expect(stayButton).toBeDefined()
    expect(resetButton).toBeDefined()
  })

  it('should disable buttons when status is not "New"', () => {
    const { getByRole } = getRenderer({ status: GameStatus.Win })

    const hitButton = getByRole('button', { name: 'Hit' }) as HTMLButtonElement
    const stayButton = getByRole('button', { name: 'Stay' }) as HTMLButtonElement
    const resetButton = getByRole('button', { name: 'Reset' }) as HTMLButtonElement

    expect(hitButton.disabled).toBeTruthy()
    expect(stayButton.disabled).toBeTruthy()
    expect(resetButton.disabled).toBeFalsy()
  })

  it('should call event handlers when buttons are clicked', () => {
    const hitEvent = vi.fn()
    const stayEvent = vi.fn()

    const { getByRole } = getRenderer({
      hitEvent,
      stayEvent,
    })

    const hitButton = getByRole('button', { name: 'Hit' }) as HTMLButtonElement
    const stayButton = getByRole('button', { name: 'Stay' }) as HTMLButtonElement

    fireEvent.click(hitButton)
    fireEvent.click(stayButton)

    expect(hitEvent).toHaveBeenCalled()
    expect(stayEvent).toHaveBeenCalled()
  })

  it('should call event handlers when reset button is clicked', () => {
    const resetEvent = vi.fn()

    const { getByRole } = getRenderer({
      status: GameStatus.Win,
      resetEvent,
    })

    const resetButton = getByRole('button', { name: 'Reset' }) as HTMLButtonElement

    fireEvent.click(resetButton)

    expect(resetEvent).toHaveBeenCalled()
  })
})

const getRenderer = ({
  hitEvent = vi.fn(),
  stayEvent = vi.fn(),
  resetEvent = vi.fn(),
  status = GameStatus.New,
  countdownMaxTime = 0,
  countdownStartTime = 0,
}: Partial<ControlsProps>) => {
  return render(
    <Controls
      hitEvent={hitEvent}
      stayEvent={stayEvent}
      status={status}
      resetEvent={resetEvent}
      countdownMaxTime={countdownMaxTime}
      countdownStartTime={countdownStartTime}
    />,
  )
}
