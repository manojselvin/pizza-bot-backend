const express = require('express');
const router = express.Router();
const messages = require('./controller');

// GET / - Fetch All Messages
router.get('/', messages.getAll);

// GET / - Fetch Messages by params
router.get('/search', messages.search);

// GET /:id - Fetch Message by ID
router.get('/:id', messages.getById);

// POST / - Create new Message 
router.post('/multi', messages.saveAll);

// POST / - Create new Message 
router.post('/', messages.createNew);

// PUT /:id - Update a Message by ID
router.put('/:id', messages.updateById);

module.exports = router;