// src/pages/CommunityDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/CommunityDetail.css';

function CommunityDetail() {
  const { id } = useParams();  // URL에서 게시글 ID 받기
  const navigate = useNavigate();

  // 임시 데이터 (실제 API 호출로 바꿀 예정)
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


  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

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
