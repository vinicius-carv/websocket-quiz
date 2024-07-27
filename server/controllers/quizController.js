const { Quiz, Question } = require('../models');

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll({ include: [{ model: Question, as: 'questions' }] });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id, { include: [{ model: Question, as: 'questions' }] });
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            await quiz.update(req.body);
            res.json(quiz);
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (quiz) {
            await quiz.destroy();
            res.json({ message: 'Quiz deleted' });
        } else {
            res.status(404).json({ message: 'Quiz not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
