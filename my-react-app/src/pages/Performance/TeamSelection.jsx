import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/Performance/TeamSelection.css';

function TeamSelection() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();  // 공연 ID

  useEffect(() => {
    fetch(`http://localhost:3000/performance/${id}/team-select`, {
      credentials: 'include', // 쿠키 포함
    })
      .then(res => {
        if (!res.ok) throw new Error('팀 정보를 불러오지 못했습니다.');
        return res.json();
      })
      .then(data => setTeams(data))
      .catch(err => alert(err.message));
  }, [id]);

  const handleSelect = (teamId) => setSelectedTeam(teamId);

  const handleSubmit = () => {
    if (!selectedTeam) {
      alert('팀을 선택해주세요.');
      return;
    }
    navigate(`/performance/song-select?team=${selectedTeam}&performance=${id}`);
  };

  return (
    <div className="team-selection-container">
      <h2>팀 선택하기</h2>
      <ul className="team-list">
        {teams.map((team) => (
          <li
            key={team.id}
            className={`team-item ${selectedTeam === team.id ? 'selected' : ''}`}
            onClick={() => handleSelect(team.id)}
          >
            <span className="team-name">{team.name}</span>
          </li>
        ))}
      </ul>
      <button className="primary-button" onClick={handleSubmit}>
        지원하기
      </button>
    </div>
  );
}

export default TeamSelection;
