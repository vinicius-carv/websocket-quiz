import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = React.useState([]);
    const [quizError, setQuizError] = React.useState(false);

    useEffect(() => {
        const fetchQuizes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz`);
                if (response.status !== 200) {
                    setQuizError(true);
                } else {
                    setQuizzes(response.data);
                    setQuizError(false);
                }
            } catch (error) {
                console.error('Error fetching quizes:', error);
                setQuizError(true);
            }
        };
        fetchQuizes();
    }, []);

    const handleNavigate = (id) => {
        navigate(`/quiz?id=${id}`);
    };

    return (
        <div className="container align-self-center">
            <h1 className="align-self-center">
                Quizes recentes
            </h1>
            <div className="quizes align-self-baseline d-grid gap-5 justify-content-center pt-3 pb-5">
                {!quizError && quizzes.length > 0 && (
                    quizzes.map((quiz) => (
                        <div className="card" key={quiz.id} onClick={() => handleNavigate(quiz.id)}>
                            <div className="card-body">
                                <div className="row mb-3 quiz-thumbnail-container">
                                    <img className="quiz-thumbnail" src={(quiz.imageUrl!==null)?quiz.imageUrl:"https://placeholder.com/1920x1080"} alt="" />
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h4>{quiz.title}</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="m-0">{quiz.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
