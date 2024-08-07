import { useState, useEffect } from 'react';
import axios from 'axios';

const useSessionCheck = () => {
    const [sessionValid, setSessionValid] = useState(false);
    const [sessionChecking, setSessionChecking] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState({
        email: '',
        nickname: ''
    });
    const [statusCode, setStatusCode] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/session/check`, {withCredentials: true});

                setStatusCode(response.status);
                if (response.status === 200) {
                    setSessionValid(true);
                    setLoggedInUser({
                        email: response.data.data.email,
                        nickname: response.data.data.nickname
                    });

                }
            } catch (error) {
                setStatusCode(error.response.status);
                setSessionValid(false);
                setError(error);
            } finally {
                setSessionChecking(false);
            }
        };

        checkSession();
    }, []);

    return { sessionValid, sessionChecking, error, loggedInUser, statusCode };
};

export default useSessionCheck;
