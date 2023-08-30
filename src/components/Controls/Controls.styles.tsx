import { styled, Button } from '@mui/material'

import WoodBackground from '../../assets/img/wood-bg.jpeg'

export const ControlsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  margin: '0.5em 1em 1em 1em',
})

export const ButtonStyled = styled(Button)(({ disabled }) => ({
  border: 'none',
  boxShadow:
    'inset 0px 0px 0px 1px rgba(0,0,0,0.2), inset 0px -5px 0px 0px rgba(0,0,0,0.3), inset 0px 2px 0px 0px rgba(255,255,255,0.5)',
  WebkitBorderRadius: '5px',
  MozBorderRadius: '5px',
  borderRadius: '5px',
  overflow: 'hidden',
  cursor: 'pointer',
  margin: 5,
  background: `url(${WoodBackground})`,
  opacity: disabled ? 0.5 : 1,

  '&:active': {
    boxShadow:
      'inset 0px 0px 0px 1px rgba(0,0,0,0.2), inset 0px -2px 0px 0px rgba(0,0,0,0.3), inset 0px 2px 0px 0px rgba(255,255,255,0.5)',
    top: '3px',
  },
}))

export const ButtonDiv = styled('div')({
  padding: '10px 20px 12px 20px',
  color: 'rgba(0,0,0,0.7)',
  textShadow: '1px 1px 0px rgba(255,255,255,0.4)',

  '&:active': {
    paddingBottom: '9px',
  },
})
