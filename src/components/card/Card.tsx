import { CardSuit } from './Card.constants'
import { StyledCard, StyledValue, StyledSuit } from './Card.styles'

export type CardProps = {
  value?: string
  suit?: string
  showHiddenCard?: boolean
}

const Card: React.FC<CardProps> = ({ value, suit, showHiddenCard = false }) => {
  return (
    <>
      {showHiddenCard ? (
        <StyledCard
          hiddencard={showHiddenCard.toString()}
          data-testid="hidden-card"
        ></StyledCard>
      ) : (
        <StyledCard suit={suit as keyof typeof CardSuit}>
          <div>
            <StyledValue>{value}</StyledValue>
            <StyledSuit>{CardSuit[suit as keyof typeof CardSuit]}</StyledSuit>
          </div>
        </StyledCard>
      )}
    </>
  )
}

export default Card
