const { sq } = require("../config/db");
const { DataTypes, DatabaseError } = require("sequelize");
const { User } = require('./user')
const { Video } = require('./video')

const MessageSubscription = sq.define(
    "message_subscription", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    reciever_id: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: User,
            key: 'id'
          }
    },
    sender_id: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: User,
            key: 'id'
          }
    },
    no_of_diamond: {
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
    no_of_allowed_messages: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expire: {
        type: DataTypes.BOOLEAN,
        defaultValue: false

    }

});



module.exports = MessageSubscription;
