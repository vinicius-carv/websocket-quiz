const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', quizRoutes);
app.use('/api', questionRoutes);
app.use('/api', answerRoutes);

module.exports = app;
