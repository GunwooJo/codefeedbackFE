import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserWithdrawal from "../components/UserWithdrawal";
import styles from '../styles/UserInfo.module.css'
import styles2 from "../styles/PostDetail.module.css";
import useSessionCheck from "../hooks/useSessionCheck";

function UserInfo() {
    const {loggedInUser} = useSessionCheck();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleEdit = () => navigate('/user/edit');

    return (
        <div>
            <h2>회원 정보</h2>
            <button className={styles2.navigationButton} onClick={() => navigate(`/`)}>홈</button>

            <div>
                <label>이메일: </label>
                <span>{loggedInUser.email}</span>
            </div>
            <div>
                <label>닉네임: </label>
                <span>{loggedInUser.nickname}</span>
            </div>
            <button onClick={handleEdit} className={styles.navigationButton}>수정</button>
            {/*<button onClick={handleShow} className={styles.navigationButton}>탈퇴</button>*/}
            <UserWithdrawal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
}

export default UserInfo;
