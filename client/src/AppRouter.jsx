import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/logon/Login';
import Register from './pages/logon/Register';
import Logout from "./pages/logon/Logout.jsx";
import CreateQuiz from "./pages/quiz/CreateQuiz.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/create-quiz" element={<CreateQuiz />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>
        </Router>
    );
};

export default AppRouter;