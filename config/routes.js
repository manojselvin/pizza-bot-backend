var express = require('express');
var router = express.Router();

const productRouter = require('../services/products/routes');
const orderRouter = require('../services/orders/routes');
const userRouter = require('../services/users/routes');
const messageRouter = require('../services/messages/routes');

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);
router.use('/messages', messageRouter);

module.exports = router;