const companyValidation = require('./companyValidation');
const productsValidation = require('./productsValidation');
const userValidation = require('./userValidation');
const verifyToken = require('./verifyToken');
const verifyLanguage = require('./verifyLanguage');
const verifyUserId = require('./verifyUserId');

module.exports = {
  companyValidation,
  productsValidation,
  userValidation,
  verifyToken,
  verifyLanguage,
  verifyUserId,
};
