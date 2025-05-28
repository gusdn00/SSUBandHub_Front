import React from "react";
import '../../styles/TeamList/SearchBar.css'
function SearchBar({ query, setQuery}){
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
            <button className="create-button">+ 팀 생성</button>
        </div>
    );

}

export default SearchBar;
