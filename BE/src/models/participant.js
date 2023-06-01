'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Participant.hasMany(models.QuizParticipiantAnswers, { foreignKey: 'participant_id' });
      Participant.hasMany(models.ParticipantQuizs, { foreignKey: 'participant_id' });
      Participant.hasMany(models.Historys, { foreignKey: 'participant_id' });
      // define association here
    }
  };
  //object relational mapping
  Participant.init({
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    username: DataTypes.STRING(255),
    role: DataTypes.STRING(255),
    image: DataTypes.BLOB('long'),
    refresh_token: DataTypes.STRING(255),
    refresh_expired: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Participants',
  });
  return Participant;
};