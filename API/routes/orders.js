const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require("../Models/orders") //schema file
const Product = require("../Models/products")
const checkauth = require('../middleware/check-auth')
const orderController = require('../Controller/order')

router.get('/', orderController.get_all_orders)

router.post('/', checkauth, orderController.create_order)

router.get('/:orderId', orderController.get_single_order_as_per_orderid)

router.delete('/:orderId', checkauth, orderController.delete_order);

module.exports = router;