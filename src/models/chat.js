const {sq} = require('../config/db')
const User = require('./user')
const {DataTypes} = require('sequelize')



const Message = sq.define(
    "message",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true
      },
      parentMessageId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      audio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  module.exports = Message
  