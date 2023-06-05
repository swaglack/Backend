'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWorkspaces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserWorkspaces.init({
    userWorkspaceId:{
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
    workspaceId: {
      type:DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Workspaces",
          key: "workspaceId",
        }
    }
  }, {
    timestamps:false,
    sequelize,
    modelName: 'UserWorkspaces',
  });
  return UserWorkspaces;
};