const { Animal, Food } = require('../models');


const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll({
            include: 'foods',
            order: [
                ['name', 'ASC'],
            ],
        });
        res.json(animals);
    } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
    }
}

const getAnimal = async (req, res) => {
    try {
        const id = req.params.id;
        const animal = await Animal.findByPk(id, {
            include: ["foods", "medicine"],
            order: [
                ['name', 'ASC']
            ],
        });
        if (animal) {
            res.json(animal);
        }
        else {
            res.status(404).json(`Aucun animal pour l'id ${id}`);
        }
    } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
    }
}

const createAnimal = async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error('Le nom est obligatoire');
        }
        if (!req.body.class) {
            throw new Error('La famille est obligatoire');
        }
        if (!req.body.type) {
            throw new Error('L\' Espèce obligatoire');
        }

        if (!req.body.zookeeper_id) {
            throw new Error('Un animal doit être associé à un gardien');
        }

        if (!req.body.medicine_id) {
            throw new Error('Un animal doit être associé à un medicine');
        }

        const newAnimal = await Animal.create({
            name: req.body.name,
            type: req.body.type,
            class: req.body.class,
            zookeeper_id: req.body.zookeeper_id,
            medicine_id: req.body.medicine_id,
            age: req.body.age,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            maintenance_cost: req.body.maintenance_cost,
            monthly_visitors: req.body.monthly_visitors,
            weight: req.body.weight,
        });
        res.json(newAnimal);
    } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
    }

}


const updateAnimal = async (req, res) => {
    try {
        const id = req.params.id;
        const animal = await Animal.findByPk(id);
        if (animal) {
            if (req.body.name) {
                animal.name = req.body.name;
            }
            if (req.body.class) {
                animal.class = req.body.class;
            }
            if (req.body.type) {
                animal.type = req.body.type;
            }
            if (req.body.weight) {
                animal.weight = req.body.weight;
            }
            if (req.body.zookeeper_id) {
                animal.zookeeper_id = req.body.zookeeper_id;
            }
            if (req.body.medicine_id) {
                animal.medicine_id = req.body.medicine_id;
            }
            if (req.body.maintenance_cost) {
                animal.maintenance_cost = req.body.maintenance_cost;
            }
            if (req.body.monthly_visitors) {
                animal.monthly_visitors = req.body.monthly_visitors;
            }
            if (req.body.birth_date) {
                animal.birth_date = req.body.birth_date;
            }
            if (req.body.age) {
                animal.age = req.body.age;
            }

            // strange behavior for this field ???
            animal.gender = req.body.gender

            const animalSaved = await animal.save();
            res.json(animalSaved);
        }
        else {
            res.status(404).json(`Aucun animal pour l'id ${id}`);
        }
    } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
    }

}

const deleteAnimal = async (req, res) => {
    try {
        const id = req.params.id;
        const animal = await Animal.findByPk(id);
        if (animal) {
            await animal.destroy();
            res.json('Animal supprimée');
        }
        else {
            res.status(404).json(`Aucune animal avec l'id ${id}`);
        }
    } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
    }
}

const createOrUpdate = async (req, res) => {
    try {
        let animal;
        if (req.params.id) {
            animal = await Animal.findByPk(req.params.id);
        }
        if (animal) {
            await updateAnimal(req, res);
        } else {
            await createAnimal(req, res);
        }
    } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
    }
}

// Association d'un aliment à un animal
const addFoodToAnimal  = async (req, res) => {
    try {
        const foodId = req.params.food_id;
        const animalId = req.params.animal_id;
        const animal = await Animal.findByPk(animalId, {
          include: 'foods'
        });
        if (!animal) {
          return res.status(404).json('Animal non trouvé');
        }
        const food = await Food.findByPk(foodId);
        if (!food) {
          return res.status(404).json('Aliment non trouvé');
        }
        await animal.addFood(food);
        await animal.reload();
        res.json(animal);
      } catch (error) {
        console.trace(error);
        res.status(500).send(error);
      }
}

const removeFoodFromAnimal = async (req, res) => {
    try {
        const animalId = req.params.animal_id;
        const foodId = req.params.food_id;
        const animal = await Animal.findByPk(animalId, {
          include: 'foods'
        });
        if (!animal) {
          return res.status(404).json('Animal non trouvé');
        }
        const food = await Food.findByPk(foodId);
        if (!food) {
          return res.status(404).json('Aliment non trouvé');
        }
        await animal.removeFood(food);
        await animal.reload();
        res.json(animal);
      } catch (error) {
        console.trace(error);
        res.status(500).send(error);
      }
}

module.exports = {
    getAnimals,
    getAnimal,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    createOrUpdate,
    addFoodToAnimal,
    removeFoodFromAnimal
}