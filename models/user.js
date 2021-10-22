const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const User = db.define("user", {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
  },
    address: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    IsAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

module.exports = User;
