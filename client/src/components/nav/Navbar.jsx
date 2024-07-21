import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links m-0">
                <li>
                    <NavLink to="/" activeClassName="active" exact>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/services" activeClassName="active">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName="active">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
