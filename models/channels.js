'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Workspaces, {
        targetKey: 'workspaceId',
        foreignKey: 'workspaceId'
      });
      this.hasMany(models.Chats, {
        sourceKey: 'channelId',
        foreignKey: 'channelId',
      });
      this.belongsToMany(models.Channels, {
        as:'channels',
        through: 'UserChannels',
        foreignKey: 'channelId',
      });
    }
  }
  Channels.init({
    channelId: {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    channelName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    channelMaster: {
      type:DataTypes.STRING,
      allowNull:false
    },
    channelCreatedAt: {
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    },
    channelUpdatedAt: {
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    },
    workspaceId: {
      type:DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Workspaces",
          key: "workspaceId",
        }
    }
  },
    {
    timestamps:false,
    sequelize,
    modelName: 'Channels',
  });
  return Channels;
};