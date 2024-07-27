const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quizz.sqlite'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Quiz = require('./quiz.js')(sequelize, Sequelize.DataTypes);
db.Question = require('./question.js')(sequelize, Sequelize.DataTypes);
db.Answer = require('./answer.js')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;

