const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

// GET all recipes or search recipes
router.get('/', async (req, res) => {
    const { search } = req.query;
    let query = {};
    if (search) {
        query = { title: { $regex: search, $options: 'i' } }; // Case-insensitive search
    }
    try {
        const recipes = await Recipe.find(query);
        res.render('index', { recipes });
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET form to add a new recipe
router.get('/add', (req, res) => {
    res.render('add');
});

// GET a specific recipe by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('show', { recipe });
    } catch (err) {
        res.status(500).send(err);
    }
});

// POST a new recipe
router.post('/', async (req, res) => {
    const { title, image, description, ingredients, instructions } = req.body;
    const recipe = new Recipe({ title, image, description, ingredients, instructions });
    try {
        await recipe.save();
        res.redirect('/recipes');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
