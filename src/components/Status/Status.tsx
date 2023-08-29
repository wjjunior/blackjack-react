import { GameStatus, statusMessage } from './Status.constants'
import { StatusContainer, StatusBox, ValueTypography } from './Status.styles'

export type StatusProps = {
  status: GameStatus
}

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <StatusContainer>
      <StatusBox>
        <ValueTypography variant="h4">{statusMessage[status]}</ValueTypography>
      </StatusBox>
    </StatusContainer>
  )
}

export default Status
