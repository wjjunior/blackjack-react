import { Card, styled, Typography } from '@mui/material'

import BgImage from '../../assets/img/deck-bg.png'

import { CardSuit } from './Card.constants'

export const StyledCard = styled(Card)<{
  suit?: keyof typeof CardSuit
  hiddencard?: string
}>(({ theme, suit, hiddencard }) => ({
  width: 120,
  height: 260,
  margin: 10,
  padding: '0.5em 1.5em',
  backgroundImage: hiddencard ? `url(${BgImage})` : undefined,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  borderRadius: 15,
  boxShadow: '0px 1px 10px black',
  color: suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black',
  [theme.breakpoints.down('md')]: {
    width: 70,
    height: 180,
  },
  [theme.breakpoints.down('sm')]: {
    width: 45,
    height: 100,
    padding: '5px 10px',
  },
}))

export const StyledValue = styled(Typography)(({ theme }) => ({
  fontSize: '400%',
  margin: 0,
  [theme.breakpoints.down('md')]: {
    fontSize: '300%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '150%',
  },
}))

export const StyledSuit = styled(Typography)(({ theme }) => ({
  fontSize: '600%',
  margin: 0,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '500%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '250%',
  },
}))
