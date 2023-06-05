'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workspaces extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Channels, {
        sourceKey: 'workspaceId',
        foreignKey: 'workspaceId',
      });
      this.belongsToMany(models.Users, {
        as:'workspaces',
        through : 'UserWorkspaces',
        foreignKey: 'workspaceId',
      });
      this.belongsTo(models.Users, {
        targetKey : 'userId',
        foreignKey : 'userId'
      })
    }
  }
  Workspaces.init({
    workspaceId: {
      type:DataTypes.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    workspaceName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    workspaceCreatedAt: {
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    },
    workspaceUpdatedAt: {
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "Users",
        key: "userId",
      }
    },
  }, {
    timestamps:false,
    sequelize,
    modelName: 'Workspaces',
  });
  return Workspaces;
};