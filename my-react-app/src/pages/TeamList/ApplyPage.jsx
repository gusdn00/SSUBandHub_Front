import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function ApplyPage(){
    const { id } = useParams();
    const navigate = useNavigate();

    return(
        <>
            <h1>{id}page</h1>
            <button onClick={() => navigate('/team-list')}>목록</button>
        </>
    );
}

export default ApplyPage;