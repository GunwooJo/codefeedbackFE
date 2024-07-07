import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserWithdrawal from "../components/UserWithdrawal";
import styles from '../styles/UserInfo.module.css'
import styles2 from "../styles/PostDetail.module.css";

function UserInfo() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickname: ''
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function checkSession() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/session/check`,{withCredentials: true});
                setUserInfo(response.data.data);

            } catch (error) {

                if (error.response && error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate("/user/login");
                } else {
                    console.error(error);
                    alert("오류가 발생했습니다.");
                }
            }

        }

        checkSession();
    }, [navigate]);

    const handleShow = () => setShowModal(true);
    const handleEdit = () => navigate('/user/edit');

    return (
        <div>
            <h2>회원 정보</h2>
            <button className={styles2.navigationButton} onClick={() => navigate(`/`)}>홈</button>

            <div>
                <label>이메일: </label>
                <span>{userInfo.email}</span>
            </div>
            <div>
                <label>닉네임: </label>
                <span>{userInfo.nickname}</span>
            </div>
            <button onClick={handleEdit} className={styles.navigationButton}>수정</button>
            {/*<button onClick={handleShow} className={styles.navigationButton}>탈퇴</button>*/}
            <UserWithdrawal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
}

export default UserInfo;
