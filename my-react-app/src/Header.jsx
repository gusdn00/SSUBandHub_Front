import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ 쿠키에서 token을 찾는 함수
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // ✅ 페이지마다 쿠키 상태를 체크하도록 변경
  useEffect(() => {
    const checkLogin = () => {
      const token = getCookie("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    // ✅ 쿠키 변경 시 체크할 수 있게 폴링 (간단한 방법)
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="upside">
        <a className="logo" href="/">
          <img src="src/assets/logo.png" alt="SSUBandHub" />
        </a>
        <div className="auth">
          {isLoggedIn ? (
            <>
              <a href="#">마이페이지</a> |{" "}
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login"><button>로그인</button></Link> |{" "}
              <Link to="/signup"><button>회원가입</button></Link>
            </>
          )}
        </div>
      </div>

      <nav className="tab">
        <Link to="/team-list"><button>팀 목록</button></Link>
        <Link to="/syncroom"><button>합주실</button></Link>
        <Link to="/performance"><button>공연</button></Link>
        <Link to="/community"><button>커뮤니티</button></Link>
      </nav>
    </div>
  );
}

export default Header;
