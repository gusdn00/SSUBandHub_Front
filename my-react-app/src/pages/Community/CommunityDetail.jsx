import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/CommunityDetail.css';

function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);  // 로그인 사용자 정보

  useEffect(() => {
      const token = localStorage.getItem('token'); // ✅ 선언 추가

    fetch(`http://localhost:3000/api/posts/${id}`, {
      headers: {
      Authorization: `Bearer ${token}` // ✅ 로그인 정보 포함
    },
      credentials: 'include'
    })
      .then(res => {
      console.log("서버 응답 : ", res);
      return res.json();  // 🔥 이 줄이 필수!
    })
      .then(data => {
        if (data.success) {
          setPost(data.post);
          setComments(data.comments);
          setLikeCount(data.post.likeCount || 0);
          setLiked(data.userLiked || false);
          setCurrentUser(data.user); // ✅ 사용자 정보 저장
          
          //디버깅
          console.log('현재 사용자 ID:', data.user?.id);
        console.log('작성자:', data.post?.writer);
        }
      });
  }, [id]);

  const likePost = async () => {
      const token = localStorage.getItem('token');
    const res = await fetch(`/api/posts/${post.id}/like`, {
      method: 'POST',
      headers: {
      Authorization: `Bearer ${token}`
    },
      credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
      setLiked(data.liked);
      setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      
      const token = localStorage.getItem('token');  // ✅ 토큰 추가

      await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
        Authorization: `Bearer ${token}` // ✅ 헤더 추가
      }
      });
      navigate('/community');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const res = await fetch(`/api/posts/${post.id}/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: commentInput })
    });
    const data = await res.json();
    if (data.success) {
      setComments(prev => [...prev, data.comment]);
      setCommentInput('');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/comments/${commentId}`, {
      
      
      method: 'DELETE',
      credentials: 'include',
        headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
    });
    const data = await res.json();
    if (data.success) {
      setComments(prev => prev.filter(c => c.commentId !== commentId));
    }
  };

  const handleCommentEdit = (comment) => {
    setEditCommentId(comment.commentId);
    setEditCommentContent(comment.content);
  };

  const handleCommentEditSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/comments/${editCommentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
      body: JSON.stringify({ content: editCommentContent })
    });
    const data = await res.json();
    if (data.success) {
      setComments(prev =>
        prev.map(c =>
          c.commentId === editCommentId ? { ...c, content: editCommentContent } : c
        )
      );
      setEditCommentId(null);
      setEditCommentContent('');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="community-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="detail-author">작성자: {post.writer}</div>

      <button onClick={likePost}>
        {'❤️ 좋아요'} ({likeCount})
      </button>

      {currentUser?.id?.toString() === post.writer?.toString() && (
        <div className="button-group">
          <button onClick={() => navigate(`/community/edit/${post.id}`)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}

      <hr />
      <h3>댓글</h3>

      {comments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.commentId} className="comment-box">
            <p><strong>{comment.writer}</strong></p>
            {editCommentId === comment.commentId ? (
              <form onSubmit={handleCommentEditSubmit}>
                <textarea
                  value={editCommentContent}
                  onChange={(e) => setEditCommentContent(e.target.value)}
                  required
                />
                <br />
                <button type="submit">수정 완료</button>
                <button type="button" onClick={() => setEditCommentId(null)}>취소</button>
              </form>
            ) : (
              <>
                <p>{comment.content}</p>
                <p style={{ fontSize: '0.8em', color: 'gray' }}>{new Date(comment.created_at).toLocaleString()}</p>
                <button onClick={() => handleCommentEdit(comment)}>수정</button>
                <button onClick={() => handleCommentDelete(comment.commentId)}>삭제</button>
              </>
            )}
          </div>
        ))
      )}

      <hr />
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력하세요"
          required
        />
        <button type="submit">댓글 등록</button>
      </form>
    </div>
  );
}

export default CommunityDetail;