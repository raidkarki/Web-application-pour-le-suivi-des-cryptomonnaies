const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
  firstname: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = User;