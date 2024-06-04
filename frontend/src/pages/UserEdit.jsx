import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
    const [formData, setFormData] = useState({
        nickname: '',
        password: '',
        comfirmPassword: ''
    });
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${userId}`);
                setFormData({
                    nickname: response.data.nickname,
                    password: '',
                    confirmPassword: ''
                });
            } catch (error) {
                console.error("사용자 정보 가져오기 실패: ", error);
                alert("사용자 정보를 가져오는데 실패했습니다.");
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/${userId}`,{
                nickname: formData.nickname,
                password: formData.password
            });
            alert("회원정보 수정 성공");
            navigate("/user/profile");
        } catch(error){
            console.error("회원정보 수정 실패: ", error);
            alert("회원정보 수정에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>닉네임:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>비밀번호:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">회원정보 수정</button>
        </form>
    );
}

export default UserEdit;
