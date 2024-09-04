const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/answer', answerController.getAllAnswers);
router.get('/answer/question/:questionId', answerController.getAnswersFromQuestion);
router.post('/answer', answerController.createAnswer);
router.get('/answer/:id', answerController.getAnswerById);
router.put('/answer/:id', answerController.updateAnswer);
router.delete('/answer/:id', answerController.deleteAnswer);

module.exports = router;
