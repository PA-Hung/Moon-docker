'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipantQuiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ParticipantQuiz.belongsTo(models.Quizs, { foreignKey: 'quiz_id' })
      ParticipantQuiz.belongsTo(models.Participants, { foreignKey: 'participant_id' })
      // define association here
    }
  };
  //object relational mapping
  ParticipantQuiz.init({
    participant_id: {
      type: DataTypes.INTEGER(),
      primaryKey: true
    },
    quiz_id: {
      type: DataTypes.INTEGER(),
      primaryKey: true
    },
    is_finish: DataTypes.TINYINT(),
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ParticipantQuizs',
  });
  return ParticipantQuiz;
};