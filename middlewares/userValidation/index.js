const translationFile = require('./translation');

const validateEmptyFields = async (request, response, next) => {
  const { name, email, password, confirmPassword, phone, language } =
    request.body;

  if (!language)
    return response
      .status(400)
      .json({ message: 'The field "language" is required!' });
  const translation = translationFile[language || 'pt-BR'];

  if (!name) return response.status(400).json({ message: translation.name });

  if (!email) return response.status(400).json({ message: translation.email });

  if (!phone) return response.status(400).json({ message: translation.phone });

  if (!password)
    return response.status(400).json({ message: translation.password });

  if (!confirmPassword)
    return response.status(400).json({ message: translation.confirmPassword });

  if (password.length < 0 || password.length > 128)
    return response.status(400).json({
      message: translation.invalidRangePassword,
    });

  if (password !== confirmPassword)
    return response.status(400).json({
      message: translation.invalidComparePasswords,
    });

  next();
};

const validateLogin = (request, response, next) => {
  const { email, password, language } = request.body;
  const translation = translationFile[language || 'pt-BR'];

  if (!email) return response.status(400).json({ message: translation.email });

  if (!password)
    return response.status(400).json({ message: translation.password });

  next();
};

module.exports = { validateEmptyFields, validateLogin };
