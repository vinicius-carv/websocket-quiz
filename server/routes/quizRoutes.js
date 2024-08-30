const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/quiz', quizController.getAllQuizzes);
router.post('/quiz', quizController.createQuiz);
router.get('/quiz/:id', quizController.getQuizById);
router.put('/quiz/:id', quizController.updateQuiz);
router.delete('/quiz/:id', quizController.deleteQuiz);

module.exports = router;
