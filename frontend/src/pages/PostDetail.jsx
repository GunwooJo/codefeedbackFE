import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DeletePost from '../components/DeletePost';
import styles from '../styles/PostDetail.module.css'
import ReactMarkdown from "react-markdown";
import Badge from 'react-bootstrap/Badge';
import useSessionCheck from "../hooks/useSessionCheck";

function PostDetail() {

    const {loggedInUser} = useSessionCheck();

    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({
        id: null,
        nickname: '',
        title: '',
        content: '',
        access: null,
        messages: []
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

                if (error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate('/user/login');
                } else {
                    alert("게시글 정보를 가져오는데 실패했습니다.");
                }
            }
        };

        fetchPostData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/post/${postId}`, {withCredentials: true});
            alert("게시글이 삭제되었습니다.");
            navigate('/');
        } catch (error) {
            console.error("게시글 삭제 실패: ", error);

            if (error.response.status === 401) {
                alert("로그인이 필요합니다.");
                navigate('/user/login');
            } else {
                alert("게시글 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div>
            <h4 className={styles.title}>제목: {post.title}</h4>
            <div>{localStorage.getItem("")}</div>
            {
                loggedInUser.nickname === post.nickname ?
                    <div className={styles.buttonContainer}>
                        <button className={styles.navigationButton}
                                onClick={() => navigate(`/post/edit/${postId}`)}>수정
                        </button>
                        <button className={styles.navigationButton} onClick={() => setShowDeleteModal(true)}>삭제</button>
                        <button className={styles.navigationButton} onClick={() => navigate(`/post/public`)}>목록</button>
                    </div> :
                    <button className={styles.navigationButton} onClick={() => navigate(`/post/public`)}>목록</button>
            }

            <p className={styles.content}>요약: {post.content}</p>
            <ListGroup>
            {
                post.messages.map((message, idx) => {

                    if(message.role === "user") {
                        return (
                            <ListGroup.Item key={idx} className={styles.userMessage}>
                                <Badge bg="primary">{post.nickname}</Badge><br/> {message.content}
                            </ListGroup.Item>
                        )
                    } else if(message.role === "system") {
                        return (
                            <ListGroup.Item key={idx} className={styles.systemMessage}>
                                <pre className={styles.codeStyle}>
                                    <Badge bg="success">인공지능</Badge> <ReactMarkdown>{message.content}</ReactMarkdown>
                                </pre>
                            </ListGroup.Item>
                        )
                    } else {
                        return <div key={idx}>메시지 오류</div>
                    }

                })
            }
            </ListGroup>
            <DeletePost
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default PostDetail;
