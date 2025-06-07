import { useState } from "react";
import { useLocation } from "react-router-dom";
import '../../styles/Performance/SongSelection.css';

function SongSelection() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({ title: "", artist: "" });

  const searchParams = new URLSearchParams(useLocation().search);
  const teamId = searchParams.get('team');
  const performanceId = searchParams.get('performance');
  console.log(teamId, performanceId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong(prev => ({ ...prev, [name]: value }));
  };

  const addSong = () => {
    if (newSong.title.trim() && newSong.artist.trim() && songs.length < 4) {
      setSongs(prev => [...prev, newSong]);
      setNewSong({ title: "", artist: "" });
    }
  };

  const deleteSong = (index) => {
    setSongs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!teamId || !performanceId) {
      alert("팀 또는 공연 정보가 올바르지 않습니다.");
      return;
    }
    console.log("지원곡 목록:", songs);

    try {
      const res = await fetch(`http://localhost:3000/performance/song-select?team_id=${teamId}&performance_id=${performanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ songs })
      });

      if (!res.ok) throw new Error('지원곡 제출에 실패했습니다.');
      alert("지원곡이 제출되었습니다!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h1 className="performance-title">공연 곡</h1>
      <div className="song-selection-wrapper">
        <div className="song-card input-card">
          <h2>노래 선택</h2>
          <div className="input-group">
            <input
              type="text"
              name="title"
              placeholder="곡 명"
              value={newSong.title}
              onChange={handleInputChange}
              disabled={songs.length >= 4}
            />
            <input
              type="text"
              name="artist"
              placeholder="가수 명"
              value={newSong.artist}
              onChange={handleInputChange}
              disabled={songs.length >= 4}
            />
            <button onClick={addSong} disabled={songs.length >= 4}>+ 추가</button>
          </div>
          <p className="limit-text">* 최대 4곡까지 추가할 수 있습니다.</p>
        </div>
        <div className="song-card list-card">
          <h2>노래 목록</h2>
          <ul className="song-list">
            {songs.map((song, index) => (
              <li key={index}>
                {song.title} - {song.artist}
                <button className="delete-button" onClick={() => deleteSong(index)}>삭제</button>
              </li>
            ))}
          </ul>
          <button className="submit-button" onClick={handleSubmit} disabled={songs.length === 0}>
            지원하기
          </button>
        </div>
      </div>
    </>
  );
}

export default SongSelection;
