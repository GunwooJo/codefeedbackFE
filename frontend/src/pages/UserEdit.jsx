import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/UserEdit.module.css'
import useSessionCheck from "../hooks/useSessionCheck";

function UserEdit() {
    const {loggedInUser} = useSessionCheck();
    const [formData, setFormData] = useState({
        nickname: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser && loggedInUser.nickname) {
            setFormData(formData => ({
                ...formData,
                nickname: loggedInUser.nickname
            }));
        }
    }, [loggedInUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/user/modify`, {
                nickname: formData.nickname,
                password: formData.password
            }, {
                withCredentials: true
            });
            alert("회원정보 수정 성공");
            navigate("/user/info");
        } catch (error) {
            console.error("회원정보 수정 실패: ", error);
            if (error.response && error.response.status === 401) {
                alert("로그인이 필요합니다.");
                navigate("/user/login");
            } else {
                alert("회원정보 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
            }
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
            <div>
                <label>비밀번호 확인:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className={styles.navigationButton}>회원정보 수정</button>
        </form>
    );
}

export default UserEdit;
