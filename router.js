const express = require('express');

const users = require('./controllers/users');

const userValidation = require('./middlewares/userValidation');
const verifyToken = require('./middlewares/verifyToken');

const router = express.Router();

router.post('/users/login', userValidation.login, users.login);
router.post('/users/register', userValidation.register, users.register);
router.patch('/users/edit/:id', verifyToken, userValidation.edit, users.edit);

module.exports = router;
