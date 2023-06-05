'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
      },
      userName: {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      nickName: {
        type:Sequelize.STRING,
        allowNull:false
      },
      userPwd: {
        type:Sequelize.STRING,
        allowNull:false
      },
      userCreatedAt: {
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};