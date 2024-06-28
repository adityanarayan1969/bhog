const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/khana', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const recipeRoutes = require('./routes/recipes');
app.use('/recipes', recipeRoutes);

// Home Route
app.get('/', (req, res) => {
    res.redirect('/recipes');
});

// Start Server
app.listen(5566, () => {
    console.log('Server is running on http://localhost:5566');
});
