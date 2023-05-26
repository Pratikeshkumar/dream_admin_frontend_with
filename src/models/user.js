const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  social_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_pic_small: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  social: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  device_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  long: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  online: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  verified: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  auth_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  device: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  wallet: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  paypal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reset_wallet_datetime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fb_id: {
    type: DataTypes.STRING,
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
  timestamps: false,
  freezeTableName: true,
});

module.exports = User;



