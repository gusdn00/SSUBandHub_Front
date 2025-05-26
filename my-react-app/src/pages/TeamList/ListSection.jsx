import React from "react";
import TeamCard from "./TeamCard.jsx";

function ListSection({teams}){
    return(
        <div className="team-list">
            {teams.map(team => (
                <TeamCard key={team.id} team={team}/>
            ))}
        </div>
    );
}

export default ListSection;