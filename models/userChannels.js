'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChannels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  UserChannels.init({
    userChannelId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Users",
          key: "userId",
        }
    },
    channelId: {
      type:DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Channels",
          key: "channelId",
        }
    }
  }, {
    timestamps:false,
    sequelize,
    modelName: 'UserChannels',
  });
  return UserChannels;
};