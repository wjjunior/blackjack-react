import { styled, Container, TextField } from '@mui/material'

export const StyledDiv = styled('div')({
  width: '100vw',
})

export const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '40vw',
})

export const StyledTextField = styled(TextField)({
  width: '100%',
  marginBottom: '16px',
  backgroundColor: 'white',
  '&.MuiInputBase-root.Mui-focused': {
    outline: 'none',
    boxShadow: 'none',
  },
})
