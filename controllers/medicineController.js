const {Medicine} = require("../models");

const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.findAll({
          include: 'animal',
          order: [
            ['solution', 'ASC'],
          ],
        });
        res.json(medicines);
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

const getMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const medicine = await Medicine.findByPk(id, {include: "animal"});
        if (medicine) {
          res.json(medicine);
        } else {
          res.status(404).json({
            message: 'Impossible de trouver ce médicament',
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
    }


const createMedicine = async (req, res) => {
    try {
        const {
          solution,
          dose
        } = req.body;
  
        if (!solution) {
          res.status(400).json({
            message: 'Le champ solution name est obligatoire',
          });

        } else {
          const newMedicine = await Medicine.create({
            solution,
            dose
          });
          res.json(newMedicine);
          }
        } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
}


const updateMedicine = async (req, res) => {
    try {
        const {
          id
        } = req.params;
        const {
          solution,
          dose
        } = req.body;

        if (!id) {
          res.status(400).json({
            message: 'Le paramètre id est obligatoire',
          });
        } else {
          const medicine = await Medicine.findByPk(id);
          if (medicine) {
            if (solution) {
              medicine.solution = solution;
            }
            if (dose) {
              medicine.dose = dose;
            }

            const savedMedicine = await medicine.save();
            res.json(savedMedicine);
          } else {
            res.status(404).json({
              message: 'Ce médicament  n\'existe pas',
            });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
}

const deleteMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const medicine = await Medicine.findByPk(id);
        if (medicine) {
          await medicine.destroy();
          res.json('médicament supprimée');
        }
        else {
          res.status(404).json(`Aucune médicament avec l'id ${id}`);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

const createOrUpdateMedicine = async (req, res) => {
    try {
        let medicine;
        if (req.params.id) {
          medicine = await Medicine.findByPk(req.params.id);
        }
        if (medicine) {
          await updateMedicine(req, res);
        } else {
          await createMedicine(req, res);
        }
      } catch (error) {
        console.trace(error);
        res.status(500).json(error.message);
      }
}

module.exports = {
    getMedicines,
    getMedicine,
    createMedicine,
    updateMedicine,
    deleteMedicine,
    createOrUpdateMedicine
}