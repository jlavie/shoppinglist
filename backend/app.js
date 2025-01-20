const express = require('express');
const mongoose = require('mongoose');

const ingredientRoutes = require('./routes/ingredient');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/shoppinglist')
.then(() => console.log('Connection à MongoDB réussie'))
.catch(() => console.log('Connection à MongoDB échouée'))

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/ingredient', ingredientRoutes);

app.get("/", (req, res) => {
    res.send("test")
    console.log('test')
})

module.exports = app;