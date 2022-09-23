const { Zookeeper, Animal} = require('../models')

const getZookeepers = async (req, res) => {
    try {
        const results = await Zookeeper.findAll({
            // Nested includes to retrieve the animal and their food
            include: {
                association: "animals",
                include: 'foods'
            },
            order: [
                ['firstname', 'ASC'],
            ]
        })
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

const getZookeeper = async (req, res) => {
    try {
        const id = req.params.id;
        const zookeeper = await Zookeeper.findByPk(id, {include: "animals"});
        if (zookeeper) {
          res.json(zookeeper);
        } else {
          res.status(404).json({
            message: 'Impossible de trouver ce gardien',
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }

}

const createZookeeper = async (req, res) => {
    try {
        const {
          firstname,
          lastname
        } = req.body;
  
        if (!firstname || !lastname) {
          res.status(400).json({
            message: 'Ces champs sont obligatoires',
          });
        } else {
          const newZookeeper = await Zookeeper.create({
            firstname,
            lastname,
          });
          res.json(newZookeeper);
          }
        } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
}


const updateZookeeper = async (req, res) => {
    try {
        const {
          id
        } = req.params;
        const {
          firstname,
          lastname
        } = req.body;

        if (!id) {
          res.status(400).json({
            message: 'Le paramètre id est obligatoire',
          });
        } else {
          const zookeeper = await Zookeeper.findByPk(id);
          if (zookeeper) {
            if (firstname) {
              zookeeper.firstname = firstname;
            }
            if (lastname) {
              zookeeper.lastname = lastname;
            }

            const savedZookeeper = await zookeeper.save();
            res.json(savedZookeeper);
          } else {
            res.status(404).json({
              message: 'Ce gardien  n\'existe pas',
            });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
}

const deleteZookeeper = async (req, res) => {
    try {
        const id = req.params.id;
        const zookeeper = await Zookeeper.findByPk(id);
        if (zookeeper) {
          await zookeeper.destroy();
          res.json('gardien supprimée');
        }
        else {
          res.status(404).json(`Aucune gardien avec l'id ${id}`);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

const createOrUpdateZookeeper = async (req, res) => {
    try {
        let zookeeper;
        if (req.params.id) {
          zookeeper = await Zookeeper.findByPk(req.params.id);
        }
        if (zookeeper) {
          await updateZookeeper(req, res);
        } else {
          await createZookeeper(req, res);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

const readAnimals = async (req, res) => {
    try {
        const id = req.params.id;
        const animals = await Animal.findAll({
          where: {
            zookeeper_id: id,
          },
          include: 'foods'
        });
        res.json(animals);
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

module.exports = {
    getZookeepers,
    getZookeeper,
    createZookeeper,
    updateZookeeper,
    deleteZookeeper,
    createOrUpdateZookeeper,
    readAnimals
}