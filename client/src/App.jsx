import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import './scss/App.scss';
import Login from "./pages/logon/Login.jsx";
import Register from "./pages/logon/Register.jsx";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App
