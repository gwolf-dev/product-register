const translationFile = require('./translation');

const { DEFAULT_LANGUAGE } = process.env;

const validateEmptyFields = (request, response, next) => {
  const { userId, name, address, phone, foundation, department, language } =
    request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!userId)
    return response.status(400).json({ message: translation.userId });

  if (!name) return response.status(400).json({ message: translation.name });

  if (!address)
    return response.status(400).json({ message: translation.address });

  if (!phone) return response.status(400).json({ message: translation.phone });

  if (!foundation)
    return response.status(400).json({ message: translation.foundation });

  if (!department)
    return response.status(400).json({ message: translation.department });

  if (
    typeof name !== 'string' ||
    typeof address !== 'string' ||
    typeof phone !== 'string' ||
    typeof department !== 'string'
  )
    return response
      .status(400)
      .json({ message: translation.invalidTypeString });

  if (typeof userId !== 'number' || typeof foundation !== 'number')
    return response
      .status(400)
      .json({ message: translation.invalidTypeNumber });

  next();
};

module.exports = { validateEmptyFields };
