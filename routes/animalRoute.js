const router = require('express').Router()

const {getAnimals, createAnimal, getAnimal, updateAnimal, deleteAnimal, createOrUpdate, addFoodToAnimal, removeFoodFromAnimal} = require("../controllers/animalController")

router.route('/').get(getAnimals).post(createAnimal)

router.route("/:id").get(getAnimal).patch(updateAnimal).delete(deleteAnimal)

router.route("/:id?").put(createOrUpdate)

// associations

router.route('/:animal_id/food/:food_id').post(addFoodToAnimal);
router.route('/:animal_id/food/:food_id').delete(removeFoodFromAnimal);


module.exports = router