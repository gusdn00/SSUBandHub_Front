import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function TeamDetail() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");
  const [selfIntro, setSelfIntro] = useState("");  // 지원 자기소개
  const [applied, setApplied] = useState(false);   // 지원 여부
  const [sessionId, setSessionId] = useState(""); // ✅ 추가
  const [applicants, setApplicants] = useState([]); // 지원자 목록
  const navigate = useNavigate(); 

  function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const token = getCookie("token");
const payload = parseJwt(token);
console.log("현재 token :", payload)
const uuid = payload?.id;  // 실제 JWT 구조에 따라 수정


  // const loggedInUser = JSON.parse(localStorage.getItem("token"));
  // //const loggedInUser = userrrr; 디버깅용으로 만들어둠둠

  // 팀 정보 불러오기
  console.log(teamId)
  useEffect(() => {
    axios.get(`http://localhost:3000/team/${teamId}`)
      .then(res => {setTeam(res.data); console.log("팀 정보", res.data)})
      .catch(err => {
        console.error(err);
        setError("팀 정보를 불러오는 데 실패했습니다.");
      });
  }, [teamId]);

  const isLeader = team?.joinTeams?.some(j => j.user_id === uuid && j.role === "leader") === true;

  // 지원자 목록 불러오기 (팀장일 경우만)
  useEffect(() => {
    if (isLeader) {
      fetch(`http://localhost:3000/${teamId}/applicants`)
        .then(res => res.json())
        .then(data => {setApplicants(data); console.log("지원자 목록",data) })
        .catch(err => console.error("지원자 목록 안불러와짐 : ",err));
    }
  }, [team, teamId, uuid]);
  
  // 팀 지원 기능
  const handleApply = async () => {
    if (!selfIntro.trim()) {
      alert("자기소개를 입력해주세요.");
      return;
    }

    if (!sessionId) {
    alert("지원 세션을 선택해주세요.");
    return;
    }

    const res = await fetch(`http://localhost:3000/team/${teamId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user_id: uuid,
        self_intro: selfIntro,
        session_id: sessionId
      })
    });


    const result = await res.json();
    if (res.ok) {
      alert("지원 완료");
      setApplied(true);
    } else {
      alert("지원 실패: " + result.message);
    }
  };

  //팀원 수락기능

    const handleAccept = async (userId, sessionId) => {
    const confirm = window.confirm("해당 사용자를 팀원으로 수락하시겠습니까?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/${teamId}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        session_id: sessionId,
        leader_id: uuid
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("수락 완료!");
      setApplicants(prev => prev.filter(app => app.user_id !== userId)); // 수락된 지원자 제거
    } else {
      alert("수락 실패: " + result.message);
    }
  };

  //팀원 거절기능

  const handleReject = async (userId) => {
    const confirm = window.confirm("해당 지원자를 거절하시겠습니까?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/${teamId}/reject`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        leader_id: uuid
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("거절 처리 완료");
      setApplicants(prev => prev.filter(app => app.user_id !== userId));
    } else {
      alert("거절 실패: " + result.message);
    }
  };


  // 팀 삭제 기능
  const handleDelete = async () => {
    if (!window.confirm("정말 이 팀을 삭제하시겠습니까?")) return;

    const res = await fetch(`http://localhost:3000/team/${team.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: uuid })
    });

    const result = await res.json();
    if (res.ok) {
      alert("팀이 삭제되었습니다.");
      navigate("/teams");
    } else {
      alert("삭제 실패: " + result.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!team) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>팀 상세 정보</h2>
      <p><strong>팀명:</strong> {team.name}</p>
      <p><strong>타이틀:</strong> {team.title}</p>
      <p><strong>지역:</strong> {team.teamRegions?.[0]?.Region?.name || '미정'}</p>
      <p><strong>소개:</strong> {team.intro}</p>

      <h3>세션</h3>
      <ul>
        {team.teamSessions?.map((s, idx) => (
          <li key={idx}>
            {s.Session?.name} - {s.required}명 모집 / 현재 {s.current}명 참여 중 
            {s.finished ? " (모집완료)" : " (모집중)"}
          </li>
        ))}
      </ul>

      <h3>장르</h3>
      <ul>
        {team.teamGenres?.map((g, idx) => (
          <li key={idx}>{g.Genre?.name}</li>
        ))}
      </ul>

      {/* 팀장일 경우: 삭제 버튼 & 지원자 목록 */}
      {isLeader && (
        <>
          <button onClick={handleDelete} style={{ color: "red" }}>팀 삭제</button>

          <h3 style={{ marginTop: "30px" }}>지원자 목록</h3>
          <ul>
            {applicants.length === 0 && <li>아직 지원자가 없습니다.</li>}
            {applicants.map((a, idx) => (
              <li key={idx} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <strong>아이디:</strong> {a.UserPrivate?.id}<br />
                <strong>이름:</strong> {a.UserPrivate?.name}<br />
                <strong>이메일:</strong> {a.UserPrivate?.email}<br />
                <strong>성별:</strong> {a.UserPrivate?.gender}<br />
                <strong>생년월일:</strong> {a.UserPrivate?.birth}<br />
                <strong>전화번호:</strong> {a.UserPrivate?.phone}<br />
                <strong>자기소개:</strong> {a.self_intro}<br />
                <strong>지원 세션:</strong> {a.Session?.name}<br />
                <button onClick={() => handleAccept(a.user_id, a.session_id)}>수락</button>
                <button onClick={() => handleReject(a.user_id)}>거절</button>

              </li>
            ))}
          </ul>
        </>
      )}

      {/* 팀장이 아닐 경우: 지원 기능 표시 */}
      {isLeader === false && (
        <div style={{ marginTop: "30px" }}>
          <h3>팀에 지원하기</h3>
          {!applied ? (
            <>
              <label>지원 세션 선택:</label><br />
              <select
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <option value="">-- 세션 선택 --</option>
                {team.teamSessions?.map((s, idx) => (
                  <option key={idx} value={s.session_id}>
                    {s.Session?.name}
                  </option>
                ))}
              </select><br />
              <textarea
                value={selfIntro}
                onChange={(e) => setSelfIntro(e.target.value)}
                placeholder="자기소개를 입력하세요"
                rows={5}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <button onClick={handleApply}>지원하기</button>
            </>
          ) : (
            <p>✅ 지원이 완료되었습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamDetail;
