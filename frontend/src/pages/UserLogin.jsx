import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from '../styles/UserLogin.module.css'

export default function UserLogin() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
                email: email,
                password: password
            }, {withCredentials: true});

            navigate('/', { state: { user: res.data.data } });
        } catch (error) {
            if(error.response.status === 401) {
                alert("아이디나 비밀번호가 틀렸어요.");
            } else {
                alert("알 수 없는 문제가 발생했습니다. 다시 시도해주세요.");
            }
            console.log(error);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.navigationButton} type="submit">로그인</button>
                <button className={styles.navigationButton} type="button" onClick={()=>navigate(`/user/join`)}>회원가입</button>
            </form>
        </div>
    );
};
