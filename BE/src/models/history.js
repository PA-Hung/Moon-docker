'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Quizs, { foreignKey: 'quiz_id' })
      History.belongsTo(models.Participants, { foreignKey: 'participant_id' })
      // define association here
    }
  };
  //object relational mapping
  History.init({
    participant_id: DataTypes.INTEGER(11),
    quiz_id: DataTypes.INTEGER(11),
    total_questions: DataTypes.INTEGER(11),
    total_correct: DataTypes.INTEGER(11),
  }, {
    sequelize,
    modelName: 'Historys',
  });
  return History;
};