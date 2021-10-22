const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Blog = db.define("blog", {
  
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    keywords: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Blog;
