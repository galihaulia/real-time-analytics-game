'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      project_desc:{
        allowNull: true,
        type: Sequelize.TEXT
      },
      link_market: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      DeveloperId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      GenreId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};