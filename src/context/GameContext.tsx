import React, { createContext, useState, ReactNode } from 'react'

type GameContextType = {
  name: string
  setName: (name: string) => void
  delay: string
  setDelay: (delay: string) => void
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>('')
  const [delay, setDelay] = useState<string>('')

  const value: GameContextType = {
    name,
    setName,
    delay,
    setDelay,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
