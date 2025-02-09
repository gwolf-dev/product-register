const translationFile = require('./translation');
const validate = require('../../helpers/validateFields');

const { DEFAULT_LANGUAGE } = process.env;

const validateEmptyFields = (request, response, next) => {
  const { name, email, password, confirmPassword, phone, language } =
    request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!name) return response.status(400).json({ message: translation.name });

  if (!email) return response.status(400).json({ message: translation.email });

  if (!phone) return response.status(400).json({ message: translation.phone });

  if (!password)
    return response.status(400).json({ message: translation.password });

  if (!confirmPassword)
    return response.status(400).json({ message: translation.confirmPassword });

  if (password !== confirmPassword)
    return response.status(400).json({
      message: translation.invalidComparePasswords,
    });

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  )
    return response
      .status(400)
      .json({ message: translation.invalidTypeString });

  next();
};

const validateFields = (request, response, next) => {
  const { email, password, phone, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!validate.email(email))
    return response.status(400).json({ message: translation.invalidEmail });

  if (!validate.phone(phone))
    return response.status(400).json({ message: translation.invalidPhone });

  if (!validate.password(password))
    return response.status(400).json({ message: translation.invalidPassword });

  next();
};

const validateLogin = (request, response, next) => {
  const { email, password, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!email) return response.status(400).json({ message: translation.email });

  if (!password)
    return response.status(400).json({ message: translation.password });

  next();
};

module.exports = { validateEmptyFields, validateFields, validateLogin };
