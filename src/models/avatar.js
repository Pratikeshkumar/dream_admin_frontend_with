const { sq } = require('../config/db')
const { DataTypes } = require('sequelize')


const Avatar = sq.define(
    "avatar",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        avatar_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        freezeTableName: true,
        timestamps: true
    }
)

module.exports = Avatar;
