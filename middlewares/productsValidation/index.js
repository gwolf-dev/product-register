const translationFile = require('./translation');

const { DEFAULT_LANGUAGE } = process.env;

const validateCopanyId = (request, response, next) => {
  const { companyId, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!companyId)
    return response.status(400).json({ message: translation.companyId });

  next();
};

module.exports = { validateCopanyId };
