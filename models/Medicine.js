const { Model, DataTypes } = require("sequelize");
const db = require('../connectDB');

class Medicine extends Model {}

Medicine.init({
  solution: DataTypes.TEXT,
  dose: DataTypes.SMALLINT
}, {
  sequelize: db,
  tableName: 'medicine',
});

module.exports = Medicine;