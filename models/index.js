
const Animal = require('./Animal');
const Medicine = require('./Medicine');
const Food = require('./Food');
const Zookeeper = require('./Zookeper');

Animal.belongsTo(Medicine, {
   as: "medicine",
   foreignKey: "medicine_id"
})

Medicine.hasOne(Animal, {
  as: "animal",
  foreignKey: "medicine_id"
})


Animal.belongsTo(Zookeeper, {
    as: 'zookeeper',
    foreignKey: 'zookeeper_id',
  });

Zookeeper.hasMany(Animal, {
  as: 'animals',
  foreignKey: 'zookeeper_id',
});

Animal.belongsToMany(Food, {
  as: 'foods',
  through: 'animal_food',
  foreignKey: 'animal_id',
  otherKey: 'food_id',
  updatedAt: false,
});

Food.belongsToMany(Animal, {
  as: 'animals',
  through: 'animal_food',
  foreignKey: 'food_id',
  otherKey: 'animal_id',
  updatedAt: false,
});


module.exports = {
  Animal,
  Food,
  Zookeeper,
  Medicine
};