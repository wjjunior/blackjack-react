import { styled, Paper, Typography } from '@mui/material'

export const StatusContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

export const StatusBox = styled(Paper)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0.5em',
  padding: '1em',
  background: 'black',
  boxShadow: '0px 1px 10px',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}))

export const BalanceBox = styled(StatusBox)(({ theme }) => ({
  margin: '0.5em 0.5em 0.5em 1em',
  width: '30%',
  [theme.breakpoints.down('md')]: {
    width: '25%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '20%',
  },
}))

export const ValueTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '150%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '115%',
  },
}))
