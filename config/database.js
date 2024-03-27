const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo_db', 'felhasznalonev', 'jelszo', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;