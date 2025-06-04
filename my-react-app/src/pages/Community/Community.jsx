import React, { useEffect, useState } from 'react';
import '../../styles/community.css';
import writeIcon from '../../assets/write.png';
import { useNavigate } from 'react-router-dom';

function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 게시물 데이터에 작성자 필드 추가 (예시)
  useEffect(()=> {
    fetch('http://localhost:3000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts))
      .catch(err => console.error(err));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-container">
      <div className="community-header">
        <input
          type="text"
          placeholder="제목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="community-search"
        />
        <img
          src={writeIcon}
          alt="글쓰기"
          className="write-icon"
          onClick={() => navigate('/community/write')}
        />
      </div>

      {/* 게시물과 작성자 헤더 */}
      <div className="post-list-header">
        <div className="post-title-header">게시물</div>
        <div className="post-author-header">작성자</div>
      </div>

      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.id} className="post-item" onClick={() => navigate(`/community/${post.id}`)}>
            <div className="post-title">{post.title}</div>
            <div className="post-author">{post.writer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;
