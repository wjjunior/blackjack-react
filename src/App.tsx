import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { GameProvider } from './context/GameContext.tsx'
import GamePage from './pages/Game/GamePage.tsx'
import StartPage from './pages/Start/StartPage.tsx'

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<StartPage />} />

          <Route path="/game" element={<GamePage />} />
        </Routes>
      </GameProvider>
    </Router>
  )
}

export default App
