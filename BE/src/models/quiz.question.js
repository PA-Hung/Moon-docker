'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuizQuestion.hasMany(models.QuizAnswers, { foreignKey: 'question_id' });
      QuizQuestion.hasMany(models.QuizParticipiantAnswers, { foreignKey: 'question_id' });
      QuizQuestion.belongsTo(models.Quizs, { foreignKey: 'quiz_id' })
      // define association here
    }
  };
  //object relational mapping
  QuizQuestion.init({
    quiz_id: DataTypes.INTEGER(),
    description: DataTypes.TEXT(),
    image: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'QuizQuestions',
  });
  return QuizQuestion;
};