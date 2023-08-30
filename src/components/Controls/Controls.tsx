import { GameStatus } from '../Status/Status.constants'

import { ControlsContainer, ButtonStyled, ButtonDiv } from './Controls.styles'

export type ControlsProps = {
  hitEvent: () => void
  stayEvent: () => void
  status: GameStatus
  resetEvent: () => void
}

const Controls: React.FC<ControlsProps> = ({
  hitEvent,
  stayEvent,
  status,
  resetEvent,
}) => {
  const isGameNew = status === GameStatus.New

  return (
    <ControlsContainer>
      <ButtonStyled onClick={hitEvent} disabled={!isGameNew}>
        <ButtonDiv>Hit</ButtonDiv>
      </ButtonStyled>
      <ButtonStyled onClick={stayEvent} disabled={!isGameNew}>
        <ButtonDiv>Stay</ButtonDiv>
      </ButtonStyled>
      <ButtonStyled onClick={resetEvent} disabled={isGameNew}>
        <ButtonDiv>Reset</ButtonDiv>
      </ButtonStyled>
    </ControlsContainer>
  )
}

export default Controls
