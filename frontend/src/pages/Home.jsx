import * as React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import styles from '../styles/Home.module.css'
import { CodeFeedback, Summary } from '../components/CodeFeedback';


export default function Home() {
    const [text, setText] = React.useState('');
    const [history, setHistory] = React.useState([]);

    const email = localStorage.getItem('loggedInUserEmail');
    const nickname = localStorage.getItem('loggedInUserNickname');

    const now = new Date().getTime();

    const navigate = useNavigate();

    React.useEffect(() => {
        //alert(`${nickname}님 환영합니다.`);  //테스트용 코드. 해당 user.nickname, user.email로 유저 정보 조회 가능합니다.
        //alert(now);
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            CodeFeedback(text, history).then((res) => {
                setHistory([...history, [text, res]]);
            });
        } catch (error) {
            console.log(error);
        }
        setText('');
    };

    const createBoard = async (e) => {
        e.preventDefault();
        try {
            let timer = 0;
            let messages = [];
            const summary = await Summary(history);
            console.log(summary);
            Object.values(history).map((v, k) => {
                messages.push(
                    {
                        "role": "user",
                        "createdAt": now + timer,
                        "content": v[0]
                    }
                )
                timer += 1;
                messages.push(
                    {
                        "role": "system",
                        "createdAt": now + timer,
                        "content": v[1]
                    }
                )
                timer += 1;
            })
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/post`, {
                "title": `${nickname}님의 세션`,
                "content": summary,
                "access": false,
                "messages": messages
            }, {withCredentials: true});
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/public")}}>PUBLIC BOARD</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/mine")}}>PRIVATE BOARD</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/user/info")}}>MY PROFILE</button>
            </div>
            <div className={styles.chatContainer}>
                {Object.values(history).map((v, k) => {
                    return(
                        <div key={k}>
                            <div className={styles.sentMessage}>
                                {v[0]}
                            </div>
                            <div className={styles.receivedMessage}>
                                {v[1]}
                            </div>
                        </div>
                    );
                })}
                <button className={styles.boardSubmitButton} onClick={createBoard}>Submit</button>
                <form onSubmit={handleSubmit}>
                    <textarea className={styles.textbox} rows="8" value={text} onChange={(e) => setText(e.target.value)} required/>
                    <input className={styles.textsubmit} type='submit' value="입력"/>
                </form>
            </div>
        </div>
    );
};
