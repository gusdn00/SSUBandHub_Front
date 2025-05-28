import React from "react";
import '../../styles/TeamList/TeamCard.css';

function TeamCard({ team }){
    return (
        <div className="team-card">
            <div className="team-text">
                <h2>{team.title}</h2>
                <p>{team.content}</p>
                <div className="team-meta">
                    {team.bandName} / {team.date} / 조회수 {team.views} / 스크랩 {team.scraps}
                </div>
            </div>
            <div className="team-image">
                <img src='src\assets\testimg.jpeg' alt="team" />
            </div>
        </div>
    );
}

export default TeamCard;