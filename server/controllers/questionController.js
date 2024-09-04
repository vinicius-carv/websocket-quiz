const { Question, Answer } = require('../models');

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll({ include: [{ model: Answer, as: 'answers' }] });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getQuestionsFromQuiz = async (req, res) => {
    try {
        const questions = await Question.findAll({
            where: { quizId: req.params.quizId },
            include: [{ model: Answer, as: 'answers' }]
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.createQuestion = async (req, res) => {
    try {
        const { name, question, questionType, quizId } = req.body;
        const newQuestion = await Question.create({name, question, questionType, quizId})
        res.status(201).json({ id: newQuestion.id, quizId: newQuestion.quizId, message: 'Question created successfully' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question) {
            await question.update(req.body);
            res.json(question);
        } else {
            res.status(404).json({ message: 'question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question) {
            await question.destroy();
            res.json({ message: 'Question deleted' });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};