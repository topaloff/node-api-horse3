const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.user_list);
router.post('/signin', user_controller.user_signin);
router.post('/login', user_controller.user_login);


module.exports = router;
