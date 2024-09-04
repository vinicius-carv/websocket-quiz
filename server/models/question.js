module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        questionType: {
            type: DataTypes.ENUM('MultipleChoices', 'TruthFalse'),
            allowNull: false,
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Quizzes',
                key: 'id',
            }
        },
    });

    Question.associate = function(models) {
        Question.belongsTo(models.Quiz, { foreignKey: 'quizId', as: 'quiz' });
        Question.hasMany(models.Answer, { foreignKey: 'questionId', as: 'answers' });
    };

    return Question;
};
