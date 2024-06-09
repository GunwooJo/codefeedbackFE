import * as React from 'react';
import styles from '../styles/Home.module.css'
import {useLocation} from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const user = location.state.user;
    React.useEffect(() => {
        alert(`${user.nickname}님 환영합니다.`);  //테스트용 코드. 해당 user.nickname, user.email로 유저 정보 조회 가능합니다.
    },[])

    return (
        <div>
            <div>
                <button className={styles.navigationButton}>board list</button>
                <button className={styles.navigationButton}>my profile</button>
            </div>
            <div className={styles.chatContainer}>
                <div className={styles.receivedMessage}>
                    hello
                </div>
                <div className={styles.sentMessage}>
                    hello
                </div>
                <form>
                    <textarea className={styles.textbox} rows="8"/>
                    <input className={styles.textsubmit} type='submit' value="입력"/>
                </form>
            </div>
        </div>
    );
};
