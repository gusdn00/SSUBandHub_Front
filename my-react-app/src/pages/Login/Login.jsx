import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        ID: email,
        password: password,
      },{
        withCredentials: true 
      });

      console.log("로그인 성공:", response.data.token);
      const token = response.data.token;

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
    navigate("/team-list");
  };


  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>ID</label><br />
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>비밀번호</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ width: "100%" }}>로그인</button>
      </form>
    </div>
  );
}

export default Login;