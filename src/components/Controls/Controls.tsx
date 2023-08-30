import { CountdownButton } from '../CountdownButton/CountdownButton'
import { GameStatus } from '../Status/Status.constants'
import WoodButton from '../WoodButton/WoodButton'

import { ControlsContainer } from './Controls.styles'

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
      <WoodButton onClick={hitEvent} isDisabled={!isGameNew} label="Hit" />
      <WoodButton onClick={stayEvent} isDisabled={!isGameNew} label="Stay" />
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
