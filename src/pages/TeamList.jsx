// src/TeamList.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  console.log(loggedInUser);

  useEffect(() => {
    fetch('http://localhost:3000/teams')
      .then(res => res.json())
      .then(data => {setTeams(data)
        console.log('응답 객체:', data)
      })
      .catch(err => {
        console.error(err);
        setError('팀 목록을 불러오는 데 실패했습니다.');
      });
  }, []);

  const handleTeamMakeClick = (e) => {
    if (!loggedInUser || !loggedInUser.uuid) {
      e.preventDefault(); // 기본 이동 막기
      alert('로그인 후 이용해주세요.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎸 팀 목록</h2>
      <Link to="/teams/team_make" onClick={handleTeamMakeClick}>
        <button>➕ 팀 만들기</button>
      </Link>
      <br /><br />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {teams.length === 0 ? (
        <p>등록된 팀이 없습니다.</p>
      ) : (
        <ul>
          {teams.map(team => (
            <li key={team.id}>
              <strong>
                <Link to={`/teams/${team.id}`}>{team.name}</Link>
              </strong>{" "}
              - {team.title}
              <p>{team.intro}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeamList;