const Product = require('../Models/products')
const mongoose = require('mongoose')

exports.get_all_products = (req, res, next) => {

    Product.find() // show all products
        .select('_id name price productImage')
        .exec()
        .then(docs => {
            console.log(docs)

            const response = {
                count: docs.length,
                products: docs.map(doc => {  // use map function if you have to add data like request for every item otherwise use products:docs 
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id
                        }
                    }
                })
            }
            if (docs.length >= 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json({ message: "No Data found" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
};

exports.create_product = (req, res, next) => {

    console.log(req.file)
    //Store data into DB
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImage: req.file.path
    });

    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Created Product Successfully..",
            createdProduct: {
                name: result.name,
                price: result.price,
                description: result.description,
                _id: result._id,
                productImage: result.productImage,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + result.id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    });

};

exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id) // search or show product by id
        .select('_id name price productImage')
        .exec()
        .then(doc => {
            console.log("from db:", doc);
            if (doc) {
                res.status(200).json(doc)

            } else {
                res.status(404).json({ message: "No Valid Entry found for provided id" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
};

exports.update_product = (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Updated Successfully.",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/" + id
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
};

exports.delete_product = (req, res, next) => {

    const id = req.params.productId
    Product.deleteOne({ _id: id }) // delete product by id
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Deleted.",
                url: "http://localhost:3000/products",

                data: { name: 'String', price: 'Number' }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
};