'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserWorkspaces', {
      userWorkspaceId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
      },
      userId: {
        type:Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: "Users",
            key: "userId",
						onDelete: "CASCADE",
          }
      },
      workspaceId: {
        type:Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: "Workspaces",
            key: "workspaceId",
						onDelete: "CASCADE",
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserWorkspaces');
  }
};