import React, {useState, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

const ViewQuiz = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("id");

    const [quizFound, setQuizFound] = useState(null); // null means not loaded yet, false means not found, and object means found
    const [quizNotFound, setQuizNotFound] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/quiz/${quizId}`);
                if (!response.ok) {
                    setQuizNotFound(true);
                } else {
                    const quizData = await response.json();
                    setQuizFound(quizData);
                    setQuizNotFound(false);
                }
            } catch (error) {
                console.error('Error fetching the quiz:', error);
                setQuizNotFound(true);
            }
        };

        if (quizId) {
            fetchQuiz();
        } else {
            setQuizNotFound(true);
        }
    }, [quizId]);

    return (
        <div className="container align-self-center position-relative">
            {quizNotFound && <span className="fw-bold border border-danger border-2 p-3">Quiz with id: {quizId} not found</span>}
            {quizFound && (
                <div className="quiz-container container d-flex gap-5">
                    <div className="quiz-questions-container col">
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 1</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 2</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 3</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 4</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 5</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 6</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 7</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 8</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 9</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                        <div className="quiz-question border p-3 rounded-3 mb-3">
                            <h5>Question 10</h5>
                            <div className="d-grid quiz-answers">
                                <span className="col-3">Answer 1</span>
                                <span className="col-3">Answer 2</span>
                                <span className="col-3">Answer 3</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="quiz-info-container col border rounded-3 overflow-hidden d-flex flex-column align-items-center gap-4">
                        {/*TODO: Implement quiz cover*/}
                        <div className="quiz-img-container">
                            <img
                                src='https://www.planetcarsz.com/img/noticias/2022/05/koenigsegg-jesko-absolut-2022-04-20220502175001-1920x1080.jpg'
                                alt='Quiz' className="w-100"/>
                        </div>
                        <div className="quiz-data-container d-flex flex-column pb-4">
                            <h2>{quizFound.title}</h2>
                            <p>{quizFound.description}</p>
                            <button className="btn btn-primary">Iniciar Quiz</button>
                            <div className="d-flex flex-row align-items-center justify-content-center gap-5 pt-3">
                                <button className="quiz-action-btn p-0">
                                    <i className="fa fa-edit display-6"></i>
                                </button>
                                <button className="quiz-action-btn p-0">
                                    <i className="fa fa-heart display-6"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewQuiz;
