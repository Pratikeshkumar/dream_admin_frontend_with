const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Video = sq.define(
  "video",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "public",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allow_comments: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "true",
    },
    allow_duet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    block: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    duet_video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    old_video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sound_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    promote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created",
    updatedAt: false,
  }
);

module.exports = Video;
