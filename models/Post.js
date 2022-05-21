const { Model, DataTypes } = require("sequalize");
const sequalize = require("../config/connection");

class Post extends Model {}

Post.init(
  {},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
