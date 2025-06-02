// PerformanceList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PerformanceList() {
  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/performance")
      .then(res => res.json())
      .then(data => setPerformances(data))
      .catch(err => console.error("공연 목록 로딩 실패", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>공연 목록</h2>
      {performances.map(perf => (
        <div key={perf.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px", cursor: "pointer" }}
          onClick={() => navigate(`/performance/${perf.id}`)}>
          <h3>{perf.name}</h3>
          <p>{perf.intro}</p>
          <p><strong>일시:</strong> {perf.showtime}</p>
          <p><strong>장소:</strong> {perf.showplace}</p>
        </div>
      ))}
    </div>
  );
}

export default PerformanceList;