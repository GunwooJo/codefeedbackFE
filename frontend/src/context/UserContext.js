import React, { createContext, useState } from 'react';

// Context 생성
export const UserContext = createContext(null);

// Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = (userInfo) => {
        setLoggedInUser(userInfo);
    };

    const logout = () => {
        setLoggedInUser(null);
    };

    return (
        <UserContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
