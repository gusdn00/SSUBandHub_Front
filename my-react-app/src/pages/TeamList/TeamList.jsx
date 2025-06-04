import { useState , useEffect} from "react";
import '../../styles/TeamList.css';
import SearchBar from "./SearchBar.jsx";
import ListSection from "./ListSection.jsx";

function TeamList(){
    const [query, setQuery] = useState('');
    const [teams, setTeams] = useState([]);    
    
    useEffect(() => {
        fetch('http://localhost:3000/team')
            .then(res => res.json())
            .then(data => setTeams(data))
            .catch(err => console.error('팀 목록 불러오기 실패: ', err));
    }, []);
    
    // 검색 필터 적용
    const filteredTeams = teams.filter(team =>
        team.title.toLowerCase().includes(query.toLowerCase())
    );

    return(
        <>
            <SearchBar query={query} setQuery={setQuery} />
            <ListSection teams={filteredTeams} />
        </>
    );
}

export default TeamList