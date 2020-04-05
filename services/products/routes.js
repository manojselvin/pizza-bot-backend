const express = require('express');
const router = express.Router();
const products = require('./controller');

// GET / - Fetch All Products
router.get('/', products.getAll);

// GET / - Fetch Products by params
router.get('/search', products.search);

// GET /:id - Fetch Product by ID
router.get('/:id', products.getById);

// POST / - Create new Product 
router.post('/', products.createNew);

// PUT /:id - Update a Product by ID
router.put('/:id', products.updateById);

module.exports = router;