'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Quiz.belongsToMany(models.Participants, { through: 'ParticipantQuizs', foreignKey: 'quiz_id' });
      Quiz.hasMany(models.ParticipantQuizs, { foreignKey: 'quiz_id' });
      Quiz.hasMany(models.QuizQuestions, { foreignKey: 'quiz_id' });
      Quiz.hasMany(models.Historys, { foreignKey: 'quiz_id' });
      Quiz.hasMany(models.QuizParticipiantAnswers, { foreignKey: 'quiz_id' });
      // define association here
    }
  };
  //object relational mapping
  Quiz.init({
    name: DataTypes.STRING(255),
    description: DataTypes.TEXT(),
    image: DataTypes.BLOB('long'),
    difficulty: DataTypes.STRING(255),
  }, {
    sequelize,
    modelName: 'Quizs',
  });
  return Quiz;
};