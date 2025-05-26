import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList'
import Syncroom from './pages/Syncroom';
import Community from './pages/Community';
import CommunityWrite from './pages/CommunityWrite';
import CommunityDetail from './pages/CommunityDetail';

function App() {
  return (
    <>
    <Router>
      <Header />
        <Routes>
          <Route path="/team-list" element={<TeamList/>} />
          <Route path="/syncroom" element={<Syncroom/>} />
          <Route path="/performance" element={<TeamList/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/Community/Write" element={<CommunityWrite/>} />
          <Route path="/community/:id" element={<CommunityDetail />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
