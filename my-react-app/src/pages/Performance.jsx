// Performance.jsx
import { Link } from 'react-router-dom';
import "../styles/Performance.css";

function Performance() {
  return (
    <div className="performance-container">
      <h2 className="performance-title">공연 주차 선택</h2>
      <ul className="performance-week-list">
        <li className="performance-week-item"><Link to="/performance/week2">6월 2주차 공연</Link></li>
        <li className="performance-week-item"><Link to="/performance/week3">6월 3주차 공연</Link></li>
        <li className="performance-week-item"><Link to="/performance/week4">6월 4주차 공연</Link></li>
      </ul>
    </div>
  );
}

export default Performance;