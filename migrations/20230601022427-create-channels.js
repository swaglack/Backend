'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Channels', {
      channelId: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      channelName: {
        type:Sequelize.STRING,
        allowNull:false
      },
      channelMaster: {
        type:Sequelize.STRING,
        allowNull:false
      },
      channelCreatedAt: {
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      channelUpdatedAt: {
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      workspaceId: {
        type:Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: "Workspaces",
            key: "workspaceId",
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Channels');
  }
};