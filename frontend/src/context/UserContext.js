import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = (userInfo) => {
        console.log("로그인된 유저: " + JSON.stringify(userInfo));
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
