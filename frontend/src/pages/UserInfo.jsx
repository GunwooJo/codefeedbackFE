import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserWithdrawal from "../components/UserWithdrawal";
import styles from '../styles/UserInfo.module.css'

function UserInfo() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickname: ''
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('loggedInUserEmail');
        if (email) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/user/info`,
                {email: email},
                {withCredentials: true})
            .then(response => {
                setUserInfo(response.data.data);
            })
            .catch(error => {
                console.error("사용자 정보 가져오기 실패: ", error);

                if (error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate('/user/login');
                } else {
                    alert("잠시 후 다시 시도해주세요.");
                }
            });
        } else {
            navigate('/user/login');
        }
    }, [navigate]);

    const handleShow = () => setShowModal(true);
    const handleEdit = () => navigate('/user/edit');

    return (
        <div>
            <h2>회원 정보</h2>
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
            <UserWithdrawal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default UserInfo;
