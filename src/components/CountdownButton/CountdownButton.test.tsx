import { act, fireEvent, render } from '@testing-library/react'
import { ComponentProps } from 'react'
import { vi } from 'vitest'

import { CountdownButton } from './CountdownButton'

describe('CountdownButton component', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.clearAllTimers()
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should display the remaining time', async () => {
    const maxTime = 60
    const { getByText } = getRenderer({ maxTime })

    expect(getByText('01:00')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(getByText('00:59')).toBeInTheDocument()
  })

  it('should render the button label', () => {
    const buttonLabel = 'Test button label'
    const { getByRole } = getRenderer({ buttonLabel, maxTime: 0 })
    const button = getByRole('button')
    expect(button).toHaveTextContent(buttonLabel)
  })

  it('should render timer when active', () => {
    const { getByRole } = getRenderer({ maxTime: 10 })
    const button = getByRole('button')
    expect(button).toHaveTextContent('00:10')
  })

  it('should call onClick when button is clicked', () => {
    const onClickMock = vi.fn()
    const { getByRole } = getRenderer({
      onClick: onClickMock,
      maxTime: 0,
      isDisabled: false,
    })
    const button = getByRole('button')
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should disable button when timer is active', () => {
    const { getByRole } = getRenderer({ maxTime: 10 })
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should disable button when explicitly disabled', () => {
    const { getByRole } = getRenderer({ isDisabled: true })
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should be able to call onClick after timer completes', () => {
    const onClickMock = vi.fn()
    const { getByRole } = getRenderer({ maxTime: 3, onClick: onClickMock })
    const button = getByRole('button')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should render the button label after timer completes', () => {
    const buttonLabel = 'Test button label'
    const { getByRole } = getRenderer({ maxTime: 3, buttonLabel })
    const button = getByRole('button')

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(button).toHaveTextContent(buttonLabel)
  })
})

function getRenderer({
  buttonLabel = 'Reset',
  maxTime = 60,
  startTime = Date.now(),
  onClick = vi.fn(),
  isDisabled = false,
}: Partial<ComponentProps<typeof CountdownButton>> = {}) {
  return render(
    <CountdownButton
      maxTime={maxTime}
      buttonLabel={buttonLabel}
      startTime={startTime}
      onClick={onClick}
      isDisabled={isDisabled}
    />,
  )
}
