module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define('Quiz', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Quiz.associate = function(models) {
        Quiz.hasMany(models.Question, { foreignKey: 'quizId', as: 'questions' });
    };

    return Quiz;
};
