import { useState } from "react";

function CreateTeam(){

    const [sessions, setSessions] = useState([]);
    const [totalPeople, setTotalPeople] = useState(0);

    const handleAdd = () => {
        if (totalPeople >= 10) {
        alert("총 인원은 최대 10명까지 가능합니다.");
        return;
        }

        setSessions([...sessions, { session: "", people: 1 }]);
        setTotalPeople(prev => prev + 1);
    };

    const handleChange = (index, field, value) => {
    const updated = [...sessions];
    const oldPeople = parseInt(updated[index].people);
    if (field === "people") {
        const newPeople = parseInt(value) || 0;
        const sumWithoutCurrent = totalPeople - oldPeople;

        if (sumWithoutCurrent + newPeople > 10) {
            alert("총 인원은 최대 10명까지 가능합니다.");
            return;
        }

        updated[index][field] = newPeople;
        setTotalPeople(sumWithoutCurrent + newPeople);
        } else {
        updated[index][field] = value;
        }

        setSessions(updated);
    };
    const handleDelete = (index) => {
        const deleted = sessions[index];
        const remaining = sessions.filter((_, i) => i !== index);
        setSessions(remaining);
        setTotalPeople(prev => prev - parseInt(deleted.people));
    };

    return(
        <>
            <h1>팀 생성</h1>
            <input type="text" id="team-name" placeholder="팀명을 정해주세요"/>
            <input type="text" id="team-title" placeholder="제목을 입력해주세요"/>
            <input type="text" id="team-intro" placeholder="소개글을 작성해주세요"/>
            <input type="file" id="team-image" placeholder="이미지를 첨부해주세요" accept=".jpg, .png, .jpeg"/><br />
            
            <h2>장르</h2>
            <input type="radio" id="in-rock" name="genre"/>
            <label htmlFor="in-rock">국내 락</label><br />
            <input type="radio" id="out-rock"name="genre"/>
            <label htmlFor="out-rock">해외 락</label><br />
            <input type="radio" id="in-indi" name="genre"/>
            <label htmlFor="in-indi">국내 인디</label><br />
            <input type="radio" id="out-indi" name="genre"/>
            <label htmlFor="out-indi">해외 인디</label><br />

            <h2>활동 지역</h2>

            <input type="radio" id="seoul" name="area"/>
            <label htmlFor="seoul">서울</label>

            <input type="radio" id="gyeonggi" name="area"/>
            <label htmlFor="gyeonggi">경기</label>

            <input type="radio" id="incheon" name="area"/>
            <label htmlFor="incheon">인천</label>

            <input type="radio" id="daejeon" name="area"/>
            <label htmlFor="daejeon">대전</label>

            <input type="radio" id="busan" name="area"/>
            <label htmlFor="busan">부산</label>

            <input type="radio" id="ulsan" name="area"/>
            <label htmlFor="ulsan">울산</label>

            <input type="radio" id="daegu" name="area"/>
            <label htmlFor="daegu">대구</label>

            <input type="radio" id="gwangju" name="area"/>
            <label htmlFor="gwangju">광주</label><br />

            <input type="radio" id="gangwon" name="area"/>
            <label htmlFor="gangwon">강원</label>

            <input type="radio" id="chungbuk" name="area"/>
            <label htmlFor="chungbuk">충북</label>

            <input type="radio" id="chungnam" name="area"/>
            <label htmlFor="chungnam">충남</label>

            <input type="radio" id="jeonbuk" name="area"/>
            <label htmlFor="jeonbuk">전북</label>

            <input type="radio" id="jeonnam" name="area"/>
            <label htmlFor="jeonnam">전남</label>

            <input type="radio" id="gyeongbuk" name="area"/>
            <label htmlFor="gyeongbuk">경북</label>

            <input type="radio" id="gyeongnam" name="area"/>
            <label htmlFor="gyeongnam">경남</label>

            <input type="radio" id="jeju" name="area"/>
            <label htmlFor="jeju">제주</label>
            <div>
                <h2>세션/인원 추가</h2>
                {sessions.map((item, index) => (
                    <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="세션 이름"
                        value={item.session}
                        onChange={(e) => handleChange(index, "session", e.target.value)}
                    />
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={item.people}
                        onChange={(e) => handleChange(index, "people", e.target.value)}
                        style={{ width: "60px" }}
                    />
                    <button onClick={() => handleDelete(index)}>삭제</button>
                    </div>
                ))}
                <button onClick={handleAdd}>+ 추가하기</button>
                <p>총 인원: {totalPeople} / 10</p>
            </div>
        </>
    );
}

export default CreateTeam;