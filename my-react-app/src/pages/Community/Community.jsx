import React, { useEffect, useState } from 'react';
import '../../styles/community.css';
import writeIcon from '../../assets/write.png';
import { useNavigate } from 'react-router-dom';

function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]); // ✅ 백엔드에서 받아온 데이터
  const navigate = useNavigate();

  // ✅ 백엔드에서 게시글 받아오기
  useEffect(() => {
    fetch('http://localhost:3000/api/posts')  // 너의 백엔드 주소!
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.posts);  // 백엔드 데이터로 갱신
        }
      })
      .catch((err) => {
        console.error('게시글 불러오기 실패:', err);
      });
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
        <div className="post-info-header">좋아요/조회수</div>
      </div>

      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.id} className="post-item" onClick={() => navigate(`/community/${post.id}`)}>
            <div className="post-title">{post.title}</div>
            <div className="post-author">{post.writer}</div> {/* ✅ 백엔드에서 오는 필드 */}
            <div className="post-info">❤️ {post.likeCount || 0} / {post.hits}회</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;