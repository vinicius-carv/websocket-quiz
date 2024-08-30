import React from 'react';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { setLogged } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogged(false);
        localStorage.removeItem('logged');
        localStorage.removeItem('userId')
        navigate('/login');
    };

    return (
        <div className="container align-self-center">
            <button onClick={handleLogout}>Confirm logout</button>
        </div>
    );
};

export default Logout;