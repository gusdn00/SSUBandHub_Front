// src/pages/Write.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/write.css';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(16); // 기본 폰트 크기
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 실제 게시 로직으로 교체
    if (!title.trim() || !content.trim()) {
      alert('제목과 본문을 모두 입력하세요.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
        credentials: 'include',
      });

      if (res.ok) {
        alert('게시되었습니다.');
        navigate('/community');
      } else {
        const errorData = await res.json();
        alert(errorData.message || '게시글 작성에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류로 게시글 작성에 실패했습니다.');
    }

    console.log('제목:', title);
    console.log('본문:', content);
    alert('게시되었습니다.');
    navigate('/community');
  };

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate('/community');
    }
  };

  return (
    <div className="write-container">
      <h2>게시물 작성</h2>
      <input
        className="write-title"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
 
      <textarea
        className="write-content"
        placeholder="본문을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ fontSize: `${fontSize}px` }}
      />
      <div className="write-buttons">
        <button className="cancel-btn" onClick={handleCancel}>취소</button>
        <button className="submit-btn" onClick={handleSubmit}>게시하기</button>
      </div>
    </div>
  );
}

export default Write;
