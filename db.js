const { Sequelize } = require("sequelize");

//Option 1: passing parameters separately
const sequelize = new Sequelize('park-ridge-server', 'postgres', 'password', { /* PRE HEROKU */
    host: 'localhost',
    dialect: 'postgres',
});
// FOR HEROKU
// const sequelize = new Sequelize(process.env.DATABASE_URL, { /*HEROKU*/
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false, //important
//         }
//     }
// });

// sequelize
//     .authenticate()
//     .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to OVERWATCH: ', err);
//   });

module.exports = sequelize;