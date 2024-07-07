import * as React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import styles from '../styles/Home.module.css'
import { CodeFeedback, Summary } from '../components/CodeFeedback';
import Spinner from 'react-bootstrap/Spinner';
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";

export default function Home() {
    const [text, setText] = useState('');
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectOption, setSelectOption] = useState("question");
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    const now = new Date().getTime();
    const navigate = useNavigate();

    useEffect(() => {
        async function checkSession() {
            try {
                await axios.get(`${process.env.REACT_APP_SERVER_URL}/session/check`,{withCredentials: true});
                setIsCheckingSession(false);
            } catch (error) {

                if (error.response && error.response.status === 401) {
                    navigate("/user/login");
                } else {
                    console.error(error);
                    alert("오류가 발생했습니다.");
                }
            }

        }

        checkSession();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setText('');
        setIsLoading(true);
        try {
            await CodeFeedback(text, history, selectOption).then((res) => {
                setHistory([...history, [text, res]]);
            });
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const createBoard = async (e) => {
        e.preventDefault();
        let title = prompt("제목을 입력해주세요.");
        if (title === null) {
            alert("제목을 입력해야 저장할 수 있습니다.");
            return;
        }
        setIsLoading(true);
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
                "title": title,
                "content": summary,
                "access": false,
                "messages": messages
            }, {withCredentials: true});
            console.log(response);
            setIsLoading(false);
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    };

    if(isCheckingSession) {
        return null;
    }

    return (
        <div>
            <div>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/public")}}>공개된 게시글</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/post/mine")}}>내 게시글</button>
                <button className={styles.navigationButton} onClick={() => {navigate("/user/info")}}>내 정보</button>
            </div>
            <div className={styles.chatContainer}>
                {Object.values(history).map((v, k) => {
                    return(
                        <div key={k}>
                            <div className={styles.sentMessage}>
                                {v[0]}
                            </div>
                            <div className={styles.receivedMessage}>
                                <pre className={styles.codeStyle}>
                                    <ReactMarkdown>{v[1]}</ReactMarkdown>
                                </pre>
                            </div>
                        </div>
                    );
                })}

                <button className={styles.boardSubmitButton} onClick={createBoard}>게시글로 저장</button>
                <select className={styles.selectButton} onChange={(e) => setSelectOption(e.target.value)}>
                    <option value="question">보완할 점 제안받기</option>
                    <option value="explanation">코드에 대해 설명받기</option>
                </select>
                <form onSubmit={handleSubmit}>
                    <textarea className={styles.textbox} rows="8" value={text} onChange={(e) => setText(e.target.value)} required/>
                    <input className={styles.textsubmit} type='submit' value="입력"/>
                </form>
            </div>
            {
                isLoading ?
                    <div className={styles.centerSpinner}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    : null
            }

        </div>
    );
};
