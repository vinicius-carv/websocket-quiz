import React, {useState, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";

const ViewQuiz = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("id");

    const [quizFound, setQuizFound] = useState(null);
    const [quizNotFound, setQuizNotFound] = useState(false);

    const [questions, setQuestions] = React.useState([]);
    const [questionNotFound, setQuestionNotFound] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}`);
                if (response.status !== 200) {
                    setQuizNotFound(true);
                } else {
                    const quizData = response.data;
                    setQuizFound(quizData);
                    setQuizNotFound(false);
                }
            } catch (error) {
                console.error('Error fetching the quiz:', error);
                setQuizNotFound(true);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/question/quiz/${quizId}`);
                if (response.status !== 200) {
                    setQuestionNotFound(true);
                } else {
                    setQuestions(response.data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setQuestionNotFound(true);
            }
        };

        if (quizId) {
            fetchQuiz();
            fetchQuestions();
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
                        {!questionNotFound && questions.length > 0 && (
                            questions.map((question) => (
                                <div className="quiz-question border p-3 rounded-3 mb-3" key={question.id}>
                                    <h5>{question.name}</h5>
                                    <div className="d-grid quiz-answers gap-3">
                                        {question.answers.map((answer) => (
                                            <span className="quiz-answer p-2" key={answer.id} data-is-correct={answer.isCorrect}> {answer.answer} </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                    <div
                        className="quiz-info-container col border rounded-3 overflow-hidden d-flex flex-column align-items-center gap-4">
                        <div className="quiz-img-container">
                            <img
                                src={(quizFound.imageUrl!==null)?quizFound.imageUrl:"https://placeholder.com/1920x1080"}
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
