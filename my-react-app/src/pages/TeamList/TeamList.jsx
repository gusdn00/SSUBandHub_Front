import { useState } from "react";
import '../../styles/TeamList.css';
import SearchBar from "./SearchBar.jsx";
import ListSection from "./ListSection.jsx";
import test from './test.json';

function TeamList(){
    const [query, setQuery] = useState('');
    
    // 검색 필터 적용
    const filteredTeams = test.filter(team =>
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