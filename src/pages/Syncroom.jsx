import { useEffect, useRef, useState } from "react";

function Syncroom() {
  const mapRef = useRef(null);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);
  const [newReview, setNewReview] = useState({ score: 5, content: "" });
  const [showWriteForm, setShowWriteForm] = useState(false);
  const markers = useRef([]);

  // ✅ 지도 및 마커 표시
  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    setTimeout(() => {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 5
        });

        const ps = new window.kakao.maps.services.Places();

        // ✅ 지도 확대 시만 마커 표시
        kakao.maps.event.addListener(map, 'idle', () => {
          if (map.getLevel() <= 5) {
            const bounds = map.getBounds();
            const searchOption = { bounds };

            ps.keywordSearch("합주실", placesSearchCB, searchOption);
          } else {
            // 확대 안했으면 마커 지우기
            markers.current.forEach(m => m.setMap(null));
            markers.current = [];
          }
        });

        function placesSearchCB(data, status) {
          if (status !== kakao.maps.services.Status.OK) return;

          // 기존 마커 제거
          markers.current.forEach(m => m.setMap(null));
          markers.current = [];

          data.forEach(place => {
            const marker = new kakao.maps.Marker({
              map,
              position: new kakao.maps.LatLng(place.y, place.x),
              title: place.place_name
            });

            markers.current.push(marker);

            kakao.maps.event.addListener(marker, 'click', () => {
              setSelectedStudio({
                name: place.place_name,
                address: place.address_name || '',
                url: place.place_url
              });
            });
          });
        }
      });
    }, 0);
  }, []);

  // ✅ 리뷰 및 별점 불러오기
  useEffect(() => {
    if (!selectedStudio) return;
    console.log(selectedStudio);
    const name = selectedStudio.name;
    fetch(`/api/reviews?name=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setReviews(data.reviews || []);});

    fetch(`/api/reviews/average-score?name=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        setRoomInfo({
          name: name,
          rating: parseFloat(data.average),
          reviewCount: reviews.length
        });
        console.log(data);
      });
  }, [selectedStudio]);

  // ✅ 리뷰 작성
  const handleSubmitReview = async () => {
    if (!selectedStudio) return;
    const { name, address, url } = selectedStudio;

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studioName: name,
        studioAddress: address,
        studioUrl: url,
        ...newReview
      })
    });

    const result = await response.json();
    if (result.success) {
      alert("리뷰 등록 완료!");
      setShowWriteForm(false);
      setReviews(prev => [...prev, result.review]);
    } else {
      alert("리뷰 등록 실패");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", textAlign: "center" }}>
      <h2>합주실 상세 정보</h2>

      {/* ✅ 지도 */}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", marginBottom: "20px", backgroundColor: "lightgray" }}
      />

      {/* ✅ 선택된 합주실 정보 */}
      {selectedStudio && roomInfo && (
        <div style={{ padding: "20px", border: "1px solid #ccc", background: "#f9f9f9" }}>
          <p><strong>합주실 이름:</strong> {selectedStudio.name}</p>
          <p><strong>주소:</strong> {selectedStudio.address}</p>
          <p><strong>사이트:</strong> <a href={selectedStudio.url} target="_blank" rel="noreferrer">{selectedStudio.url}</a></p>
          <p><strong>별점:</strong> {"★".repeat(Math.round(roomInfo.rating)) + "☆".repeat(5 - Math.round(roomInfo.rating))} ({roomInfo.rating.toFixed(1)})</p>
          <button onClick={() => setShowWriteForm(true)}>리뷰 쓰기</button>
        </div>
      )}

      {/* ✅ 리뷰 목록 */}
      {selectedStudio && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>리뷰 목록</h3>
          {reviews.length === 0 ? (
            <p>아직 리뷰가 없습니다.</p>
          ) : reviews.map((r, idx) => (
            <div key={idx} style={{ borderBottom: "1px solid #ddd", marginBottom: "10px", paddingBottom: "10px" }}>
              <strong>{r.UserProfile?.id || "익명"}</strong> - {"★".repeat(r.score)}{"☆".repeat(5 - r.score)}<br />
              {r.content}
            </div>
          ))}
        </div>
      )}

      {/* ✅ 리뷰 작성 폼 */}
      {showWriteForm && selectedStudio && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3>리뷰 작성</h3>
          <label>별점: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={newReview.score}
            onChange={e => setNewReview({ ...newReview, score: parseInt(e.target.value) })}
          />
          <br /><br />
          <textarea
            placeholder="리뷰를 입력하세요"
            rows={4}
            style={{ width: "100%" }}
            value={newReview.content}
            onChange={e => setNewReview({ ...newReview, content: e.target.value })}
          />
          <br /><br />
          <button onClick={handleSubmitReview}>등록하기</button>
        </div>
      )}
    </div>
  );
}

export default Syncroom;