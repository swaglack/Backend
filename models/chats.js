'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Channels, {
        targetKey: 'channelId',
        foreignKey: 'channelId',
      });
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }
  Chats.init({
    chatId: {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
    },
    chatContent: {
      type:DataTypes.STRING,
      allowNull:false
    },
    chatImg: {
      type:DataTypes.STRING,
      allowNull:true
    },
    chatCreatedAt: {
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    },
    channelId: {
      type:DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Channels",
          key: "channelId",
        }
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Users",
          key: "userId",
        }
    } 
  },{
    timestamps:false,
    sequelize,
    modelName: 'Chats',
  });
  return Chats;
};