module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Questions',
                key: 'id',
            }
        }
    });

    Answer.associate = function(models) {
        Answer.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    };

    return Answer;
};
