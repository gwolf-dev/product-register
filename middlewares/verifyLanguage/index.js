const translationFile = require('./translation');

const { DEFAULT_LANGUAGE } = process.env;

module.exports = (request, response, next) => {
  const { language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!language)
    return response.status(400).json({ message: translation.language });

  next();
};
