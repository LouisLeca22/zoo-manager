const { Model, DataTypes } = require("sequelize");
const db = require('../connectDB');

class Animal extends Model {}

Animal.init({
  name: DataTypes.TEXT,
  class: DataTypes.TEXT,
  type: DataTypes.TEXT,
  age: DataTypes.SMALLINT,
  birth_date: DataTypes.DATE,
  gender: DataTypes.BOOLEAN,
  maintenance_cost: DataTypes.INTEGER,
  monthly_visitors: DataTypes.INTEGER,
  weight: DataTypes.SMALLINT
}, {
  sequelize: db,
  tableName: 'animal',
});

module.exports = Animal;