const { Model, DataTypes } = require("sequalize");
const sequalize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
