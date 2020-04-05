const express = require('express');
const router = express.Router();
const orders = require('./controller');

// GET / - Fetch All Orders
router.get('/', orders.getAll);

// GET / - Fetch Orders by params
router.get('/search', orders.search);

// GET /:id - Fetch Order by ID
router.get('/:id', orders.getById);

// POST / - Create new Order 
router.post('/', orders.createNew);

// PUT /:id - Update a Order by ID
router.put('/:id', orders.updateById);

module.exports = router;