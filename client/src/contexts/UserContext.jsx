import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(undefined);

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const savedLoggedState = localStorage.getItem('logged');
        if (savedLoggedState === 'true') {
            setLogged(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('logged', logged ? 'true' : 'false');
    }, [logged]);

    return (
        <UserContext.Provider value={{ logged, setLogged }}>
            {children}
        </UserContext.Provider>
    );
};
