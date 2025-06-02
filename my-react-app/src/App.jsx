import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList/TeamList'
import Syncroom from './styles/Syncroom/Syncroom';
import Community from './pages/Community/Community';
import CommunityWrite from './pages/Community/CommunityWrite';
import CommunityDetail from './pages/Community/CommunityDetail';

import ApplyPage from './pages/TeamList/ApplyPage';
import CreateTeam from './pages/TeamList/CreateTeam';
import TeamMake from './pages/TeamList/TeamMake';
import Login from './pages/Login/Login';
import Register from './pages/Login/SignUp';

import Performance from './pages/Performance/Performance';
import PerformanceWeek2 from './pages/Performance/PerformanceWeek2';
import TeamSelection from './pages/Performance/TeamSelection';
import SongSelection from './pages/Performance/SongSelection';

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
          <Route path="/team-list/Tid/:id" element={<ApplyPage />} />
          <Route path="/team-list/create" element={<TeamMake />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/performance/week2" element={<PerformanceWeek2 />} />
          <Route path="/performance/team-select" element={<TeamSelection />} />
          <Route path="/performance/song-select" element={<SongSelection />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
