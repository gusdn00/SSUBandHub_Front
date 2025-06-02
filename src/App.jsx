import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import TeamList from './pages/TeamList/TeamList'
import Syncroom from './pages/Syncroom';
import Community from './pages/Community/Community';
import CommunityWrite from './pages/Community/CommunityWrite';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommunityEdit from './pages/Community/CommunityEdit';
import Performance from './pages/performance'
import ApplyPage from './pages/TeamList/ApplyPage';
import CreateTeam from './pages/TeamList/CreateTeam';
import TeamMake from './pages/TeamList/TeamMake';

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
          <Route path="/Community/edit/:id" element={<CommunityEdit />}/>
          <Route path="/team-list/Tid/:id" element={<ApplyPage />} />
          <Route path="/team-list/create" element={<TeamMake />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
