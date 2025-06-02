import { useState } from "react";
import {Link} from "react-router-dom";
import './Header.css';

function Header(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return(
        <div className="header">
            <div className="upside">
                <a className="logo" href="/">
                    <img src="src\assets\logo.png" alt="SSUBandHub" />
                </a>
                <div className="auth">
                    {isLoggedIn ? (
                        <>
                            <a href="#">마이페이지</a> | <button onClick={toggleLogin}>로그아웃</button>
                        </>
                    ):(
                        <>
                            <button onClick={toggleLogin}>로그인</button> | <a href="#"> 회원가입</a>
                        </>
                    )}
                </div>
            </div>
            
            <nav className="tab">
                <Link to="/team-list">
                    <button>팀 목록</button>
                </Link>
                <Link to="/syncroom">
                    <button>합주실</button>               
                </Link>
                <Link to="/performance">
                    <button>공연</button>               
                </Link>
                <Link to="/community">
                    <button>커뮤니티</button>               
                </Link>
            </nav>
            
        </div>
    );
}

export default Header;