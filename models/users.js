'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Chats, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.belongsToMany(models.Workspaces, {
        through : 'UserWorkspaces',
        foreignKey: 'userId',
      });
      this.belongsToMany(models.Channels, {
        through : 'UserChannels',
        foreignKey: 'userId',
      });
      this.hasMany(models.Workspaces, {
        sourceKey : 'userId',
        foreignKey : 'userId'
      })
    }
  }
  Users.init({
    userId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true
    },
    userName: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    nickName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    userPwd: {
      type:DataTypes.STRING,
      allowNull:false
    },
    userCreatedAt: {
      type:DataTypes.DATE,
      defaultValue:DataTypes.NOW
    }
  }, {
    
    timestamps:false,
    sequelize,
    modelName: 'Users',
  });
  return Users;
};