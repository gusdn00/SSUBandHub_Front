import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList/TeamList'
import Syncroom from './pages/Syncroom/Syncroom';
import Community from './pages/Community/Community';
import CommunityWrite from './pages/Community/CommunityWrite';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommunityEdit from './pages/Community/CommunityEdit';

import ApplyPage from './pages/TeamList/ApplyPage';
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
          <Route path="/community/edit/:id" element={<CommunityEdit />} />

          <Route path="/team-list/Tid/:teamId" element={<ApplyPage />} />
          <Route path="/team-list/create" element={<TeamMake />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          
          <Route path="/performance/:id" element={<PerformanceWeek2 />} />
          <Route path="/performance/:id/team-select" element={<TeamSelection />} />
          <Route path="/performance/song-select" element={<SongSelection />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
