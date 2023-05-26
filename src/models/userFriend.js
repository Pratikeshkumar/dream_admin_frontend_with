const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

// const User_Friend = sq.define("user_friend", {
//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'user',
//       key: "id",
//     },
//   },
//   friend_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'user',
//       key: "id",
//     },
//   },
// });


const User_Friend = {}

module.exports = User_Friend;
