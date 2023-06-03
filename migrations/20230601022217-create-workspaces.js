'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workspaces', {
      workspaceId: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
      workspaceName: {
        type:Sequelize.STRING,
        allowNull:false
      },
      workspaceCreatedAt: {
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      workspaceUpdatedAt: {
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      userId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "Users",
          key: "userId",
        }
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workspaces');
  }
};