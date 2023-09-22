const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require('./user');
const Video = require("./video");


const Promotion = sq.define(
    "promotions",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        video_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Video,
                key: 'id'
            }
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ending_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = Promotion;


