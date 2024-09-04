const { Question, Answer } = require('../models');

exports.getAllAnswers = async (req, res) => {
    try {
        const answers = await Answer.findAll();
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getAnswersFromQuestion = async (req, res) => {
    try {
        const answers = await Answer.findAll({where: {questionId: req.params.questionId}});
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.createAnswer = async (req, res) => {
    try {
        const { answer, isCorrect, questionId } = req.body;
        const newAnswer = await Answer.create({ answer, isCorrect, questionId })
        res.status(201).json({ id: newAnswer.id, questionId: newAnswer.questionId, message: 'Answer created successfully' });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getAnswerById = async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (answer) {
            res.json(answer);
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (answer) {
            await answer.update(req.body);
            res.json(answer);
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (answer) {
            await answer.destroy();
            res.json({ message: 'Answer deleted' });
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};