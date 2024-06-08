import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import {UserContext} from "../context/UserContext";

function PostDetail() {

    const navigate = useNavigate();
    const { postId } = useParams();
    const { loggedInUser } = useContext(UserContext);
    const [post, setPost] = useState({
        id: null,
        nickname: '',
        title: '',
        content: '',
        access: null,
        messages: []
    })

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`,
                    {withCredentials: true});

                if (response.data && response.data.data) {
                    const sortedMessages = response.data.data.messages.sort((a, b) => a.createdAt - b.createdAt);
                    setPost({
                        ...response.data.data,
                        messages: sortedMessages
                    });
                }

            } catch (error) {
                console.error("게시글 정보 가져오기 실패: ", error);
                alert("게시글 정보를 가져오는데 실패했습니다.");
            }
        };

        fetchPostData();
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            console.log('이래도 안나와? : ' + loggedInUser.nickname);
        }
    }, [loggedInUser]);

    return (
        <div>
            <h4>제목: {post.title}</h4>
            {
                loggedInUser ? <div>{loggedInUser.nickname}</div> : <div>로그인 안됨</div>
            }
            {/*{loggedInUser.nickname === post.nickname ? <button>수정</button> : null}*/}
            <p>내용: {post.content}</p>
            <ListGroup>
            {
                post.messages.map((message, idx) => {

                    if(message.role === "user") {
                        return (
                            <ListGroup.Item key={idx}>
                                {post.nickname}: {message.content}
                            </ListGroup.Item>
                        )
                    } else if(message.role === "assistant") {
                        return (
                            <ListGroup.Item key={idx}>
                                {message.role}: {message.content}
                            </ListGroup.Item>
                        )
                    } else {
                        return <div key={idx}>메시지 오류</div>
                    }

                })
            }
            </ListGroup>
        </div>
    );
}

export default PostDetail;
