const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  expiryDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Todo;