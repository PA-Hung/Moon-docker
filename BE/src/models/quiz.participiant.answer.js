'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizParticipiantAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuizParticipiantAnswer.belongsTo(models.Participants, { foreignKey: 'participant_id' })
      QuizParticipiantAnswer.belongsTo(models.Quizs, { foreignKey: 'quiz_id' })
      QuizParticipiantAnswer.belongsTo(models.QuizQuestions, { foreignKey: 'question_id' })
      // define association here
    }
  };
  //object relational mapping
  QuizParticipiantAnswer.init({
    participant_id: DataTypes.INTEGER(11),
    quiz_id: DataTypes.INTEGER(11),
    question_id: DataTypes.INTEGER(11),
    user_answers: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'QuizParticipiantAnswers',
  });
  return QuizParticipiantAnswer;
};