const { DataTypes } = require("sequelize");
const db = require("../db");

const Arc = db.define("arc", {
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document1: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    document2: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    
});

module.exports = Arc;
