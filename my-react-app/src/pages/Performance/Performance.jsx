import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/Performance/Performance.css";

function Performance() {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 전체 공연 정보 요청 (GET /performance)
    fetch('http://localhost:3000/performance')
      .then(res => {
        if (!res.ok) throw new Error('공연 정보를 불러오지 못했습니다.');
        return res.json();
      })
      .then(data => {
        setPerformances(data);
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>공연 정보를 불러오는 중...</div>;

  return (
    <div className="performance-container">
      <h2 className="performance-title">공연 목록</h2>
      <ul className="performance-week-list">
        {performances.map(perf => (
          <li className="performance-week-item" key={perf.id}>
            <Link to={`/performance/${perf.id}`}>
              <div>
                <strong>{perf.name}</strong>
                <div>장소: {perf.showplace}</div>
                <div>일시: {new Date(perf.showtime).toLocaleString()}</div>
                <div>소개: {perf.intro}</div>
                <div>필요 인원: {perf.required} / 현재: {perf.current}</div>
                <div>모집 상태: {perf.finished ? '마감' : '모집 중'}</div>
                <div>신청 기간: {perf.start_date} ~ {perf.end_date}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Performance;
