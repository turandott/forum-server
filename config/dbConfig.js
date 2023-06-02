
const Sequelize = require('sequelize');

// const sequelize = new Sequelize("intexsoft_courses_olga_c", "olga", "78fchjGTDvb6/df", {
//   dialect: "mysql",
//   host: "nisnas.synology.me"
// });

const sequelize = new Sequelize("forum_db", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});


module.exports = sequelize;

// module.exports = {
//   HOST: 'localhost',
//   USER: 'root',
//   PASSWORD: '',
//   DB: 'node_sequlize_api_db',
//   dialect: 'mysql',

//   pool: {
//       max: 5,
//       min: 0,
//       acquire:30000,
//       idle: 10000,

//   }
// }
