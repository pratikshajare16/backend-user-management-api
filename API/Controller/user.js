const mongoose = require('mongoose');
const User = require('../Models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.sign_up_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) { // without length user will be null so further fun not work thats why if its >=1 is added
                return res.status(409).json({
                    message: "Mail already exists!"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: "User Created"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }

                })
            }
        })


};

exports.login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed!"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth Failed!"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userID: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: "Auth Succesful!",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Auth Failed!"
                })
            })
        })
        .catch(error =>

            res.status(500).json({
                error: error
            })
        )



};