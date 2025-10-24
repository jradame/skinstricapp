import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import all your page components
import Hero from './pages/Hero'
import Introduce from './pages/Introduce'
import Result from './pages/Result'
import Select from './pages/Select'
import Analysis from './pages/Analysis'
import Demographics from './pages/Demographics'
// Add other imports as needed

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main flow routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/result" element={<Result />} />
          <Route path="/select" element={<Select />} />
          <Route path="/analysis" element={<Analysis />} />
          
          {/* Summary and detail routes */}
          <Route path="/demographics" element={<Demographics />} />
          <Route path="/summary" element={<Demographics />} />
          
          {/* Add other routes as you create them */}
          {/* <Route path="/cosmetic" element={<Cosmetic />} /> */}
          {/* <Route path="/skintype" element={<SkinType />} /> */}
          {/* <Route path="/weather" element={<Weather />} /> */}
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Hero />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

















