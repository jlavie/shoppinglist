const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const ingredientRoutes = require('./routes/ingredient');
const dishRoutes = require('./routes/dish');
const userRoutes = require('./routes/user');

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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/dish', dishRoutes);
app.use('/api/session/user', userRoutes);

app.get("/", (req, res) => {
    res.send("test")
    console.log('test')
})

module.exports = app;