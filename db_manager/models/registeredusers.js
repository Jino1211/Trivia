"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class registeredUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  registeredUsers.init(
    {
      email: { type: DataTypes.STRING, primaryKey: true },
      user_name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "registeredUsers",
      underscored: true,
    }
  );
  return registeredUsers;
};
