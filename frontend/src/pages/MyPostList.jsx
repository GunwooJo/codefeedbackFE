import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ListGroup from "react-bootstrap/ListGroup";
import {Link, useNavigate} from "react-router-dom";
import styles from '../styles/PostList.module.css'
import Badge from 'react-bootstrap/Badge';
import styles2 from "../styles/PostDetail.module.css";

function MyPostList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/mypost`,
                    {withCredentials: true});
                setPosts(response.data.data);

            } catch (error) {
                console.error("게시글 목록 가져오기 실패: ", error);

                if (error.response.status === 401) {
                    alert("로그인이 필요합니다.");
                    navigate('/user/login');
                } else {
                    alert("게시글 목록을 가져오는데 실패했습니다.");
                }
            }
        };

        fetchPostData();
    }, []);


    return (
        <div>
            <h4 className={styles.title}>내 게시글 목록</h4>
            <div className={styles2.buttonContainer}>
                <button className={styles2.navigationButton} onClick={() => navigate(`/`)}>홈</button>
            </div>
            <ListGroup>
                {
                    posts.map((post, idx) => {
                        return (
                            <ListGroup.Item key={idx} className={styles.content}>
                                <Link style={{textDecoration: "none", color: "black"}}
                                      to={`/post/${post.id}`}>{post.title}</Link> {post.access ? null :
                                <Badge bg="primary">비공개</Badge>}
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    );
}

export default MyPostList;
