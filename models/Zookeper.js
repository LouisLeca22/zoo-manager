const { Model, DataTypes } = require("sequelize");
const db = require('../connectDB');

class Zookeeper extends Model {}

Zookeeper.init({
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT
}, {
  sequelize: db,
  tableName: 'zookeeper',
});

module.exports = Zookeeper;