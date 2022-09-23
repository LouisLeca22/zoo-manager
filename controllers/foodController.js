const {Food} = require("../models");


const getFoods = async (req, res) => {
    try {
        const foods = await Food.findAll();
        res.json(foods);
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

const getFood = async (req, res) => {
    try {
        const id = req.params.id;
        const food = await Food.findByPk(id);
        if (food) {
          res.json(food);
        }
        else {
          res.status(404).json(`Aucun aliment avec l'id ${id}`);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.mesage);
      }

}

const createFood = async (req, res) => {
    try {
        if (!req.body.meal) {
          throw new Error('Le champ repas est obligatoire');
        }
        const newMeal = await Food.create({
          meal: req.body.meal,
          quantity: req.body.quantity,
        });
        res.json(newMeal);
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}


const updateFood = async (req, res) => {
    try {
        const id = req.params.id;
        const food = await Food.findByPk(id);
        if (food) {
          if (req.body.meal) {
            food.meal = req.body.meal;
          }
          if (req.body.quantity) {
            food.quantity = req.body.quantity;
          }
          const foodSaved = await food.save();
          res.json(foodSaved);
        }
        else {
          res.status(404).json(`Aucun repas avec l'id ${id}`);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

const deleteFood = async (req, res) => {
    try {
        const id = req.params.id;
        const food = await Food.findByPk(id);
        if (food) {
          await food.destroy();
          res.json('Aliment supprimé');
        }
        else {
          res.status(404).json(`Aucun aliment avec l'id ${id}`);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}


const createOrUpdate = async (req, res) => {
    try {
        let food;
        if (req.params.id) {
          food = await Food.findByPk(req.params.id);
        }
        if (food) {
          await updateFood(req, res);
        } else {
          await createFood(req, res);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

module.exports = {
    getFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood,
    createOrUpdate
}