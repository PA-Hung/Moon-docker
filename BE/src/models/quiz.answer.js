'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuizAnswer.belongsTo(models.QuizQuestions, { foreignKey: 'question_id' })
      // define association here
    }
  };
  //object relational mapping
  QuizAnswer.init({
    question_id: DataTypes.INTEGER(),
    description: DataTypes.TEXT(),
    correct_answer: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'QuizAnswers',
  });
  return QuizAnswer;
};