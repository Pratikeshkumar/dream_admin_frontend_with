const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user");

const User_Friend = sq.define("user_friend", {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  friend_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

module.exports = User_Friend;
