import * as React from 'react';
import styles from '../styles/Home.module.css'
import {useLocation} from 'react-router-dom';
import CodeFeedback from '../components/CodeFeedback';

export default function Home() {
    const [text, setText] = React.useState('');
    const [history, setHistory] = React.useState([]);

    const location = useLocation();
    const user = location.state.user;

    React.useEffect(() => {
        //alert(`${user.nickname}님 환영합니다.`);  //테스트용 코드. 해당 user.nickname, user.email로 유저 정보 조회 가능합니다.
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
                <button className={styles.navigationButton}>board list</button>
                <button className={styles.navigationButton}>my profile</button>
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
