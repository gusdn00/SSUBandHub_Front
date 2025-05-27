import React, { useState } from 'react';
import '../../styles/community.css';
import writeIcon from '../../assets/write.png';
import { useNavigate } from 'react-router-dom';

function Community() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 게시물 데이터에 작성자 필드 추가 (예시)
  const posts = [
  { id: 1, title: '첫 번째 글', content: '내용입니다\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '홍길동' },
  { id: 2, title: '두 번째 글', content: '또 다른 내용\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '김철수' },
  { id: 3, title: '세 번째 글', content: '또또 다른 내용\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '이영희' },
  { id: 4, title: '네 번째 글', content: '네 번째 게시물의 내용\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '박영수' },
  { id: 5, title: '다섯 번째 글', content: '다섯 번째 게시물 내용입니다\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '최수빈' },
  { id: 6, title: '여섯 번째 글', content: '여섯 번째 내용\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '정우성' },
  { id: 7, title: '일곱 번째 글', content: '일곱 번째 글 내용입니다\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '이정재' },
  { id: 8, title: '여덟 번째 글', content: '여덟 번째 글 내용입니다\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '김하늘' },
  { id: 9, title: '아홉 번째 글', content: '아홉 번째 글 내용입니다\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '손흥민' },
  { id: 10, title: '열 번째 글', content: '열 번째 글의 자세한 내용입니다\n\n\n\n\n\n\n\n\n\n\n\\내용', author: '장원영' }
];


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
            <div className="post-author">{post.author}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Community;
