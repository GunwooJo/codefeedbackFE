import * as React from 'react';
import {useNavigate} from "react-router-dom";
import styles from '../styles/Home.module.css'
import CodeFeedback from '../components/CodeFeedback';


export default function Home() {
    const [text, setText] = React.useState('');
    const [history, setHistory] = React.useState([]);

    const email = localStorage.getItem('loggedInUserEmail');
    const nickname = localStorage.getItem('loggedInUserNickname');

    const navigate = useNavigate();

    React.useEffect(() => {
        //alert(`${nickname}님 환영합니다.`);  //테스트용 코드. 해당 user.nickname, user.email로 유저 정보 조회 가능합니다.
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

    return (
        <div>
            <div>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/public")}}>board list</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/user/info")}}>my profile</button>
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
                <form onSubmit={handleSubmit}>
                    <textarea className={styles.textbox} rows="8" value={text} onChange={(e) => setText(e.target.value)} required/>
                    <input className={styles.textsubmit} type='submit' value="입력"/>
                </form>
            </div>
        </div>
    );
};
