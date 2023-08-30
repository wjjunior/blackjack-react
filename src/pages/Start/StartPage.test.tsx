import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

import { GameContext } from '../../context/GameContext'

import StartPage from './StartPage'

describe('StartPage component', () => {
  it('should enable the Start Game button when form is valid', () => {
    const { getByText, getByLabelText } = getRenderer()

    const nameInput = getByLabelText('Enter your name')
    const delayInput = getByLabelText('Enter the delay value')
    const startButton = getByText('Start Game')

    fireEvent.change(nameInput, { target: { value: 'John' } })
    fireEvent.change(delayInput, { target: { value: '120' } })

    expect(startButton).toBeEnabled()
  })

  it('should disable the Start Game button when form is invalid', () => {
    const contextValues = { name: '', delay: '', setName: vi.fn(), setDelay: vi.fn() }
    const { getByText } = getRenderer(contextValues)

    const startButton = getByText('Start Game')

    expect(startButton).toBeDisabled()
  })

  it('should call startGame function when Start Game button is clicked', () => {
    const { getByText } = getRenderer()

    const startButton = getByText('Start Game')
    fireEvent.click(startButton)

    expect(window.location.pathname).toEqual('/game')
  })
})

const getRenderer = (
  contextValues = { name: 'John', delay: '120', setName: vi.fn(), setDelay: vi.fn() },
) =>
  render(
    <MemoryRouter>
      <GameContext.Provider value={contextValues}>
        <StartPage />
      </GameContext.Provider>
    </MemoryRouter>,
  )
