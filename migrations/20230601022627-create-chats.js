'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      chatId: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      },
      chatContent: {
        type:Sequelize.STRING,
        allowNull:false
      },
      chatImg: {
        type:Sequelize.STRING,
        allowNull:true
      },
      chatCreatedAt: {
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
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
    await queryInterface.dropTable('Chats');
  }
};