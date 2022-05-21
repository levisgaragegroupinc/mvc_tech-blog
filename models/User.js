const { Model, DataTypes } = require("sequalize");
const sequalize = require("../config/connection");

class User extends Model {}

User.init(
  {},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
