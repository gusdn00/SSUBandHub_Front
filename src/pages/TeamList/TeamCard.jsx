import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/TeamList/TeamCard.css';

function TeamCard({ team }){
    const navigate = useNavigate();  // 훅 사용
    const handleClick = () => {
        // 예: /apply/팀ID 페이지로 이동
        navigate(`/team-list/Tid/${team.id}`);
    };

    return (
        <div className="team-card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="team-text">
                <h2>{team.title}</h2>
                <p className="team-content">{team.content}</p>
            </div>
            <div className="team-right">
                <div className="team-image">
                    <img src='src\assets\testimg.jpeg' alt="team" />
                </div>
                <div className="team-meta">
                    {team.bandName} / {team.date} / 조회수 {team.views} / 스크랩 {team.scraps}
                </div>
            </div>
        </div>
    );
}

export default TeamCard;