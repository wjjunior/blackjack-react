import { render, fireEvent } from '@testing-library/react'
import { ComponentProps } from 'react'
import { vi } from 'vitest'

import WoodButton from './WoodButton'

describe('WoodButton component', () => {
  it('should render correctly with label', () => {
    const label = 'Test label'
    const { getByRole } = getRenderer({ label })
    const button = getByRole('button', { name: label })
    expect(button).toBeInTheDocument()
  })

  it('should be disabled when isDisabled is true', () => {
    const { getByRole } = getRenderer({ isDisabled: true })
    const button = getByRole('button', { name: 'Click me' })
    expect(button).toBeDisabled()
  })

  it('should not call onClick when isDisabled is true', () => {
    const onClickMock = vi.fn()
    const { getByRole } = getRenderer({ isDisabled: true, onClick: onClickMock })
    const button = getByRole('button', { name: 'Click me' })
    fireEvent.click(button)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should call onClick when clicked and not disabled', () => {
    const onClickMock = vi.fn()
    const { getByRole } = getRenderer({ onClick: onClickMock })
    const button = getByRole('button', { name: 'Click me' })
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalled()
  })
})

function getRenderer({
  label = 'Click me',
  isDisabled = false,
  onClick = vi.fn(),
}: Partial<ComponentProps<typeof WoodButton>> = {}) {
  return render(<WoodButton label={label} onClick={onClick} isDisabled={isDisabled} />)
}
