import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserWithdrawal from "../components/UserWithdrawal";

function UserInfo() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickname: ''
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/info`);
                setUserInfo(response.data);
            } catch (error) {
                console.error("사용자 정보 가져오기 실패: ", error);
                alert("사용자 정보를 가져오는데 실패했습니다.");
            }
        };

        fetchUserInfo();
    }, []);

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
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleShow}>탈퇴</button>
            <UserWithdrawal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default UserInfo;
