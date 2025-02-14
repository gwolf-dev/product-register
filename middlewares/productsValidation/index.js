const translationFile = require('./translation');

const { DEFAULT_LANGUAGE } = process.env;

const validateCompanyId = (request, response, next) => {
  const { companyId, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!companyId)
    return response.status(400).json({ message: translation.companyId });

  next();
};

const validateEmptyFields = (request, response, next) => {
  const { userId, companyId, name, price, barcode, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (!userId)
    return response.status(400).json({ message: translation.userId });

  if (!companyId)
    return response.status(400).json({ message: translation.companyId });

  if (!name) return response.status(400).json({ message: translation.name });

  if (!price) return response.status(400).json({ message: translation.price });

  if (!barcode)
    return response.status(400).json({ message: translation.barcode });

  if (typeof name !== 'string' || typeof barcode !== 'string')
    return response
      .status(400)
      .json({ message: translation.invalidTypeString });

  if (
    typeof userId !== 'number' ||
    typeof companyId !== 'number' ||
    typeof price !== 'number'
  )
    return response
      .status(400)
      .json({ message: translation.invalidTypeNumber });

  next();
};

const validateFields = (request, response, next) => {
  const { barcode, language } = request.body;
  const translation = translationFile[language || DEFAULT_LANGUAGE];

  if (barcode.length !== 13)
    return response.status(400).json({ message: translation.invalidBarcode });

  next();
};

module.exports = { validateCompanyId, validateEmptyFields, validateFields };
