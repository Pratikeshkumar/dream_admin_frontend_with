const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");


const Hobbies = sq.define(
    "hobbies",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        hobbies_name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
)

module.exports = Hobbies;