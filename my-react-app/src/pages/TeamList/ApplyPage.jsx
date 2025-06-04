// src/pages/TeamApply.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ApplyPage() {
  // 팀 정보 (나중에 props 또는 fetch로 대체 가능)
  const { id } = useParams();
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState();
  const [form, setForm] = useState({
    sessionId: "",
    selfIntro: "",
    contact: ""
  });

  console.log("ApplyPage mount");
  
  useEffect(() => {
    console.log("id: ", id);
    console.log("fetch실행");
    fetch(`http://localhost:3000/team/${id}`)
       .then(res => {
        if (!res.ok) throw new Error("팀 정보를 불러오지 못했습니다.");
        return res.json();
      })
      .then(data => {
        setTeam(data); // API 응답 구조에 맞게 수정
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.sessionId || !form.selfIntro || !form.contact) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/team/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: form.sessionId,
          self_intro: form.selfIntro,
          contact: form.contact
            // 필요하다면 userId 등 추가
        }),
        credentials: 'include',
      });

      if (!res.ok) throw new Error("지원에 실패했습니다.");
      alert("지원이 완료되었습니다!");
        // 필요하다면 폼 초기화, 페이지 이동 등 추가
    } catch (err) {
      alert(err.message);
    }
  };

  if (!team) {
    return <div>팀 정보를 불러오는 중...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>팀 지원하기</h2>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>팀명:</strong> {team.name}</p>
        <p><strong>팀장:</strong> {
      team.joinTeams && team.joinTeams.length > 0
        ? team.joinTeams.find(jt => jt.role === 'leader')?.user_id || '알 수 없음'
        : '알 수 없음'
        }</p>
        <p><strong>소개:</strong> {team.intro}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>지원 세션 선택</label><br />
          <select
            name="sessionId"
            value={form.sessionId}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          >
            <option value="">-- 세션 선택 --</option>
            {team.teamSessions && team.teamSessions.map(ts => (
              <option key={ts.id} value={ts.Session.id}>
                {ts.Session.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>자기소개</label><br />
          <textarea
            name="selfIntro"
            value={form.selfIntro}
            onChange={handleChange}
            rows={5}
            placeholder="간단한 자기소개를 작성해주세요."
            style={{ width: "100%" }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>연락처</label><br />
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="010-0000-0000"
            style={{ width: "100%" }}
            required
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", background: "#5c7cfa", color: "#fff", border: "none" }}>
          지원하기
        </button>
      </form>
    </div>
  );
}

export default ApplyPage;