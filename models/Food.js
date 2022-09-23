const { Model, DataTypes } = require("sequelize");
const db = require('../connectDB');

class Food extends Model {}

Food.init({
  meal: DataTypes.TEXT,
  quantity: DataTypes.SMALLINT
}, {
  sequelize: db,
  tableName: 'food',
});

module.exports = Food;