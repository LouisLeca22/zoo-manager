const router = require('express').Router()

const {getZookeepers, getZookeeper, createZookeeper, updateZookeeper, deleteZookeeper, createOrUpdateZookeeper, readAnimals} = require("../controllers/zookeeperController")

router.route('/').get(getZookeepers).post(createZookeeper)

router.route("/:id").get(getZookeeper).patch(updateZookeeper).delete(deleteZookeeper)

router.route('/:id?').put(createOrUpdateZookeeper)

router.route('/:id/animals').get(readAnimals)

module.exports = router