import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/App.css'

// Placeholder for migrated components
const PlaceholderHome = () => (
  <div className="react-home">
    <h1>Taiga React Migration</h1>
    <p>This is the React version of Taiga frontend. Components will be migrated here gradually.</p>
  </div>
)

const App: React.FC = () => {
  return (
    <Router>
      <div className="react-app">
        <Routes>
          <Route path="/react" element={<PlaceholderHome />} />
          {/* Additional routes will be added during migration */}
        </Routes>
      </div>
    </Router>
  )
}

export default App