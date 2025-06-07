// src/pages/PerformanceWeek2.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../styles/Performance/PerformanceWeek2.css';
import PerformanceImg from '../../assets/Performance1.png';

function PerformanceWeek2() {
  const [remainingTeams, setRemainingTeams] = useState(3);
  const [performance, setPerformance] = useState();  // setPerformances → setPerformance로 변수명 통일
  const [loading, setLoading] = useState(true);      // loading 초기값 true로 수정
  const { id } = useParams();
  const navigate = useNavigate();                     // useNavigate 훅 선언

  const handleApplyTeam = () => {
    if (remainingTeams > 0) {
      // 실제 지원 로직은 백엔드 연동 예정
      navigate(`/performance/${id}/team-select`);     // navigate 함수로 경로 이동
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/performance/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('공연 정보를 불러오지 못했습니다.');
        return res.json();
      })
      .then(data => {
        setPerformance(data);
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>공연 정보를 불러오는 중...</div>;
  }

  if (!performance) {
    return <div>공연 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="performance-week2-container">
      <h2 className="performance-week2-title">{performance.name}</h2>

      <img 
        src={PerformanceImg} 
        alt={`${performance.name} 포스터`} 
        className="performance-week2-image"
      />

      <div className="performance-info">
        <p><strong>[{performance.name} 팀 모집]</strong></p>
        <p>공연 일시 : {new Date(performance.showtime).toLocaleDateString()}</p>
        <p>장소 : {performance.showplace}</p>
        <p>소개 : {performance.intro}</p>
        <p>모집 팀 수 : {remainingTeams}팀</p>
        <p>신청 기간 : {performance.start_date} ~ {performance.end_date}</p>
        <p>모집 상태 : {performance.finished ? '마감' : '모집 중'}</p>
      </div>

      <div className="button-group">
        <Link to="/performance" className="secondary-button">
          목록으로
        </Link>
        
        <button
          className={`first-button${remainingTeams === 0 ? ' disabled' : ''}`}
          onClick={remainingTeams > 0 ? handleApplyTeam : undefined}
          disabled={remainingTeams === 0}
        >
          지원하기
        </button>
      </div>
    </div>
  );
}

export default PerformanceWeek2;
