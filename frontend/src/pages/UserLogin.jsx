import * as React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Encrypt } from '../components/HashString';

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
            });
            //console.log(res.data.data.email);
            const encryptedUser = Encrypt(res.data.data.email + "&" + res.data.data.nickname)
            alert("로그인 성공");
            navigate(`/${encryptedUser}`);
        } catch (error) {
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
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};