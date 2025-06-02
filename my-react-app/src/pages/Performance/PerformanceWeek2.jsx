// src/pages/PerformanceWeek2.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Performance/PerformanceWeek2.css'; 
import PerformanceImg from '../../assets/Performance1.png';

function PerformanceWeek2() {
  const [remainingTeams, setRemainingTeams] = useState(3);

  const handleApplyTeam = () => {
    if (remainingTeams > 0) {
      setRemainingTeams(prev => prev - 1);
    }
  };

  return (
    <div className="performance-week2-container">
      <h2 className="performance-week2-title">6월 2주차 공연</h2>

      <img 
        src={PerformanceImg} 
        alt="6월 2주차 공연 포스터" 
        className="performance-week2-image"
      />

      <div className="performance-info">
        <p><strong>[6월 2주차 공연 팀 모집]</strong></p>
        <p>공연 일시 : 2026년 6월 12일</p>
        <p>장소 : 플렉스라운지 (서울 마포구 양화로 100-10)</p>
        <p>모집 팀 수 : {remainingTeams}팀</p>
      </div>

      <div className="button-group">
        <Link to="/performance" className="secondary-button">
          목록으로
        </Link>
        
        <Link to={remainingTeams > 0 ? "/performance/team-select" : "#"}
          className={`first-button ${remainingTeams === 0 ? 'disabled' : ''}`}
          onClick={remainingTeams > 0 ? handleApplyTeam : undefined}
        >
          지원하기
        </Link>
  
      </div>
    </div>
  );
}

export default PerformanceWeek2;
