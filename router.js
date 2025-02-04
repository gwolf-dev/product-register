const express = require('express');

const { users } = require('./controllers');

const { userValidation, verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/users/login', userValidation.validateLogin, users.login);
router.post(
  '/users/register',
  userValidation.validateEmptyFields,
  users.register,
);
router.patch(
  '/users/edit/:id',
  verifyToken,
  userValidation.validateEmptyFields,
  users.edit,
);

module.exports = router;
