// src/pages/TeamApply.jsx
import { useState } from "react";

function ApplyPage() {
  // 팀 정보 (나중에 props 또는 fetch로 대체 가능)
  const team = {
    name: "홍대 밴드팀",
    intro: "열정적인 밴드 팀원을 모집합니다!",
    leader: "김팀장",
    sessions: [
      { id: 1, name: "기타" },
      { id: 2, name: "보컬" },
      { id: 3, name: "드럼" }
    ]
  };

  const [form, setForm] = useState({
    sessionId: "",
    selfIntro: "",
    contact: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.sessionId || !form.selfIntro || !form.contact) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    console.log("지원 정보:", form);
    alert("지원이 완료되었습니다. (콘솔 확인)");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>팀 지원하기</h2>

      <div style={{ marginBottom: "20px" }}>
        <p><strong>팀명:</strong> {team.name}</p>
        <p><strong>팀장:</strong> {team.leader}</p>
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
            {team.sessions.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
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