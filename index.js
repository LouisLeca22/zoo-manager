// Imports 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const animalRoute = require('./routes/animalRoute')
const zookeeperRoute = require('./routes/zookeeperRoute')
const foodRoute = require('./routes/foodRoute')
const medicineRoute = require('./routes/medicineRoute')

// express app
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/animals', animalRoute)
app.use('/api/zookeepers', zookeeperRoute)
app.use('/api/foods', foodRoute)
app.use('/api/medicines', medicineRoute)
// client
app.get("*", (req, res) => res.sendFile(__dirname, "./public/index.html") )


app.listen(PORT, () => {
    console.log(`Listen on http://localhost:${PORT}`)
})

