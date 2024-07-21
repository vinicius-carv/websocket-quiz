import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links m-0">
                <li>
                    <NavLink to="/" activeclassname="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/services" activeclassname="active">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeclassname="active">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeclassname="active">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
