import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from "../../contexts/UserContext.jsx";

const Navbar = () => {
    const { logged } = useUserContext();

    return (
        <nav className="navbar">
            <ul className="navbar-links m-0">
                <li>
                    <NavLink to="/" activeclassname="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/create-quiz" activeclassname="active">Criar Quiz</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeclassname="active">Contact</NavLink>
                </li>
                {!logged ? (
                    <li>
                        <NavLink to="/login" activeclassname="active">Login</NavLink>
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink to="/profile" activeclassname="active">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" activeclassname="active">Logout</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
