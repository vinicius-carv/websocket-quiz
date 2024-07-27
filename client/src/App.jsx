import React, { useEffect, useState } from 'react';
import './scss/App.scss';
import AppRouter from './AppRouter.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <UserProvider>
            <AppRouter />
        </UserProvider>
    );
}

export default App;