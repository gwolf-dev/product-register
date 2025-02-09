const express = require('express');

const { companies, users } = require('./controllers');

const {
  userValidation,
  verifyToken,
  verifyLanguage,
} = require('./middlewares');

const router = express.Router();

/* --- Users --- */
router.post('/users/login', userValidation.validateLogin, users.login);
router.post(
  '/users/register',
  verifyLanguage,
  userValidation.validateEmptyFields,
  userValidation.validateFields,
  users.register,
);
router.post('/users/refreshToken', users.refreshToken);
router.patch(
  '/users/edit/:id',
  verifyLanguage,
  verifyToken,
  userValidation.validateEmptyFields,
  userValidation.validateFields,
  users.edit,
);

/* --- Companies --- */
router.post('/companies', verifyLanguage, verifyToken, companies.getAll);

module.exports = router;
