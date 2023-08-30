import { CountdownButton } from '../CountdownButton/CountdownButton'
import { GameStatus } from '../Status/Status.constants'

import { ControlsContainer, ButtonStyled, ButtonDiv } from './Controls.styles'

export type ControlsProps = {
  hitEvent: () => void
  stayEvent: () => void
  status: GameStatus
  resetEvent: () => void
  countdownMaxTime: number
  countdownStartTime: number
}

const Controls: React.FC<ControlsProps> = ({
  hitEvent,
  stayEvent,
  status,
  resetEvent,
  countdownMaxTime,
  countdownStartTime,
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
      <CountdownButton
        onClick={resetEvent}
        buttonLabel="Reset"
        maxTime={countdownMaxTime}
        startTime={countdownStartTime}
        isDisabled={isGameNew}
      />
    </ControlsContainer>
  )
}

export default Controls
