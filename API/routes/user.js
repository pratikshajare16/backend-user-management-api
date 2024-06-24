const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt') // It is use to hash password 
const User = require('../Models/user')
const jwt = require('jsonwebtoken')
const userController = require('../Controller/user')

router.post('/signup', userController.sign_up_user)

router.post('/login', userController.login_user)

module.exports = router;