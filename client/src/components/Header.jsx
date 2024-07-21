import React, {useEffect, useState} from 'react';
import en_US from "../assets/langs/en_US.svg";
import pt_BR from "../assets/langs/pt_BR.svg";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";
import Navbar from "./nav/Navbar.jsx";

const Header = () => {

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const { t, i18n } = useTranslation();

    const changeLangumage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="headerContainer d-flex justify-content-between align-items-center px-4">
            <a className="d-flex align-items-center gap-4" href="/">
                <img src={logo} className="logo" alt="logo" />
                <h2 className="edu-au-vic-wa-nt-hand-title m-0">{t('title')}</h2>
            </a>
            <Navbar />
            <div className="d-flex justify-content-center gap-3">
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
                </button>
                <button
                    className="bg-transparent p-0 lang-button"
                    onClick={() => changeLanguage('en')}
                    aria-label={t('English')}
                >
                    <img
                        src={en_US}
                        className="lang-icon"
                        alt={t('English')}
                    />
                </button>
                <button
                    className="bg-transparent p-0 lang-button"
                    onClick={() => changeLanguage('pt')}
                    aria-label={t('Portuguese')}
                >
                    <img
                        src={pt_BR}
                        className="lang-icon"
                        alt={t('Portuguese')}
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
