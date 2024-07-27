import React from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


const Home = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/quiz?id=${id}`);
    };

    return (
        <div>
            <div>
                <h1>{t('Home')}</h1>
                <p>{t('Welcome')}</p>
            </div>
            <div className="quizes d-flex flex-row gap-5">
                {/*TODO: Implement Quiz displaying, placeholder for now*/}
                <div onClick={() => handleNavigate(1)} className="card col-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                QuizName Example
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                QuizSubtitle
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => handleNavigate(2)} className="card col-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                QuizName Example
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                QuizSubtitle
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => handleNavigate(3)} className="card col-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                QuizName Example
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                QuizSubtitle
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
