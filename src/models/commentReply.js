const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user");
const Video = require("./video");
const PostComment = require("./comment");

const PostCommentReply = sq.define(
  "commentReply",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
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
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostComment,
        key: 'id'
      }
    },
    reply_message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

module.exports = PostCommentReply;
