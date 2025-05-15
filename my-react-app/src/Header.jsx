import { useState } from "react";
import './Header.css';
function Header(){
    return(
        <div className="header">
            <div className="upside">
                <div className="logo">
                    <img src="src\assets\logo.png" alt="SSUBandHub" />
                </div>
                <div className="auth">
                    <a href="#">로그인</a> | <a href="#"> 회원가입</a>
                </div>
            </div>
            
            <nav className="tab">
                <button>팀 목록</button>
                <button>합주실</button>
                <button>공연</button>
                <button>커뮤니티</button>
            </nav>
            
        </div>
    );
}

export default Header;