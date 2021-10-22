const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Home = db.define("home", {
  
    address: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    squareFootage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bedroom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bathroom: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    garage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acreage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Home;