import { styled, Box, Typography } from '@mui/material'

export const StyledHandContainer = styled(Box)({
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '0.5em',
  padding: '0.5em',
  border: '5px solid white',
})

export const StyledCardContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
})

export const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '150%',
  },
}))
