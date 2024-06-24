const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //add ref to build relation with product 
    quantity: { type: Number, default: 1 } // use default , if value of quantity is null then by default it gives 1

});

module.exports = mongoose.model('Order', orderSchema)