const router = require('express').Router()

const {getFoods, createFood, getFood, updateFood, deleteFood, createOrUpdate} = require("../controllers/foodController")

router.route('/').get(getFoods).post(createFood)

router.route("/:id").get(getFood).patch(updateFood).delete(deleteFood)

router.route("/:id?").put(createOrUpdate)

module.exports = router