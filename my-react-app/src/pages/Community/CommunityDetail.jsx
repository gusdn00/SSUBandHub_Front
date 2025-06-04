// src/pages/CommunityDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/CommunityDetail.css';

function CommunityDetail() {
  const { id } = useParams();  // URL에서 게시글 ID 받기
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState();
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`, {credentials: 'include'})
      .then(res => res.json())
      .then(data => {
        if (data.success && data.post) {
          setPost(data.post);
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPost(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="community-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div className="detail-author">작성자: {post.author}</div>

      <button onClick={() => navigate('/community')}>목록</button>
    </div>
  );
}

export default CommunityDetail;
