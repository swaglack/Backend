'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserChannels', {
      userChannelId:{
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
          }
      },
      channelId: {
        type:Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: "Channels",
            key: "channelId",
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserChannels');
  }
};