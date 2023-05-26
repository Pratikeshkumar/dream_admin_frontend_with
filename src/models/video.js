const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const Video = sq.define(
  "video",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thum: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gif: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sound_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    privacy_type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'public'
    },
    allow_comments: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    allow_duet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    block: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duet_video_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    old_video_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    promote: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: function () {
        let d = new Date();
        return d.toISOString();
      },
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
