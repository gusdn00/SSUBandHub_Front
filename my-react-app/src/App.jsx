import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList'
import Syncroom from './pages/Syncroom';

function App() {
  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path="/team-list" element={<TeamList/>} />
          <Route path="/syncroom" element={<Syncroom/>} />
          <Route path="/performance" element={<TeamList/>} />
          <Route path="/community" element={<Syncroom/>} />
        </Routes>
    </Router>
    </>
  )
}

export default App
