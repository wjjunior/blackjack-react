export enum GameStatus {
  Bust = 'BUST',
  Lose = 'LOSE',
  New = 'NEW',
  Tie = 'TIE',
  Win = 'WIN',
}

export const statusMessage: Record<GameStatus, string> = {
  [GameStatus.Bust]: 'Bust!',
  [GameStatus.New]: 'Hit or Stand?',
  [GameStatus.Win]: 'You Win!',
  [GameStatus.Lose]: 'You lose!',
  [GameStatus.Tie]: 'Tie!',
}
