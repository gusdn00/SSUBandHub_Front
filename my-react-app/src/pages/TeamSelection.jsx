import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeamSelection.css';

const teams = [
  { id: 'teamA', name: '팀 A', members: 3 },
  { id: 'teamB', name: '팀 B', members: 2 },
  { id: 'teamC', name: '팀 C', members: 4 },
  { id: 'teamD', name: '팀 D', members: 1 },
  // 필요에 따라 더 추가 가능
];

function TeamSelection() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (teamId) => {
    setSelectedTeam(teamId);
  };

  const handleSubmit = () => {
    if (!selectedTeam) {
      alert('팀을 선택해주세요.');
      return;
    }
    navigate(`/performance/song-select?team=${selectedTeam}`);
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
            <span className="team-members">({team.members}명)</span>
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
