const express = require('express');

const { users } = require('./controllers');

const { userValidation, verifyToken } = require('./middlewares');

const router = express.Router();

/* --- Users --- */
router.post('/users/login', userValidation.validateLogin, users.login);
router.post(
  '/users/register',
  userValidation.validateEmptyFields,
  userValidation.validateFields,
  users.register,
);
router.post('/users/refreshToken', users.refreshToken);
router.patch(
  '/users/edit/:id',
  verifyToken,
  userValidation.validateEmptyFields,
  userValidation.validateFields,
  users.edit,
);

/* --- Companies --- */

module.exports = router;
