'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuizQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quiz_id: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.INTEGER,
        indexes: [{
          fields: ['quiz_id']
        }]
      },
      description: {
        type: Sequelize.TEXT()
      },
      image: {
        type: Sequelize.BLOB('long')
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
    await queryInterface.dropTable('QuizQuestions');
  }
};