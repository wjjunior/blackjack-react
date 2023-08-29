import Card, { CardProps } from '../Card/Card'

import { StyledCardContainer, StyledHandContainer, StyledTitle } from './Hand.styles'

export type HandProps = {
  title: string
  cards: CardProps[]
  showHiddenCard?: boolean
}

const Hand: React.FC<HandProps> = ({ title, cards, showHiddenCard = false }) => {
  return (
    <StyledHandContainer>
      <StyledTitle variant="h4">{title}</StyledTitle>
      <StyledCardContainer>
        {showHiddenCard && <Card showHiddenCard={showHiddenCard} />}
        {cards.map((card: CardProps, index: number) => (
          <Card key={index} value={card.value} suit={card.suit} />
        ))}
      </StyledCardContainer>
    </StyledHandContainer>
  )
}

export default Hand
