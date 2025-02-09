const express = require('express');

const { companies, users } = require('./controllers');

const {
  companyValidation,
  userValidation,
  verifyToken,
  verifyLanguage,
  verifyUserId,
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
  '/users/:id',
  verifyLanguage,
  verifyToken,
  userValidation.validateEmptyFields,
  userValidation.validateFields,
  users.edit,
);

/* --- Companies --- */
router.post('/companies/get', verifyLanguage, verifyToken, companies.getAll);
router.post(
  '/companies/get/:companyId',
  verifyLanguage,
  verifyToken,
  companies.get,
);
router.post(
  '/companies',
  verifyLanguage,
  verifyToken,
  companyValidation.validateEmptyFields,
  verifyUserId,
  companies.register,
);
router.put(
  '/companies/:companyId',
  verifyLanguage,
  verifyToken,
  companyValidation.validateEmptyFields,
  verifyUserId,
  companies.edit,
);
router.delete(
  '/companies/:companyId',
  verifyLanguage,
  verifyToken,
  verifyUserId,
  companies.delete,
);

module.exports = router;
