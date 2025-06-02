import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header'
import Syncroom from './pages/Syncroom';
import Community from './pages/Community/Community';
import CommunityWrite from './pages/Community/CommunityWrite';
import CommunityDetail from './pages/Community/CommunityDetail';
import CommunityEdit from './pages/Community/CommunityEdit';
// import ApplyPage from './pages/TeamList/ApplyPage';
// import CreateTeam from './pages/TeamList/CreateTeam';




import './App.css';
import TeamList from './pages/TeamList';
import TeamMake from './pages/TeamMake';
// import Register from './Register'
// import Login from './Login'
import TeamDetail from './pages/TeamDetail';
import PerformanceList from "./pages/PerformanceList";
import PerformanceDetail from "./pages/PerformanceDetail";

function App() {
  return (
    <>
    <Router>
      <Header /> 
        <Routes>
          <Route path="/team-list" element={<TeamList/>} />
          <Route path="/syncroom" element={<Syncroom/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/Community/Write" element={<CommunityWrite/>} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/Community/edit/:id" element={<CommunityEdit />}/>
          <Route path="/team-list/create" element={<TeamMake />} />
          <Route path="/performance" element={<PerformanceList />} />
          <Route path="/performance/:id" element={<PerformanceDetail />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
