require('dotenv').config();

const models = require('./models');

const doSomeTests = async () => {
    try {
        const zookeepers = await models.Zookeeper.findAll({
            include: 'animals',
        });
        // console.log(zookeepers[0].animals.map(animal => animal.name))
        const animals1 = await models.Animal.findAll({
            include: 'zookeeper',
        });
        //  console.log(animals1[0].zookeeper.firstname)

        const medicines = await models.Medicine.findAll({include: "animal"});
        //   console.log(medicines[1].animal)
        
        const animals2= await models.Animal.findAll({ include: "medicine" });

        // console.log(animals2[0].medicine)

        const foods= await models.Food.findAll({include: "animals"});
        // console.log(foods[0].animals)
        const animals3 = await models.Animal.findAll({include: "foods"})
        // console.log(animals3[0].foods)

        const animal = await models.Animal.findByPk(1, {
            include: ['foods', 'medicine', 'zookeeper'],
          });
        //   console.log(animal.name, animal.foods[0].meal, animal.medicine.solution, animal.zookeeper.firstname);

    }
    catch (error) {
        console.trace(error);
    }
};

doSomeTests();
