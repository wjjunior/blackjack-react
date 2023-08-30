import { MouseEventHandler, forwardRef } from 'react'

import { ButtonStyled, ButtonDiv } from './WoodButton.styles'

export type WoodButtonProps = {
  label: string
  isDisabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const WoodButton = forwardRef<HTMLButtonElement | null, WoodButtonProps>(
  (props, ref) => {
    const { label, isDisabled, onClick, ...rest } = props
    return (
      <ButtonStyled
        {...rest}
        ref={ref}
        disabled={isDisabled}
        onClick={isDisabled ? undefined : onClick}
      >
        <ButtonDiv>{label}</ButtonDiv>
      </ButtonStyled>
    )
  },
)

export default WoodButton
