// src/pages/Community/CommunityEdit.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CommunityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}/edit`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPost(data.post);
          setTitle(data.post.title);
          setContent(data.post.content);
        } else {
          alert(data.message);
        }
      });
  }, [id]);

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('수정 완료!');
        navigate(`/community/${id}`);
      } else {
        alert(data.message || '수정 실패!');
      }
    });
  };

  if (!post) return <div>불러오는 중...</div>;

  return (
    <div className="edit-container">
      <h2>게시글 수정</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>수정 완료</button>
    </div>
  );
}

export default CommunityEdit;