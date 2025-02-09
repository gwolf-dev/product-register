const jwt = require('jsonwebtoken');

const translationFile = require('./translation');
const model = require('../../models/companies');

const { DEFAULT_LANGUAGE, SECRET_JWT_TOKEN } = process.env;

const getAll = async (request, response) => {
  const { language } = request.body;
  const token = request.headers.authorization.split(' ')[1];
  const translation = translationFile[language || DEFAULT_LANGUAGE];
  const decodedToken = jwt.verify(token, SECRET_JWT_TOKEN);

  try {
    const companies = await model.findAll(decodedToken.id);
    if (!companies.length)
      return response
        .status(200)
        .json({ message: translation.emptyFindCompanies, companies: [] });

    return response
      .status(200)
      .json({ message: translation.successFindCompanies, companies });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerFindCompanies,
      error: error.message,
    });
  }
};

const get = async (request, response) => {
  const { companyId } = request.params;
  const { language } = request.body;
  const token = request.headers.authorization.split(' ')[1];
  const translation = translationFile[language || DEFAULT_LANGUAGE];
  const decodedToken = jwt.verify(token, SECRET_JWT_TOKEN);

  try {
    const company = await model.findByCompanyId(decodedToken.id, companyId);

    if (!company)
      return response
        .status(200)
        .json({ message: translation.emptyFindCompany, company: {} });

    return response
      .status(200)
      .json({ message: translation.successFindCompany, company });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: translation.errorServerFindCompany,
      error: error.message,
    });
  }
};

module.exports = { getAll, get };
