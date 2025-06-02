import { useState } from "react";

function Syncroom() {
  const [roomInfo, setRoomInfo] = useState({
    name: "홍대연습실",
    rating: 4.2, // 별점 평균
    reviewCount: 12
  });

  const [showReviews, setShowReviews] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [reviews] = useState([
    { id: 1, user: "user1", comment: "시설이 좋아요!", rating: 5 },
    { id: 2, user: "user2", comment: "방음이 좀 아쉬워요", rating: 3 },
  ]);

  const handleShowReviews = () => setShowReviews(true);
  const handleWriteReview = () => setShowWriteForm(true);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h2>합주실 상세 정보</h2>
      
      <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ccc", background: "#f9f9f9" }}>
        <p><strong>합주실 이름:</strong> {roomInfo.name}</p>
        <p><strong>별점:</strong> {"★".repeat(Math.round(roomInfo.rating)) + "☆".repeat(5 - Math.round(roomInfo.rating))} ({roomInfo.rating.toFixed(1)})</p>

        <button onClick={handleShowReviews} style={{ marginRight: "10px" }}>리뷰 보기</button>
        <button onClick={handleWriteReview}>리뷰 쓰기</button>
      </div>

      {/* 리뷰 목록 */}
      {showReviews && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>리뷰 목록</h3>
          {reviews.map(r => (
            <div key={r.id} style={{ borderBottom: "1px solid #ddd", marginBottom: "10px", paddingBottom: "10px" }}>
              <strong>{r.user}</strong> - {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}<br />
              {r.comment}
            </div>
          ))}
        </div>
      )}

      {/* 리뷰 작성 폼 */}
      {showWriteForm && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>리뷰 작성</h3>
          <p>(작성 폼은 나중에 구현 예정)</p>
        </div>
      )}
    </div>
  );
}

export default Syncroom;