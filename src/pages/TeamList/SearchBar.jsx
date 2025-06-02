import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/TeamList/SearchBar.css'
function SearchBar({ query, setQuery}){
    const navigate = useNavigate();  // 훅 사용
        const handleClick = () => {
            navigate(`/team-list/create`);
        };
    
    return (
        <div className="search-bar">
            <div className="search">
                <input
                type="text"
                value={query}
                onChange={e=> setQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="search-input"
                />
                <button className="search-button">🔍</button>
            </div>
            <button className="create-button" onClick={handleClick}>+ 팀 생성</button>
        </div>
    );

}

export default SearchBar;
