const mongoose = require('mongoose');
const Order = require("../Models/orders")

exports.get_all_orders = (req, res, next) => {

    Order.find()
        .select('_id productId quantity')
        .populate('productId', 'name') //populating queries
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })

};

exports.create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not Found"
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                productId: req.body.productId,
                quantity: req.body.quantity
            })

            return order.save()
        })
        .then(result => {
            res.status(201).json({
                message: "Order Created Succesfully",
                createdOrder: {
                    id: result._id,
                    ProductId: result.productId,
                    quantity: result.quantity
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })

};

exports.get_single_order_as_per_orderid = (req, res, next) => {
    Order.findById(req.params.orderId)
        .select("_id productId quantity")
        .exec()
        .then(order => {
            res.status(200).json({
                order: order,

            })
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })
};

exports.delete_order = (req, res, next) => {

    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order Deleted"
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
};