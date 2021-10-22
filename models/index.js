const User = require("./user");
const Home = require("./home");
const Arc = require("./arc");
const Blog = require("./blog");

// Associations
User.hasOne(Home);
Home.belongsTo(User);

User.hasMany(Arc);
Arc.belongsTo(User);

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = {
    User, Home, Arc, Blog
};
