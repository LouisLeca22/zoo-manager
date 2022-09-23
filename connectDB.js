const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
  }
});

module.exports = db;
