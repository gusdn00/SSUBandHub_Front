import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

function PerformanceDetail() {
  const { id: performanceId } = useParams();
  const [performance, setPerformance] = useState(null);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [songs, setSongs] = useState([{ title: "", singer: "" }]);

  // ✅ localStorage에서 사용자 정보 한번만 파싱
  const loggedInUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);

  // 공연 상세 정보 조회
  useEffect(() => {
    fetch(`http://localhost:3000/performance/${performanceId}`)
      .then(res => res.json())
      .then(data => setPerformance(data))
      .catch(err => {
        console.error(err);
        setError("공연 정보를 불러오지 못했습니다.");
      });
  }, [performanceId]);

  // ✅ 사용자 UUID로 팀 목록 조회 - 최초 1회만 실행
  useEffect(() => {
    if (!loggedInUser?.uuid) return;
    fetch(`http://localhost:3000/teams?leaderId=${loggedInUser.uuid}`)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error(err));
  }, []); // ✅ 빈 배열로 설정

  const handleApplyPerformance = async () => {
    if (!selectedTeamId) {
      alert("팀을 선택해주세요.");
      return;
    }

    const validSongs = songs.filter(s => s.title.trim() && s.singer.trim());
    if (validSongs.length === 0) {
      alert("최소 한 곡 이상 등록해주세요.");
      return;
    }

    const res = await fetch(`http://localhost:3000/performance/${performanceId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teamId: selectedTeamId,
        userId: loggedInUser.uuid,
        songs: validSongs
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("공연 지원이 완료되었습니다.");
    } else {
      alert("지원 실패: " + result.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!performance) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{performance.name}</h2>
      <p><strong>소개:</strong> {performance.intro}</p>
      <p><strong>일시:</strong> {performance.showtime}</p>
      <p><strong>장소:</strong> {performance.showplace}</p>
      <p><strong>필요 인원:</strong> {performance.required}명</p>
      <p><strong>현재 인원:</strong> {performance.current}명</p>
      <p><strong>모집 상태:</strong> {performance.finished ? "모집 완료" : "모집 중"}</p>
      <p><strong>모집 기간:</strong> {performance.start_date} ~ {performance.end_date}</p>

      <hr style={{ margin: "30px 0" }} />

      <h3>🎤 공연 지원하기 (팀장만 가능)</h3>
      <label>내 팀 선택:</label>
      <select
        value={selectedTeamId}
        onChange={e => setSelectedTeamId(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        <option value="">-- 팀 선택 --</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>
            {team.name} - {team.title}
          </option>
        ))}
      </select>

      <h4>곡 목록</h4>
      {songs.map((song, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="곡 제목"
            value={song.title}
            onChange={e => {
              const updated = [...songs];
              updated[idx].title = e.target.value;
              setSongs(updated);
            }}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="가수"
            value={song.singer}
            onChange={e => {
              const updated = [...songs];
              updated[idx].singer = e.target.value;
              setSongs(updated);
            }}
          />
        </div>
      ))}
      <button onClick={() => setSongs([...songs, { title: "", singer: "" }])}>곡 추가</button>

      <br /><br />
      <button onClick={handleApplyPerformance}>공연 지원하기</button>
    </div>
  );
}

export default PerformanceDetail;