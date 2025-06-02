import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamMake() {
  const [form, setForm] = useState({
    name: '',
    title: '',
    intro: '',
    region: '1'  // 기본값 서울(id=1)
  });

  const [sessions, setSessions] = useState([
    { id: 1, name: '기타' },
    { id: 2, name: '베이스' },
    { id: 3, name: '보컬' },
    { id: 4, name: '드럼' },
    { id: 5, name: '키보드' }
  ]);
  const [selectedSessions, setSelectedSessions] = useState({});

  const [genres, setGenres] = useState([
    { id: 1, name: 'J-POP' },
    { id: 2, name: '국내 인디' },
    { id: 3, name: '록' },
    { id: 4, name: '기타' }
  ]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const regions = [
    { id: 1, name: "서울" },
    { id: 2, name: "경기" },
    { id: 3, name: "인천" },
    { id: 4, name: "대전" },
    { id: 5, name: "부산" },
    { id: 6, name: "울산" },
    { id: 7, name: "대구" },
    { id: 8, name: "광주" },
    { id: 9, name: "강원" },
    { id: 10, name: "충북" },
    { id: 11, name: "충남" },
    { id: 12, name: "전북" },
    { id: 13, name: "전남" },
    { id: 14, name: "경북" },
    { id: 15, name: "경남" },
    { id: 16, name: "제주" }
  ];

  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSession = (id) => {
    if (selectedSessions[id]) {
      const newSessions = { ...selectedSessions };
      delete newSessions[id];
      setSelectedSessions(newSessions);
    } else {
      setSelectedSessions({ ...selectedSessions, [id]: 1 });
    }
  };

  const handleSessionCount = (id, value) => {
    setSelectedSessions({ ...selectedSessions, [id]: parseInt(value) });
  };

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      region: parseInt(form.region), // 문자열 → 숫자 변환
      sessions: Object.entries(selectedSessions).map(([session_id, required]) => ({
        session_id: parseInt(session_id),
        required
      })),
      genres: selectedGenres
    };

    const res = await fetch('http://localhost:3000/team/full', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (res.ok) {
      alert('팀 생성 성공!');
      navigate('/teams');
    } else {
      alert('팀 생성 실패: ' + result.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎸 팀 만들기</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="팀명" onChange={handleInput} required /><br />
        <input name="title" placeholder="타이틀" onChange={handleInput} required /><br />

        {/* 원래 지역 입력란 주석 처리 */}
        {/* <input name="region" placeholder="지역" onChange={handleInput} required /><br /> */}

        {/* 지역 선택 드롭다운 */}
        <label>지역 선택: </label>
        <select name="region" value={form.region} onChange={handleInput}>
          {regions.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <br />

        <textarea name="intro" placeholder="소개글" onChange={handleInput} required /><br /><br />

        <h4>세션</h4>
        {sessions.map(session => (
          <div key={session.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedSessions[session.id] !== undefined}
                onChange={() => toggleSession(session.id)}
              />
              {session.name}
            </label>
            {selectedSessions[session.id] !== undefined && (
              <input
                type="number"
                value={selectedSessions[session.id]}
                onChange={(e) => handleSessionCount(session.id, e.target.value)}
                min="1"
              />
            )}
          </div>
        ))}

        <h4>장르</h4>
        {genres.map(genre => (
          <label key={genre.id} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
            />
            {genre.name}
          </label>
        ))}

        <br /><br />
        <button type="submit">팀 생성</button>
      </form>
    </div>
  );
}

export default TeamMake;
