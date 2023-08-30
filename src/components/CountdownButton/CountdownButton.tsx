import { useEffect, useState } from 'react'

import { ButtonStyled, ButtonDiv } from './CountdownButton.styles'

type CountdownButtonProps = {
  buttonLabel: string
  maxTime: number
  onClick: () => void
  startTime: number
  isDisabled?: boolean
}

export const CountdownButton = ({
  buttonLabel,
  startTime,
  maxTime,
  onClick,
  isDisabled,
}: CountdownButtonProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(maxTime)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false)

  useEffect(() => {
    if (startTime && maxTime > 0) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
      const newRemainingTime = maxTime - elapsedTime
      setRemainingTime(Math.max(newRemainingTime, 0))

      if (newRemainingTime > 0) {
        setIsTimerActive(true)
        const timer = setInterval(() => {
          setRemainingTime(prevTime => {
            if (prevTime === 1) {
              setIsTimerActive(false)
              clearInterval(timer)
            }
            return prevTime - 1
          })
        }, 1000)
        return () => clearInterval(timer)
      } else {
        setIsTimerActive(false)
      }
    }
  }, [startTime, maxTime])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(
      2,
      '0',
    )}`
  }

  return (
    <ButtonStyled onClick={onClick} disabled={isTimerActive || isDisabled}>
      <ButtonDiv>
        {isTimerActive && maxTime > 0 ? formatTime(remainingTime) : buttonLabel}
      </ButtonDiv>
    </ButtonStyled>
  )
}
