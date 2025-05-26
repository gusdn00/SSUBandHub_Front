import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList/TeamList'
import Syncroom from './pages/Syncroom'
import Performance from './pages/performance'
import Community from './pages/community'

function App() {
  return (
    <>
    <Router>
      <Header /> 
        <Routes>
          <Route path="/team-list" element={<TeamList/>} />
          <Route path="/syncroom" element={<Syncroom/>} />
          <Route path="/performance" element={<Performance/>} />
          <Route path="/community" element={<Community/>} />
        </Routes>
    </Router>
    </>
  )
}

export default App
