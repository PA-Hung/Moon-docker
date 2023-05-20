'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuizAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_id: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.INTEGER,
        indexes: [{
          fields: ['question_id']
        }]
      },
      description: {
        type: Sequelize.TEXT(),
        allowNull: true,
      },
      correct_answer: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizAnswers');
  }
};