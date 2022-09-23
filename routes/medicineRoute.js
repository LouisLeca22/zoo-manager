const router = require('express').Router()

const {getMedicines, getMedicine, createMedicine, updateMedicine, deleteMedicine, createOrUpdateMedicine} = require("../controllers/medicineController")

router.route('/').get(getMedicines).post(createMedicine)

router.route("/:id").get(getMedicine).patch(updateMedicine).delete(deleteMedicine)

router.route('/:id?').put(createOrUpdateMedicine)

module.exports = router