const { DataTypes } = require("sequelize");
const db = require("../db");
 
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
        type: DataTypes.STRING,
        allowNull: false
    },
    garage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acreage: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Home;
