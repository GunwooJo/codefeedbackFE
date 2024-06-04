import * as React from 'react';
import '../styles/Home.css'
//import axios from 'axios';
//import {useNavigate} from "react-router-dom";
import { Decrypt } from '../components/HashString';
import {useLocation, useParams} from 'react-router-dom';

export default function Home() {
    // const { user } = useParams();
    const location = useLocation();
    const user = location.state.user;
    const [decryptedUser, setDecryptedUser] = React.useState([])

    React.useEffect(() => {
        alert(`${user.nickname}님 환영합니다.`);  //테스트용 코드. 해당 user.nickname, user.email로 유저 정보 조회 가능합니다.

    },[])
    // React.useEffect(() => {
    //     try {
    //         setDecryptedUser(Decrypt(user).split('&'));
    //         console.log(decryptedUser);
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }, []);

    // React.useEffect(() => {
    //     if(decryptedUser[1] !== undefined)
    //         alert("Hello!\nuser: " + decryptedUser[1]);
    // }, [decryptedUser]);

    return (
        <div class="main-container">
            <div class="navigation-bar">
                <button class="submit-button">submit</button>
                <button class="navigation-button">my profile</button>
                <button class="navigation-button">board list</button>
            </div>
            <div class="chat-container">
                <div class="message received">
                    <div class="message-content">
                        <p>Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!</p>
                    </div>
                </div>
                <div class="message sent">
                    <div class="message-content">
                        <p>Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!</p>
                    </div>
                </div>
            </div>
                <div class="input-container">
                    <form>
                        <textarea rows="8"/>
                        <input type='submit'/>
                    </form>
                </div>
        </div>
    );
};
