const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
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
