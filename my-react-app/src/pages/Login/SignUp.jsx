// src/pages/Register.jsx
import { useState } from "react";
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
    gender: "",
    birth: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("terms.")) {
      const key = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        terms: { ...prev.terms, [key]: checked }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    const response = axios.post("http://localhost:3000/signup", {
      id: form.id,
      password: form.password,
      confirm_password: form.passwordConfirm,
      name: form.name,
      gender: form.gender,
      birth: form.birth,
      phone: form.phone,
      email: form.email,
      terms: form.terms
    });

    console.log("서버 응답:", response.data);
    alert("회원가입 성공!");
  } catch (error) {
    console.error("회원가입 실패:", error.response?.data || error.message);
    alert("회원가입 중 오류가 발생했습니다.");
  }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", background: "#f5f0f7", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>회원가입</h2>
      <form onSubmit={handleSubmit}>

        {/* 약관 체크 */}
        <fieldset>
          <legend>개인정보 이용 수집 동의</legend>
          <label><input type="checkbox" name="terms.use" onChange={handleChange} /> 운영 정책 동의</label><br />
          <label><input type="checkbox" name="terms.policy" onChange={handleChange} /> 이용 약관 동의</label><br />
          <label><input type="checkbox" name="terms.privacy" onChange={handleChange} /> 개인정보 수집 동의</label>
        </fieldset>

        {/* ID/PW 입력 */}
        <div style={{ marginTop: "20px" }}>
          <label>ID</label><br />
          <input type="text" name="id" value={form.id} onChange={handleChange} required /><br />

          <label>PASSWORD</label><br />
          <input type="password" name="password" value={form.password} onChange={handleChange} required /><br />

          <label>PW 확인</label><br />
          <input type="password" name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange} required />
        </div>

        {/* 이름, 성별, 생년월일 등 */}
        <div style={{ marginTop: "20px" }}>
          <label>이름</label><br />
          <input type="text" name="name" value={form.name} onChange={handleChange} required /><br />

          <label>성별</label><br />
          <label><input type="radio" name="gender" value="M" onChange={handleChange} /> 남</label>
          <label style={{ marginLeft: "10px" }}><input type="radio" name="gender" value="F" onChange={handleChange} /> 여</label><br />

          <label>생년월일</label><br />
          <input type="date" name="birth" value={form.birth} onChange={handleChange} required /><br />

          <label>연락처</label><br />
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="010-0000-0000" required /><br />

          <label>이메일</label><br />
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <button type="submit" style={{ marginTop: "20px", width: "100%", background: "#a78bd4", color: "#fff", padding: "10px" }}>
          JOIN
        </button>
      </form>
    </div>
  );
}

export default Register;
