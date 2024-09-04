const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/question', questionController.getAllQuestions);
router.get('/question/quiz/:quizId', questionController.getQuestionsFromQuiz);
router.post('/question', questionController.createQuestion);
router.get('/question/:id', questionController.getQuestionById);
router.put('/question/:id', questionController.updateQuestion);
router.delete('/question/:id', questionController.deleteQuestion);

module.exports = router;
