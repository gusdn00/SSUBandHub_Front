import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList'
import Syncroom from './pages/Syncroom';
import Community from './pages/Community';
import CommunityWrite from './pages/CommunityWrite';
import CommunityDetail from './pages/CommunityDetail';

import Performance from './pages/Performance';
import PerformanceWeek2 from './pages/PerformanceWeek2';
import TeamSelection from './pages/TeamSelection';
import SongSelection from './pages/SongSelection';

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
          <Route path="/Community/Write" element={<CommunityWrite/>} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/performance/week2" element={<PerformanceWeek2 />} />
          <Route path="/performance/team-select" element={<TeamSelection />} />
          <Route path="/performance/song-select" element={<SongSelection />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
