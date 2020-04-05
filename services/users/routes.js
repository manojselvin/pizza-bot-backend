const express = require('express');
const router = express.Router();
const users = require('./controller');

// GET / - Fetch All Users
router.get('/', users.getAll);

// GET / - Fetch User by name or email
router.get('/search', users.search);

// GET /:id - Fetch User by ID
router.get('/:id', users.getById);

// POST / - Create new User 
router.post('/', users.createNew);

// PUT /:id - Update a User by ID
router.put('/:id', users.updateById);

module.exports = router;