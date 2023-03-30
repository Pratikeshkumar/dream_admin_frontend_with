const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Bio = sq.define(
  "bio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Bio;
